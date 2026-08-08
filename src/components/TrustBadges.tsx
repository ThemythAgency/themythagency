import { motion } from "framer-motion";
import { ShieldCheck, Lock, Clock, BadgeCheck, Headset, RefreshCw } from "lucide-react";

const badges = [
  { icon: ShieldCheck, title: "Transparent scope", copy: "Fixed pricing, written deliverables, no surprise invoices." },
  { icon: Lock, title: "Secure by default", copy: "SSL, secure checkout setup and privacy-first data handling." },
  { icon: Clock, title: "On-time delivery", copy: "Clear timelines agreed upfront and tracked to launch." },
  { icon: BadgeCheck, title: "Shopify specialists", copy: "Systems-led builds for stores past the startup phase." },
  { icon: Headset, title: "30-day post-launch support", copy: "Included with every build engagement." },
  { icon: RefreshCw, title: "Clear refund policy", copy: "Documented terms you can read before you pay." },
];

const TrustBadges = () => (
  <section className="section-padding section-spacing bg-secondary/40">
    <div className="flex items-center gap-4 mb-8">
      <div className="gold-line" />
      <span className="text-label text-accent">Why brands trust us</span>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-5">
      {badges.map((b, i) => (
        <motion.div
          key={b.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          className="bg-background border border-border p-5 transition-all duration-500 hover:border-accent/30 hover:shadow-lg"
        >
          <b.icon size={22} className="text-accent mb-3" aria-hidden />
          <h3 className="font-display text-base font-medium mb-1.5 leading-snug">{b.title}</h3>
          <p className="text-xs font-body text-muted-foreground leading-relaxed">{b.copy}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default TrustBadges;
