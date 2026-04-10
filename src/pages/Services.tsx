import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Wrench, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

const services = [
  {
    icon: Search,
    num: "01",
    title: "Shopify Growth Foundations Audit",
    subtitle: "Diagnose before you build",
    description: "A focused diagnostic for growing Shopify brands that want to scale without structural friction, conversion leaks, or blind data. We analyze your conversion architecture, technical performance, customer journey, and growth levers to create a prioritized roadmap.",
    deliverables: ["Growth Architecture Analysis", "Conversion Funnel Diagnostic", "Technical Performance Audit", "Prioritized Growth Roadmap", "Strategic Recommendations Report"],
    ideal: "Brands doing $500K–$5M who feel stuck, want clarity before investing in growth, or need to understand what's actually broken.",
    cta: "/audit",
    ctaText: "Learn About the Audit",
  },
  {
    icon: Wrench,
    num: "02",
    title: "Growth System Build",
    subtitle: "Strategy through execution",
    description: "A strategy-led Shopify design and optimization engagement that improves structure, conversion, and scale readiness. From strategic foundation to conversion-focused design, custom development, and optimization — we build the growth engine.",
    deliverables: ["Growth Strategy & Architecture", "Conversion-Focused UX/UI Design", "Custom Shopify Development", "Performance Optimization", "Analytics & Tracking Setup"],
    ideal: "Brands ready to rebuild their Shopify experience with a system designed to scale — not just look good.",
    cta: "/contact",
    ctaText: "Discuss Your Build",
  },
  {
    icon: Users,
    num: "03",
    title: "Strategic Growth Partner",
    subtitle: "Ongoing strategic & executional support",
    description: "Ongoing strategic oversight and execution support for brands ready to compound growth. We become an embedded part of your growth team — advising, building, and optimizing month over month with full accountability.",
    deliverables: ["Monthly Growth Strategy Sessions", "Ongoing CRO & Optimization", "Technical Development Support", "Performance Reporting & Analysis", "Priority Access & Dedicated Team"],
    ideal: "Scaling brands doing $2M+ who need a trusted growth partner that thinks and builds — not another agency that just takes orders.",
    cta: "/contact",
    ctaText: "Explore Partnership",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="section-padding pt-32 md:pt-40 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="gold-line" />
            <span className="text-label text-accent">Services</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-display-xl mb-8"
          >
            Three systems for{" "}
            <span className="italic text-accent">growth</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-body-lg text-muted-foreground max-w-2xl"
          >
            Each engagement is built on the same strategic foundation — diagnostic-led,
            conversion-focused, and designed to compound. These are systems, not random services.
          </motion.p>
        </motion.div>
      </section>

      {services.map((service, i) => (
        <section
          key={service.num}
          className={`section-padding section-spacing overflow-hidden ${i % 2 === 0 ? "bg-secondary/30" : ""}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="text-label text-accent">{service.num}</span>
                <div className="gold-line" />
              </motion.div>
              <h2 className="text-display-md mb-3">{service.title}</h2>
              <p className="text-body-lg text-accent font-display italic mb-6">{service.subtitle}</p>
              <p className="text-body text-muted-foreground mb-8">{service.description}</p>
              <Link to={service.cta} className="btn-primary">
                {service.ctaText}
                <ArrowRight size={16} className="btn-arrow" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="bg-card border border-border p-8 md:p-10 mb-6 hover:shadow-lg hover:border-accent/20 transition-all duration-500"
              >
                <h4 className="text-label text-accent mb-6">Deliverables</h4>
                <div className="space-y-3">
                  {service.deliverables.map((d, di) => (
                    <motion.div
                      key={d}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: di * 0.08 }}
                      whileHover={{ x: 6, transition: { duration: 0.2 } }}
                      className="flex items-center gap-3 cursor-default"
                    >
                      <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                      <span className="text-body">{d}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="bg-primary text-primary-foreground p-8 md:p-10 hover:shadow-xl transition-shadow duration-500"
              >
                <h4 className="text-label text-gold mb-4">Ideal For</h4>
                <p className="text-body opacity-80">{service.ideal}</p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-padding section-spacing bg-primary text-primary-foreground text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-display-lg mb-6">Not sure which system fits?</h2>
          <p className="text-body-lg opacity-70 mb-10">
            Start with a conversation. We'll help you identify the right engagement based on where your brand is today.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/audit" className="btn-gold">
              Start with an Audit
              <ArrowRight size={16} className="btn-arrow" />
            </Link>
            <Link to="/contact" className="btn-ghost-light">
              Request a Strategic Review
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
