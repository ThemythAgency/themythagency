import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogData";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="section-padding pt-32 md:pt-44 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-accent transition-colors duration-300 mb-8"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-body font-medium tracking-wide px-3 py-1 bg-secondary text-accent">
              {post.category}
            </span>
            <span className="text-xs font-body text-muted-foreground flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
            <span className="text-xs font-body text-muted-foreground">{post.date}</span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-body-lg text-muted-foreground mb-12 border-b border-border pb-8">
            {post.excerpt}
          </p>

          <div className="prose prose-lg max-w-none font-body text-foreground prose-headings:font-display prose-headings:text-foreground prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-li:text-muted-foreground prose-hr:border-border">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n## /g, '\n<h2>').replace(/\n### /g, '\n<h3>').replace(/<h2>(.*)/g, '<h2>$1</h2>').replace(/<h3>(.*)/g, '<h3>$1</h3>').replace(/\n\n(?!<)/g, '\n<p>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n- /g, '\n<li>').replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>').replace(/---/g, '<hr />') }} />
          </div>

          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm font-body text-muted-foreground mb-4">Written by {post.author}</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-body font-medium text-accent hover:gap-3 transition-all duration-300"
            >
              <ArrowLeft size={14} />
              Back to all articles
            </Link>
          </div>
        </motion.div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
