import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Plus } from "lucide-react";
import { waLink, buildPackageMessage, money } from "@/lib/whatsapp";


type AddOn = { label: string; price: number };

type Package = {
  num: string;
  name: string;
  price: string;
  priceNote?: string;
  badge?: string;
  description: string;
  inclusions: string[];
  addOns: AddOn[];
  base: number;
  note?: string;
};

const packages: Package[] = [
  {
    num: "01",
    name: "The Launch Pad",
    price: "$500",
    base: 500,
    description:
      "No store yet? This is where everything begins. We build your Shopify business from the ground up, properly.",
    inclusions: [
      "Shopify account creation and full setup",
      "Legal name and domain setup",
      "Product uploading",
      "Full store customization",
      "Basic CRM integration",
      "Mini SEO optimization",
    ],
    addOns: [
      { label: "Basic marketing setup", price: 100 },
      { label: "Payment gateway integration", price: 100 },
    ],
    note: "Product uploading only: $1-2 per product. SEO structured product upload: $5 per product. First 20 products included in the package.",
  },
  {
    num: "02",
    name: "The Foundation",
    price: "$1,000",
    base: 1000,
    badge: "Most Popular",
    description:
      "Store is live but needs to look professional, build trust, and get found. This is the foundation every serious store needs before investing in marketing.",
    inclusions: [
      "Brand visual identity",
      "Trust and social proof architecture",
      "On-page SEO foundations",
      "Pinterest Shopping catalog sync",
      "Basic email marketing automations",
      "Google Merchant Center setup",
    ],
    addOns: [
      { label: "Product page optimization", price: 200 },
      { label: "Domain and email setup", price: 200 },
    ],
  },
  {
    num: "03",
    name: "The Growth Engine",
    price: "$1,500",
    base: 1500,
    description:
      "Getting traffic but sales are inconsistent? This package optimizes everything that turns visitors into buyers and makes your ad spend actually work.",
    inclusions: [
      "Checkout optimization",
      "Meta and Google scaling strategy",
      "ROAS and CAC optimization",
      "SMS marketing",
      "Google Shopping feed optimization",
      "Paid ads integration and implementation",
    ],
    addOns: [
      { label: "CLV optimization", price: 300 },
      { label: "Technical SEO", price: 300 },
    ],
    note: "Ad spend budget is separate and managed directly by the client. This package covers strategy, setup and optimization only.",
  },
  {
    num: "04",
    name: "The Scale System",
    price: "$2,000",
    base: 2000,
    badge: "For established stores",
    description:
      "Already generating consistent revenue? This package expands your reach into new markets, platforms and channels, built for stores ready to dominate.",
    inclusions: [
      "International market expansion",
      "Marketplace dominance: Amazon, Etsy, eBay",
      "SEO authority strategy",
      "Full funnel paid strategy",
      "Full CRO program",
      "Advanced Google Shopping dominance",
    ],
    addOns: [
      { label: "Subscription program development", price: 400 },
      { label: "Wholesale and B2B channel development", price: 400 },
    ],
  },
  {
    num: "05",
    name: "The Growth Partner",
    price: "$800",
    priceNote: "per month",
    base: 800,
    badge: "Retainer",
    description:
      "Need an ongoing growth team without building one in-house? This is your outsourced growth partner: strategic, consistent and results-focused.",
    inclusions: [
      "Monthly and quarterly business review",
      "Continuous CRO",
      "Paid ads management",
      "Email optimization",
      "Strategic guidance",
      "Performance reporting",
    ],
    addOns: [{ label: "Virtual Assistant (per month)", price: 800 }],
  },
];

const qualifiers = [
  {
    q: "Do you have a Shopify store yet?",
    a: "If the answer is no, you need the build itself handled end to end before anything else can work.",
  },
  {
    q: "Are you getting traffic but no sales?",
    a: "Then trust, clarity and discoverability are missing. Fix the foundation before spending more on traffic.",
  },
  {
    q: "Are you getting sales but they are inconsistent?",
    a: "Your funnel converts sometimes. The work now is optimization and making paid channels pay for themselves.",
  },
  {
    q: "Are you scaling but need systems?",
    a: "You are ready to expand into new markets and channels, or to bring on an ongoing growth team.",
  },
];

