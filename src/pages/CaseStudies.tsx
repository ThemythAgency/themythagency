import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const studies = [
  {
    brand: "Velour Skincare",
    category: "Beauty & Skincare",
    result: "+142% Conversion Rate",
    context: "A growing skincare brand with strong brand recognition and increasing traffic, but a Shopify store that wasn't converting. Product pages lacked clarity, the checkout flow had friction, and a bloated tech stack was slowing everything down.",
    diagnosis: "Growth Foundations Audit revealed critical conversion bottlenecks across product page architecture, mobile UX, and page load performance. The store was losing high-intent shoppers at every stage of the funnel.",
    strategy: "Complete redesign of the product and collection page experience focused on conversion clarity. Rebuilt checkout flow, optimized theme performance, and streamlined the app stack to remove redundancy.",
    execution: "Custom product page templates with conversion-focused layouts, restructured navigation and collection filtering, mobile-first checkout optimization, structured A/B testing framework, and performance engineering.",
    outcome: "142% increase in conversion rate within 90 days. Average order value increased by 23%. Mobile conversion rate improved by 186%. The brand now has a scalable foundation for their next growth phase.",
  },
  {
    brand: "Nordvik Outfitters",
    category: "Outdoor & Apparel",
    result: "3.2x Revenue Growth",
    context: "A fast-growing outdoor apparel brand whose Shopify infrastructure couldn't keep up with their ambition. Site speed was suffering, the theme was heavily customized with no documentation, and scaling was becoming impossible without breaking things.",
    diagnosis: "Engaged as a Strategic Growth Partner. Assessment revealed that the core infrastructure was the bottleneck, not marketing. The team was spending more time firefighting technical issues than growing the business.",
    strategy: "Built a phased growth roadmap prioritizing technical infrastructure first, then conversion optimization, then scalable growth systems. The goal: build a foundation that could handle 10x the traffic without breaking.",
    execution: "Migrated to a custom Shopify 2.0 theme architecture with modular components for rapid iteration. Implemented comprehensive analytics infrastructure, performance monitoring, and a continuous optimization program.",
    outcome: "3.2x revenue growth over 12 months. Page load times reduced by 68%. Team can now iterate on the store without developer dependency for most changes. Infrastructure supports their growth trajectory.",
  },
  {
    brand: "Maison Collective",
    category: "Home & Lifestyle",
    result: "68% Faster Load Times",
    context: "A premium home and lifestyle brand whose sophisticated brand identity was undermined by a slow, outdated Shopify store. They were losing high-intent customers to poor performance and a disconnected shopping experience.",
    diagnosis: "Growth System Build engagement. Diagnostic phase mapped the full customer journey and identified the highest-impact opportunities across design, development, and performance optimization.",
    strategy: "Full rebuild with premium positioning at every touchpoint. Strategy centered on aligning the digital experience with the brand's premium market position while engineering for performance and conversion.",
    execution: "Designed and developed a new Shopify experience from the ground up: premium visual design, optimized product discovery, streamlined checkout, comprehensive performance optimization, and full analytics setup.",
    outcome: "68% reduction in page load times. Bounce rate decreased by 41%. Customer satisfaction scores improved significantly. The brand now has digital infrastructure that matches their premium positioning and supports scale.",
  },
];

const CaseStudies = () => {
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
            <span className="text-label text-accent">Case Studies</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-display-xl mb-8"
          >
            Systems that deliver{" "}
            <span className="italic text-accent">results</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-body-lg text-muted-foreground max-w-2xl"
          >
            Every engagement follows our proven framework: diagnose, strategize, execute, optimize.
            Here's what that looks like in practice — real brands, real outcomes, real systems.
          </motion.p>
        </motion.div>
      </section>

      {studies.map((study, i) => (
        <section
          key={study.brand}
          className={`section-padding section-spacing overflow-hidden ${i % 2 === 0 ? "bg-secondary/30" : ""}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-4 mb-4"
            >
              <span className="text-label text-accent">{study.category}</span>
            </motion.div>
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-2">{study.brand}</h2>
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              className="text-2xl md:text-3xl font-display font-semibold text-accent mb-12"
            >
              {study.result}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <h4 className="text-label text-foreground mb-4">Client Context</h4>
                <p className="text-body text-muted-foreground mb-8">{study.context}</p>
                <h4 className="text-label text-foreground mb-4">Diagnosis</h4>
                <p className="text-body text-muted-foreground">{study.diagnosis}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
              >
                <h4 className="text-label text-foreground mb-4">Strategic Response</h4>
                <p className="text-body text-muted-foreground mb-8">{study.strategy}</p>
                <h4 className="text-label text-foreground mb-4">Execution & Outcome</h4>
                <p className="text-body text-muted-foreground">{study.outcome}</p>
              </motion.div>
            </div>
          </motion.div>
        </section>
      ))}

      <section className="section-padding section-spacing bg-primary text-primary-foreground text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-display-lg mb-6">Your brand could be next</h2>
          <p className="text-body-lg opacity-70 mb-10">
            Start with a Growth Foundations Audit to understand exactly where your opportunities are
            and what's holding your growth back.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/audit"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gold text-accent-foreground font-body text-sm font-medium tracking-wide hover:bg-gold-light transition-colors duration-300"
            >
              Book Your Audit
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-primary-foreground/20 text-primary-foreground font-body text-sm font-medium tracking-wide hover:bg-primary-foreground/10 transition-colors duration-300"
            >
              Start a Conversation
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
