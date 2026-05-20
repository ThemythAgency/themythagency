import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown, TrendingUp, ShoppingBag, Activity } from "lucide-react";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const headlineWords = ["We", "build", "Shopify", "growth", "systems", "that", "scale"];

const HeroAgency = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Cursor spotlight + tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const tiltX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), { stiffness: 120, damping: 14 });
  const tiltY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), { stiffness: 120, damping: 14 });
  const spotX = useTransform(mouseX, (v) => `${v * 100}%`);
  const spotY = useTransform(mouseY, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotX} ${spotY}, hsl(var(--gold) / 0.18), transparent 60%)`;

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouse}
      className="relative min-h-screen w-full overflow-hidden bg-primary text-primary-foreground flex items-center"
    >
      <motion.div
        style={{ y: bgY, backgroundImage: `url(${heroBg})` }}
        className="absolute inset-0 bg-cover bg-center scale-110"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-primary" aria-hidden />
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: spotlight }} aria-hidden />

      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[10%] w-[420px] h-[420px] rounded-full bg-accent/10 blur-3xl pointer-events-none"
        aria-hidden
      />

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 section-padding w-full pt-32 md:pt-40 pb-20"
      >
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-accent" />
              <span className="text-label text-accent">Shopify Growth Consultancy with Execution</span>
            </motion.div>

            <h1 className="text-display-xl mb-10 text-balance leading-[1.05]">
              {headlineWords.map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
              className="text-body-lg text-primary-foreground/70 max-w-xl mb-14"
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

          {/* Right: Interactive 3D dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block relative"
            style={{ perspective: 1200 }}
          >
            <motion.div
              style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
              className="relative bg-card/95 backdrop-blur border border-white/10 shadow-2xl rounded-sm p-6 text-foreground"
            >
              {/* Browser bar */}
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="ml-3 text-[10px] font-body tracking-wider text-muted-foreground uppercase">
                  yourstore.com / analytics
                </span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { icon: TrendingUp, label: "Revenue", value: "+312%", color: "text-accent" },
                  { icon: ShoppingBag, label: "AOV", value: "$148", color: "text-foreground" },
                  { icon: Activity, label: "CVR", value: "4.8%", color: "text-accent" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + i * 0.15 }}
                    whileHover={{ y: -3, scale: 1.04 }}
                    className="bg-secondary/60 p-3 cursor-pointer"
                  >
                    <s.icon size={12} className="text-accent mb-1.5" />
                    <p className="text-[9px] font-body uppercase tracking-wider text-muted-foreground">{s.label}</p>
                    <p className={`font-display text-base font-semibold ${s.color}`}>{s.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Animated chart */}
              <div className="bg-secondary/40 p-4">
                <div className="flex items-end justify-between gap-1.5 h-20">
                  {[35, 48, 42, 60, 55, 72, 68, 85, 78, 92, 88, 100].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.8, delay: 1.5 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ backgroundColor: "hsl(var(--gold))" }}
                      className="flex-1 bg-accent/70 hover:bg-accent transition-colors cursor-pointer rounded-sm"
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[9px] font-body text-muted-foreground">
                  <span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ transform: "translateZ(40px)" }}
                className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-3 py-1.5 text-[10px] font-body font-semibold tracking-wider uppercase shadow-lg"
              >
                Live
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

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
