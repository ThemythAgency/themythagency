import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    revenue_range: "$10K – $50K",
    budget_range: "$1K – $5K",
    service_interest: "Growth Foundations Audit",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || formData.name.length > 100) {
      toast({ title: "Please enter a valid name (max 100 characters).", variant: "destructive" });
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) || formData.email.length > 255) {
      toast({ title: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    if (formData.message && formData.message.length > 2000) {
      toast({ title: "Message must be under 2000 characters.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("contact_inquiries").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        website: formData.website.trim() || null,
        revenue_range: formData.revenue_range,
        budget_range: formData.budget_range,
        service_interest: formData.service_interest,
        message: formData.message.trim() || null,
      });

      if (error) throw error;
      setSubmitted(true);
    } catch {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="section-padding pt-32 md:pt-40 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="gold-line" />
            <span className="text-label text-accent">Contact</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-display-xl mb-8"
          >
            Start a growth{" "}
            <span className="italic text-accent">conversation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-body-lg text-muted-foreground max-w-2xl"
          >
            Whether you're ready for an audit, exploring a growth system build, or want a
            strategic review of where your brand stands — we'd like to hear from you.
          </motion.p>
        </motion.div>
      </section>

      <section className="section-padding pb-20 md:pb-32 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="bg-secondary/50 p-10 md:p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle size={48} className="text-accent mx-auto mb-4" />
                </motion.div>
                <h3 className="font-display text-2xl font-medium mb-4">Thank you</h3>
                <p className="text-body text-muted-foreground">
                  We've received your inquiry and will be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <label className="text-label text-foreground mb-2 block">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      maxLength={100}
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors"
                      placeholder="Your name"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                  >
                    <label className="text-label text-foreground mb-2 block">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      maxLength={255}
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors"
                      placeholder="you@brand.com"
                    />
                  </motion.div>
                </div>
                {[
                  { label: "Website", name: "website", type: "url", placeholder: "https://yourstore.com", delay: 0.2 },
                ].map((field) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: field.delay }}
                  >
                    <label className="text-label text-foreground mb-2 block">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={(formData as Record<string, string>)[field.name]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors"
                      placeholder={field.placeholder}
                    />
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                >
                  <label className="text-label text-foreground mb-2 block">Monthly Revenue Range</label>
                  <select
                    name="revenue_range"
                    value={formData.revenue_range}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors"
                  >
                    <option>$10K – $50K</option>
                    <option>$50K – $100K</option>
                    <option>$100K – $500K</option>
                    <option>$500K – $1M</option>
                    <option>$1M – $3M</option>
                    <option>$3M+</option>
                  </select>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label className="text-label text-foreground mb-2 block">Budget Range</label>
                  <select
                    name="budget_range"
                    value={formData.budget_range}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors"
                  >
                    <option>$1K – $5K</option>
                    <option>$5K – $10K</option>
                    <option>$10K – $25K</option>
                    <option>$25K – $50K</option>
                    <option>$50K+</option>
                  </select>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                >
                  <label className="text-label text-foreground mb-2 block">What are you looking for?</label>
                  <select
                    name="service_interest"
                    value={formData.service_interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors"
                  >
                    <option>Growth Foundations Audit</option>
                    <option>Growth System Build</option>
                    <option>Strategic Growth Partner</option>
                    <option>Strategic Review / Just Exploring</option>
                  </select>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label className="text-label text-foreground mb-2 block">Tell us about your brand and challenges</label>
                  <textarea
                    name="message"
                    rows={5}
                    maxLength={2000}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="What's your brand, where are you now, what growth challenges are you facing, and how would you like us to help?"
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary px-10 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Inquiry"}
                  <ArrowRight size={16} className="btn-arrow" />
                </motion.button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="bg-primary text-primary-foreground p-10 md:p-12 mb-6"
            >
              <h3 className="font-display text-xl font-medium mb-6">What happens next?</h3>
              <div className="space-y-4">
                {[
                  "We review your inquiry within 24 hours",
                  "If there's a fit, we schedule a discovery call",
                  "We discuss your growth challenges, goals, and current stage",
                  "You receive a tailored proposal or audit recommendation",
                ].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-gold font-body text-sm font-medium mt-0.5">0{i + 1}</span>
                    <span className="text-sm font-body opacity-80">{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="bg-secondary/50 p-10 md:p-12 mb-6"
            >
              <h3 className="font-display text-lg font-medium mb-4">This is for you if:</h3>
              <div className="space-y-3">
                {[
                  "You're a growing Shopify brand ready to invest in systems",
                  "You value strategic clarity over quick fixes",
                  "You're looking for a partner, not just a vendor",
                  "You care about sustainable scale, not vanity metrics",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    <span className="text-sm font-body text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="space-y-4 p-6">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-accent" />
                <span className="text-body text-muted-foreground">official.themythagency@gmail.com</span>
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
