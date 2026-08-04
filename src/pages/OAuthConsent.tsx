import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

type OAuthResult = { redirect_url?: string; redirect_to?: string; client?: { name?: string } };

const oauthApi = () =>
  (supabase.auth as unknown as {
    oauth: {
      getAuthorizationDetails: (id: string) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
      approveAuthorization: (id: string) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
      denyAuthorization: (id: string) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
    };
  }).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<OAuthResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/admin/login?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error: err } = await oauthApi().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (err) {
        setError(err.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    const api = oauthApi();
    const { data, error: err } = approve
      ? await api.approveAuthorization(authorizationId)
      : await api.denyAuthorization(authorizationId);
    if (err) {
      setBusy(false);
      setError(err.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  };

  return (
    <main className="min-h-screen bg-primary text-primary-foreground flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-card text-foreground p-10 shadow-2xl"
      >
        {error ? (
          <>
            <h1 className="font-display text-2xl mb-3">Authorization failed</h1>
            <p className="text-sm text-muted-foreground font-body">{error}</p>
          </>
        ) : !details ? (
          <p className="text-sm text-muted-foreground font-body">Loading authorization request…</p>
        ) : (
          <>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Agent integration</p>
            <h1 className="font-display text-2xl mb-3">
              Connect {details.client?.name ?? "an app"} to your account
            </h1>
            <p className="text-sm text-muted-foreground font-body mb-8">
              This lets {details.client?.name ?? "the client"} read inquiries and chat conversations and reply to
              visitors as you.
            </p>
            <div className="flex gap-3">
              <button
                disabled={busy}
                onClick={() => decide(true)}
                className="btn-primary flex-1 justify-center disabled:opacity-50"
              >
                Approve
              </button>
              <button
                disabled={busy}
                onClick={() => decide(false)}
                className="flex-1 px-5 py-3 border border-border text-sm hover:border-accent transition-colors disabled:opacity-50"
              >
                Deny
              </button>
            </div>
          </>
        )}
      </motion.div>
    </main>
  );
};

export default OAuthConsent;
