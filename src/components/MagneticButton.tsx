import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  className?: string;
  ariaLabel?: string;
};

/**
 * Button with a subtle magnetic hover effect. Great for primary CTAs.
 * Respects prefers-reduced-motion (falls back to a static button).
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  const handleMove = (e: MouseEvent) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * 0.25, y: y * 0.3 });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[4px] border-2 border-black px-7 py-3.5 text-sm font-medium transition-all duration-300";

  const styles =
    variant === "primary"
      ? "bg-ink text-paper shadow-card hover:shadow-ink hover:-translate-y-0.5"
      : "border-2 border-black bg-surface text-ink hover:bg-ink hover:text-paper";

  const content = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(110deg,transparent,transparent_40%,rgba(255,255,255,0.5)_50%,transparent_60%,transparent)] translate-x-[-150%] transition-transform duration-700 ease-out group-hover:translate-x-[150%]"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  const inner = (
    <motion.span
      ref={ref as React.RefObject<HTMLSpanElement>}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={reduceMotion ? { x: 0, y: 0 } : offset}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className={`${base} ${styles} ${className}`}
    >
      {content}
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className="inline-flex"
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }
  return (
    <span className="inline-flex" onClick={onClick}>
      {inner}
    </span>
  );
}
