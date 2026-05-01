import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Target, BarChart3, Layers, TrendingUp, Shield, Zap, Eye, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import { projects, type Project } from "@/data/portfolioData";
import Testimonials from "@/components/Testimonials";
import CountingNumbers from "@/components/CountingNumbers";
import AreasOfExpertise from "@/components/AreasOfExpertise";
import WhyWorkWithUs from "@/components/WhyWorkWithUs";
import BlogSection from "@/components/BlogSection";

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

// Top projects: SoapLab, Blossom Elle, Pixi Beauty, Sillagea
const topProjectTitles = ["The Soap Lab Scotland", "Blossom Elle", "Pixi Beauty", "Sillagea"];
const topProjects = topProjectTitles
  .map((title) => projects.find((p) => p.title === title))
  .filter(Boolean) as Project[];

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
    setTimeout(() => setSelectedProject(null), 300);
  };

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
            <Link to="/audit" className="btn-primary px-10">
              Book a Growth Audit
              <ArrowRight size={16} className="btn-arrow" />
            </Link>
            <Link to="/contact" className="btn-outline px-10">
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
          {painPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              whileHover={{ x: 6, transition: { duration: 0.3 } }}
              className="flex gap-5 cursor-default"
            >
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-gold/30 transition-colors duration-300 hover:border-gold hover:bg-gold/10">
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
              {["Diagnostic-led methodology", "Conversion-focused execution", "Scalable growth infrastructure", "Data-driven decision making"].map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ x: 6, transition: { duration: 0.3 } }}
                >
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                  <span className="text-body font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            {...fadeUp}
            whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
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
                className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-8 md:py-10 border-b border-border hover:pl-4 hover:bg-secondary/60 transition-all duration-500"
              >
                <span className="text-label text-accent">{service.num}</span>
                <h3 className="font-display text-xl md:text-2xl font-medium flex-1">{service.title}</h3>
                <p className="text-sm text-muted-foreground max-w-sm font-body">{service.desc}</p>
                <ArrowRight size={18} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-2 transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Top Projects */}
      <section className="section-padding section-spacing">
        <SectionHeading
          label="Our Top Projects"
          title="Featured work that speaks for itself"
          description="Handpicked projects showcasing our approach to growth systems — real brands, real strategies, real results."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-secondary aspect-[4/3]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Hover overlay buttons */}
                <div className="absolute inset-0 flex items-end justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div>
                    <p className="text-xs font-body font-medium tracking-wider uppercase text-gold mb-1">{project.platform} • {project.category}</p>
                    <h3 className="font-display text-xl md:text-2xl font-medium text-white">{project.title}</h3>
                    <p className="text-gold font-display font-semibold mt-1">{project.result}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleProjectClick(project)}
                      className="flex items-center gap-2 bg-background/90 px-4 py-2.5 translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:bg-background hover:shadow-lg"
                    >
                      <Eye size={14} className="text-foreground" />
                      <span className="text-xs font-body font-medium text-foreground">Details</span>
                    </button>
                    <a
                      href={project.liveUrl !== "#" ? project.liveUrl : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (project.liveUrl === "#") e.preventDefault();
                      }}
                      className="flex items-center gap-2 bg-accent px-4 py-2.5 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-75 hover:shadow-lg hover:brightness-110"
                    >
                      <ExternalLink size={14} className="text-accent-foreground" />
                      <span className="text-xs font-body font-medium text-accent-foreground">Preview</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Info below image */}
              <div className="mt-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-body font-medium tracking-wide px-3 py-1 bg-secondary text-muted-foreground transition-colors duration-300 hover:bg-accent/10 hover:text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3
                  className="font-display text-xl font-medium mb-1 cursor-pointer hover:text-accent transition-colors duration-300"
                  onClick={() => handleProjectClick(project)}
                >
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-12 text-center">
          <Link to="/portfolio" className="btn-primary px-10">
            View All Projects
            <ArrowRight size={16} className="btn-arrow" />
          </Link>
        </motion.div>
      </section>

      {/* Counting Numbers */}
      <CountingNumbers />

      {/* Areas of Expertise */}
      <AreasOfExpertise />

      {/* Why Work With Us */}
      <WhyWorkWithUs />

      {/* Testimonials */}
      <Testimonials />

      {/* Blog */}
      <BlogSection />

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
            <Link to="/audit" className="btn-primary px-10">
              Book Your Growth Audit
              <ArrowRight size={16} className="btn-arrow" />
            </Link>
            <Link to="/contact" className="btn-outline px-10">
              Request a Strategic Review
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />

      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
