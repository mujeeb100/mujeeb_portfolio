"use client";

import { Github, Twitter, Mail, Linkedin } from "lucide-react";

const ACCENT = "#3A36E0";

const socials = [
  { icon: Github, href: "https://github.com/mujeeb100", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/mujeeb20010?s=21", label: "X" },
  { icon: Mail, href: "mailto:muzeeb100@yahoo.co.in", label: "Email" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mujeebansari786/", label: "LinkedIn" },
];

const Footer = () => {
  return (
    <footer
      style={{ ["--accent" as string]: ACCENT }}
      className="border-t border-black/10 bg-white px-6 py-10 text-neutral-700 transition-colors duration-300 dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-300 md:px-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* brand */}
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--accent)] font-mono text-xs font-bold text-white">
              MA
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
              © {new Date().getFullYear()} Mujeeb Ansari
            </span>
          </div>

          {/* socials */}
          <div className="flex items-center gap-2">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-black/10 text-neutral-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-white/10 dark:text-neutral-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 border-t border-black/5 pt-6 text-center dark:border-white/5">
          <p className="text-sm text-neutral-400">
            Built with care in Mumbai — let&apos;s build something amazing
            together.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;