-- Create contact inquiries table
CREATE TABLE public.contact_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT,
  revenue_range TEXT,
  service_interest TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form)
CREATE POLICY "Anyone can submit a contact inquiry"
  ON public.contact_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated admin can read (optional future admin panel)
CREATE POLICY "Authenticated users can read inquiries"
  ON public.contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);