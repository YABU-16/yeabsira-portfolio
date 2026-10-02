import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useMouseParallax } from "../hooks/useMouseParallax";type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

/**
 * Subtle, restrained hero background: a faint grid, two soft gradient blobs
 * with gentle mouse parallax, and a very light canvas particle field. On
 * desktop it also renders a React Three Fiber scene with floating 3D objects.
 * Everything is subordinate to the foreground headline.
 */
export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = useReducedMotion();
  const mouse = useMouseParallax(0.06);

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let w = 0;
    let h = 0;
    const mousePos = { x: -9999, y: -9999 };
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = rect?.width ?? window.innerWidth;
      h = rect?.height ?? window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(45, Math.floor((w * h) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.5,
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 && dist > 0.01) {
          p.x += (dx / dist) * 0.3;
          p.y += (dy / dist) * 0.3;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(183, 255, 60, 0.24)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(183, 255, 60, ${(1 - d / 100) * 0.06})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(step);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mousePos.x = -9999;
      mousePos.y = -9999;
    };

    resize();
    step();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reduceMotion]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.22]">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(17,17,17,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      {/* Subtle gradient blobs with mouse parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          x: mouse.x * -20,
          y: mouse.y * -15,
        }}
        className="absolute -top-1/3 -left-40 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-ink/25 via-ink/6 to-transparent blur-[60px]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        style={{
          x: mouse.x * 20,
          y: mouse.y * 15,
        }}
        className="absolute -bottom-1/3 -right-40 h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-lime/30 via-lime/8 to-transparent blur-[60px]"
      />

      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Soft light sweep */}
      <div className="absolute -top-1/3 left-1/2 h-[120%] w-[50%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1),transparent_60%)]" />
    </div>
  );
}
