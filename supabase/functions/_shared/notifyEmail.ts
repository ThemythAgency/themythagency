const GATEWAY = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";
export const NOTIFY_TO = "official.themythagency@gmail.com";

function encodeRaw(to: string, subject: string, body: string) {
  const email = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    body,
  ].join("\r\n");
  const bytes = new TextEncoder().encode(email);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Sends a notification email through the linked Gmail connector. Never throws. */
export async function sendNotification(subject: string, body: string) {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const connKey = Deno.env.get("GOOGLE_MAIL_API_KEY");
  if (!lovableKey || !connKey) {
    console.error("Gmail notification skipped: missing LOVABLE_API_KEY or GOOGLE_MAIL_API_KEY");
    return { ok: false, status: 500, details: "Gmail connector not configured" };
  }

  const res = await fetch(`${GATEWAY}/users/me/messages/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": connKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw: encodeRaw(NOTIFY_TO, subject, body) }),
  });

  if (!res.ok) {
    const details = await res.text();
    console.error(`Gmail send failed [${res.status}]: ${details}`);
    return { ok: false, status: res.status, details };
  }
  return { ok: true, status: 200, details: "" };
}
