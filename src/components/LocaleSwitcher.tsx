import { Globe, Loader2 } from "lucide-react";
import { CURRENCIES, LANGUAGES, useLocale, type CurrencyCode } from "@/lib/locale";

const LocaleSwitcher = ({ className = "" }: { className?: string }) => {
  const { lang, setLang, currency, setCurrency, translating } = useLocale();

  return (
    <div
      data-no-translate
      className={`flex items-center gap-2 text-xs font-body ${className}`}
    >
      <span className="text-muted-foreground">
        {translating ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} />}
      </span>
      <label className="sr-only" htmlFor="lang-select">
        Language
      </label>
      <select
        id="lang-select"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="bg-transparent border border-border px-2 py-1 text-foreground focus:outline-none focus:border-accent transition-colors cursor-pointer"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code} className="bg-background text-foreground">
            {l.label}
          </option>
        ))}
      </select>
      <label className="sr-only" htmlFor="currency-select">
        Currency
      </label>
      <select
        id="currency-select"
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        className="bg-transparent border border-border px-2 py-1 text-foreground focus:outline-none focus:border-accent transition-colors cursor-pointer"
      >
        {CURRENCIES.map((c) => (
          <option key={c} value={c} className="bg-background text-foreground">
            {c}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
