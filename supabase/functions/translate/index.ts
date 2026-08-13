import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) return json({ error: "Missing LOVABLE_API_KEY" }, 500);

  let body: { target?: string; texts?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const target = typeof body.target === "string" ? body.target.slice(0, 10) : "";
  const texts = Array.isArray(body.texts)
    ? body.texts.filter((t): t is string => typeof t === "string" && t.length <= 800).slice(0, 80)
    : [];
  if (!target) return json({ error: "target required" }, 400);
  if (!texts.length) return json({ translations: [] });

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Lovable-API-Key": key, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content:
            "You are a professional website localizer for a premium Shopify growth consultancy. " +
            `Translate each string in the JSON array into the language with code "${target}". ` +
            "Keep brand names (Themyth Agency, Shopify, Klaviyo, Meta, Google), URLs, emails and numbers unchanged. " +
            "Preserve capitalization style and punctuation. Return ONLY a JSON object of the form " +
            '{"translations": ["..."]} with exactly the same number of items, in the same order.',
        },
        { role: "user", content: JSON.stringify(texts) },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const details = await res.text();
    console.error(`AI gateway error [${res.status}]: ${details}`);
    return json({ error: "Translation failed", status: res.status, details }, res.status);
  }

  const data = await res.json();
  let translations: string[] = [];
  try {
    const parsed = JSON.parse(data.choices?.[0]?.message?.content ?? "{}");
    if (Array.isArray(parsed.translations)) translations = parsed.translations.map(String);
  } catch (err) {
    console.error("Failed to parse translation output", err);
  }
  if (translations.length !== texts.length) return json({ translations: texts });
  return json({ translations });
});
