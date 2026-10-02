import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, lazy, Suspense } from "react";
import { profile } from "../data/portfolio";
import HeroVisual from "./HeroVisual";
import MagneticButton from "./MagneticButton";
import { useMounted } from "../hooks/usePrimitives";
import { useMouseParallax } from "../hooks/useMouseParallax";

const Hero3DScene = lazy(() => import("./3d/Hero3DScene"));

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const STACK: ReadonlyArray<string> = [
  "React",
  "TypeScript",
  "Node.js",
  "Tailwind",
];

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Hero section. A focused headline, availability state, a quiet stack badge
 * row, and two primary actions. Ambient visuals live in <HeroVisual /> so this
 * markup stays readable and semantic.
 */
export default function Hero() {
  const mounted = useMounted();
  const reduceMotion = useReducedMotion();
  const mouse = useMouseParallax(0.06);
  
  // Responsive check to only load 3D scene on desktop
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll animations for the 3D scene container
  const { scrollYProgress } = useScroll();
  const sceneY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.85]);
  const sceneRotate = useTransform(scrollYProgress, [0, 0.2], [0, 10]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      <HeroVisual />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
          
          {/* LEFT: Text Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={mounted ? "show" : "hidden"}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Availability indicator */}
            <motion.div variants={item} className="mb-8">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-black/12 bg-surface px-4 py-2 text-sm text-ink/70">
                <span className="block h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_0_3px_rgba(183,255,60,0.2)]" />
                {profile.availability}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="text-balance text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[4.5rem]"
            >
              Building Digital
              <br />
              Experiences That{" "}
              <span className="text-gradient">
                {profile.taglineAccent.replace(".", "")}
              </span>
            </motion.h1>

            {/* Supporting text */}
            <motion.p
              variants={item}
              className="mt-7 max-w-xl text-lg leading-relaxed text-ink/55 sm:text-xl lg:pr-10"
            >
              {profile.intro}
            </motion.p>

            {/* Stack badges */}
            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start"
            >
              {STACK.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-black/12 bg-surface-2 px-3.5 py-1.5 text-xs font-medium text-ink/55"
                >
                  {t}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="mt-10 flex w-full flex-col items-center gap-4 sm:flex-row lg:w-auto"
            >
              <MagneticButton onClick={() => scrollToId("#projects")}>
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton
                variant="outline"
                onClick={() => scrollToId("#contact")}
              >
                Let's Work Together
              </MagneticButton>
            </motion.div>

            {/* Scroll hint */}
            <div
              className="mt-20 hidden items-center justify-center lg:flex lg:justify-start"
              aria-hidden="true"
            >
              <motion.div
                animate={reduceMotion ? {} : { y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-black/40 p-1.5"
              >
                <motion.span
                  animate={reduceMotion ? {} : { opacity: [0.25, 0.9, 0.25] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="block h-2 w-1.5 rounded-full bg-ink/70"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: 3D Scene */}
          <motion.div
            style={reduceMotion ? {} : { y: sceneY, opacity: sceneOpacity, scale: sceneScale, rotateZ: sceneRotate }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={mounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-[350px] w-full items-center justify-center sm:h-[450px] lg:h-[600px] xl:h-[700px]"
          >
            {!reduceMotion && (
              <Suspense fallback={null}>
                <Hero3DScene mouseX={mouse.x} mouseY={mouse.y} reduceMotion={reduceMotion ?? false} isMobile={!isDesktop} />
              </Suspense>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
