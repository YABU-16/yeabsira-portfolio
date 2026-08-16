import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import type { Service } from "../data/portfolio";
import { TechGlyph } from "./TechIcon";

type ServiceCardProps = { service: Service; index: number };

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[6px] border-2 border-black bg-surface p-7 transition-all duration-300 hover:shadow-ink hover:-translate-y-0.5"
    >
      {/* Hover glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(220px_at_20%_0%,rgba(183,255,60,0.12),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Icon */}
      <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-[4px] border-2 border-black bg-surface text-ink/80 transition-all duration-500 group-hover:scale-110 group-hover:text-ink">
        <TechGlyph name={service.icon} size={26} />
      </div>

      <h3 className="relative text-lg font-semibold tracking-tight text-ink">
        {service.title}
      </h3>
      <p className="relative mt-3 leading-relaxed text-ink/55">
        {service.description}
      </p>

      {/* Feature list */}
      <ul className="relative mt-6 space-y-2.5">
        {service.features.map((f) => (
          <li
            key={f}
            className="flex items-center gap-2.5 text-sm text-ink/60"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-blue/15 text-accent-blue">
              <Check className="h-3 w-3" />
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* Link */}
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          document
            .querySelector("#contact")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="relative mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-ink/70 transition-all duration-300 hover:gap-2.5 hover:text-ink"
      >
        Start a project
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </motion.div>
  );
}
