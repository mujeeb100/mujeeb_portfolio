"use client";

import { useEffect, useRef } from "react";
import { Github, Twitter, Mail, Linkedin, ArrowUpRight } from "lucide-react";
import "./contact.css";

const ACCENT = "#3A36E0";

const links = [
  { icon: Github, label: "GitHub", handle: "mujeeb100", href: "https://github.com/mujeeb100" },
  { icon: Twitter, label: "X (Twitter)", handle: "@mujeeb_ansari", href: "https://x.com/mujeeb20010?s=21" },
  { icon: Mail, label: "Email", handle: "muzeeb100@yahoo.co.in", href: "mailto:muzeeb100@yahoo.co.in" },
  { icon: Linkedin, label: "LinkedIn", handle: "Mujeeb-Ansari", href: "https://www.linkedin.com/in/mujeebansari786/" },
];

const Contact = () => {
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
      id="contact"
      ref={root}
      style={{ ["--accent" as string]: ACCENT }}
      className="bg-white px-6 py-28 text-neutral-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-white"
    >
      <div className="mx-auto max-w-3xl text-center">
        <div className="reveal">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
            06 — Contact
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            Let&apos;s build something{" "}
            <span className="text-[var(--accent)]">great</span> together.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-neutral-500 dark:text-neutral-400">
            Open to projects, collaborations, or just a friendly hello. Reach out
            on any of these.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {links.map((l, i) => {
            const Icon = l.icon;
            return (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group flex items-center gap-4 rounded-2xl border border-black/10 bg-neutral-50/50 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_20px_50px_-25px_rgba(58,54,224,0.45)] dark:border-white/10 dark:bg-white/[0.02]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                    {l.label}
                  </p>
                  <p className="truncate font-semibold">{l.handle}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-neutral-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)] dark:text-neutral-600" />
              </a>
            );
          })}
        </div>

        <a
          href="mailto:muzeeb100@yahoo.co.in"
          className="reveal mt-10 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-3.5 font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          Email me directly <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
};

export default Contact;