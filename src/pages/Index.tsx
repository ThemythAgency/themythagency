import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Target, BarChart3, Layers, TrendingUp, Shield, Zap, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true, margin: "-80px" },
};

const painPoints = [
  { icon: TrendingUp, title: "Revenue has plateaued", desc: "You've hit a ceiling and can't figure out what's broken in your growth engine." },
  { icon: Target, title: "Conversion rates are declining", desc: "Traffic is growing but your store isn't converting — the funnel is leaking at every stage." },
  { icon: Layers, title: "Tech stack is fragmented", desc: "Apps, tools, and integrations are duct-taped together with no cohesive system or documentation." },
  { icon: Shield, title: "No strategic clarity", desc: "You're making tactical moves without a growth roadmap, clear priorities, or reliable data." },
  { icon: Eye, title: "Poor tracking and visibility", desc: "You can't attribute revenue, measure performance, or make confident decisions with your current setup." },
  { icon: Zap, title: "Scaling before the foundation is ready", desc: "You're pouring into ads and channels while the store itself underperforms and leaks margin." },
];

const services = [
  {
    num: "01",
    title: "Shopify Growth Foundations Audit",
    desc: "A focused diagnostic for growing Shopify brands that want to scale without structural friction, conversion leaks, or blind data.",
    link: "/audit",
  },
  {
    num: "02",
    title: "Growth System Build",
    desc: "A strategy-led Shopify design and optimization engagement that improves structure, conversion, and scale readiness.",
    link: "/services",
  },
  {
    num: "03",
    title: "Strategic Growth Partner",
    desc: "Ongoing strategic oversight and execution support for brands ready to compound growth with precision and control.",
    link: "/services",
  },
];

const caseStudies = [
  {
    brand: "Velour Skincare",
    category: "Beauty & Skincare",
    result: "+142% conversion rate",
    desc: "Diagnosed conversion bottlenecks across their product page architecture, rebuilt the shopping experience, and implemented structured optimization.",
  },
  {
    brand: "Nordvik Outfitters",
    category: "Outdoor & Apparel",
    result: "3.2x revenue growth",
    desc: "Built a phased growth roadmap, migrated to scalable infrastructure, and implemented a continuous optimization program.",
  },
  {
    brand: "Maison Collective",
    category: "Home & Lifestyle",
    result: "68% faster load times",
    desc: "Full growth system build — premium design, optimized discovery, streamlined checkout, and comprehensive performance engineering.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="section-padding pt-32 md:pt-44 pb-24 md:pb-36">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="gold-line" />
            <span className="text-label text-accent">Shopify Growth Consultancy with Execution</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-display-xl mb-8 text-balance"
          >
            We build Shopify growth systems that scale{" "}
            <span className="italic text-accent">with control</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-body-lg text-muted-foreground max-w-2xl mb-12"
          >
            Strategic clarity. Conversion-focused design. Scalable infrastructure.
            For growing Shopify brands ready to build systems — not just stores.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/audit"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide hover:bg-navy-light transition-colors duration-300"
            >
              Book a Growth Audit
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-border text-foreground font-body text-sm font-medium tracking-wide hover:bg-secondary transition-colors duration-300"
            >
              Start a Growth Conversation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="section-padding section-spacing bg-primary text-primary-foreground">
        <SectionHeading
          label="The Problem"
          title="Most Shopify growth problems are structural — not traffic problems"
          description="Growing brands hit walls not because they lack customers, but because their store infrastructure can't support scale. Sound familiar?"
        />

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {painPoints.map((point) => (
            <motion.div
              key={point.title}
              {...fadeUp}
              className="flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-gold/30">
                <point.icon size={18} className="text-gold" />
              </div>
              <div>
                <h3 className="font-display text-lg font-medium mb-2">{point.title}</h3>
                <p className="text-sm opacity-70 font-body leading-relaxed">{point.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Philosophy */}
      <section className="section-padding section-spacing">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-line" />
              <span className="text-label text-accent">Our Approach</span>
            </div>
            <h2 className="text-display-lg mb-6">We think before we build.<br />Then we build to scale.</h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Every engagement starts with diagnosis — not design. We map your growth architecture,
              identify structural friction, and build systems where strategy, design, technology,
              and data reinforce each other.
            </p>
            <div className="space-y-4">
              {["Diagnostic-led methodology", "Conversion-focused execution", "Scalable growth infrastructure", "Data-driven decision making"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                  <span className="text-body font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="bg-secondary p-12 md:p-16"
          >
            <blockquote className="font-display text-xl md:text-2xl italic leading-relaxed mb-6">
              "Most agencies build stores. We build growth systems. The difference is sustainable scale."
            </blockquote>
            <div className="gold-line mb-4" />
            <p className="text-label text-muted-foreground">Themyth Agency</p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding section-spacing bg-secondary/50">
        <SectionHeading
          label="Services"
          title="Three systems for different stages of growth"
          description="Each engagement is built on the same strategic foundation — diagnostic-led, conversion-focused, and designed to compound."
        />

        <div className="space-y-0">
          {services.map((service) => (
            <motion.div key={service.num} {...fadeUp}>
              <Link
                to={service.link}
                className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-8 md:py-10 border-b border-border hover:pl-4 transition-all duration-500"
              >
                <span className="text-label text-accent">{service.num}</span>
                <h3 className="font-display text-xl md:text-2xl font-medium flex-1">{service.title}</h3>
                <p className="text-sm text-muted-foreground max-w-sm font-body">{service.desc}</p>
                <ArrowRight size={18} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding section-spacing">
        <SectionHeading
          label="Case Studies"
          title="Results that compound"
          description="Real outcomes from real brands. Every engagement follows our proven framework: diagnose, strategize, execute, optimize."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <motion.div
              key={study.brand}
              {...fadeUp}
              className="group"
            >
              <div className="bg-primary text-primary-foreground p-8 md:p-10 h-full flex flex-col">
                <span className="text-label text-gold mb-4">{study.category}</span>
                <h3 className="font-display text-xl font-medium mb-2">{study.brand}</h3>
                <p className="text-3xl font-display font-semibold text-gold mb-4">{study.result}</p>
                <p className="text-sm opacity-70 font-body leading-relaxed mt-auto">{study.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-12 text-center">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-3 text-sm font-medium font-body tracking-wide text-foreground hover:text-accent transition-colors duration-300"
          >
            View all case studies
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      {/* Trust */}
      <section className="section-padding py-16 border-y border-border">
        <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-x-16 gap-y-6 items-center">
          {["Shopify Partner", "100+ Brands Scaled", "7-Figure Systems Built", "$25M+ Revenue Influenced"].map((item) => (
            <span key={item} className="text-label text-muted-foreground">{item}</span>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="section-padding section-spacing text-center">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-6 justify-center">
            <div className="gold-line" />
            <span className="text-label text-accent">Get Started</span>
            <div className="gold-line" />
          </div>
          <h2 className="text-display-lg mb-6">Ready to build a growth system?</h2>
          <p className="text-body-lg text-muted-foreground mb-10">
            Start with our Shopify Growth Foundations Audit — a strategic diagnostic that gives you
            the clarity and confidence to scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/audit"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide hover:bg-navy-light transition-colors duration-300"
            >
              Book Your Growth Audit
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-border text-foreground font-body text-sm font-medium tracking-wide hover:bg-secondary transition-colors duration-300"
            >
              Request a Strategic Review
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
