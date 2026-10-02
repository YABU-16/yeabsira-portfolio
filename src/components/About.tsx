import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { about } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { useMounted } from "../hooks/usePrimitives";
import Interactive3DCard from "./3d/Interactive3DCard";
import { FloatingElement } from "./3d/FloatingElement";

/** Animated counter that counts up when scrolled into view. */
function Counter({ value, infinite }: { value: string; infinite?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(() => (infinite ? value : "0"));

  useEffect(() => {
    if (!inView || infinite || reduceMotion) return;
    const target = Number(value);
    if (Number.isNaN(target)) return;
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(String(Math.round(target * eased)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, infinite, reduceMotion, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {!infinite && "+"}
    </span>
  );
}

const statVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.08 * i,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function About() {
  const mounted = useMounted();
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* Left: heading + copy */}
          <div>
            <SectionHeading eyebrow="About Me" title={about.heading} />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/60">
                {about.paragraph}
              </p>
            </Reveal>

            {/* Highlights */}
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {[
                {
                  label: "Development",
                  desc: "Clean, modern, maintainable code",
                },
                {
                  label: "UI/UX Design",
                  desc: "Interfaces people love to use",
                },
                {
                  label: "Problem Solving",
                  desc: "Turning ideas into working products",
                },
                { label: "Latest Tech", desc: "Always learning what's next" },
              ].map((h, i) => (
                <Reveal key={h.label} delay={0.12 + i * 0.06}>
                  <div className="group rounded-[6px] border-2 border-black bg-surface p-5 transition-all duration-300 hover:shadow-ink hover:-translate-y-0.5">
                    <div className="mb-1.5 text-sm font-semibold text-ink">
                      {h.label}
                    </div>
                    <div className="text-sm text-ink/50">{h.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: stats grid */}
          <div className="relative">
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-ink blur-[50px]"
              aria-hidden="true"
            />
            {/* Decorative floating ring */}
            <FloatingElement speed={0.3} className="absolute -left-6 top-1/2 -translate-y-1/2 pointer-events-none z-0" direction="up">
              <div
                className="h-16 w-16 rounded-full border border-lime/20 animate-float-slow"
                aria-hidden="true"
              />
            </FloatingElement>
            <Interactive3DCard maxRotation={4} scale={1.0} glare={false}>
            <motion.div
              initial="hidden"
              animate={mounted ? "show" : "hidden"}
              className="relative grid grid-cols-2 gap-4"
            >
              {about.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={statVariants}
                  custom={i}
                  className="group rounded-[6px] border-2 border-black bg-surface p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-black/15 hover:shadow-glow"
                >
                  <div className="text-4xl font-black tracking-tight text-ink sm:text-5xl">
                    <Counter
                      value={String(stat.value)}
                      infinite={stat.isInfinite}
                    />
                  </div>
                  <div className="mt-3 text-sm text-ink/50">{stat.label}</div>
                  {stat.note && (
                    <div className="mt-1 text-xs uppercase tracking-widest text-accent-cyan/70">
                      {stat.note}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
            </Interactive3DCard>
          </div>
        </div>
      </div>
    </section>
  );
}
