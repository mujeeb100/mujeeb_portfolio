"use client";

import { useEffect, useState } from "react";

const steps = ["mounting /ui", "starting /api", "loading /ai", "deploying /cloud", "ready"];

/** Short boot sequence, once per session. Content renders underneath, so it never blocks LCP. */
export default function Loader() {
  const [show, setShow] = useState(false);
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || sessionStorage.getItem("booted")) return;
    sessionStorage.setItem("booted", "1");
    setShow(true);

    const start = performance.now();
    const dur = 1300;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setLeaving(true);
        setTimeout(() => setShow(false), 700);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!show) return null;
  const step = steps[Math.min(steps.length - 1, Math.floor(pct / 21))];

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[150] flex flex-col justify-between bg-ink p-6 font-mono text-xs text-mute transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] sm:p-10 ${
        leaving ? "[clip-path:inset(0_0_100%_0)]" : "[clip-path:inset(0_0_0_0)]"
      }`}
    >
      <div className="flex justify-between">
        <span>mujeeb.dev</span>
        <span>build #{new Date().getFullYear()}</span>
      </div>
      <div>
        <div className="mb-3 text-paper">
          <span className="text-ui">$</span> {step}
        </div>
        <div className="flex items-end justify-between">
          <div className="h-px w-2/3 bg-line">
            <div className="h-px bg-ui" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-6xl font-light tabular-nums text-paper sm:text-8xl">{pct}</span>
        </div>
      </div>
    </div>
  );
}
