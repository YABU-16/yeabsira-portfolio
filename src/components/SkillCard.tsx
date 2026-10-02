import { motion } from "framer-motion";
import type { Skill } from "../data/portfolio";
import { TechGlyph } from "./TechIcon";

type SkillCardProps = { skill: Skill; index: number };

/**
 * Individual technology card — lifts, glows and animates its glyph on hover.
 */
export default function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: (index % 4) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative flex items-center gap-3.5 overflow-hidden rounded-[6px] border-2 border-black bg-surface px-5 py-4 transition-all duration-300 hover:shadow-ink hover:-translate-y-0.5"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Hover glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120px_at_20%_0%,rgba(183,255,60,0.08),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Icon */}
      <div
        className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] border-2 border-black bg-surface-2 text-ink/80 transition-all duration-500 group-hover:scale-110 group-hover:text-ink group-hover:[transform:translateZ(8px)_rotateY(3deg)]"
        style={{ transformStyle: "preserve-3d" }}
      >        <TechGlyph name={skill.icon} size={22} />
      </div>

      {/* Name */}
      <div className="relative">
        <div className="text-sm font-medium text-ink/75 transition-colors duration-300 group-hover:text-ink">
          {skill.name}
        </div>
      </div>

      {/* Corner dot */}
      <span
        aria-hidden="true"
        className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-accent-blue/0 transition-colors duration-300 group-hover:bg-accent-blue/70"
      />
    </motion.div>
  );
}
