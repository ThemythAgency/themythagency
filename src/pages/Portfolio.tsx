import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ExternalLink, ArrowRight, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import PortfolioFAQ from "@/components/PortfolioFAQ";
import { categories, projects, type Project } from "@/data/portfolioData";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.platform === activeFilter || p.tags.includes(activeFilter));

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
      <section className="section-padding pt-32 md:pt-40 pb-16 md:pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8 justify-center">
            <div className="gold-line" />
            <span className="text-label text-accent">Portfolio</span>
            <div className="gold-line" />
          </div>
          <h1 className="text-display-xl mb-6">
            Systems we've{" "}
            <span className="italic text-accent">built</span>
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of growth systems designed for conversion, performance, and sustainable scale — across every major platform.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="section-padding pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 text-sm font-medium font-body tracking-wide transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 hover:shadow-sm"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground font-body mt-6"
        >
          Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
        </motion.p>
      </section>

      {/* Projects Grid */}
      <section className="section-padding pb-20 md:pb-28">
        <LayoutGroup>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="group cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden bg-secondary aspect-[4/3] mb-5">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-colors duration-500 flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleProjectClick(project)}
                        className="flex items-center gap-2 bg-background/90 px-4 py-2.5 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-background hover:shadow-lg"
                      >
                        <Eye size={16} className="text-foreground" />
                        <span className="text-xs font-body font-medium text-foreground tracking-wide">View Details</span>
                      </button>
                      <a
                        href={project.liveUrl !== "#" ? project.liveUrl : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (project.liveUrl === "#") e.preventDefault();
                        }}
                        className={`flex items-center gap-2 bg-accent px-4 py-2.5 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75 hover:shadow-lg hover:brightness-110 ${
                          project.liveUrl === "#" ? "pointer-events-none" : ""
                        }`}
                      >
                        <ExternalLink size={16} className="text-accent-foreground" />
                        <span className="text-xs font-body font-medium text-accent-foreground tracking-wide">Preview</span>
                      </a>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-body font-medium tracking-wide px-3 py-1 bg-secondary text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Platform + Category */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-body font-medium uppercase tracking-[0.15em] text-accent">
                      {project.platform}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs font-body text-muted-foreground">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display text-xl font-medium mt-1 mb-2 group-hover:text-accent transition-colors duration-300"
                    onClick={() => handleProjectClick(project)}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground font-body leading-relaxed mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Result */}
                  <p className="text-sm font-display font-semibold text-accent">
                    {project.result}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </LayoutGroup>
      </section>

      {/* FAQ Section */}
      <PortfolioFAQ />

      {/* CTA */}
      <section className="section-padding section-spacing bg-primary text-primary-foreground text-center">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto">
          <h2 className="text-display-lg mb-6">Your brand could be next</h2>
          <p className="text-body-lg opacity-70 mb-10">
            Start with a Growth Foundations Audit to understand exactly where your opportunities are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/audit" className="btn-gold">
              Book Your Audit
              <ArrowRight size={16} className="btn-arrow" />
            </Link>
            <Link to="/contact" className="btn-ghost-light">
              Start a Conversation
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Portfolio;
