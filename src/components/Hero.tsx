"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import StackVisual from "./StackVisual";
import { layerMeta, site, type LayerId } from "@/data/site";

const StackScene = dynamic(() => import("./three/StackScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

const CYCLE: LayerId[] = ["ui", "api", "ai", "cloud"];
const clients = ["Vodafone Idea", "Vistra", "Niyogin FinTech", "Saffola", "Cloudage", "Oblix"];
const ease = [0.2, 0.7, 0.1, 1] as const;

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Hero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<LayerId | null>(null);
  const [hovering, setHovering] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => setWebgl(hasWebGL()), []);

  /* slowly cycle which layer is lit, unless the visitor is interacting */
  useEffect(() => {
    if (reduce || hovering) return;
    let i = 0;
    const id = setInterval(() => setActive(CYCLE[i++ % CYCLE.length]), 2400);
    return () => clearInterval(id);
  }, [reduce, hovering]);

  const fade = (d: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: d, ease } };

  const show3D = webgl && !reduce;

  return (
    <section id="top" className="relative overflow-hidden pt-24 sm:pt-28">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-4 px-5 sm:px-8 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10 pt-6 lg:pt-0">
          <motion.div {...fade(0.1)} className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-mute">
            <span className="flex items-center gap-2 rounded-full border border-line px-3 py-1">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-infra" aria-hidden />
              {site.available ? "Open to senior roles & projects" : "Currently booked"}
            </span>
            <span>{site.location} · Remote worldwide</span>
          </motion.div>

          <motion.p {...fade(0.15)} className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-ui">
            {site.role}
          </motion.p>

          <motion.h1
            {...fade(0.2)}
            className="mt-4 text-[clamp(2.6rem,6.6vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
          >
            I build AI products<span className="text-ui">.</span>
            <br />
            <span className="font-serif font-normal italic tracking-[-0.02em] text-paper/90">End to end,</span>
            <br />
            interface to cloud.
          </motion.h1>

          <motion.p {...fade(0.35)} className="mt-8 max-w-xl text-lg leading-relaxed text-mute">
            I&apos;m <span className="text-paper">Mujeeb Ansari</span>. For {site.years} years I&apos;ve built{" "}
            <span className="text-paper">React and TypeScript</span> frontends,{" "}
            <span className="text-paper">FastAPI and Django</span> services,{" "}
            <span className="text-paper">PostgreSQL</span> data layers and <span className="text-paper">LLM features</span>, and
            deployed them on <span className="text-paper">Azure and AWS</span>, for fintech, payroll and telecom teams.
          </motion.p>

          <motion.div {...fade(0.45)} className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="#ask"
              className="group inline-flex items-center gap-2 rounded-md bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ui"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-ai" aria-hidden />
              Ask my AI about me
            </Link>
            <Link
              href="#work"
              className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-paper transition-colors hover:border-paper/40"
            >
              See the work ↓
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.4, ease }}
          className="relative -mx-5 h-[380px] sm:mx-0 sm:h-[480px] lg:h-[620px]"
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => {
            setHovering(false);
            setActive(null);
          }}
        >
          {show3D ? (
            <StackScene active={active} onHover={(id) => id && setActive(id)} />
          ) : webgl === false || reduce ? (
            <div className="flex h-full items-center justify-center">
              <StackVisual spread={0.7} active={active} size={240} />
            </div>
          ) : null}

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5" role="group" aria-label="Explore a layer">
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
                style={active === id ? { color: layerMeta[id].color } : undefined}
              >
                {layerMeta[id].path}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* shipped-for strip */}
      <div className="relative mt-10 border-y border-line py-5 lg:mt-0">
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
