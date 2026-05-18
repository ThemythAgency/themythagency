import { motion } from "framer-motion";
import { ShoppingCart, Palette, BarChart3, Search, Code, Smartphone } from "lucide-react";
import SectionHeading from "./SectionHeading";

const expertise = [
  { icon: ShoppingCart, title: "eCommerce Strategy", desc: "Conversion-focused store architecture that turns browsers into buyers and one-time customers into loyal advocates." },
  { icon: Palette, title: "Brand Experience Design", desc: "Visual identity and UX design that communicates your brand's value and creates emotional connection with your audience." },
  { icon: BarChart3, title: "Growth Systems", desc: "Data-driven frameworks that identify bottlenecks, eliminate friction, and create compounding growth across every channel." },
  { icon: Search, title: "SEO & Content Strategy", desc: "Technical SEO, content architecture, and organic growth strategies that drive qualified traffic without ad dependency." },
  { icon: Code, title: "Custom Development", desc: "Shopify 2.0, WordPress, Webflow, and custom builds engineered for performance, scalability, and seamless integrations." },
  { icon: Smartphone, title: "Mobile Optimization", desc: "Mobile-first design and performance engineering that captures the 70%+ of your traffic shopping on their phones." },
];

const AreasOfExpertise = () => {
  return (
    <section className="section-padding section-spacing">
      <SectionHeading
        label="Expertise"
        title="Areas of expertise"
        description="Deep specialization across every discipline that drives ecommerce growth, from strategy to execution."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {expertise.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="group p-8 border border-border hover:border-accent/50 hover:shadow-xl hover:bg-secondary/30 transition-all duration-500"
          >
            <motion.div
              className="w-12 h-12 flex items-center justify-center border border-accent/30 mb-6 group-hover:bg-accent/10 transition-colors duration-300"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <item.icon size={22} className="text-accent" />
            </motion.div>
            <h3 className="font-display text-lg font-medium mb-3">{item.title}</h3>
            <p className="text-sm font-body text-muted-foreground leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AreasOfExpertise;
