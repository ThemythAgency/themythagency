
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Auto-create profile + make first user admin
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  user_count int;
BEGIN
  INSERT INTO public.profiles (user_id, email, display_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));

  SELECT count(*) INTO user_count FROM auth.users;
  IF user_count <= 1 THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Chat conversations
CREATE TABLE public.chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT NOT NULL UNIQUE,
  name TEXT,
  email TEXT,
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  admin_unread_count INT NOT NULL DEFAULT 0,
  visitor_unread_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;

-- Anyone can create or read their conversation by visitor_id (no auth) — we keep it permissive
-- but admins also have full access.
CREATE POLICY "Public can insert conversation" ON public.chat_conversations
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public can read conversations" ON public.chat_conversations
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can update conversations" ON public.chat_conversations
  FOR UPDATE TO anon, authenticated USING (true);
CREATE POLICY "Admins delete conversations" ON public.chat_conversations
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Extend chat_messages
ALTER TABLE public.chat_messages
  ADD COLUMN conversation_id UUID REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  ADD COLUMN sender TEXT NOT NULL DEFAULT 'visitor',
  ADD COLUMN read_at TIMESTAMPTZ;

-- Drop old restrictive policy and rebuild
DROP POLICY IF EXISTS "Anyone can submit a chat message" ON public.chat_messages;
DROP POLICY IF EXISTS "Authenticated users can read chat messages" ON public.chat_messages;

CREATE POLICY "Anyone can insert chat message" ON public.chat_messages
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read chat messages" ON public.chat_messages
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins update chat messages" ON public.chat_messages
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete chat messages" ON public.chat_messages
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Contact inquiries: add status + read_at
ALTER TABLE public.contact_inquiries
  ADD COLUMN status TEXT NOT NULL DEFAULT 'new',
  ADD COLUMN read_at TIMESTAMPTZ;

DROP POLICY IF EXISTS "Authenticated users can read inquiries" ON public.contact_inquiries;
CREATE POLICY "Admins read inquiries" ON public.contact_inquiries
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update inquiries" ON public.contact_inquiries
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete inquiries" ON public.contact_inquiries
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Realtime
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;
ALTER TABLE public.chat_conversations REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_conversations;

-- Touch conversation last_message_at on new message
CREATE OR REPLACE FUNCTION public.touch_conversation()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.conversation_id IS NOT NULL THEN
    UPDATE public.chat_conversations
      SET last_message_at = now(),
          admin_unread_count = CASE WHEN NEW.sender = 'visitor' THEN admin_unread_count + 1 ELSE admin_unread_count END,
          visitor_unread_count = CASE WHEN NEW.sender = 'admin' THEN visitor_unread_count + 1 ELSE visitor_unread_count END
    WHERE id = NEW.conversation_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_touch_conversation
  AFTER INSERT ON public.chat_messages
  FOR EACH ROW EXECUTE FUNCTION public.touch_conversation();
