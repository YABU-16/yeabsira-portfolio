import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, profile } from "../data/portfolio";
import { useScrolled } from "../hooks/usePrimitives";

const SECTION_IDS = [
  "home",
  "about",
  "skills",
  "projects",
  "services",
  "contact",
];

export default function Navbar() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Primary"
          className={`flex items-center justify-between px-4 py-2.5 sm:px-6 ${
            scrolled
              ? "border-b-2 border-black/12 bg-surface/90 shadow-card backdrop-blur-xl"
              : "border-b-2 border-black/12 bg-surface/70"
          }`}
        >
          <a
            href="#home"
            className="flex items-center gap-2.5 text-base font-black tracking-tight text-ink"
            onClick={(e) => {
              e.preventDefault();
              goTo("#home");
            }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-xs font-black text-ink">
              {profile.firstName.charAt(0)}
            </span>
            <span className="hidden sm:inline">{profile.name}</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(link.href);
                }}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  active === link.href.slice(1)
                    ? "text-ink"
                    : "text-ink/55 hover:text-ink"
                }`}
              >
                {active === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-none bg-lime"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            ))}

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                goTo("#contact");
              }}
              className="ml-3 inline-flex items-center gap-2 rounded-[4px] border-2 border-black bg-ink px-5 py-2.5 text-sm font-black text-paper transition-all duration-300 hover:border-lime hover:bg-lime hover:text-ink hover:shadow-lime"
            >
              Let's Talk
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-[4px] border-2 border-black text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[74px] z-40 mx-4 lg:hidden"
          >
            <div className="rounded-[6px] border-2 border-black bg-surface p-4 shadow-card">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        goTo(link.href);
                      }}
                      className="block rounded-[4px] px-4 py-3 text-base font-medium text-ink/70 transition-colors hover:bg-black/5 hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
                <li className="mt-2">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      goTo("#contact");
                    }}
                    className="flex items-center justify-center rounded-[4px] border-2 border-black bg-ink px-4 py-3 text-base font-black text-paper"
                  >
                    Let's Talk
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
