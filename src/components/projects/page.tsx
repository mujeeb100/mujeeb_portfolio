"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import "./projects.css";

const ACCENT = "#3A36E0";

type Project = {
  title: string;
  description: string[];
  stack: string[];
  live?: string;
  github?: string;
};

const projects: Project[] = [
  {
    title: "Payroll Management System",
    description: [
      "A web-based solution that automates employee salary processing, tax calculations, leave adjustments and payslip generation.",
      "Admins can configure pay cycles, manage employee records and track salary disbursement history — with compliance reporting for audits and HR.",
    ],
    stack: ["React", "TypeScript", ".NET", "JWT", "RTK Query", "i18n", "Tailwind"],
    live: "#",
    github: "#",
  },
  {
    title: "Niyogin Fintech Portal",
    description: [
      "A comprehensive platform for managing financial services — loan applications, customer accounts and transaction history.",
      "Features real-time analytics, user-friendly dashboards and secure transaction processing, with robust security and regulatory compliance.",
    ],
    stack: ["Vue", "TypeScript", "Nuxt.js", "i18n", "Tailwind"],
    live: "#",
    github: "#",
  },
  {
    title: "Saffola Oil Official Website",
    description: [
      "A modern, responsive website for Saffola Oil showcasing products, health benefits and recipes.",
      "Clean design, easy navigation and engaging content — built with a focus on user experience and brand consistency.",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "React", "Redux", "Tailwind"],
    live: "#",
    github: "#",
  },
];

const Projects = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 }
    );
    root.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={root}
      style={{ ["--accent" as string]: ACCENT }}
      className="bg-white px-6 py-28 text-neutral-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-white md:px-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="reveal mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
            04 — Projects
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            Featured <span className="text-[var(--accent)]">projects</span>.
          </h2>
        </div>

        <div className="space-y-6">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className="proj-card reveal group relative overflow-hidden rounded-2xl border border-black/10 bg-neutral-50/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_25px_60px_-25px_rgba(58,54,224,0.45)] dark:border-white/10 dark:bg-white/[0.02]"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              {/* accent left bar on hover */}
              <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-[var(--accent)] transition-transform duration-300 group-hover:scale-y-100" />

              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-neutral-300 dark:text-neutral-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-[var(--accent)]">
                    {p.title}
                  </h3>
                </div>

                <div className="flex gap-2">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--accent)] dark:bg-white dark:text-neutral-900 dark:hover:bg-[var(--accent)] dark:hover:text-white"
                    >
                      Live <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-black/15 px-3.5 py-2 text-xs font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-white/15"
                    >
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                  )}
                </div>
              </div>

              <div className="mt-4 max-w-3xl space-y-2 text-neutral-600 dark:text-neutral-400">
                {p.description.map((para, j) => (
                  <p key={j} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-black/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:border-white/10 dark:text-neutral-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;