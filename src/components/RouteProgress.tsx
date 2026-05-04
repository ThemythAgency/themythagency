import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const RouteProgress = () => {
  const location = useLocation();
  const [phase, setPhase] = useState<"idle" | "loading" | "finishing">("idle");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setTick((t) => t + 1);
    setPhase("loading");
    const finish = setTimeout(() => setPhase("finishing"), 280);
    const hide = setTimeout(() => setPhase("idle"), 700);
    return () => {
      clearTimeout(finish);
      clearTimeout(hide);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {phase !== "idle" && (
        <motion.div
          key={tick}
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{
            scaleX: phase === "loading" ? 0.85 : 1,
            opacity: phase === "finishing" ? 0 : 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            scaleX: {
              duration: phase === "loading" ? 0.5 : 0.18,
              ease: phase === "loading" ? [0.1, 0.7, 0.3, 1] : [0.22, 1, 0.36, 1],
            },
            opacity: { duration: 0.3, ease: "easeOut" },
          }}
          style={{ transformOrigin: "0% 50%" }}
          className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[100] pointer-events-none shadow-[0_0_10px_hsl(var(--accent))]"
        />
      )}
    </AnimatePresence>
  );
};

export default RouteProgress;
