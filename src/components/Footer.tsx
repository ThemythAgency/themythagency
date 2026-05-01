import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import MonogramLogo from "./MonogramLogo";

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.21 8.21 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.14z" />
  </svg>
);

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/61555650419432/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/themythagency/", label: "Instagram" },
  { icon: null, href: "https://www.tiktok.com/@themyth_agency", label: "TikTok" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/themyth-agency-ba0631287", label: "LinkedIn" },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-padding py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
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
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  {social.icon ? <social.icon size={20} /> : <TikTokIcon size={20} />}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
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
                  className="text-sm opacity-70 hover:opacity-100 hover:translate-x-1 transition-all duration-300 font-body inline-block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
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
                  className="text-sm opacity-70 hover:opacity-100 hover:translate-x-1 transition-all duration-300 font-body inline-block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-50 font-body">© {new Date().getFullYear()} Themyth Agency. All rights reserved.</p>
          <p className="text-xs opacity-50 font-body">Shopify Growth Consultancy with Execution</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
