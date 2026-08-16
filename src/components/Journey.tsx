import { motion } from "framer-motion";
import { journey } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Journey() {
  return (
    <section id="journey" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Learning Journey"
          title="Every year, a step further."
          description="A timeline of how I went from first lines of code to shipping real products."
          align="center"
        />

        <div className="relative mt-16">
          {/* Vertical line */}
          <div
            aria-hidden="true"
            className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-ink/50 via-black/20 to-ink/30 sm:left-1/2 sm:-translate-x-1/2"
          />

          <div className="space-y-10">
            {journey.map((milestone, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={milestone.year}
                  className={`relative flex sm:items-start ${
                    left ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Node */}
                  <div className="absolute left-5 top-1 z-10 -translate-x-1/2 sm:left-1/2">
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: 0.1,
                      }}
                      className="block h-4 w-4 rounded-full border-2 border-black bg-lime shadow-[0_0_0_4px_rgba(183,255,60,0.2)]"
                    />
                  </div>

                  {/* Card */}
                  <Reveal
                    direction={left ? "right" : "left"}
                    className={`ml-12 w-full sm:ml-0 sm:w-[calc(50%-2.5rem)] ${
                      left ? "sm:mr-auto" : "sm:ml-auto"
                    }`}
                  >
                    <div className="group rounded-[6px] border-2 border-black bg-surface p-6 transition-all duration-300 hover:shadow-ink hover:-translate-y-0.5">
                      <div
                        className={`mb-3 text-sm font-semibold tracking-widest ${
                          left ? "text-accent-cyan" : "text-accent-blue"
                        }`}
                      >
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight text-ink">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-ink/55">
                        {milestone.description}
                      </p>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
