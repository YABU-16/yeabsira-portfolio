import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";
import { navLinks, profile, socials } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="relative border-t-2 border-black/12 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          {/* Brand */}
          <div>
            <a
              href="#home"
              className="flex items-center gap-2.5 text-base font-black tracking-tight text-ink"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-xs font-black text-ink">
                {profile.firstName.charAt(0)}
              </span>
              {profile.name}
            </a>
            <p className="mt-3 max-w-xs text-sm text-ink/45">
              Building digital experiences with code and creativity.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-ink/55 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              { href: socials.github, icon: Github, label: "GitHub" },
              { href: socials.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: socials.twitter, icon: Twitter, label: "Twitter" },
              { href: socials.email, icon: Mail, label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black text-ink/70 transition-all duration-300 hover:border-lime hover:text-lime"
              >
                <s.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t-2 border-black/12 pt-6 sm:flex-row">
          <p className="text-sm text-ink/40">
            © 2026 {profile.name}. All rights reserved.
          </p>
          <a
            href="#home"
            className="group inline-flex items-center gap-2 text-sm text-ink/50 transition-colors hover:text-ink"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-lime">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
