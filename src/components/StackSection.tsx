"use client";

import { useEffect, useRef, useState } from "react";
import StackVisual from "./StackVisual";
import Reveal from "./Reveal";
import { layers, type LayerId } from "@/data/site";

const COLOR: Record<LayerId, string> = { ui: "text-ui", api: "text-api", ai: "text-ai", cloud: "text-cloud" };
const BG: Record<LayerId, string> = { ui: "bg-ui", api: "bg-api", ai: "bg-ai", cloud: "bg-cloud" };

export default function StackSection() {
  const [active, setActive] = useState<LayerId>("ui");
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    /* whichever card's centre is closest to the viewport centre is active */
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let best: LayerId = "ui";
      let bestD = Infinity;
      Object.entries(refs.current).forEach(([id, el]) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = id as LayerId;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="stack" className="relative border-b border-line py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-xs text-ui">02 / The stack</p>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl">
            Four layers. <span className="font-serif font-normal italic text-mute">One engineer</span> who works in all of them.
          </h2>
          <p className="mt-6 max-w-xl text-mute">
            Frontend is my strongest layer. Working across the three below it means I can design screens around real data,
            build the service and the AI behind them, and own a feature from the first commit to production.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="hidden lg:block">
            <div className="sticky top-28 flex flex-col items-center">
              <StackVisual spread={0.8} active={active} size={260} />
              <div className="mt-4 flex gap-6 font-mono text-[11px]">
                {layers.map((l) => (
                  <span key={l.id} className={`flex items-center gap-2 transition-colors ${active === l.id ? "text-paper" : "text-dim"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${BG[l.id]}`} />
                    {l.path}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:space-y-[22vh] lg:py-[8vh]">
            {layers.map((l) => (
              <article
                key={l.id}
                id={`layer-${l.id}`}
                data-layer={l.id}
                ref={(el) => {
                  refs.current[l.id] = el;
                }}
                className={`rounded-2xl border p-7 transition-colors duration-500 sm:p-9 ${
                  active === l.id ? "border-paper/20 bg-ink-2" : "border-line bg-transparent"
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className={COLOR[l.id]}>
                    {l.index} · {l.name}
                  </span>
                  <span className="text-dim">{l.path}</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{l.headline}</h3>
                <p className="mt-4 leading-relaxed text-mute">{l.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {l.proof.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-paper/85">
                      <span className={`mt-[7px] h-1 w-3 shrink-0 ${BG[l.id]}`} aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-1.5 border-t border-line pt-6">
                  {l.tools.map((t) => (
                    <span key={t} className="rounded border border-line px-2 py-1 font-mono text-[11px] text-mute">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
