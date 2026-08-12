import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "themyth-cookie-consent";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const categories = [
  {
    id: "necessary" as const,
    title: "Strictly necessary",
    desc: "Required for the site to function, including page navigation, security and your live chat session. These cannot be switched off.",
    locked: true,
  },
  {
    id: "analytics" as const,
    title: "Analytics",
    desc: "Help us understand how visitors use the site so we can improve pages, content and performance.",
    locked: false,
  },
  {
    id: "marketing" as const,
    title: "Marketing",
    desc: "Used to measure campaigns and show relevant content about our Shopify growth services.",
    locked: false,
  },
];

export const getConsent = (): ConsentState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
};

const save = (analytics: boolean, marketing: boolean) => {
  const value: ConsentState = {
    necessary: true,
    analytics,
    marketing,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("themyth:cookie-consent", { detail: value }));
};

const CookieConsent = () => {
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!getConsent()) {
      const t = setTimeout(() => setOpen(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const reopen = () => {
      const current = getConsent();
      setAnalytics(current?.analytics ?? true);
      setMarketing(current?.marketing ?? false);
      setShowPrefs(true);
      setOpen(true);
    };
    window.addEventListener("themyth:open-cookie-preferences", reopen);
    return () => window.removeEventListener("themyth:open-cookie-preferences", reopen);
  }, []);

  const close = () => {
    setOpen(false);
    setShowPrefs(false);
  };

  const acceptAll = () => {
    save(true, true);
    close();
  };
  const rejectAll = () => {
    save(false, false);
    close();
  };
  const savePrefs = () => {
    save(analytics, marketing);
    close();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed inset-x-3 bottom-3 md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md z-[60] bg-card border border-border shadow-2xl"
        >
          <div className="p-5 md:p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2.5">
                <Cookie size={18} className="text-accent" />
                <h2 className="font-display text-lg font-medium">Cookie preferences</h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close cookie banner"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-sm font-body text-muted-foreground leading-relaxed">
              We use cookies to run the site, understand how it is used, and improve the experience.
              You choose what we may use. Read our{" "}
              <Link to="/cookie-policy" className="text-accent underline underline-offset-4">
                Cookie Policy
              </Link>
              .
            </p>

            <AnimatePresence initial={false}>
              {showPrefs && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 space-y-3 max-h-[42vh] overflow-y-auto pr-1">
                    {categories.map((cat) => {
                      const checked =
                        cat.id === "necessary" ? true : cat.id === "analytics" ? analytics : marketing;
                      const onToggle = () => {
                        if (cat.id === "analytics") setAnalytics((v) => !v);
                        if (cat.id === "marketing") setMarketing((v) => !v);
                      };
                      return (
                        <div key={cat.id} className="border border-border p-3.5">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-sm font-body font-semibold">{cat.title}</h3>
                            <button
                              type="button"
                              role="switch"
                              aria-checked={checked}
                              aria-label={cat.title}
                              disabled={cat.locked}
                              onClick={onToggle}
                              className={`relative w-10 h-5 flex-shrink-0 transition-colors duration-300 ${
                                checked ? "bg-accent" : "bg-muted"
                              } ${cat.locked ? "opacity-60 cursor-not-allowed" : ""}`}
                            >
                              <span
                                className={`absolute top-0.5 h-4 w-4 bg-card transition-all duration-300 ${
                                  checked ? "left-[22px]" : "left-0.5"
                                }`}
                              />
                            </button>
                          </div>
                          <p className="text-xs font-body text-muted-foreground mt-2 leading-relaxed">
                            {cat.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <button type="button" onClick={acceptAll} className="btn-primary px-5 py-2.5 text-xs flex-1">
                Accept all
              </button>
              <button type="button" onClick={rejectAll} className="btn-outline px-5 py-2.5 text-xs flex-1">
                Reject all
              </button>
              {showPrefs ? (
                <button type="button" onClick={savePrefs} className="btn-outline px-5 py-2.5 text-xs w-full">
                  Save my choices
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPrefs(true)}
                  className="text-xs font-body text-muted-foreground hover:text-accent transition-colors w-full text-center pt-1"
                >
                  Manage preferences
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
