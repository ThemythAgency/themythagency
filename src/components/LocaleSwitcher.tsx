import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Loader2 } from "lucide-react";
import { CURRENCIES, LANGUAGES, useLocale, type CurrencyCode } from "@/lib/locale";

const LocaleSwitcher = ({ className = "" }: { className?: string }) => {
  const { lang, setLang, currency, setCurrency, translating } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} data-no-translate className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Language and currency"
        className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-body text-muted-foreground hover:text-accent transition-colors"
      >
        {translating ? <Loader2 size={15} className="animate-spin" /> : <Globe size={15} />}
        <span className="uppercase tracking-wide">{lang}</span>
        <span className="opacity-40">/</span>
        <span>{currency}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 bg-card border border-border shadow-xl p-4 z-50 space-y-4"
          >
            <div>
              <label htmlFor="lang-select" className="text-label text-accent block mb-2">
                Language
              </label>
              <select
                id="lang-select"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="w-full bg-background border border-border px-2 py-2 text-sm font-body text-foreground focus:outline-none focus:border-accent"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="currency-select" className="text-label text-accent block mb-2">
                Currency
              </label>
              <select
                id="currency-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="w-full bg-background border border-border px-2 py-2 text-sm font-body text-foreground focus:outline-none focus:border-accent"
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[11px] font-body text-muted-foreground leading-relaxed">
              Prices convert from USD at live rates. Invoicing is in USD.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocaleSwitcher;