const customCategories: { name: string; services: { label: string; price: number }[] }[] = [
  {
    name: "Foundation services",
    services: [
      { label: "Shopify account creation and full setup", price: 100 },
      { label: "Legal name and domain setup", price: 100 },
      { label: "Product uploading", price: 100 },
      { label: "Full store customization", price: 100 },
      { label: "Basic CRM integration", price: 100 },
      { label: "Mini SEO optimization", price: 100 },
      { label: "Basic marketing setup", price: 100 },
      { label: "Payment gateway integration", price: 100 },
    ],
  },
  {
    name: "Visibility services",
    services: [
      { label: "Brand visual identity", price: 200 },
      { label: "On-page SEO foundations", price: 200 },
      { label: "Pinterest Shopping catalog sync", price: 200 },
      { label: "Google Merchant Center setup", price: 200 },
      { label: "Basic email marketing automations", price: 200 },
      { label: "Domain and email setup", price: 200 },
    ],
  },
  {
    name: "Growth services",
    services: [
      { label: "Meta and Google scaling strategy", price: 300 },
      { label: "ROAS and CAC optimization", price: 300 },
      { label: "Google Shopping feed optimization", price: 300 },
      { label: "Paid ads integration and implementation", price: 300 },
      { label: "SMS marketing", price: 300 },
      { label: "Technical SEO", price: 300 },
    ],
  },
  {
    name: "Conversion services",
    services: [
      { label: "Checkout optimization", price: 300 },
      { label: "Product page optimization", price: 200 },
      { label: "Trust and social proof architecture", price: 200 },
      { label: "Full CRO program", price: 400 },
    ],
  },
  {
    name: "Loyalty services",
    services: [
      { label: "CLV optimization", price: 400 },
      { label: "Subscription program development", price: 400 },
      { label: "Wholesale and B2B channel development", price: 400 },
      { label: "International market expansion", price: 400 },
      { label: "Marketplace expansion: Amazon, Etsy, eBay", price: 400 },
    ],
  },
];

const PackageCard = ({ pkg, index }: { pkg: Package; index: number }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const subtotal =
    pkg.base + pkg.addOns.filter((a) => selected.includes(a.label)).reduce((s, a) => s + a.price, 0);

  const toggle = (label: string) =>
    setSelected((prev) => (prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]));

  const waHref = waLink(
    buildPackageMessage({
      packageName: pkg.name,
      basePrice: `${pkg.price}${pkg.priceNote ? ` ${pkg.priceNote}` : ""}`,
      addOns: selected,
      total: subtotal,
      recurring: Boolean(pkg.priceNote),
    }),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="relative flex flex-col bg-card border border-border p-6 transition-all duration-500 hover:shadow-xl hover:border-accent/30"
    >
      {pkg.badge && (
        <span className="absolute -top-3 left-6 bg-accent text-accent-foreground text-[9px] font-body font-semibold tracking-[0.16em] uppercase px-2.5 py-1">
          {pkg.badge}
        </span>
      )}

      <div className="flex items-center gap-3 mb-4">
        <span className="text-label text-accent">{pkg.num}</span>
        <div className="gold-line" />
      </div>

      <h3 className="font-display text-xl md:text-2xl font-medium mb-2">{pkg.name}</h3>
      <p className="font-display text-2xl md:text-3xl text-accent mb-1">
        {pkg.price}
        {pkg.priceNote && (
          <span className="text-sm text-muted-foreground font-body ml-2">{pkg.priceNote}</span>
        )}
      </p>
      <p className="text-sm font-body text-muted-foreground leading-relaxed mt-3 mb-6">
        {pkg.description}
      </p>

      <h4 className="text-label text-accent mb-3">Core inclusions</h4>
      <ul className="space-y-2 mb-6">
        {pkg.inclusions.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Check size={14} className="text-accent mt-1 flex-shrink-0" />
            <span className="text-sm font-body">{item}</span>
          </li>
        ))}
      </ul>

      <h4 className="text-label text-accent mb-3">Optional add-ons</h4>
      <div className="space-y-2 mb-5">
        {pkg.addOns.map((addon) => {
          const active = selected.includes(addon.label);
          return (
            <button
              key={addon.label}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(addon.label)}
              className={`w-full flex items-center justify-between gap-3 border p-3 text-left transition-all duration-300 ${
                active
                  ? "border-accent bg-accent/10"
                  : "border-border hover:border-accent/40 hover:bg-secondary/60"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    active ? "bg-accent border-accent" : "border-muted-foreground/50"
                  }`}
                >
                  {active && <Check size={12} className="text-accent-foreground" />}
                </span>
                <span className="text-sm font-body">{addon.label}</span>
              </span>
              <span className="text-xs font-body text-muted-foreground whitespace-nowrap">
                +{money(addon.price)}
              </span>
            </button>
          );
        })}
      </div>

      {pkg.note && (
        <p className="text-xs font-body text-muted-foreground border-l-2 border-accent/50 pl-3 mb-5 leading-relaxed">
          {pkg.note}
        </p>
      )}

      <div className="mt-auto pt-5 border-t border-border flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-label text-muted-foreground mb-1">Your total</p>
          <motion.p key={subtotal} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-display text-xl">
            {money(subtotal)}
            {pkg.priceNote && <span className="text-xs text-muted-foreground ml-1">/mo</span>}
          </motion.p>
        </div>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
          Get Started
          <ArrowRight size={14} className="btn-arrow" />
        </a>
      </div>
    </motion.div>
  );
};


