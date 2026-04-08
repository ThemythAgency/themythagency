import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
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
    title: "Data & Tracking",
    items: ["Analytics setup review", "Attribution accuracy audit", "Tracking implementation check", "Reporting infrastructure assessment"],
  },
];

const process = [
  { num: "01", title: "Discovery Call", desc: "A 30-minute conversation to understand your brand, challenges, goals, and current growth stage." },
  { num: "02", title: "Deep Diagnostic", desc: "We conduct a comprehensive analysis of your store's growth infrastructure across all four pillars." },
  { num: "03", title: "Strategy Report", desc: "You receive a detailed report with findings, priorities, and a clear roadmap for what to fix and in what order." },
  { num: "04", title: "Roadmap Session", desc: "We walk through the report together, answer questions, and map the most efficient path forward." },
];

const Audit = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="section-padding pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="gold-line" />
              <span className="text-label text-accent">Flagship Diagnostic</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-display-xl mb-8"
            >
              Shopify Growth Foundations{" "}
              <span className="italic text-accent">Audit</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-body-lg text-muted-foreground mb-4"
            >
              A comprehensive strategic and technical diagnostic of your Shopify store's growth
              infrastructure. Understand exactly what's working, what's broken, and what to prioritize
              — before you invest in scaling.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-body text-muted-foreground mb-8"
            >
              Because scaling without a foundation doesn't create growth. It creates chaos.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide hover:bg-navy-light transition-colors duration-300"
              >
                Book Your Audit
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-border text-foreground font-body text-sm font-medium tracking-wide hover:bg-secondary transition-colors duration-300"
              >
                Ask a Question
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-primary text-primary-foreground p-10 md:p-12"
          >
            <h3 className="text-label text-gold mb-6">Who This Is For</h3>
            <ul className="space-y-4">
              {[
                "Shopify brands doing $500K–$5M in revenue",
                "Founders who feel their store is underperforming relative to traffic",
                "Teams about to invest in a redesign, rebuild, or major growth push",
                "Brands scaling paid ads but leaking conversions at every stage",
                "Operators who want data-driven clarity before making their next move",
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-body opacity-80">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Why Before Scaling */}
      <section className="section-padding section-spacing border-t border-border overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-line" />
              <span className="text-label text-accent">Why It Matters</span>
            </div>
            <h2 className="text-display-lg mb-6">Why audit before you scale?</h2>
            <p className="text-body-lg text-muted-foreground">
              Most brands pour money into traffic before understanding why their store isn't converting.
              The audit reveals the structural issues that are silently killing your growth — so every
              dollar you spend after goes further.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="bg-secondary p-10 md:p-12"
          >
            <div className="space-y-6">
              {[
                "Stop guessing and start making decisions based on data",
                "Identify the 20% of changes that drive 80% of growth",
                "Get a clear, prioritized roadmap — not a vague list of suggestions",
                "Understand your store's real conversion capacity before investing in scale",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4 pb-6 border-b border-border last:border-0 last:pb-0"
                >
                  <span className="text-label text-accent">0{i + 1}</span>
                  <p className="text-body font-medium">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding section-spacing bg-secondary/30">
        <motion.div {...fadeUp} className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="gold-line" />
            <span className="text-label text-accent">What Gets Reviewed</span>
          </div>
          <h2 className="text-display-lg">Four pillars of growth infrastructure</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {auditAreas.map((area, ai) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: ai * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="bg-card border border-border p-8 md:p-10 hover:shadow-lg hover:border-accent/20 transition-all duration-500"
            >
              <h3 className="font-display text-xl font-medium mb-6">{area.title}</h3>
              <div className="space-y-3">
                {area.items.map((item, ii) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: ai * 0.12 + ii * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    <span className="text-sm text-muted-foreground font-body">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What You Receive */}
      <section className="section-padding section-spacing overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-line" />
              <span className="text-label text-accent">Deliverables</span>
            </div>
            <h2 className="text-display-lg mb-6">What you receive</h2>
            <p className="text-body-lg text-muted-foreground">
              Not a generic checklist. A strategic diagnostic report tailored to your brand,
              your store, and your growth stage.
            </p>
          </motion.div>
          <div>
            <div className="space-y-4">
              {[
                "Comprehensive growth infrastructure analysis",
                "Conversion bottleneck identification with severity ratings",
                "Technical performance assessment with benchmarks",
                "Prioritized opportunity matrix ranked by impact and effort",
                "90-day action plan with clear next steps",
                "Growth system blueprint for long-term scale",
                "Live walkthrough and strategy session",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="flex items-start gap-3 py-3 border-b border-border last:border-0"
                >
                  <CheckCircle size={14} className="text-accent mt-1 flex-shrink-0" />
                  <span className="text-body">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-spacing bg-secondary/30">
        <motion.div {...fadeUp} className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="gold-line" />
            <span className="text-label text-accent">The Process</span>
          </div>
          <h2 className="text-display-lg">How it works</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 + 0.2, type: "spring" }}
                className="text-3xl font-display font-semibold text-accent mb-4 block"
              >
                {step.num}
              </motion.span>
              <h3 className="font-display text-lg font-medium mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-padding section-spacing bg-primary text-primary-foreground text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-display-lg mb-6">Stop guessing. Start growing with clarity.</h2>
          <p className="text-body-lg opacity-70 mb-10">
            The Growth Foundations Audit gives you the diagnosis and confidence to make your next
            investment count. Every serious growth journey starts here.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gold text-accent-foreground font-body text-sm font-medium tracking-wide hover:bg-gold-light transition-colors duration-300"
            >
              Book Your Audit Now
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-primary-foreground/20 text-primary-foreground font-body text-sm font-medium tracking-wide hover:bg-primary-foreground/10 transition-colors duration-300"
            >
              Request a Strategic Review
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Audit;
