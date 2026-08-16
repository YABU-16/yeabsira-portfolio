import { Github, Linkedin, Mail } from "lucide-react";
import { profile, socials } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[30rem] w-[40rem] -translate-x-1/2 rounded-full bg-ink blur-[80px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Left: heading + direct links */}
          <div>
            <SectionHeading eyebrow="Contact" title="Have an idea?" />
            <Reveal delay={0.08}>
              <p className="mt-5 max-w-md text-xl leading-relaxed text-ink/60">
                Let's turn it into something people remember.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 max-w-md leading-relaxed text-ink/45">
                Whether you need a website, a full product, or just want to talk
                about your idea — my inbox is open. I usually reply within a
                day.
              </p>
            </Reveal>

            {/* Direct social links */}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={socials.email}
                className="group flex items-center gap-4 rounded-[6px] border-2 border-black bg-surface p-4 transition-all duration-300 hover:shadow-ink hover:-translate-y-0.5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-blue/12 text-accent-blue transition-transform duration-300 group-hover:scale-110">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm text-ink/45">Email</div>
                  <div className="font-medium text-ink">{profile.email}</div>
                </div>
              </a>
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-[6px] border-2 border-black bg-surface p-4 transition-all duration-300 hover:shadow-ink hover:-translate-y-0.5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-ink/80 transition-transform duration-300 group-hover:scale-110">
                  <Github className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm text-ink/45">GitHub</div>
                  <div className="font-medium text-ink">View my code</div>
                </div>
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-[6px] border-2 border-black bg-surface p-4 transition-all duration-300 hover:shadow-ink hover:-translate-y-0.5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-cyan/12 text-accent-cyan transition-transform duration-300 group-hover:scale-110">
                  <Linkedin className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm text-ink/45">LinkedIn</div>
                  <div className="font-medium text-ink">Connect with me</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right: form */}
          <Reveal direction="right" className="lg:mt-2">
            <div className="rounded-[6px] border-2 border-black bg-surface p-6 sm:p-9">
              <h3 className="text-xl font-black tracking-tight text-ink">
                Send a message
              </h3>
              <p className="mt-2 mb-7 text-sm text-ink/50">
                Prefer email? Reach me directly at{" "}
                <a
                  href={socials.email}
                  className="text-accent-cyan underline-offset-4 hover:underline"
                >
                  {profile.email}
                </a>
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
