import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { sendNotification } from "../_shared/notifyEmail.ts";

const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const str = (v: unknown, max: number) =>
  typeof v === "string" && v.trim().length > 0 && v.length <= max ? v.trim() : null;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const type = body.type === "contact_inquiry" ? "contact_inquiry" : null;
  if (!type) return json({ error: "Unsupported notification type" }, 400);

  const id = str(body.id, 64);
  if (!id) return json({ error: "id required" }, 400);

  // Read the stored row instead of trusting client-supplied content.
  const { data: row, error } = await admin
    .from("contact_inquiries")
    .select("id, name, email, website, revenue_range, budget_range, service_interest, message, created_at")
    .eq("id", id)
    .maybeSingle();
  if (error) return json({ error: error.message }, 500);
  if (!row) return json({ error: "Inquiry not found" }, 404);

  const text = [
    "New contact inquiry from themythagency.com",
    "",
    `Name: ${row.name}`,
    `Email: ${row.email}`,
    `Website: ${row.website ?? "n/a"}`,
    `Revenue: ${row.revenue_range ?? "n/a"}`,
    `Budget: ${row.budget_range ?? "n/a"}`,
    `Interest: ${row.service_interest ?? "n/a"}`,
    "",
    "Message:",
    row.message ?? "(none)",
    "",
    `Received: ${row.created_at}`,
    "Reply in the admin inbox: /admin/inbox",
  ].join("\n");

  const result = await sendNotification(`New inquiry: ${row.name}`, text);
  if (!result.ok) return json({ error: "Email delivery failed", details: result.details }, result.status);
  return json({ ok: true });
});
