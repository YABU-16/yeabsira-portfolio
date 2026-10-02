import { useRef, useState, useEffect, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

type Interactive3DCardProps = {
  children: ReactNode;
  className?: string;
  maxRotation?: number;
  scale?: number;
  glare?: boolean;
};

/**
 * Perspective-tilt hover card. Pure CSS / Framer Motion — no R3F.
 * The card subtly rotates toward the cursor and shows a soft spotlight.
 * On mobile or reduced-motion it renders children without any effect.
 */
export default function Interactive3DCard({
  children,
  className = "",
  maxRotation = 6,
  scale = 1.02,
  glare = true,
}: Interactive3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.8 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [maxRotation, -maxRotation]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxRotation, maxRotation]);

  // Glare: track position for a radial-gradient spotlight
  const glareXPercent = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareYPercent = useTransform(springY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  if (isMobile || shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: isHovered ? scale : 1,
          transformStyle: "preserve-3d",
        }}
        transition={{ scale: { type: "spring", stiffness: 200, damping: 20 } }}
        className="relative w-full h-full"
      >
        {children}
        {/* Spotlight glare */}
        {glare && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
            style={{
              background: useTransform(
                [glareXPercent, glareYPercent],
                ([gx, gy]) =>
                  `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.12), transparent 60%)`
              ),
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ opacity: { duration: 0.3 } }}
          />
        )}
      </motion.div>
    </div>
  );
}
