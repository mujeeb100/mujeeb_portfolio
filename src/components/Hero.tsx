"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import StackVisual from "./StackVisual";
import type { LayerId } from "@/data/site";
import { site } from "@/data/site";

const CYCLE: LayerId[] = ["ui", "api", "infra"];
const clients = ["Vodafone Idea", "Vistra", "Niyogin FinTech", "Saffola", "Cloudage", "Oblix"];

const ease = [0.2, 0.7, 0.1, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const [spread, setSpread] = useState(reduce ? 0.6 : 0);
  const [active, setActive] = useState<LayerId | null>(null);
  const [paused, setPaused] = useState(false);

  /* open the stack on load, then let scroll push it further apart */
  useEffect(() => {
    const t = setTimeout(() => setSpread(0.55), 500);
    const onScroll = () => {
      const p = Math.min(1, window.scrollY / (window.innerHeight * 0.8));
      setSpread(0.55 + p * 0.45);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* slowly cycle which layer is lit */
  useEffect(() => {
    if (reduce || paused) return;
    let i = 0;
    const id = setInterval(() => {
      setActive(CYCLE[i % 3]);
      i++;
    }, 2200);
    return () => clearInterval(id);
  }, [reduce, paused]);

  const fade = (d: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: d, ease } };

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div {...fade(0.1)} className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-mute">
            <span className="flex items-center gap-2 rounded-full border border-line px-3 py-1">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-infra" aria-hidden />
              {site.available ? "Open to roles & projects" : "Currently booked"}
            </span>
            <span>{site.location} · Remote worldwide</span>
          </motion.div>

          <motion.h1
            {...fade(0.2)}
            className="mt-8 text-[clamp(2.6rem,7vw,6.2rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
          >
            I build the <span className="whitespace-nowrap">interface<span className="text-ui">—</span></span>
            <br />
            <span className="font-serif font-normal italic tracking-[-0.02em] text-paper/90">and everything</span>
            <br />
            underneath it.
          </motion.h1>

          <motion.p {...fade(0.35)} className="mt-8 max-w-xl text-lg leading-relaxed text-mute">
            I&apos;m <span className="text-paper">Mujeeb Ansari</span>, a frontend-first full stack engineer with{" "}
            {site.years} years of shipping React and TypeScript products for fintech, payroll and telecom teams. I also
            build the APIs and pipelines that keep those products running.
          </motion.p>

          <motion.div {...fade(0.45)} className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="#work"
              className="group inline-flex items-center gap-2 rounded-md bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ui"
            >
              See the work
              <span className="transition-transform group-hover:translate-y-0.5" aria-hidden>
                ↓
              </span>
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-paper transition-colors hover:border-paper/40"
            >
              Start a conversation
            </Link>
          </motion.div>
        </div>

        <div className="-mb-6 -mt-4 flex justify-center sm:hidden">
          <StackVisual spread={spread} active={active} size={190} />
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease }}
          className="relative mx-auto -mt-4 hidden scale-[0.8] sm:block lg:mt-0 lg:scale-100"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            setActive(null);
          }}
        >
          <div className="flex">
            <StackVisual spread={spread} active={active} />
          </div>
          <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5" role="group" aria-label="Highlight a layer">
            {CYCLE.map((id) => (
              <button
                key={id}
                type="button"
                onMouseEnter={() => setActive(id)}
                onFocus={() => setActive(id)}
                onClick={() => document.getElementById(`layer-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" })}
                className={`rounded border px-2 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                  active === id ? "border-paper/40 text-paper" : "border-line text-dim hover:text-mute"
                }`}
              >
                /{id}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* shipped-for strip */}
      <div className="relative mt-20 border-y border-line py-5 sm:mt-24">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-5 sm:px-8">
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-dim">Shipped for</span>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            <div className="marquee flex w-max gap-12">
              {[...clients, ...clients].map((c, i) => (
                <span key={i} className="whitespace-nowrap text-sm font-medium text-mute" aria-hidden={i >= clients.length}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
