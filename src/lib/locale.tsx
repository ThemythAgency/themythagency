import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "pt", label: "Português" },
  { code: "it", label: "Italiano" },
  { code: "nl", label: "Nederlands" },
  { code: "ar", label: "العربية" },
  { code: "hi", label: "हिन्दी" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
] as const;

export const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD", "NGN", "INR", "AED", "ZAR", "JPY"] as const;
export type CurrencyCode = (typeof CURRENCIES)[number];

const REGION_CURRENCY: Record<string, CurrencyCode> = {
  US: "USD", CA: "CAD", GB: "GBP", AU: "AUD", NG: "NGN", IN: "INR", AE: "AED", ZA: "ZAR", JP: "JPY",
  FR: "EUR", DE: "EUR", ES: "EUR", IT: "EUR", NL: "EUR", PT: "EUR", IE: "EUR", BE: "EUR", AT: "EUR",
};

const LANG_KEY = "themyth_lang";
const CUR_KEY = "themyth_currency";
const CACHE_PREFIX = "themyth_i18n_";

const detectLang = () => {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored) return stored;
  const nav = (navigator.language || "en").split("-")[0].toLowerCase();
  return LANGUAGES.some((l) => l.code === nav) ? nav : "en";
};

const detectCurrency = (): CurrencyCode => {
  const stored = localStorage.getItem(CUR_KEY) as CurrencyCode | null;
  if (stored && CURRENCIES.includes(stored)) return stored;
  const region = (navigator.language || "en-US").split("-")[1]?.toUpperCase();
  return (region && REGION_CURRENCY[region]) || "USD";
};

type Ctx = {
  lang: string;
  setLang: (l: string) => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  format: (usd: number) => string;
  translating: boolean;
};

const LocaleContext = createContext<Ctx | null>(null);

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "SVG", "PATH"]);

function collectNodes(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = (node as Text).parentElement;
      if (!parent || SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (parent.closest("[data-no-translate]")) return NodeFilter.FILTER_REJECT;
      const text = node.nodeValue?.trim() ?? "";
      if (text.length < 2 || !/[a-zA-Z]/.test(text)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    nodes.push(current as Text);
    current = walker.nextNode();
  }
  return nodes;
}

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState(() => (typeof window === "undefined" ? "en" : detectLang()));
  const [currency, setCurrencyState] = useState<CurrencyCode>(() =>
    typeof window === "undefined" ? "USD" : detectCurrency(),
  );
  const [rates, setRates] = useState<Record<string, number>>({ USD: 1 });
  const [translating, setTranslating] = useState(false);
  const cacheRef = useRef<Record<string, string>>({});
  const originalsRef = useRef<WeakMap<Text, string>>(new WeakMap());

  /* ---------------- currency ---------------- */
  useEffect(() => {
    let cancelled = false;
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && d?.rates) setRates({ USD: 1, ...d.rates });
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const format = useCallback(
    (usd: number) => {
      const rate = rates[currency] ?? 1;
      const value = usd * rate;
      const rounded = currency === "USD" ? value : Math.round(value / 5) * 5;
      try {
        return new Intl.NumberFormat(lang === "en" ? "en-US" : lang, {
          style: "currency",
          currency,
          maximumFractionDigits: 0,
        }).format(rounded);
      } catch {
        return `${currency} ${Math.round(rounded).toLocaleString()}`;
      }
    },
    [rates, currency, lang],
  );

  /* ---------------- translation ---------------- */
  const loadCache = useCallback((code: string) => {
    try {
      cacheRef.current = JSON.parse(localStorage.getItem(CACHE_PREFIX + code) || "{}");
    } catch {
      cacheRef.current = {};
    }
  }, []);

  const saveCache = useCallback((code: string) => {
    try {
      localStorage.setItem(CACHE_PREFIX + code, JSON.stringify(cacheRef.current));
    } catch {
      /* quota */
    }
  }, []);

  const translatePage = useCallback(
    async (code: string) => {
      const nodes = collectNodes(document.body);
      if (code === "en") {
        nodes.forEach((n) => {
          const original = originalsRef.current.get(n);
          if (original !== undefined) n.nodeValue = original;
        });
        return;
      }

      const pending: string[] = [];
      nodes.forEach((n) => {
        if (!originalsRef.current.has(n)) originalsRef.current.set(n, n.nodeValue ?? "");
        const source = (originalsRef.current.get(n) ?? "").trim();
        const cached = cacheRef.current[source];
        if (cached) {
          n.nodeValue = (n.nodeValue ?? "").replace(source, cached);
        } else if (!pending.includes(source)) {
          pending.push(source);
        }
      });

      if (!pending.length) return;
      setTranslating(true);
      try {
        for (let i = 0; i < pending.length; i += 60) {
          const batch = pending.slice(i, i + 60);
          const { data, error } = await supabase.functions.invoke("translate", {
            body: { target: code, texts: batch },
          });
          if (error || !data?.translations) break;
          batch.forEach((source, idx) => {
            const out = data.translations[idx];
            if (typeof out === "string" && out) cacheRef.current[source] = out;
          });
          nodes.forEach((n) => {
            const source = (originalsRef.current.get(n) ?? "").trim();
            const translated = cacheRef.current[source];
            if (translated) n.nodeValue = (originalsRef.current.get(n) ?? "").replace(source, translated);
          });
        }
        saveCache(code);
      } finally {
        setTranslating(false);
      }
    },
    [saveCache],
  );

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    loadCache(lang);
    let frame = 0;
    const run = () => {
      window.clearTimeout(frame);
      frame = window.setTimeout(() => void translatePage(lang), 400);
    };
    run();
    const observer = new MutationObserver(run);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      window.clearTimeout(frame);
    };
  }, [lang, loadCache, translatePage]);

  const setLang = useCallback((l: string) => {
    localStorage.setItem(LANG_KEY, l);
    setLangState(l);
  }, []);

  const setCurrency = useCallback((c: CurrencyCode) => {
    localStorage.setItem(CUR_KEY, c);
    setCurrencyState(c);
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, currency, setCurrency, format, translating }),
    [lang, setLang, currency, setCurrency, format, translating],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    return {
      lang: "en",
      setLang: () => undefined,
      currency: "USD" as CurrencyCode,
      setCurrency: () => undefined,
      format: (usd: number) => `$${usd.toLocaleString("en-US")}`,
      translating: false,
    } satisfies Ctx;
  }
  return ctx;
};
