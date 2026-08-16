import { skillCategories } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SkillCard from "./SkillCard";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      {/* subtle divider glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/12 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills & Tools"
          title="A versatile toolkit, built project by project."
          description="I don't measure skill with progress bars — I prove it through the products and experiences I ship."
          align="center"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {skillCategories.map((category, ci) => (
            <Reveal key={category.title} delay={ci * 0.08}>
              <div className="h-full rounded-[6px] border-2 border-black bg-surface p-7 transition-all duration-300 hover:shadow-ink hover:-translate-y-0.5">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-[4px] border-2 border-black bg-lime text-xs font-black text-ink">
                    {String(ci + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-ink">
                    {category.title}
                  </h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {category.skills.map((skill, i) => (
                    <SkillCard key={skill.name} skill={skill} index={i} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
