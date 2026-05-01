import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowRight } from "lucide-react";
import type { Project } from "@/data/portfolioData";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-50 bg-background overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="btn-hover-invert fixed top-8 right-8 z-50 w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground"
            >
              <X size={20} />
            </button>

            {/* Hero Image */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
              {/* Header */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-label text-accent">{project.platform}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-label text-muted-foreground">{project.industry}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-label text-muted-foreground">{project.year}</span>
              </div>

              <h2 className="text-display-lg mb-4">{project.title}</h2>
              <p className="text-body-lg text-muted-foreground mb-8 max-w-3xl">
                {project.description}
              </p>

              {/* Key Result */}
              <div className="bg-primary text-primary-foreground px-8 py-6 mb-12 inline-block">
                <span className="text-sm font-body font-medium tracking-wide uppercase opacity-70">Key Result</span>
                <p className="font-display text-2xl md:text-3xl font-medium mt-1">{project.result}</p>
              </div>

              {/* Case Study Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div>
                  <h3 className="font-display text-xl font-medium mb-3 text-accent">The Challenge</h3>
                  <p className="text-body text-muted-foreground">{project.challenge}</p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium mb-3 text-accent">Our Strategy</h3>
                  <p className="text-body text-muted-foreground">{project.strategy}</p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium mb-3 text-accent">Execution</h3>
                  <p className="text-body text-muted-foreground">{project.execution}</p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium mb-3 text-accent">Outcome</h3>
                  <p className="text-body text-muted-foreground">{project.outcome}</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-16">
                <h3 className="font-display text-xl font-medium mb-6">Key Features Delivered</h3>
                <div className="flex flex-wrap gap-3">
                  {project.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-5 py-2.5 bg-secondary text-foreground text-sm font-body font-medium tracking-wide"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-12">
                <h3 className="font-display text-xl font-medium mb-4">Technologies & Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 border border-border text-muted-foreground text-xs font-body font-medium tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border">
                <a
                  href={project.liveUrl !== "#" ? project.liveUrl : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (project.liveUrl === "#") e.preventDefault();
                  }}
                  className={`btn-gold ${project.liveUrl === "#" ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
                >
                  {project.liveUrl !== "#" ? "Live Preview" : "Preview Coming Soon"}
                  <ExternalLink size={16} className="btn-arrow" />
                </a>
                <a href="/audit" className="btn-primary">
                  Start Your Project
                  <ArrowRight size={16} className="btn-arrow" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
