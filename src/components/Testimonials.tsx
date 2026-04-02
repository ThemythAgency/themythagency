import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeading from "./SectionHeading";

const testimonials = [
  {
    quote: "Themyth didn't just redesign our store — they rebuilt our entire growth engine. Conversion rates doubled within 60 days.",
    role: "Founder, The Soap Lab Scotland",
    rating: 5,
  },
  {
    quote: "The strategic clarity they brought was unlike any agency we've worked with. Every decision was backed by data and designed to compound.",
    role: "CEO, Apex Nutritions",
    rating: 5,
  },
  {
    quote: "They understood our luxury positioning instantly. The new experience feels like walking into a high-end boutique — online.",
    role: "Creative Director, Sillagea",
    rating: 5,
  },
  {
    quote: "Our subscription revenue tripled after they rebuilt our product discovery system. The ROI has been extraordinary.",
    role: "Co-Founder, Edina Coffee Roasters",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding section-spacing bg-secondary/50">
      <SectionHeading
        label="Client Testimonials"
        title="What our clients say"
        description="Real feedback from brands we've helped scale — because results speak louder than promises."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.role}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-card border border-border p-8 md:p-10"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: t.rating }).map((_, si) => (
                <Star
                  key={si}
                  size={16}
                  className="fill-accent text-accent"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-display text-lg md:text-xl italic leading-relaxed mb-6 text-foreground">
              "{t.quote}"
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center gap-3">
              <div className="gold-line" />
              <div>
                <p className="text-sm font-body text-muted-foreground">
                  {t.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
