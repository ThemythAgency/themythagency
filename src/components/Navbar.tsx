import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MonogramLogo from "./MonogramLogo";

const navItems = [
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Blog", path: "/blog" },
  { label: "Audit", path: "/audit" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="section-padding flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3">
          <MonogramLogo size={36} className="text-primary" />
          <span className="font-display text-lg font-semibold text-foreground tracking-tight">
            Themyth Agency<span className="text-accent">.</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? "text-foreground" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/audit"
            className="ml-4 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium font-body tracking-wide hover:bg-navy-light transition-colors duration-300"
          >
            Book an Audit
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="section-padding py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="nav-link text-base"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/audit"
                onClick={() => setIsOpen(false)}
                className="mt-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium font-body tracking-wide text-center"
              >
                Book an Audit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
