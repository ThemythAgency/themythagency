import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";

const reasons = [
  { title: "Strategy-First Approach", desc: "We diagnose before we design. Every project starts with deep analysis, not templates." },
  { title: "Conversion-Obsessed", desc: "Beautiful design is the baseline. We engineer every element to drive measurable business results." },
  { title: "Full-Stack Execution", desc: "From brand strategy to custom code, one team, one vision, zero handoff friction." },
  { title: "Data-Driven Decisions", desc: "Every recommendation is backed by analytics, heatmaps, and user behaviour data, not gut feelings." },
  { title: "Long-Term Partnership", desc: "We don't disappear after launch. Our growth systems are designed to compound over time." },
  { title: "Platform Agnostic", desc: "Shopify, WordPress, Webflow, Wix, we recommend what's right for your business, not our preference." },
];

const WhyWorkWithUs = () => {
  return (
    <section className="section-padding section-spacing bg-secondary/50">
      <SectionHeading
        label="Why Us"
        title="Why brands choose to work with us"
        description="We're not for everyone, and that's by design. Here's what makes working with Themyth Agency different."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ x: 6, transition: { duration: 0.3 } }}
            className="flex gap-4 p-6 bg-card border border-border hover:border-accent/30 hover:shadow-md transition-all duration-500"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 + 0.3, type: "spring", stiffness: 200 }}
            >
              <CheckCircle size={20} className="text-accent flex-shrink-0 mt-0.5" />
            </motion.div>
            <div>
              <h3 className="font-display text-base font-medium mb-1">{r.title}</h3>
              <p className="text-sm font-body text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyWorkWithUs;
