import { Link } from "react-router-dom";
import MonogramLogo from "./MonogramLogo";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-padding py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <MonogramLogo size={32} variant="circular" className="text-primary-foreground" />
              <h3 className="font-display text-2xl font-medium">
                Themyth Agency<span className="text-gold">.</span>
              </h3>
            </div>
            <p className="text-body max-w-md opacity-70">
              Shopify growth consultancy with execution. We build growth systems that scale with control.
            </p>
          </div>

          <div>
            <h4 className="text-label mb-5 text-gold">Navigation</h4>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="text-sm opacity-70 hover:opacity-100 transition-opacity font-body">About</Link>
              <Link to="/services" className="text-sm opacity-70 hover:opacity-100 transition-opacity font-body">Services</Link>
              <Link to="/portfolio" className="text-sm opacity-70 hover:opacity-100 transition-opacity font-body">Portfolio</Link>
              <Link to="/case-studies" className="text-sm opacity-70 hover:opacity-100 transition-opacity font-body">Case Studies</Link>
              <Link to="/contact" className="text-sm opacity-70 hover:opacity-100 transition-opacity font-body">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="text-label mb-5 text-gold">Get Started</h4>
            <div className="flex flex-col gap-3">
              <Link to="/audit" className="text-sm opacity-70 hover:opacity-100 transition-opacity font-body">Growth Audit</Link>
              <Link to="/contact" className="text-sm opacity-70 hover:opacity-100 transition-opacity font-body">Strategic Review</Link>
              <Link to="/contact" className="text-sm opacity-70 hover:opacity-100 transition-opacity font-body">Start a Conversation</Link>
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
