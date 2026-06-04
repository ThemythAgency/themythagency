import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, PanInfo } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown, Shuffle } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const headlineWords = ["We", "build", "Shopify", "growth", "systems", "that", "scale"];

type ChipDef = { id: string; label: string; accent?: boolean };

const CHIPS: ChipDef[] = [
  { id: "strategy", label: "Strategy", accent: true },
  { id: "design", label: "Design" },
  { id: "conversion", label: "Conversion", accent: true },
  { id: "systems", label: "Systems" },
  { id: "speed", label: "Speed", accent: true },
  { id: "retention", label: "Retention" },
  { id: "scale", label: "Scale", accent: true },
  { id: "growth", label: "Growth" },
];

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const makePositions = (n: number, w: number, h: number) =>
  Array.from({ length: n }, () => ({
    x: rand(-w * 0.35, w * 0.35),
    y: rand(-h * 0.35, h * 0.35),
    rotate: rand(-14, 14),
  }));

const HeroAgency = () => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Pointer-driven spotlight (works for mouse AND touch via pointermove)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const spotX = useTransform(mouseX, (v) => `${v * 100}%`);
  const spotY = useTransform(mouseY, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${spotX} ${spotY}, hsl(var(--gold) / 0.22), transparent 60%)`;

  const handlePointer = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  // Mobile: device orientation drives spotlight when pointer isn't active
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (!isTouch) return;
    const handler = (ev: DeviceOrientationEvent) => {
      const gx = ev.gamma ?? 0; // left-right -90..90
      const by = ev.beta ?? 0; // front-back -180..180
      const nx = Math.min(Math.max((gx + 45) / 90, 0), 1);
      const ny = Math.min(Math.max((by + 30) / 60, 0), 1);
      mouseX.set(nx);
      mouseY.set(ny);
    };
    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, [mouseX, mouseY]);

  // Scatter container ref for measuring size
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ w: 320, h: 380 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setStageSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Shuffleable chips
  const [positions, setPositions] = useState(() => makePositions(CHIPS.length, 320, 380));
  const shuffle = useCallback(() => {
    setPositions(makePositions(CHIPS.length, stageSize.w, stageSize.h));
  }, [stageSize]);

  // Bring dragged chip to front
  const [order, setOrder] = useState(CHIPS.map((c) => c.id));
  const bringToFront = (id: string) =>
    setOrder((prev) => [...prev.filter((x) => x !== id), id]);

  const onDragEnd = (id: string, _: PointerEvent, info: PanInfo) => {
    setPositions((prev) => {
      const next = [...prev];
      const idx = CHIPS.findIndex((c) => c.id === id);
      const maxX = stageSize.w * 0.42;
      const maxY = stageSize.h * 0.42;
      next[idx] = {
        x: Math.max(-maxX, Math.min(maxX, next[idx].x + info.offset.x)),
        y: Math.max(-maxY, Math.min(maxY, next[idx].y + info.offset.y)),
        rotate: next[idx].rotate + info.velocity.x * 0.015,
      };
      return next;
    });
  };

  const handleScrollDown = () => {
    const heroEl = ref.current;
    if (!heroEl) return;
    const next = heroEl.nextElementSibling as HTMLElement | null;
    if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: heroEl.offsetHeight, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      onPointerMove={handlePointer}
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
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-accent" />
              <span className="text-label text-accent">Shopify Growth Consultancy with Execution</span>
            </motion.div>

            <h1 className="text-display-xl mb-10 text-balance leading-[1.05]">
              {headlineWords.map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block mr-[0.25em]"
                >
                  {w}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 + headlineWords.length * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block italic text-accent"
              >
                with control.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="text-body-lg text-primary-foreground/70 max-w-xl mb-14"
            >
              Strategic clarity. Conversion-focused design. Scalable infrastructure.
              For growing Shopify brands ready to build systems, not just stores.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
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

          {/* Right: Scatterable word chips — touch & mouse friendly, fits all viewports */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-[340px] sm:h-[400px] md:h-[460px] select-none"
          >
            <div
              ref={stageRef}
              className="absolute inset-0 flex items-center justify-center overflow-hidden"
            >
              {CHIPS.map((chip, i) => {
                const pos = positions[i] ?? { x: 0, y: 0, rotate: 0 };
                const zIndex = order.indexOf(chip.id) + 1;
                return (
                  <motion.button
                    key={chip.id}
                    type="button"
                    drag
                    dragMomentum={false}
                    dragElastic={0.18}
                    dragConstraints={stageRef}
                    onPointerDown={() => bringToFront(chip.id)}
                    onDragEnd={(e, info) => onDragEnd(chip.id, e as PointerEvent, info)}
                    initial={false}
                    animate={{ x: pos.x, y: pos.y, rotate: pos.rotate }}
                    transition={{ type: "spring", stiffness: 220, damping: 24 }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    whileDrag={{ scale: 1.1, zIndex: 100 }}
                    style={{ zIndex, touchAction: "none" }}
                    className={`absolute cursor-grab active:cursor-grabbing font-display text-base sm:text-lg md:text-xl px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border backdrop-blur-sm shadow-xl whitespace-nowrap ${
                      chip.accent
                        ? "bg-accent text-accent-foreground border-accent/60"
                        : "bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
                    }`}
                  >
                    {chip.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Shuffle button */}
            <button
              type="button"
              onClick={shuffle}
              className="absolute -bottom-2 right-0 z-[200] flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2.5 text-xs font-body font-semibold tracking-wider uppercase shadow-lg hover:scale-105 transition-transform"
              aria-label="Scatter words"
            >
              <Shuffle size={14} />
              Scatter
            </button>
            <p className="absolute -bottom-2 left-0 z-[200] text-[10px] font-body tracking-wider uppercase text-primary-foreground/50 pt-3">
              Drag · Arrange · Scatter
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        ref={scrollIndicatorRef}
        type="button"
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        whileHover={{ y: -2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors cursor-pointer"
        aria-label="Scroll to next section"
      >
        <span className="text-[10px] font-body tracking-[0.3em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  );
};

export default HeroAgency;
