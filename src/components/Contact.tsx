"use client";

import { useState } from "react";
import { site } from "@/data/site";
import LocalTime from "./LocalTime";
import Reveal from "./Reveal";

const kinds = ["Full-time role", "Contract", "Freelance project", "Just saying hi"];

export default function Contact() {
  const [kind, setKind] = useState(kinds[0]);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("company_website")) return; // honeypot
    const subject = `${kind}: ${f.get("name")}`;
    const body = `${f.get("message")}\n\n— ${f.get("name")}\n${f.get("email")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const copy = () => {
    navigator.clipboard?.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const field =
    "w-full rounded-md border border-line bg-ink px-4 py-3 text-sm text-paper outline-none transition-colors placeholder:text-dim focus:border-paper/40";

  return (
    <section id="contact" className="sec relative overflow-hidden">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-ui/10 blur-[140px]" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="display mt-4 text-[clamp(70px,10vw,160px)]" data-agent data-type>
            Let&apos;s work
            <br />
            <span className="accent">together.</span>
          </h2>
          <p className="mt-8 max-w-md text-mute">
            Tell me what you&apos;re working on. I usually reply within one working day, and it&apos;s{" "}
            <span className="text-paper">
              <LocalTime />
            </span>{" "}
            in Mumbai right now.
          </p>

          <button
            type="button"
            onClick={copy}
            className="group mt-10 flex items-center gap-4 text-left"
            aria-label={`Copy email address ${site.email}`}
          >
            <span className="text-xl font-medium underline decoration-line underline-offset-8 transition-colors group-hover:decoration-ui sm:text-2xl">
              {site.email}
            </span>
            <span className="rounded border border-line px-2 py-1 font-mono text-[10px] text-mute">{copied ? "copied ✓" : "copy"}</span>
          </button>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="group font-mono text-xs text-mute hover:text-paper">
                  {s.label} <span className="text-dim group-hover:text-ui">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-ink-2/70 p-6 backdrop-blur sm:p-8">
            <fieldset>
              <legend className="font-mono text-[11px] uppercase tracking-widest text-dim">I&apos;m reaching out about</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {kinds.map((k) => (
                  <label
                    key={k}
                    className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ui ${
                      kind === k ? "border-paper bg-paper text-ink" : "border-line text-mute hover:text-paper"
                    }`}
                  >
                    <input type="radio" name="kind" value={k} checked={kind === k} onChange={() => setKind(k)} className="sr-only" />
                    {k}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs text-mute">Name</span>
                <input name="name" required autoComplete="name" className={field} placeholder="Your name" />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs text-mute">Email</span>
                <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-2 block text-xs text-mute">What do you need?</span>
              <textarea
                name="message"
                required
                rows={5}
                className={`${field} resize-none`}
                placeholder="The product, the team, the timeline: whatever helps."
              />
            </label>
            {/* honeypot */}
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded bg-ui py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:bg-paper"
            >
              Send message →
            </button>
            <p className="mt-3 text-center text-xs text-dim" role="status" aria-live="polite">
              {sent ? `Your email app should open now. If it didn't, write to ${site.email}.` : "Opens your email app with the message filled in."}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
