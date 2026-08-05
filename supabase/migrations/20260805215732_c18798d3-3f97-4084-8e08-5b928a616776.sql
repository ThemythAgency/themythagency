CREATE TABLE public.mcp_audit_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL DEFAULT auth.uid(),
  user_email text,
  client_id text,
  tool_name text NOT NULL,
  action text NOT NULL DEFAULT 'read',
  arguments jsonb NOT NULL DEFAULT '{}'::jsonb,
  target_table text,
  target_id text,
  summary text,
  success boolean NOT NULL DEFAULT true,
  error_message text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.mcp_audit_logs TO authenticated;
GRANT ALL ON public.mcp_audit_logs TO service_role;

ALTER TABLE public.mcp_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read mcp audit logs"
ON public.mcp_audit_logs FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins write own mcp audit logs"
ON public.mcp_audit_logs FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX mcp_audit_logs_created_at_idx ON public.mcp_audit_logs (created_at DESC);

ALTER TABLE public.chat_messages
  ADD COLUMN stream_id text,
  ADD COLUMN is_streaming boolean NOT NULL DEFAULT false;

CREATE INDEX chat_messages_stream_id_idx ON public.chat_messages (stream_id);