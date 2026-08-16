import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "../data/portfolio";
import ProjectImage from "./ProjectImage";

type ProjectCardProps = {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
};

const ACCENTS: Record<string, string> = {
  "E-commerce": "#B7FF3C",
  "Web App": "#111111",
  Concept: "#C4FF45",
};

export default function ProjectCard({
  project,
  index,
  onOpen,
}: ProjectCardProps) {
  const accent = ACCENTS[project.category] ?? "#B7FF3C";

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: (index % 2) * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5 }}
      data-cursor
      className="group relative overflow-hidden rounded-[6px] border-2 border-black bg-surface shadow-card transition-colors duration-500 hover:border-black hover:shadow-ink"
    >
      {/* Visual */}
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open details for ${project.title}`}
        className="relative block aspect-[16/10] w-full overflow-hidden text-left"
      >
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <ProjectImage
            src={project.image}
            alt={`Preview of ${project.title} — ${project.subtitle}`}
            title={project.title}
            subtitle={project.subtitle}
            accent={accent}
          />
        </div>

        {/* Hover overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full border-2 border-black bg-ink/60 opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="h-5 w-5 text-ink" />
        </span>

        {/* Category chip */}
        <span className="absolute left-5 top-5 rounded-full border-2 border-black bg-ink/60 px-3 py-1 text-xs font-medium text-paper backdrop-blur">
          {project.category}
        </span>
      </button>

      {/* Body */}
      <div className="relative p-6 sm:p-7">
        <h3 className="text-xl font-black tracking-tight text-ink sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-accent-cyan/80">{project.subtitle}</p>
        <p className="mt-4 leading-relaxed text-ink/55">
          {project.description}
        </p>

        {/* Technology tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <span
              key={tech}
              className="rounded-full border-2 border-black bg-surface-2 px-3 py-1 text-xs text-ink/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-lime hover:text-ink"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="group/btn inline-flex items-center gap-1.5 rounded-[4px] border-2 border-black bg-ink px-4 py-2 text-sm font-black text-paper transition-all duration-300 hover:gap-2.5 hover:border-lime hover:bg-lime hover:text-ink"
          >
            View Details
            <ArrowUpRight className="h-4 w-4" />
          </button>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-[4px] border-2 border-black px-4 py-2 text-sm text-ink/70 transition-colors hover:border-black hover:text-ink"
          >
            <Github className="h-4 w-4" />
            Code
          </a>
        </div>
      </div>
    </motion.article>
  );
}
