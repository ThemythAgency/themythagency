import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import portfolioVelour from "@/assets/portfolio-velour.jpg";
import portfolioNordvik from "@/assets/portfolio-nordvik.jpg";
import portfolioMaison from "@/assets/portfolio-maison.jpg";
import portfolioApex from "@/assets/portfolio-apex.jpg";
import portfolioAurelia from "@/assets/portfolio-aurelia.jpg";
import portfolioEmber from "@/assets/portfolio-ember.jpg";

const categories = ["All", "Shopify", "eCommerce", "Redesign", "Growth System", "Conversion"];

const projects = [
  {
    title: "Velour Skincare",
    category: "Beauty & Skincare",
    tags: ["Shopify", "eCommerce", "Conversion"],
    image: portfolioVelour,
    description: "Complete Shopify redesign focused on conversion optimization. Rebuilt product pages, checkout flow, and mobile experience for a premium skincare brand.",
    result: "+142% Conversion Rate",
  },
  {
    title: "Nordvik Outfitters",
    category: "Outdoor & Apparel",
    tags: ["Shopify", "Growth System", "Redesign"],
    image: portfolioNordvik,
    description: "Full infrastructure migration to Shopify 2.0 with custom theme architecture, performance engineering, and a continuous optimization program.",
    result: "3.2x Revenue Growth",
  },
  {
    title: "Maison Collective",
    category: "Home & Lifestyle",
    tags: ["Shopify", "Redesign", "eCommerce"],
    image: portfolioMaison,
    description: "Premium brand experience rebuild — editorial design, optimized product discovery, streamlined checkout, and comprehensive performance optimization.",
    result: "68% Faster Load Times",
  },
  {
    title: "Apex Nutrition",
    category: "Health & Supplements",
    tags: ["Shopify", "eCommerce", "Conversion"],
    image: portfolioApex,
    description: "High-performance Shopify store for a fitness supplement brand. Bold dark design with conversion-focused product pages and subscription integration.",
    result: "+96% Mobile Conversion",
  },
  {
    title: "Aurelia Jewelry",
    category: "Fashion & Accessories",
    tags: ["Shopify", "eCommerce", "Growth System"],
    image: portfolioAurelia,
    description: "Luxury jewelry ecommerce experience with refined product photography presentation, elegant typography, and seamless checkout for high-AOV purchases.",
    result: "+58% Average Order Value",
  },
  {
    title: "Ember Roasters",
    category: "Food & Beverage",
    tags: ["Shopify", "eCommerce", "Conversion"],
    image: portfolioEmber,
    description: "Artisan coffee brand Shopify build with subscription management, warm editorial design, and optimized product discovery for craft coffee enthusiasts.",
    result: "2.4x Subscription Revenue",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

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
            A collection of Shopify growth systems designed for conversion, performance, and sustainable scale.
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
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 text-sm font-medium font-body tracking-wide transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding pb-20 md:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
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
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-500 flex items-center justify-center">
                    <ExternalLink
                      size={24}
                      className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-body font-medium tracking-wide px-3 py-1 bg-secondary text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Category label */}
                <span className="text-xs font-body font-medium uppercase tracking-[0.15em] text-accent">
                  {project.category}
                </span>

                {/* Title */}
                <h3 className="font-display text-xl font-medium mt-1 mb-2 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-3">
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
      </section>

      {/* CTA */}
      <section className="section-padding section-spacing bg-primary text-primary-foreground text-center">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto">
          <h2 className="text-display-lg mb-6">Your brand could be next</h2>
          <p className="text-body-lg opacity-70 mb-10">
            Start with a Growth Foundations Audit to understand exactly where your opportunities are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/audit"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-accent text-accent-foreground font-body text-sm font-medium tracking-wide hover:opacity-90 transition-opacity duration-300"
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
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
