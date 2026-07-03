"use client";

import { useEffect, useRef } from "react";
import { Code2, Database, Cloud } from "lucide-react";
import "./skills.css";

const ACCENT = "#3A36E0";

const skillsData = [
  {
    category: "Frontend",
    icon: Code2,
    skills: [
      "HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Vue.js",
      "Vuex", "Redux", "Bootstrap", "Material UI", "Nuxt.js", "Next.js", "Tailwind CSS",
    ],
  },
  {
    category: "Backend",
    icon: Database,
    skills: ["Node.js", "PostgreSQL", "Prisma", "Redis", "Kafka"],
  },
  {
    category: "DevOps",
    icon: Cloud,
    skills: ["Docker", "Kubernetes", "AWS", "GitOps", "ArgoCD"],
  },
];

const TechnicalSkills = () => {
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
      id="skills"
      ref={root}
      style={{ ["--accent" as string]: ACCENT }}
      className="bg-neutral-50 px-6 py-28 text-neutral-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-white md:px-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="reveal mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
            05 — Skills
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            Technical <span className="text-[var(--accent)]">toolkit</span>.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {skillsData.map((group, gi) => {
            const Icon = group.icon;
            return (
              <div
                key={group.category}
                className="reveal rounded-2xl border border-black/10 bg-white p-7 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_20px_50px_-25px_rgba(58,54,224,0.4)] dark:border-white/10 dark:bg-white/[0.02]"
                style={{ transitionDelay: `${gi * 100}ms` }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-bold">{group.category}</h3>
                  </div>
                  <span className="font-mono text-xs text-neutral-400">
                    {String(group.skills.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="cursor-default rounded-lg border border-black/10 bg-black/[0.02] px-3 py-1.5 text-sm font-medium text-neutral-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;