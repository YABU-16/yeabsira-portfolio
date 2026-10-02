import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Tracks normalised mouse position (-1 … 1) with smooth lerping.
 * Returns {x, y} that glide toward the cursor. On mobile / reduced-motion
 * the values stay at {0, 0}.
 */
export function useMouseParallax(lerpFactor = 0.08) {
  const shouldReduceMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const enabled = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    enabled.current = fine && !shouldReduceMotion;
    if (!enabled.current) {
      setPos({ x: 0, y: 0 });
      return;
    }

    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
    };

    const loop = () => {
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * lerpFactor;
      c.y += (t.y - c.y) * lerpFactor;
      setPos({ x: c.x, y: c.y });
      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    rafId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [lerpFactor, shouldReduceMotion]);

  return pos;
}
