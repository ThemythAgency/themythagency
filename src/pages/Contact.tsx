import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            <span className="text-label text-accent">Contact</span>
          </div>
          <h1 className="text-display-xl mb-8">
            Let's talk{" "}
            <span className="italic text-accent">growth</span>
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl">
            Whether you're ready for an audit, exploring a growth system build, or just want a 
            strategic conversation — we'd love to hear from you.
          </p>
        </motion.div>
      </section>

      <section className="section-padding pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div {...fadeUp}>
            {submitted ? (
              <div className="bg-secondary/50 p-10 md:p-12 text-center">
                <h3 className="font-display text-2xl font-medium mb-4">Thank you</h3>
                <p className="text-body text-muted-foreground">
                  We've received your inquiry and will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-label text-foreground mb-2 block">Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-label text-foreground mb-2 block">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors"
                      placeholder="you@brand.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-label text-foreground mb-2 block">Website</label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors"
                    placeholder="https://yourstore.com"
                  />
                </div>
                <div>
                  <label className="text-label text-foreground mb-2 block">What are you looking for?</label>
                  <select
                    className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors"
                  >
                    <option>Growth Foundations Audit</option>
                    <option>Growth System Build</option>
                    <option>Strategic Growth Partner</option>
                    <option>Just exploring</option>
                  </select>
                </div>
                <div>
                  <label className="text-label text-foreground mb-2 block">Tell us about your brand</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="What's your brand, where are you now, and what are you trying to achieve?"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide hover:bg-navy-light transition-colors duration-300"
                >
                  Send Inquiry
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </motion.div>

          <motion.div {...fadeUp}>
            <div className="bg-primary text-primary-foreground p-10 md:p-12 mb-6">
              <h3 className="font-display text-xl font-medium mb-6">What happens next?</h3>
              <div className="space-y-4">
                {[
                  "We review your inquiry within 24 hours",
                  "If there's a fit, we schedule a discovery call",
                  "We discuss your growth challenges and goals",
                  "You receive a tailored proposal or audit recommendation",
                ].map((step, i) => (
                  <div key={step} className="flex items-start gap-3">
                    <span className="text-gold font-body text-sm font-medium mt-0.5">0{i + 1}</span>
                    <span className="text-sm font-body opacity-80">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 p-6">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-accent" />
                <span className="text-body text-muted-foreground">hello@themyth.agency</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-accent" />
                <span className="text-body text-muted-foreground">Remote-first, globally available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