const CustomBuilder = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const total = useMemo(
    () =>
      customCategories
        .flatMap((c) => c.services)
        .filter((s) => selected.includes(s.label))
        .reduce((sum, s) => sum + s.price, 0),
    [selected],
  );

  const toggle = (label: string) =>
    setSelected((prev) => (prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-card border border-border p-8 md:p-10 lg:col-span-2"
    >
      <span className="absolute -top-3 left-8 bg-primary text-primary-foreground text-[10px] font-body font-semibold tracking-[0.18em] uppercase px-3 py-1.5">
        Fully Flexible
      </span>

      <div className="flex items-center gap-4 mb-5">
        <span className="text-label text-accent">06</span>
        <div className="gold-line" />
      </div>
      <h3 className="text-display-md mb-4">Custom Package</h3>
      <p className="text-body text-muted-foreground max-w-2xl mb-10">
        Need something specific that does not fit the packages above? Build exactly what your store
        needs, nothing more, nothing less. Select your services and the total updates live.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">
        {customCategories.map((cat, ci) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: ci * 0.06 }}
          >
            <h4 className="text-label text-accent mb-4">{cat.name}</h4>
            <div className="space-y-2">
              {cat.services.map((s) => {
                const active = selected.includes(s.label);
                return (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => toggle(s.label)}
                    className={`w-full flex items-start gap-3 border p-3 text-left transition-all duration-300 ${
                      active
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-accent/40 hover:bg-secondary/60"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                        active ? "bg-accent border-accent" : "border-muted-foreground/50"
                      }`}
                    >
                      {active ? <Check size={12} className="text-accent-foreground" /> : <Plus size={10} className="opacity-0" />}
                    </span>
                    <span className="text-sm font-body">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="sticky bottom-4 bg-primary text-primary-foreground p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <p className="text-label text-gold mb-1">
            Running total · {selected.length} service{selected.length === 1 ? "" : "s"} selected
          </p>
          <motion.p key={total} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl md:text-4xl">
            {money(total)}
          </motion.p>
        </div>
        <a
          href={waLink(
            buildPackageMessage({
              packageName: "Custom Package",
              services: selected,
              total,
            }),
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold"
        >
          Request This Custom Plan
          <ArrowRight size={16} className="btn-arrow" />
        </a>

      </div>
    </motion.div>
  );
};

const ServicePackages = () => {
  return (
    <section id="packages" className="section-padding section-spacing overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mb-14"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="gold-line" />
          <span className="text-label text-accent">Services &amp; Packages</span>
        </div>
        <h2 className="text-display-lg mb-6">
          Find the package that fits your <span className="italic text-accent">stage</span>
        </h2>
        <p className="text-body-lg text-muted-foreground">
          Every store is at a different stage. The right package depends on where you are, not where
          you want to be. Here is how to find yours.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
        {qualifiers.map((item, i) => (
          <motion.div
            key={item.q}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="bg-secondary/40 border border-border p-6 md:p-8 transition-all duration-500 hover:border-accent/30 hover:shadow-lg"
          >
            <span className="text-label text-accent">0{i + 1}</span>
            <h3 className="font-display text-lg font-medium mt-3 mb-3 leading-snug">{item.q}</h3>
            <p className="text-sm font-body text-muted-foreground leading-relaxed">{item.a}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {packages.map((pkg, i) => (
          <PackageCard key={pkg.num} pkg={pkg} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CustomBuilder />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-20 bg-primary text-primary-foreground p-10 md:p-16 text-center"
      >
        <h3 className="text-display-md mb-4">Not sure where to start?</h3>
        <p className="text-body-lg opacity-70 max-w-xl mx-auto mb-8">
          Tell us where your store is today and we will point you to the right package, or tell you
          honestly if you do not need one yet.
        </p>
        <Link to="/contact" className="btn-gold">
          Let's figure it out together
          <ArrowRight size={16} className="btn-arrow" />
        </Link>
      </motion.div>
    </section>
  );
};

export default ServicePackages;
