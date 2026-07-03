"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Sun, Moon, ArrowUpRight } from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   Change ONE value to re-theme the whole nav.
   Try: "#2B2BFF" (cobalt) · "#1A6B4F" (emerald) · "#E0531F" (vermilion)
   ────────────────────────────────────────────────────────────── */
const ACCENT = "#3A36E0";

type NavLink = { id: string; label: string };

const navLinks: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "consultation", label: "Hire Me" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const linkRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  /* ── theme init ── */
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const prefersDark =
      !theme && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (theme === "dark" || prefersDark) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  /* ── smooth scroll ── */
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  /* ── scroll: progress bar, blur state, active section ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (y / docH) * 100 : 0);
      setScrolled(y > 24);

      const offsets: Record<string, number> = {};
      navLinks.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) offsets[id] = el.offsetTop - 120;
      });
      const current = navLinks.findLast((l) => y >= (offsets[l.id] ?? 0));
      if (current) setActiveSection(current.id);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── move the sliding indicator under the active link ── */
  const moveIndicator = useCallback(() => {
    const el = linkRefs.current[activeSection];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    }
  }, [activeSection]);

  useEffect(() => {
    moveIndicator();
    window.addEventListener("resize", moveIndicator);
    return () => window.removeEventListener("resize", moveIndicator);
  }, [moveIndicator]);

  /* lock scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      style={{ ["--accent" as string]: ACCENT }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* scroll progress */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-transparent">
        <div
          className="h-full bg-[var(--accent)] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`mt-3 flex items-center justify-between rounded-2xl border px-3 py-2.5 transition-all duration-500 sm:px-4 ${
            scrolled
              ? "border-black/10 bg-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/70"
              : "border-transparent bg-transparent"
          }`}
        >
          {/* ── brand ── */}
          <button
            onClick={() => handleScroll("home")}
            className="group flex items-center gap-2.5"
          >
            <span
              className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--accent)] font-mono text-sm font-bold tracking-tight text-white transition-transform duration-300 group-hover:-rotate-6"
            >
              MA
            </span>
            <span className="flex flex-col items-start leading-none">
              <span className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white">
                Mujeeb Ansari
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                Full Stack Dev
              </span>
            </span>
          </button>

          {/* ── desktop nav with sliding indicator ── */}
          <nav className="relative hidden items-center md:flex">
            <span
              aria-hidden
              className="absolute top-1/2 -z-0 h-8 -translate-y-1/2 rounded-full bg-[var(--accent)]/10 transition-all duration-300 ease-[cubic-bezier(.4,.6,.2,1)]"
              style={{
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.opacity,
              }}
            />
            {navLinks.map((link) => {
              const active = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  ref={(el) => {
                    linkRefs.current[link.id] = el;
                  }}
                  onClick={() => handleScroll(link.id)}
                  className={`relative z-10 rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300 ${
                    active
                      ? "font-semibold text-[var(--accent)]"
                      : "font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* ── right actions ── */}
          <div className="flex items-center gap-2">
            {/* status pill */}
            <span className="hidden items-center gap-2 rounded-full border border-black/10 px-3 py-1.5 dark:border-white/10 lg:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Available
              </span>
            </span>

            {/* theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-xl border border-black/10 text-neutral-700 transition-all duration-300 hover:bg-neutral-100 active:scale-95 dark:border-white/10 dark:text-yellow-300 dark:hover:bg-white/5"
            >
              <span className="relative h-5 w-5">
                <Sun
                  className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
                    isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                  }`}
                />
                <Moon
                  className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
                    isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                  }`}
                />
              </span>
            </button>

            {/* hire me CTA */}
            <button
              onClick={() => handleScroll("consultation")}
              className="hidden items-center gap-1 rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[var(--accent)] sm:flex dark:bg-white dark:text-neutral-900 dark:hover:bg-[var(--accent)] dark:hover:text-white"
            >
              Hire Me <ArrowUpRight className="h-4 w-4" />
            </button>

            {/* mobile toggle */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Menu"
              className="grid h-9 w-9 place-items-center rounded-xl border border-black/10 text-neutral-800 dark:border-white/10 dark:text-white md:hidden"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── mobile overlay menu ── */}
      <div
        className={`fixed inset-0 top-0 z-40 origin-top bg-white/95 backdrop-blur-2xl transition-all duration-500 dark:bg-neutral-950/95 md:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col justify-center gap-1 px-8">
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              onClick={() => handleScroll(link.id)}
              style={{ transitionDelay: isOpen ? `${i * 55 + 120}ms` : "0ms" }}
              className={`flex items-center justify-between border-b border-black/5 py-4 text-left transition-all duration-500 dark:border-white/5 ${
                isOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
              }`}
            >
              <span
                className={`text-3xl font-semibold tracking-tight ${
                  activeSection === link.id
                    ? "text-[var(--accent)]"
                    : "text-neutral-900 dark:text-white"
                }`}
              >
                {link.label}
              </span>
              <span className="font-mono text-xs text-neutral-400">
                0{i + 1}
              </span>
            </button>
          ))}
          <a
            href="mailto:muzeeb100@yahoo.co.in"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-base font-semibold text-white"
          >
            Get in touch <ArrowUpRight className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}