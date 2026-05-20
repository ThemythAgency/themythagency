import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { blogPosts } from "@/data/blogData";

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="section-padding pt-32 md:pt-44 pb-16">
        <SectionHeading
          label="Insights"
          title="The Themyth Agency Blog"
          description="Strategic insights, tactical guides, and growth frameworks for Shopify brands ready to scale."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-body font-medium tracking-wide transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
                className="group border border-border hover:border-accent/40 hover:shadow-xl transition-all duration-500 relative overflow-hidden before:absolute before:inset-0 before:bg-accent/5 before:pointer-events-none before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
              >
                <Link to={`/blog/${post.slug}`} className="block p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-body font-medium tracking-wide px-3 py-1 bg-secondary text-accent">
                      {post.category}
                    </span>
                    <span className="text-xs font-body text-muted-foreground flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-medium mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-body text-muted-foreground">{post.date}</span>
                    <span className="text-sm font-body font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                      Read <ArrowRight size={14} className="btn-arrow" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
