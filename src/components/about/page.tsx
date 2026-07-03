"use client";

import { useEffect, useRef } from "react";
import { Code2, Database, Cloud, MapPin, ArrowUpRight } from "lucide-react";
import "./about.css";

/* same accent token as Header & Hero */
const ACCENT = "#3A36E0";

const disciplines = [
  {
    icon: Code2,
    n: "01",
    title: "Frontend Development",
    desc: "Responsive, interactive interfaces built with React, Next.js and Vue — with a focus on performance and accessibility.",
    tags: ["React", "Next.js", "Vue", "Tailwind"],
  },
  {
    icon: Database,
    n: "02",
    title: "Backend Development",
    desc: "Robust APIs and server-side applications using Node.js, TypeScript and modern database technologies.",
    tags: ["Node.js", "TypeScript", "PostgreSQL", "Prisma"],
  },
  {
    icon: Cloud,
    n: "03",
    title: "DevOps Engineering",
    desc: "CI/CD pipelines, container orchestration and cloud infrastructure with Docker, Kubernetes, AWS and GitOps.",
    tags: ["Docker", "Kubernetes", "AWS", "GitOps"],
  },
];

const About = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    root.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      style={{ ["--accent" as string]: ACCENT }}
      className="bg-white px-6 py-28 text-neutral-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-white md:px-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* header */}
        <div className="reveal">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
            01 — About
          </span>
          <h2 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl">
            A complete approach to building{" "}
            <span className="text-[var(--accent)]">software</span>.
          </h2>
        </div>

        {/* intro */}
        <div className="mt-14 grid gap-12 md:grid-cols-12">
          <div className="reveal md:col-span-7" style={{ transitionDelay: "80ms" }}>
            <p className="text-2xl font-semibold leading-snug tracking-tight md:text-[1.7rem]">
              I build{" "}
              <span className="text-[var(--accent)]">scalable web applications</span>{" "}
              with modern technologies — and ship them through{" "}
              <span className="text-[var(--accent)]">efficient deployment pipelines</span>.
            </p>
          </div>
          <div
            className="reveal space-y-5 text-neutral-500 dark:text-neutral-400 md:col-span-5"
            style={{ transitionDelay: "160ms" }}
          >
            <p>
              A full-stack developer and DevOps engineer based in Mumbai. With
              experience across frontend, backend and operations, I bring a
              comprehensive approach to software — from concept to deployment and
              maintenance.
            </p>
            <div className="flex items-center gap-2 font-mono text-sm text-neutral-700 dark:text-neutral-300">
              <MapPin className="h-4 w-4 text-[var(--accent)]" />
              Mumbai, Maharashtra · India
            </div>
          </div>
        </div>

        {/* discipline cards */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {disciplines.map((d, i) => {
            const Icon = d.icon;
            return (
              <div
                key={d.title}
                className="reveal group relative overflow-hidden rounded-2xl border border-black/10 bg-neutral-50/60 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)] hover:shadow-[0_20px_50px_-20px_rgba(58,54,224,0.45)] dark:border-white/10 dark:bg-white/[0.02]"
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <div className="mb-5 flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-sm text-neutral-300 dark:text-neutral-600">
                    {d.n}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-bold">{d.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {d.desc}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {d.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-black/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:border-white/10 dark:text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 -translate-y-1 translate-x-1 text-[var(--accent)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;