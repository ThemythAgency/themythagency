import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-md"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-7xl md:text-8xl font-medium mb-4 text-accent"
        >
          404
        </motion.h1>
        <p className="font-display text-2xl mb-3">Page not found</p>
        <p className="text-muted-foreground font-body mb-10">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link to="/" className="btn-primary">
          <ArrowLeft size={16} className="btn-arrow" />
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
