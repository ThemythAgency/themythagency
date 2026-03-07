import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const studies = [
  {
    brand: "Velour Skincare",
    category: "Beauty & Skincare",
    result: "+142% Conversion Rate",
    problem: "Velour had strong brand recognition and growing traffic, but their Shopify store was leaking conversions. Product pages lacked clarity, the checkout flow had friction, and their tech stack was bloated.",
    strategy: "We conducted a full Growth Foundations Audit to diagnose conversion bottlenecks. The audit revealed critical issues in product page architecture, mobile UX, and page load performance.",
    execution: "Complete redesign of the product and collection page experience. Rebuilt the checkout flow, optimized Shopify theme performance, implemented structured A/B testing, and streamlined their app stack.",
    outcome: "142% increase in conversion rate within 90 days. Average order value increased by 23%. Mobile conversion rate improved by 186%.",
  },
  {
    brand: "Nordvik Outfitters",
    category: "Outdoor & Apparel",
    result: "3.2x Revenue Growth",
    problem: "Nordvik was growing fast but their Shopify infrastructure couldn't keep up. Site speed was suffering, their theme was heavily customized with no documentation, and scaling was becoming impossible without breaking things.",
    strategy: "Engaged as a Strategic Growth Partner. Built a phased growth roadmap prioritizing technical infrastructure, then conversion optimization, then scalable systems.",
    execution: "Migrated to a custom Shopify 2.0 theme architecture. Built a modular component system for rapid iteration. Implemented performance monitoring, analytics infrastructure, and a continuous optimization program.",
    outcome: "3.2x revenue growth over 12 months. Page load times reduced by 68%. Team can now iterate on the store without developer dependency for most changes.",
  },
  {
    brand: "Maison Collective",
    category: "Home & Lifestyle",
    result: "68% Faster Load Times",
    problem: "Maison's premium brand was undermined by a slow, outdated Shopify store. They were losing high-intent customers to poor performance and a disconnected shopping experience.",
    strategy: "Growth System Build engagement. Started with a diagnostic phase to map the full customer journey and identify the highest-impact opportunities across design, development, and optimization.",
    execution: "Designed and developed a new Shopify experience from the ground up. Premium visual design, optimized product discovery, streamlined checkout, and comprehensive performance optimization.",
    outcome: "68% reduction in page load times. Bounce rate decreased by 41%. Customer satisfaction scores improved significantly, and the brand now has infrastructure that matches their premium positioning.",
  },
];

const CaseStudies = () => {
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
            <span className="text-label text-accent">Case Studies</span>
          </div>
          <h1 className="text-display-xl mb-8">
            Systems that deliver{" "}
            <span className="italic text-accent">results</span>
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl">
            Every engagement follows our proven framework: diagnose, strategize, execute, optimize. 
            Here's what that looks like in practice.
          </p>
        </motion.div>
      </section>

      {studies.map((study, i) => (
        <section
          key={study.brand}
          className={`section-padding section-spacing ${i % 2 === 0 ? "bg-secondary/30" : ""}`}
        >
          <motion.div {...fadeUp} className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-label text-accent">{study.category}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-2">{study.brand}</h2>
            <p className="text-2xl md:text-3xl font-display font-semibold text-accent mb-12">{study.result}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-label text-foreground mb-4">The Problem</h4>
                <p className="text-body text-muted-foreground mb-8">{study.problem}</p>
                <h4 className="text-label text-foreground mb-4">The Strategy</h4>
                <p className="text-body text-muted-foreground">{study.strategy}</p>
              </div>
              <div>
                <h4 className="text-label text-foreground mb-4">The Execution</h4>
                <p className="text-body text-muted-foreground mb-8">{study.execution}</p>
                <h4 className="text-label text-foreground mb-4">The Outcome</h4>
                <p className="text-body text-muted-foreground">{study.outcome}</p>
              </div>
            </div>
          </motion.div>
        </section>
      ))}

      <section className="section-padding section-spacing bg-primary text-primary-foreground text-center">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto">
          <h2 className="text-display-lg mb-6">Your brand could be next</h2>
          <p className="text-body-lg opacity-70 mb-10">
            Start with a Growth Foundations Audit to understand exactly where your opportunities are.
          </p>
          <Link
            to="/audit"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-accent-foreground font-body text-sm font-medium tracking-wide hover:bg-gold-light transition-colors duration-300"
          >
            Book Your Audit
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
