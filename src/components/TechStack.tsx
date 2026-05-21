import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

// Use simpleicons.org CDN with explicit color — reliable, no blur, true SVG vectors
const icon = (slug: string) => `https://cdn.simpleicons.org/${slug}/0F1B3D`;

const tools = [
  { name: "Shopify", url: icon("shopify") },
  { name: "Klaviyo", url: icon("klaviyo") },
  { name: "n8n", url: icon("n8n") },
  { name: "Google", url: icon("google") },
  { name: "Pinterest", url: icon("pinterest") },
  { name: "Semrush", url: icon("semrush") },
  { name: "Webflow", url: icon("webflow") },
  { name: "WordPress", url: icon("wordpress") },
  { name: "Figma", url: icon("figma") },
  { name: "Google Analytics", url: icon("googleanalytics") },
  { name: "Meta", url: icon("meta") },
  { name: "Stripe", url: icon("stripe") },
  { name: "Notion", url: icon("notion") },
  { name: "Mailchimp", url: icon("mailchimp") },
  { name: "Zapier", url: icon("zapier") },
  { name: "TikTok", url: icon("tiktok") },
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
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="marquee py-6">
          {loop.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity duration-300 mx-8"
              title={t.name}
            >
              <img
                src={t.url}
                alt={t.name}
                width={40}
                height={40}
                loading="lazy"
                className="h-10 w-10 object-contain"
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
