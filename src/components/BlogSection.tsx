import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { blogPosts } from "@/data/blogData";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7 },
};

const BlogSection = () => {
  const topThree = blogPosts.slice(0, 3);
  const bottomTwo = blogPosts.slice(3, 5);

  return (
    <section className="section-padding section-spacing">
      <SectionHeading
        label="Insights"
        title="Latest from the blog"
        description="Strategic insights, tactical guides, and growth frameworks from the team at Themyth Agency."
      />

      {/* Top 3 as cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {topThree.map((post, i) => (
          <Link to={`/blog/${post.slug}`} key={post.slug}>
            <motion.article
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-500 h-full"
            >
              <div className="p-6 md:p-8">
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
                    Read <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>

      {/* Bottom 2 as editorial/paragraph style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {bottomTwo.map((post, i) => (
          <Link to={`/blog/${post.slug}`} key={post.slug}>
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group flex flex-col md:flex-row gap-6 py-6 border-b border-border hover:border-accent/30 transition-colors duration-500"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-body font-medium tracking-wider uppercase text-accent">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs font-body text-muted-foreground flex items-center gap-1">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs font-body text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-medium mb-3 group-hover:text-accent transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-sm font-body text-muted-foreground leading-relaxed mb-3 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="text-sm font-body font-medium text-accent flex items-center gap-1 group-hover:gap-3 transition-all duration-400">
                  Read Article <ArrowRight size={14} />
                </span>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>

      <motion.div
        {...fadeUp}
        className="mt-14 text-center"
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide hover:bg-navy-light transition-colors duration-300"
        >
          Read All Articles
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
};

export default BlogSection;
