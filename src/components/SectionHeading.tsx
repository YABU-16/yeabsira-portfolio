import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

/**
 * Consistent section heading — eyebrow label, large title and optional
 * description, used across all sections for a cohesive hierarchy.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignClasses =
    align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-4 ${alignClasses}`}>
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-surface-2 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-ink/60">
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent-blue"
              aria-hidden="true"
            />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="max-w-2xl text-balance text-3xl font-black leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={`max-w-xl text-base leading-relaxed text-ink/55 sm:text-lg ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
