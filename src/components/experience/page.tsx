"use client";

import { useEffect, useRef } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import "./experience.css";

/* same accent token as the rest of the site */
const ACCENT = "#3A36E0";

type Exp = {
  title: string;
  company: string;
  period: string;
  location: string;
  current?: boolean;
  projects: { name: string; link?: string }[];
  stack: string[];
  details: string[];
};

const experiences: Exp[] = [
  /* ───────────── NEW ENTRY — edit the placeholder fields marked /* EDIT */
  {
    title: "Software Engineer" /* EDIT: your real title */,
    company: "Vodafone Idea (Vi)" /* EDIT: employer / vendor */,
    period: "2024 — Present" /* EDIT */,
    location: "Mumbai, India",
    current: true,
    projects: [
      { name: "ViCare AI Assist", link: "https://vicare.vodafoneidea.com" },
      { name: "Service IQ (POC)" },
    ],
    stack: ["React", "TypeScript", "AI / LLM", "REST APIs", "Tailwind CSS"] /* EDIT */,
    details: [
      "Built AI-assisted self-care and support flows for the ViCare customer platform." /* EDIT */,
      "Developed a Service IQ proof-of-concept to validate intelligent service workflows." /* EDIT */,
      "Focused on responsive, accessible UI and smooth integration with backend services." /* EDIT */,
    ],
  },
  {
    title: "Senior Front-end React Developer",
    company: "Vistra International Expansion India Pvt Ltd.",
    period: "May 2023 — Sep 2024",
    location: "Mumbai, India",
    projects: [{ name: "Payroll Management System", link: "https://www.onepayroll.net/" }],
    stack: ["React.js", "Redux", "TypeScript", "Tailwind CSS"],
    details: [
      "Built a payroll management system to automate employee payments and benefits.",
      "Ensured tax compliance and reduced payroll processing errors.",
      "Integrated with HR systems for seamless data flow.",
      "Created employee portals for payslip access and reporting.",
      "Delivered scalable architecture supporting small to large enterprises.",
    ],
  },
  {
    title: "Front-end Developer",
    company: "Psychx86 Technologies LLP",
    period: "Jul 2022 — Mar 2023",
    location: "Mumbai, India · On-site at Niyogin FinTech",
    projects: [{ name: "Niyogin Fintech Portal", link: "https://www.niyogin.com/" }],
    stack: ["Vue.js", "Vuex", "Bootstrap"],
    details: [
      "Managed complex financial dashboard layouts and component architecture.",
      "Collaborated with cross-functional teams to deliver performant UIs.",
      "Focused on performance optimization and intuitive user experiences.",
    ],
  },
  {
    title: "Front-end Developer",
    company: "Cloudage Software Solution",
    period: "May 2021 — May 2022",
    location: "Mumbai, India",
    projects: [{ name: "Cloudage Web Applications", link: "http://cloudage.tech/" }],
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    details: [
      "Worked closely with stakeholders to verify product functionality and UI expectations.",
      "Contributed to building modular, responsive web interfaces based on project specs.",
    ],
  },
  {
    title: "UI Developer",
    company: "Oblix Technologies",
    period: "May 2019 — May 2021",
    location: "Mumbai, India",
    projects: [{ name: "Responsive Website Development" }],
    stack: ["jQuery", "Bootstrap", "CSS3", "HTML5"],
    details: [
      "Designed intuitive and visually appealing web interfaces using modern CSS frameworks.",
      "Integrated third-party plugins and tools to enhance interactivity.",
      "Focused on cross-browser compatibility and responsive layouts.",
    ],
  },
];


const WorkExperience = () => {
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
      id="experience"
      ref={root}
      style={{ ["--accent" as string]: ACCENT }}
      className="bg-white px-6 py-28 text-neutral-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-white md:px-20"
    >
      <div className="mx-auto max-w-5xl">
        {/* header */}
        <div className="reveal mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
            03 — Experience
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            Where I&apos;ve <span className="text-[var(--accent)]">worked</span>.
          </h2>
        </div>

        {/* timeline */}
        <div className="tl">
          {experiences.map((exp, idx) => (
            <div key={idx} className="tl-entry reveal" style={{ transitionDelay: `${idx * 80}ms` }}>
              {/* left: date */}
              <div className="tl-date">
                <span className="font-mono text-sm text-neutral-500 dark:text-neutral-400">
                  {exp.period}
                </span>
                {exp.current && (
                  <span className="tl-now mt-2 inline-flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      Current
                    </span>
                  </span>
                )}
              </div>

              {/* line + node + content */}
              <div className="tl-body group">
                <span className="tl-node" />
                <div className="tl-card">
                  <h3 className="text-xl font-bold tracking-tight">{exp.title}</h3>
                  <p className="mt-0.5 font-medium text-[var(--accent)]">{exp.company}</p>
                  <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-neutral-400">
                    <MapPin className="h-3.5 w-3.5" />
                    {exp.location}
                  </p>

                  {/* projects */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.projects.map((p) =>
                      p.link ? (
                        <a
                          key={p.name}
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent)]/10 px-3 py-1.5 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-white"
                        >
                          {p.name}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <span
                          key={p.name}
                          className="inline-flex items-center rounded-lg bg-black/5 px-3 py-1.5 text-sm font-medium text-neutral-600 dark:bg-white/5 dark:text-neutral-300"
                        >
                          {p.name}
                        </span>
                      )
                    )}
                  </div>

                  {/* stack tags */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-black/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:border-white/10 dark:text-neutral-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* details */}
                  <ul className="mt-5 space-y-2">
                    {exp.details.map((d, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;