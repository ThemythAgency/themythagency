import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const headlineWords = [
  "We", "build", "Shopify", "growth", "systems", "that", "scale",
];

const HeroAgency = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-primary text-primary-foreground flex items-center"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY, backgroundImage: `url(${heroBg})` }}
        className="absolute inset-0 bg-cover bg-center scale-110"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-primary" aria-hidden />
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 30% 20%, hsl(var(--gold) / 0.4), transparent 60%), radial-gradient(ellipse at 70% 80%, hsl(var(--navy-light) / 0.6), transparent 60%)",
        }}
        aria-hidden
      />

      {/* Animated grain dot */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[15%] w-[420px] h-[420px] rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 section-padding w-full pt-32 md:pt-40 pb-20"
      >
        <div className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-accent" />
            <span className="text-label text-accent">Shopify Growth Consultancy with Execution</span>
          </motion.div>

          <h1 className="text-display-xl mb-10 text-balance leading-[1.05] max-w-5xl">
            {headlineWords.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.9,
                  delay: 0.2 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block mr-[0.25em]"
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.2 + headlineWords.length * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block italic text-accent"
            >
              with control.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-body-lg text-primary-foreground/70 max-w-2xl mb-14"
          >
            Strategic clarity. Conversion-focused design. Scalable infrastructure.
            For growing Shopify brands ready to build systems, not just stores.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <Link to="/audit" className="btn-gold group px-10 text-base">
              Book a Growth Audit
              <ArrowRight size={18} className="btn-arrow" />
            </Link>
            <Link to="/contact" className="btn-ghost-light px-10 text-base">
              Start a Growth Conversation
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-primary-foreground/60"
      >
        <span className="text-[10px] font-body tracking-[0.3em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroAgency;
