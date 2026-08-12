import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import MonogramLogo from "./MonogramLogo";

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.21 8.21 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.14z" />
  </svg>
);

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ThreadsIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.19 2c3.02 0 5.29 1 6.75 2.98 1.05 1.42 1.66 3.32 1.83 5.66l-1.98.16c-.15-1.94-.63-3.45-1.42-4.52-1.06-1.43-2.76-2.17-5.18-2.18-2.29.01-4.03.77-5.16 2.25C6.02 7.75 5.5 9.66 5.5 12s.52 4.25 1.53 5.65c1.13 1.48 2.87 2.24 5.16 2.25 2.06-.01 3.44-.5 4.6-1.62 1.31-1.28 1.29-2.85 .87-3.8-.25-.56-.7-1.03-1.31-1.39-.16 1.1-.51 2-1.05 2.68-.73.92-1.79 1.42-3.14 1.48-1.03.05-2.02-.19-2.78-.68-.9-.58-1.43-1.47-1.48-2.5-.1-2.03 1.51-3.49 4.02-3.63.89-.05 1.72-.01 2.49.12-.1-.62-.31-1.11-.62-1.46-.42-.48-1.07-.72-1.94-.73h-.03c-.7 0-1.65.19-2.25 1.1l-1.64-1.1c.81-1.21 2.13-1.88 3.89-1.88h.04c2.95.02 4.7 1.83 4.88 4.98l-.01.01.5.21c1.42.67 2.46 1.68 3 2.93.76 1.74.83 4.58-1.47 6.83C15.94 23.02 14.03 23.98 11.2 24h-.01C8.05 23.98 5.63 22.94 4.03 20.9 2.61 19.08 1.87 16.56 1.85 12v-.01c.02-4.56.76-7.08 2.18-8.9C5.63 1.05 8.06.01 11.2 0h.99zm-.06 9.56c-.24 0-.48.01-.73.02-1.88.11-2.4.94-2.36 1.6.05 1 1.14 1.46 2.19 1.41 .97-.05 2.24-.43 2.45-2.87-.5-.11-1.02-.16-1.55-.16z" />
  </svg>
);

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/61555650419432/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/themyth_agency", label: "Instagram" },
  { icon: null, href: "https://www.tiktok.com/@themyth_agency", label: "TikTok", custom: TikTokIcon },
  { icon: null, href: "https://www.threads.com/@themyth_agency", label: "Threads", custom: ThreadsIcon },
  { icon: null, href: "https://x.com/Themyth_Agency", label: "X", custom: XIcon },
  { icon: Linkedin, href: "https://www.linkedin.com/in/themyth-agency-ba0631287", label: "LinkedIn" },
];

const colVariant = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-padding py-12 md:py-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8"
        >
          <motion.div
            variants={colVariant}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2"
          >
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <motion.div whileHover={{ scale: 1.05, rotate: -2 }} transition={{ duration: 0.3 }}>
                <MonogramLogo size={64} variant="circular" className="text-primary-foreground" />
              </motion.div>
              <h3 className="font-display text-2xl font-medium">
                Themyth Agency<span className="text-gold">.</span>
              </h3>
            </Link>
            <p className="text-body max-w-md opacity-70 mb-6">
              Shopify growth consultancy with execution. We build growth systems that scale with control.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.15 }}
                  transition={{ duration: 0.2 }}
                  className="opacity-70 hover:opacity-100 hover:text-gold transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon ? <social.icon size={20} /> : social.custom ? <social.custom size={20} /> : null}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={colVariant} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <h4 className="text-label mb-5 text-gold">Navigation</h4>
            <div className="flex flex-col gap-3">
              {[
                { to: "/about", label: "About" },
                { to: "/services", label: "Services" },
                { to: "/portfolio", label: "Portfolio" },
                { to: "/case-studies", label: "Case Studies" },
                { to: "/blog", label: "Blog" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm opacity-70 hover:opacity-100 hover:translate-x-1 hover:text-gold transition-all duration-300 font-body inline-block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div variants={colVariant} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <h4 className="text-label mb-5 text-gold">Get Started</h4>
            <div className="flex flex-col gap-3">
              {[
                { to: "/audit", label: "Growth Audit" },
                { to: "/contact", label: "Strategic Review" },
                { to: "/contact", label: "Start a Conversation" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm opacity-70 hover:opacity-100 hover:translate-x-1 hover:text-gold transition-all duration-300 font-body inline-block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
          <motion.div variants={colVariant} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <h4 className="text-label mb-5 text-gold">Legal</h4>
            <div className="flex flex-col gap-3">
              {[
                { to: "/privacy-policy", label: "Privacy Policy" },
                { to: "/terms-of-service", label: "Terms of Service" },
                { to: "/cookie-policy", label: "Cookie Policy" },
                { to: "/refund-policy", label: "Refund Policy" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm opacity-70 hover:opacity-100 hover:translate-x-1 hover:text-gold transition-all duration-300 font-body inline-block"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("themyth:open-cookie-preferences"))}
                className="text-sm opacity-70 hover:opacity-100 hover:translate-x-1 hover:text-gold transition-all duration-300 font-body inline-block text-left"
              >
                Cookie Preferences
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs opacity-50 font-body">© {new Date().getFullYear()} Themyth Agency. All rights reserved.</p>
          <p className="text-xs opacity-50 font-body">Shopify Growth Consultancy with Execution</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
