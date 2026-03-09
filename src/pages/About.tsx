import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const values = [
  { title: "Strategic Clarity", desc: "Every decision is grounded in diagnosis, data, and a clear growth thesis. We don't guess — we map the system first." },
  { title: "Execution Excellence", desc: "Strategy without execution is a deck on a shelf. We build, ship, and optimize with the same rigor we plan with." },
  { title: "Systematic Thinking", desc: "We build interconnected growth systems — not isolated tactics. Every piece strengthens the whole, and compounds over time." },
  { title: "Partnership Mindset", desc: "We embed with your team. Your growth is our growth. We operate as an extension of your brand, not a revolving-door vendor." },
];

const principles = [
  "We diagnose before we prescribe",
  "We build systems, not one-off fixes",
  "We measure what matters, not what's easy",
  "We prioritize sustainable scale over quick wins",
];

const About = () => {
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
            <span className="text-label text-accent">About</span>
          </div>
          <h1 className="text-display-xl mb-8">
            Built for brands that think in{" "}
            <span className="italic text-accent">systems</span>
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl">
            Themyth Agency is a focused, senior-led Shopify growth consultancy that also executes.
            We partner with scaling brands to build the strategic, technical, and creative
            infrastructure they need to grow with control and confidence.
          </p>
        </motion.div>
      </section>

      <section className="section-padding section-spacing bg-primary text-primary-foreground">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div {...fadeUp}>
            <span className="text-label text-gold mb-5 block">The Story</span>
            <h2 className="text-display-md mb-6">We saw the gap between strategy and execution</h2>
            <p className="text-body opacity-80 mb-4">
              Most Shopify agencies are either strategic consultancies that don't build, or dev shops
              that don't think. Brands were left stitching together freelancers, hoping the pieces would fit.
            </p>
            <p className="text-body opacity-80">
              Themyth was built to close that gap — a single partner that diagnoses growth problems,
              architects solutions, and executes them end to end. No handoffs. No fragmented accountability.
              One team. One system. One direction.
            </p>
          </motion.div>
          <motion.div {...fadeUp}>
            <span className="text-label text-gold mb-5 block">The Belief</span>
            <h2 className="text-display-md mb-6">Most growth problems are structural, not tactical</h2>
            <p className="text-body opacity-80 mb-4">
              Sustainable growth doesn't come from chasing the latest hack or pouring more into paid channels.
              It comes from building interconnected systems — where strategy, design, technology, and data
              reinforce each other.
            </p>
            <p className="text-body opacity-80">
              That's what we build. Growth systems that compound, that scale, and that give founders
              the clarity and control they need to make decisions with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-padding section-spacing bg-secondary/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-line" />
              <span className="text-label text-accent">Standards</span>
            </div>
            <h2 className="text-display-lg mb-6">How we operate</h2>
            <p className="text-body-lg text-muted-foreground">
              These aren't slogans — they're operational principles that shape every engagement,
              every recommendation, and every line of code.
            </p>
          </motion.div>
          <motion.div {...fadeUp}>
            <div className="space-y-6">
              {principles.map((p, i) => (
                <div key={p} className="flex items-start gap-4 pb-6 border-b border-border last:border-0 last:pb-0">
                  <span className="text-label text-accent mt-0.5">0{i + 1}</span>
                  <p className="font-display text-lg font-medium">{p}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding section-spacing">
        <SectionHeading
          label="Values"
          title="What drives every engagement"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {values.map((value, i) => (
            <motion.div key={value.title} {...fadeUp} className="flex gap-5">
              <span className="text-label text-accent mt-1">0{i + 1}</span>
              <div>
                <h3 className="font-display text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-body text-muted-foreground">{value.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-padding section-spacing bg-secondary/50 text-center">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto">
          <h2 className="text-display-lg mb-6">Let's build your growth system</h2>
          <p className="text-body-lg text-muted-foreground mb-10">
            Start with a strategic conversation about where your brand is and where it needs to go.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/audit"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide hover:bg-navy-light transition-colors duration-300"
            >
              Book a Growth Audit
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-border text-foreground font-body text-sm font-medium tracking-wide hover:bg-secondary transition-colors duration-300"
            >
              Start a Conversation
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
