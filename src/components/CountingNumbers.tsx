import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  index: number;
}

const Counter = ({ end, suffix = "", prefix = "", label, duration = 2, index }: CounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <p className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-accent">
        {prefix}{count}{suffix}
      </p>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
        className="text-sm font-body text-muted-foreground mt-2 tracking-wide uppercase"
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

const stats = [
  { end: 100, suffix: "+", label: "Projects Delivered" },
  { end: 200, suffix: "%", label: "Avg. Conversion Lift" },
  { end: 25, prefix: "$", suffix: "M+", label: "Revenue Influenced" },
  { end: 98, suffix: "%", label: "Client Satisfaction" },
];

const CountingNumbers = () => {
  return (
    <section className="section-padding py-16 md:py-24 bg-primary text-primary-foreground overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat, i) => (
          <Counter
            key={stat.label}
            end={stat.end}
            suffix={stat.suffix}
            prefix={stat.prefix}
            label={stat.label}
            index={i}
          />
        ))}
      </div>
    </section>
  );
};

export default CountingNumbers;
