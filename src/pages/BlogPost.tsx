import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogData";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: post.author, url: "https://themythagency.lovable.app" },
    publisher: { "@type": "Organization", name: "Themyth Agency", url: "https://themythagency.lovable.app" },
    datePublished: post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://themythagency.lovable.app/blog/${post.slug}` },
    articleSection: post.category,
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.title} | Themyth Agency Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://themythagency.lovable.app/blog/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Navbar />

      <article className="section-padding pt-32 md:pt-44 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-accent transition-all duration-300 mb-8"
            >
              <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Blog
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="text-xs font-body font-medium tracking-wide px-3 py-1 bg-secondary text-accent">
              {post.category}
            </span>
            <span className="text-xs font-body text-muted-foreground flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
            <span className="text-xs font-body text-muted-foreground">{post.date}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-6 leading-tight"
          >
            {post.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-body-lg text-muted-foreground mb-12 border-b border-border pb-8"
          >
            {post.excerpt}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="prose prose-lg max-w-none font-body text-foreground prose-headings:font-display prose-headings:text-foreground prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 prose-strong:text-foreground prose-li:text-muted-foreground prose-hr:border-border prose-ul:text-muted-foreground prose-ol:text-muted-foreground [&_.blog-cta]:mt-16 [&_.blog-cta]:p-8 [&_.blog-cta]:md:p-12 [&_.blog-cta]:bg-secondary [&_.blog-cta]:border [&_.blog-cta]:border-border [&_.blog-cta]:text-center [&_.blog-cta_h2]:text-2xl [&_.blog-cta_h2]:mb-4 [&_.blog-cta_p]:mb-6 [&_.blog-cta-button]:inline-flex [&_.blog-cta-button]:items-center [&_.blog-cta-button]:gap-3 [&_.blog-cta-button]:px-8 [&_.blog-cta-button]:py-4 [&_.blog-cta-button]:bg-primary [&_.blog-cta-button]:text-primary-foreground [&_.blog-cta-button]:font-body [&_.blog-cta-button]:text-sm [&_.blog-cta-button]:font-medium [&_.blog-cta-button]:tracking-wide [&_.blog-cta-button]:no-underline [&_.blog-cta-button]:transition-all [&_.blog-cta-button]:duration-300 [&_.blog-cta-button]:hover:bg-accent [&_.blog-cta-button]:hover:text-accent-foreground [&_.blog-cta-button]:hover:-translate-y-0.5 [&_.blog-cta-button]:hover:shadow-lg"
          >
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 pt-8 border-t border-border"
          >
            <p className="text-sm font-body text-muted-foreground mb-4">Written by {post.author}</p>
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 text-sm font-body font-medium text-accent hover:text-primary transition-colors duration-300"
            >
              <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
              Back to all articles
            </Link>
          </motion.div>
        </motion.div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
