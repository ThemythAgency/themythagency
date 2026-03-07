import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const auditAreas = [
  {
    title: "Growth Architecture",
    items: ["Revenue model analysis", "Growth lever identification", "Channel effectiveness review", "Funnel architecture assessment"],
  },
  {
    title: "Conversion Infrastructure",
    items: ["Product page conversion audit", "Checkout flow analysis", "Mobile experience review", "Trust & urgency element assessment"],
  },
  {
    title: "Technical Performance",
    items: ["Page speed & Core Web Vitals", "Theme code quality review", "App stack analysis", "SEO technical health"],
  },
  {
    title: "Strategic Roadmap",
    items: ["Prioritized opportunity matrix", "90-day action plan", "Resource & investment guidance", "Growth system blueprint"],
  },
];

const process = [
  { num: "01", title: "Discovery Call", desc: "A 30-minute conversation to understand your brand, challenges, and goals." },
  { num: "02", title: "Deep Diagnostic", desc: "We conduct a comprehensive analysis of your store's growth infrastructure." },
  { num: "03", title: "Strategy Report", desc: "You receive a detailed report with findings, priorities, and recommendations." },
  { num: "04", title: "Roadmap Session", desc: "We walk through the report together and map the path forward." },
];

const Audit = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="section-padding pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="gold-line" />
              <span className="text-label text-accent">Flagship Service</span>
            </div>
            <h1 className="text-display-xl mb-8">
              Shopify Growth Foundations{" "}
              <span className="italic text-accent">Audit</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mb-8">
              A comprehensive strategic and technical diagnostic of your Shopify store's growth 
              infrastructure. Understand exactly what's working, what's broken, and what to prioritize.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide hover:bg-navy-light transition-colors duration-300"
            >
              Book Your Audit
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-primary text-primary-foreground p-10 md:p-12"
          >
            <h3 className="text-label text-gold mb-6">Ideal For</h3>
            <ul className="space-y-4">
              {[
                "Shopify brands doing $500K–$5M in revenue",
                "Founders who feel their store is underperforming",
                "Teams about to invest in a redesign or rebuild",
                "Brands scaling paid ads but leaking conversions",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-body opacity-80">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="section-padding section-spacing bg-secondary/30">
        <motion.div {...fadeUp} className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="gold-line" />
            <span className="text-label text-accent">What We Analyze</span>
          </div>
          <h2 className="text-display-lg">Four pillars of growth</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {auditAreas.map((area) => (
            <motion.div
              key={area.title}
              {...fadeUp}
              className="bg-card border border-border p-8 md:p-10"
            >
              <h3 className="font-display text-xl font-medium mb-6">{area.title}</h3>
              <div className="space-y-3">
                {area.items.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    <span className="text-sm text-muted-foreground font-body">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-padding section-spacing">
        <motion.div {...fadeUp} className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="gold-line" />
            <span className="text-label text-accent">The Process</span>
          </div>
          <h2 className="text-display-lg">How it works</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((step) => (
            <motion.div key={step.num} {...fadeUp}>
              <span className="text-3xl font-display font-semibold text-accent mb-4 block">{step.num}</span>
              <h3 className="font-display text-lg font-medium mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-padding section-spacing bg-primary text-primary-foreground text-center">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto">
          <h2 className="text-display-lg mb-6">Stop guessing. Start growing.</h2>
          <p className="text-body-lg opacity-70 mb-10">
            The Growth Foundations Audit gives you the clarity and confidence to make your next investment count.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-accent-foreground font-body text-sm font-medium tracking-wide hover:bg-gold-light transition-colors duration-300"
          >
            Book Your Audit Now
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Audit;
