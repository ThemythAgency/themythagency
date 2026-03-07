import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Wrench, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const services = [
  {
    icon: Search,
    num: "01",
    title: "Shopify Growth Foundations Audit",
    subtitle: "Diagnose before you build",
    description: "A comprehensive strategic and technical diagnostic of your Shopify store's growth infrastructure. We analyze your conversion architecture, technical performance, customer journey, and growth levers to create a prioritized roadmap.",
    deliverables: ["Growth Architecture Analysis", "Conversion Funnel Diagnostic", "Technical Performance Audit", "Prioritized Growth Roadmap", "Strategic Recommendations Report"],
    ideal: "Brands doing $500K–$5M who feel stuck or want clarity before investing in growth.",
    cta: "/audit",
    ctaText: "Learn About the Audit",
  },
  {
    icon: Wrench,
    num: "02",
    title: "Growth System Build",
    subtitle: "Strategy through execution",
    description: "End-to-end design and development of a high-performance Shopify growth system. From strategic foundation to conversion-focused design, custom development, and optimization — we build the engine.",
    deliverables: ["Growth Strategy & Architecture", "Conversion-Focused UX/UI Design", "Custom Shopify Development", "Performance Optimization", "Analytics & Tracking Setup"],
    ideal: "Brands ready to rebuild their Shopify experience with a system designed to scale.",
    cta: "/contact",
    ctaText: "Discuss Your Build",
  },
  {
    icon: Users,
    num: "03",
    title: "Strategic Growth Partner",
    subtitle: "Ongoing strategic & executional support",
    description: "A retained partnership for brands that need continuous strategic guidance and executional support. We become an embedded part of your growth team — advising, building, and optimizing month over month.",
    deliverables: ["Monthly Growth Strategy Sessions", "Ongoing CRO & Optimization", "Technical Development Support", "Performance Reporting & Analysis", "Priority Access & Dedicated Team"],
    ideal: "Scaling brands doing $2M+ who need a trusted growth partner, not another agency.",
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="gold-line" />
            <span className="text-label text-accent">Services</span>
          </div>
          <h1 className="text-display-xl mb-8">
            Three ways to{" "}
            <span className="italic text-accent">grow</span>
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl">
            Every engagement is built on the same strategic foundation — diagnostic-led, 
            conversion-focused, and designed to scale.
          </p>
        </motion.div>
      </section>

      {services.map((service, i) => (
        <section
          key={service.num}
          className={`section-padding section-spacing ${i % 2 === 0 ? "bg-secondary/30" : ""}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-label text-accent">{service.num}</span>
                <div className="gold-line" />
              </div>
              <h2 className="text-display-md mb-3">{service.title}</h2>
              <p className="text-body-lg text-accent font-display italic mb-6">{service.subtitle}</p>
              <p className="text-body text-muted-foreground mb-8">{service.description}</p>
              <Link
                to={service.cta}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide hover:bg-navy-light transition-colors duration-300"
              >
                {service.ctaText}
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div {...fadeUp}>
              <div className="bg-card border border-border p-8 md:p-10 mb-6">
                <h4 className="text-label text-accent mb-6">Deliverables</h4>
                <div className="space-y-3">
                  {service.deliverables.map((d) => (
                    <div key={d} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                      <span className="text-body">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-primary text-primary-foreground p-8 md:p-10">
                <h4 className="text-label text-gold mb-4">Ideal For</h4>
                <p className="text-body opacity-80">{service.ideal}</p>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      <Footer />
    </div>
  );
};

export default Services;
