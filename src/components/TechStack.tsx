import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const tools = [
  { name: "Shopify", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/shopify.svg" },
  { name: "Klaviyo", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/klaviyo.svg" },
  { name: "Webflow", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/webflow.svg" },
  { name: "WordPress", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/wordpress.svg" },
  { name: "Figma", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/figma.svg" },
  { name: "Google Analytics", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googleanalytics.svg" },
  { name: "Meta", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/meta.svg" },
  { name: "Stripe", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stripe.svg" },
  { name: "Notion", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/notion.svg" },
  { name: "Mailchimp", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/mailchimp.svg" },
  { name: "Zapier", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zapier.svg" },
  { name: "TikTok", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg" },
];

const TechStack = () => {
  const loop = [...tools, ...tools];
  return (
    <section className="section-padding section-spacing overflow-hidden">
      <SectionHeading
        label="Our Stack"
        title="Tools we leverage to build exceptional websites"
        description="A curated stack of best-in-class platforms that powers every Shopify growth system we ship."
        align="center"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="marquee py-6">
          {loop.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity duration-300"
              title={t.name}
            >
              <img
                src={t.url}
                alt={t.name}
                width={48}
                height={48}
                loading="lazy"
                className="h-12 w-12 object-contain"
                style={{ filter: "brightness(0) saturate(100%) invert(13%) sepia(15%) saturate(2200%) hue-rotate(195deg)", imageRendering: "auto" }}
              />
              <span className="font-display text-lg text-foreground whitespace-nowrap">{t.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TechStack;
