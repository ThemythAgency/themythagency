import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, PanInfo } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown, TrendingUp, ShoppingBag, Activity, BarChart3, Zap, Sparkles, Shuffle } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const headlineWords = ["We", "build", "Shopify", "growth", "systems", "that", "scale"];

type CardDef = {
  id: string;
  label: string;
  value: string;
  icon: typeof TrendingUp;
  accent?: boolean;
};

const CARDS: CardDef[] = [
  { id: "rev", label: "Revenue", value: "+312%", icon: TrendingUp, accent: true },
  { id: "aov", label: "AOV", value: "$148", icon: ShoppingBag },
  { id: "cvr", label: "CVR", value: "4.8%", icon: Activity, accent: true },
  { id: "ltv", label: "LTV", value: "$612", icon: BarChart3 },
  { id: "spd", label: "Page Speed", value: "94", icon: Zap, accent: true },
  { id: "ret", label: "Retention", value: "68%", icon: Sparkles },
];

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const makePositions = (n: number) =>
  Array.from({ length: n }, (_, i) => ({
    x: rand(-40, 40),
    y: rand(-30, 30),
    rotate: rand(-12, 12),
    z: n - i,
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

  // Shuffleable cards
  const [positions, setPositions] = useState(() => makePositions(CARDS.length));
  const shuffle = () => setPositions(makePositions(CARDS.length));

  // Bring dragged card to front
  const [order, setOrder] = useState(CARDS.map((c) => c.id));
  const bringToFront = (id: string) =>
    setOrder((prev) => [...prev.filter((x) => x !== id), id]);

  const onDragEnd = (id: string, _: PointerEvent, info: PanInfo) => {
    setPositions((prev) => {
      const next = [...prev];
      const idx = CARDS.findIndex((c) => c.id === id);
      next[idx] = {
        ...next[idx],
        x: next[idx].x + info.offset.x * 0.4,
        y: next[idx].y + info.offset.y * 0.4,
        rotate: next[idx].rotate + info.velocity.x * 0.02,
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

          {/* Right: Shuffleable, draggable card stack — works on mouse + touch */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[420px] md:h-[460px] select-none touch-none"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {CARDS.map((card, i) => {
                const pos = positions[i];
                const zIndex = order.indexOf(card.id) + 1;
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    drag
                    dragMomentum={false}
                    dragElastic={0.2}
                    onPointerDown={() => bringToFront(card.id)}
                    onDragEnd={(e, info) => onDragEnd(card.id, e as PointerEvent, info)}
                    initial={false}
                    animate={{ x: pos.x, y: pos.y, rotate: pos.rotate }}
                    transition={{ type: "spring", stiffness: 200, damping: 22 }}
                    whileHover={{ scale: 1.04 }}
                    whileDrag={{ scale: 1.08, zIndex: 100 }}
                    style={{ zIndex }}
                    className={`absolute w-44 md:w-52 cursor-grab active:cursor-grabbing bg-card text-foreground border border-white/10 shadow-2xl p-5 rounded-sm ${
                      card.accent ? "ring-1 ring-accent/40" : ""
                    }`}
                  >
                    <Icon size={16} className="text-accent mb-3" />
                    <p className="text-[10px] font-body uppercase tracking-wider text-muted-foreground">{card.label}</p>
                    <p className={`font-display text-2xl md:text-3xl font-semibold ${card.accent ? "text-accent" : "text-foreground"}`}>
                      {card.value}
                    </p>
                    <div className="mt-3 flex items-end gap-1 h-8">
                      {[40, 60, 45, 75, 55, 80, 70, 95].map((h, idx) => (
                        <span
                          key={idx}
                          className={`flex-1 ${card.accent ? "bg-accent/60" : "bg-muted-foreground/40"}`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Shuffle button */}
            <button
              type="button"
              onClick={shuffle}
              className="absolute -bottom-2 right-0 z-[200] flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2.5 text-xs font-body font-semibold tracking-wider uppercase shadow-lg hover:scale-105 transition-transform"
              aria-label="Shuffle cards"
            >
              <Shuffle size={14} />
              Shuffle
            </button>
            <p className="absolute -bottom-2 left-0 z-[200] text-[10px] font-body tracking-wider uppercase text-primary-foreground/50 pt-3">
              Drag · Throw · Shuffle
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
