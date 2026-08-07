import { Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo, { SITE_URL } from "@/components/Seo";
import { findPolicy, policies } from "@/data/policies";

const Policy = ({ slug }: { slug: string }) => {
  const policy = findPolicy(slug);
  if (!policy) return <Navigate to="/" replace />;

  const others = policies.filter((p) => p.slug !== policy.slug);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${policy.title} | Themyth Agency`}
        description={policy.description}
        path={`/${policy.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: policy.title,
          description: policy.description,
          url: `${SITE_URL}/${policy.slug}`,
          publisher: { "@type": "Organization", name: "Themyth Agency", url: SITE_URL },
        }}
      />
      <Navbar />

      <section className="section-padding pt-32 md:pt-44 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="gold-line" />
            <span className="text-label text-accent">Legal</span>
          </div>
          <h1 className="text-display-lg mb-6">{policy.title}</h1>
          <p className="text-body-lg text-muted-foreground mb-4">{policy.intro}</p>
          <p className="text-xs font-body uppercase tracking-wider text-muted-foreground">
            Last updated: {policy.updated}
          </p>
        </motion.div>
      </section>

      <section className="section-padding pb-20">
        <div className="max-w-3xl space-y-12">
          {policy.sections.map((section, i) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-display text-xl md:text-2xl font-semibold mb-4">{section.heading}</h2>
              {section.body.map((p) => (
                <p key={p} className="text-body text-muted-foreground mb-4 leading-[1.8]">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-3 mt-2">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                      <span className="text-body text-muted-foreground leading-[1.8]">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="pt-10 border-t border-border"
          >
            <p className="text-label text-muted-foreground mb-5">Other policies</p>
            <div className="flex flex-wrap gap-3">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  to={`/${p.slug}`}
                  className="text-xs font-body px-4 py-2 bg-secondary text-muted-foreground border border-border transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  {p.label}
                </Link>
              ))}
            </div>
            <Link to="/contact" className="btn-primary mt-10">
              Questions? Talk to us
              <ArrowRight size={16} className="btn-arrow" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Policy;
