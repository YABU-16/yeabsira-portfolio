import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X, Check } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import type { Project } from "../data/portfolio";
import ProjectImage from "./ProjectImage";

type ProjectModalProps = { project: Project | null; onClose: () => void };

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-7">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink/40">
        {title}
      </h4>
      {children}
    </section>
  );
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} project details`}
        >
          <button
            type="button"
            aria-label="Close project details"
            onClick={onClose}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="relative z-10 max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-[6px] border-2 border-black bg-surface"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-[4px] border-2 border-black bg-ink/70 text-paper transition-colors hover:bg-ink"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <ProjectImage
                src={project.image}
                alt={`Preview of ${project.title}`}
                title={project.title}
                subtitle={project.subtitle}
              />
            </div>

            <div className="p-6 sm:p-8">
              <span className="inline-block rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-xs font-medium text-accent-cyan">
                {project.category}
              </span>

              <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/50">
                    {project.subtitle}
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-[4px] border-2 border-black px-4 py-2 text-sm text-ink/80 transition-colors hover:border-black hover:text-ink"
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-[4px] border-2 border-black bg-ink px-4 py-2 text-sm font-black text-paper transition-all duration-300 hover:border-lime hover:bg-lime hover:text-ink"
                  >
                    Live Demo <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <DetailSection title="Overview">
                <p className="leading-relaxed text-ink/60">
                  {project.overview}
                </p>
              </DetailSection>

              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                <DetailSection title="The Problem">
                  <p className="leading-relaxed text-ink/60">
                    {project.problem}
                  </p>
                </DetailSection>
                <DetailSection title="The Solution">
                  <p className="leading-relaxed text-ink/60">
                    {project.solution}
                  </p>
                </DetailSection>
              </div>

              <DetailSection title="Key Features">
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-ink/70"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-blue/15 text-accent-blue">
                        <Check className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </DetailSection>

              <DetailSection title="Technologies">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-black/10 bg-surface px-3.5 py-1.5 text-sm text-ink/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </DetailSection>

              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                <DetailSection title="Challenges">
                  <p className="leading-relaxed text-ink/60">
                    {project.challenges}
                  </p>
                </DetailSection>
                <DetailSection title="Results">
                  <p className="leading-relaxed text-ink/60">
                    {project.results}
                  </p>
                </DetailSection>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
