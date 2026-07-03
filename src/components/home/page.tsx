"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import "./home.css";
import mujeebPhoto from "../../../public/mujeeb.jpg";
import Image from "next/image";
/* same accent token as the Header — change in one place to re-theme */
const ACCENT = "#3A36E0";

const ROLES = ["Full Stack Developer", "DevOps Engineer", "Frontend Engineer"];

function Home1() {
  /* ── rotating typewriter ── */
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[idx % ROLES.length];
    const speed = deleting ? 45 : 95;
    const timer = setTimeout(() => {
      const next = deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);
      setText(next);
      if (!deleting && next === current) setTimeout(() => setDeleting(true), 1500);
      else if (deleting && next === "") {
        setDeleting(false);
        setIdx((v) => v + 1);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, idx]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      style={{ ["--accent" as string]: ACCENT }}
      className="hero-bg relative flex min-h-screen items-center overflow-hidden bg-white px-6 py-28 text-neutral-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-white lg:px-20"
    >
      {/* ambient accent glow */}
      <div className="hero-glow pointer-events-none absolute -top-32 right-0 h-[480px] w-[480px] rounded-full bg-[var(--accent)] opacity-[0.14] blur-[120px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ── LEFT ── */}
        <div>
          <div className="rise" style={{ animationDelay: "0ms" }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1.5 dark:border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                Available for work · Mumbai, IN
              </span>
            </span>
          </div>

          <h1
            className="rise mt-7 text-5xl font-extrabold leading-[0.95] tracking-tight lg:text-7xl"
            style={{ animationDelay: "90ms" }}
          >
            <span className="block text-lg font-medium text-neutral-400 dark:text-neutral-500">
              Hi, I&apos;m
            </span>
            Mujeeb
            <br />
            Ansari<span className="text-[var(--accent)]">.</span>
          </h1>

          <div
            className="rise mt-5 flex h-9 items-center font-mono text-xl text-neutral-700 dark:text-neutral-300 lg:text-2xl"
            style={{ animationDelay: "180ms" }}
          >
            <span className="text-[var(--accent)]">{">"}</span>
            <span className="ml-2">{text}</span>
            <span className="type-caret ml-0.5 inline-block h-6 w-[2px] bg-[var(--accent)]" />
          </div>

          <p
            className="rise mt-7 max-w-md text-lg leading-relaxed text-neutral-500 dark:text-neutral-400"
            style={{ animationDelay: "270ms" }}
          >
            Building scalable web applications with modern technologies — from
            interface to infrastructure. Focused on performance, accessibility,
            and clean delivery.
          </p>

          <div
            className="rise mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "360ms" }}
          >
            <button
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3.5 font-semibold text-white transition-colors duration-300 hover:bg-[var(--accent)] dark:bg-white dark:text-neutral-900 dark:hover:bg-[var(--accent)] dark:hover:text-white"
            >
              View Projects
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 rounded-xl border border-black/15 px-6 py-3.5 font-semibold transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-white/15"
            >
              Contact Me
            </button>
          </div>

          {/* mini stats */}
          <div
            className="rise mt-12 flex flex-wrap gap-8"
            style={{ animationDelay: "450ms" }}
          >
            {[
              ["6+", "Years exp"],
              ["20+", "Projects"],
              ["3", "Disciplines"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-2xl font-bold text-[var(--accent)]">{n}</div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: portrait + floating code card ── */}
        <div
          className="rise relative mx-auto w-full max-w-sm"
          style={{ animationDelay: "300ms" }}
        >
          <div className="float-card relative">
            {/* decorative offset panel behind */}
            <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-3xl bg-[var(--accent)]/10" />

            {/* portrait */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-[var(--accent)]/20 to-purple-500/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.3)] dark:border-white/10">
              {/* Apni photo public/ folder me daalo aur path yahan set karo (e.g. /mujeeb.jpg) */}
            <Image
  src={mujeebPhoto}
  alt="Mujeeb Ansari"
  fill
  sizes="(max-width: 1024px) 100vw, 400px"
  className="object-cover"
  priority
/>
              {/* legibility gradient under the code card */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>

            {/* floating code card (overlaps bottom-left) */}
            <div className="absolute -bottom-6 -left-6 w-[80%] overflow-hidden rounded-2xl border border-black/10 bg-white/85 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/85">
              <div className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2 dark:border-white/5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-1.5 font-mono text-[10px] text-neutral-400">
                  developer.ts
                </span>
              </div>
              <pre className="overflow-x-auto p-3.5 font-mono text-[11px] leading-relaxed">
                <code>
                  <span className="text-pink-500">const</span>{" "}
                  <span className="text-[var(--accent)]">mujeeb</span> = {"{"}
                  {"\n"} role:{" "}
                  <span className="text-emerald-500">&apos;Full Stack Dev&apos;</span>,
                  {"\n"} stack: [
                  <span className="text-emerald-500">&apos;React&apos;</span>,{" "}
                  <span className="text-emerald-500">&apos;Node&apos;</span>,{" "}
                  <span className="text-emerald-500">&apos;K8s&apos;</span>],{"\n"}{" "}
                  available: <span className="text-orange-500">true</span>,{"\n"}
                  {"};"}
                </code>
              </pre>
            </div>

            {/* floating chip (top-right) */}
            <span className="float-chip absolute -right-3 -top-3 rounded-xl border border-black/10 bg-white px-3 py-2 font-mono text-[11px] shadow-lg dark:border-white/10 dark:bg-neutral-800">
              ⚛️ React · Vue
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home1;