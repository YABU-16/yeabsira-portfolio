import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
  blur?: boolean;
};

/**
 * Scroll-reveal wrapper. Fades, slides and (optionally) blurs content into
 * view when it enters the viewport. Respects prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  direction = "up",
  once = true,
  blur = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const offset =
    direction === "left"
      ? { x: -40, y: 0 }
      : direction === "right"
        ? { x: 40, y: 0 }
        : direction === "down"
          ? { x: 0, y: -y }
          : { x: 0, y };

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, ...offset, filter: blur ? "blur(10px)" : "blur(0px)" }
      }
      whileInView={
        reduceMotion
          ? { opacity: 1 }
          : { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
