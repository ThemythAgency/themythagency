// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false },
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function bad(msg: string, status = 400) {
  return json({ error: msg }, status);
}

function isNonEmptyStr(v: unknown, max = 1000): v is string {
  return typeof v === "string" && v.trim().length > 0 && v.length <= max;
}

function isEmail(v: unknown): boolean {
  if (typeof v !== "string") return false;
  if (v.length > 255) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

import { sendNotification } from "../_shared/notifyEmail.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return bad("Method not allowed", 405);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid JSON");
  }

  const action = body?.action;

  try {
    if (action === "start_conversation") {
      const { visitor_id, name, email } = body;
      if (!isNonEmptyStr(visitor_id, 100)) return bad("visitor_id required");
      if (!isNonEmptyStr(name, 100)) return bad("name required");
      if (email != null && email !== "" && !isEmail(email)) return bad("invalid email");

      const visitor_token = randomToken();
      const { data, error } = await admin
        .from("chat_conversations")
        .insert({
          visitor_id: visitor_id.trim(),
          name: name.trim(),
          email: email ? String(email).trim() : null,
          visitor_token,
        })
        .select("id")
        .single();
      if (error || !data) return bad(error?.message ?? "Failed", 500);
      return json({ conversation_id: data.id, visitor_token });
    }

    if (action === "send_message") {
      const { conversation_id, visitor_token, message } = body;
      if (!isNonEmptyStr(conversation_id, 64)) return bad("conversation_id required");
      if (!isNonEmptyStr(visitor_token, 128)) return bad("visitor_token required");
      if (!isNonEmptyStr(message, 1000)) return bad("message required");

      const { data: conv, error: e1 } = await admin
        .from("chat_conversations")
        .select("id, name, email, visitor_token")
        .eq("id", conversation_id)
        .maybeSingle();
      if (e1 || !conv) return bad("Conversation not found", 404);
      if (conv.visitor_token !== visitor_token) return bad("Forbidden", 403);

      const { error: e2 } = await admin.from("chat_messages").insert({
        conversation_id,
        sender: "visitor",
        name: conv.name ?? "Visitor",
        email: conv.email,
        message: message.trim(),
      });
      if (e2) return bad(e2.message, 500);

      // Notify the agency inbox by email; never block the visitor on this.
      try {
        await sendNotification(
          `New live chat message from ${conv.name ?? "Visitor"}`,
          [
            `${conv.name ?? "Visitor"}${conv.email ? ` <${conv.email}>` : ""} sent a message:`,
            "",
            message.trim(),
            "",
            "Reply in the admin inbox: /admin/inbox",
          ].join("\n"),
        );
      } catch (err) {
        console.error("chat notification failed", err);
      }

      return json({ ok: true });
    }

    if (action === "list_messages") {
      const { conversation_id, visitor_token, since } = body;
      if (!isNonEmptyStr(conversation_id, 64)) return bad("conversation_id required");
      if (!isNonEmptyStr(visitor_token, 128)) return bad("visitor_token required");

      const { data: conv } = await admin
        .from("chat_conversations")
        .select("id, visitor_token")
        .eq("id", conversation_id)
        .maybeSingle();
      if (!conv) return bad("Conversation not found", 404);
      if (conv.visitor_token !== visitor_token) return bad("Forbidden", 403);

      let q = admin
        .from("chat_messages")
        .select("id, conversation_id, sender, name, message, created_at, is_streaming")
        .eq("conversation_id", conversation_id)
        .order("created_at", { ascending: true })
        .limit(500);
      if (typeof since === "string" && since) q = q.gt("created_at", since);
      const { data, error } = await q;
      if (error) return bad(error.message, 500);

      // Reset visitor unread when visitor pulls messages
      await admin
        .from("chat_conversations")
        .update({ visitor_unread_count: 0 })
        .eq("id", conversation_id);

      return json({ messages: data ?? [] });
    }

    return bad("Unknown action");
  } catch (err) {
    return bad((err as Error).message ?? "Server error", 500);
  }
});
