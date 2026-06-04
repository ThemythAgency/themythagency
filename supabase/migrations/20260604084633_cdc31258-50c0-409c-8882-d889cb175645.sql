
-- Add visitor_token used by the chat edge function to authenticate visitors
ALTER TABLE public.chat_conversations
  ADD COLUMN IF NOT EXISTS visitor_token text;

-- Drop overly-permissive policies
DROP POLICY IF EXISTS "Public can read conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Public can update conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Public can insert conversation" ON public.chat_conversations;

DROP POLICY IF EXISTS "Anyone can read chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can insert chat message" ON public.chat_messages;

-- Admin can read/insert/update conversations (delete policy already exists)
CREATE POLICY "Admins read conversations"
  ON public.chat_conversations FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update conversations"
  ON public.chat_conversations FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admin can read/insert messages (update/delete policies already exist)
CREATE POLICY "Admins read chat messages"
  ON public.chat_messages FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert chat messages"
  ON public.chat_messages FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') AND sender = 'admin');

-- Remove chat tables from the supabase_realtime publication so anonymous/
-- authenticated users cannot subscribe to changes; visitors use polling via
-- the edge function, admins also poll inside the inbox UI.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'chat_messages'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.chat_messages';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'chat_conversations'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.chat_conversations';
  END IF;
END $$;
