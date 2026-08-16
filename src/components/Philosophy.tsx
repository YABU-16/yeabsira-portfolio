import { motion } from "framer-motion";
import { philosophy } from "../data/portfolio";
import Reveal from "./Reveal";

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface blur-[80px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-black leading-[1.1] tracking-tight text-ink sm:text-5xl">
              "{philosophy.heading}"
            </h2>
          </div>
        </Reveal>

        {/* Principles */}
        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
          {philosophy.principles.map((principle, i) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative border-t border-black/10 pt-10 md:pt-14"
            >
              <span className="text-5xl font-black tracking-tight text-ink/[0.15] transition-colors duration-500 group-hover:text-lime/70 sm:text-6xl">
                {principle.number}
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink">
                {principle.title}
              </h3>
              <div className="mt-2 h-px w-10 bg-lime transition-all duration-500 group-hover:w-16" />
              <p className="mt-5 leading-relaxed text-ink/55">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
