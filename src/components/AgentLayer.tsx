"use client";

/**
 * "Agents in the loop" — a decorative layer of AI-agent cursors that roam the page,
 * draw selection boxes around elements marked [data-agent] and re-type headings
 * marked [data-type]. Purely visual: it never mutates React-managed DOM content
 * (typing happens on a positioned clone), and it pauses for reduced-motion users.
 */
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const DEFS: [string, string, string][] = [
  ["Copy", "#7cb7ff", "typing"],
  ["Layout", "#ffd23f", "aligning"],
  ["Motion", "#c58bff", "easing"],
  ["QA", "#ff7eb6", "testing"],
  ["Deploy", "#ff9a3d", "shipping"],
  ["Review", "#ff6b5b", "reviewing"],
  ["A11y", "#5ee6c5", "auditing"],
  ["Perf", "#9be15d", "profiling"],
  ["API", "#66d9ff", "fetching"],
  ["Lint", "#f5f5f5", "linting"],
];

type Agent = {
  name: string; color: string; verb: string; el: HTMLDivElement;
  x: number; y: number; tx: number; ty: number; busy: boolean; speed: number;
};

const FONT_PROPS = ["fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing", "textTransform", "color", "textAlign"] as const;

export default function AgentLayer() {
  const layerRef = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(true);
  const [log, setLog] = useState("booting agents…");
  const onRef = useRef(on);
  const pathname = usePathname();

  useEffect(() => {
    onRef.current = on;
  }, [on]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(false);
      setLog("reduced motion: agents paused");
    }
  }, []);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const mobile = window.innerWidth < 700;
    const defs = mobile ? DEFS.slice(0, 6) : DEFS;
    const timers = new Set<number>();
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => { timers.delete(id); fn(); }, ms);
      timers.add(id);
    };
    const extras = new Set<HTMLElement>();
    const locked = new WeakSet<Element>();

    const wander = (a: Agent) => {
      a.tx = 30 + Math.random() * (window.innerWidth - 110);
      a.ty = window.scrollY + 70 + Math.random() * (window.innerHeight - 160);
    };

    const agents: Agent[] = defs.map(([name, color, verb]) => {
      const el = document.createElement("div");
      el.className = "agent";
      el.innerHTML = `<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M1 1 L13 6 L7.5 7.5 L6 13 Z" fill="${color}" stroke="#000" stroke-width=".8"/></svg><span class="lbl" style="background:${color}">${name}</span>`;
      layer.appendChild(el);
      const a: Agent = { name, color, verb, el, x: Math.random() * window.innerWidth, y: window.scrollY + Math.random() * window.innerHeight, tx: 0, ty: 0, busy: false, speed: 0.035 + Math.random() * 0.04 };
      wander(a);
      return a;
    });

    const visibleTargets = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-agent]")).filter((t) => {
        const r = t.getBoundingClientRect();
        return r.top > 70 && r.bottom < window.innerHeight - 70 && r.width > 20 && !locked.has(t);
      });

    const retype = (el: HTMLElement, done: () => void) => {
      const r = el.getBoundingClientRect();
      const clone = el.cloneNode(true) as HTMLElement;
      clone.removeAttribute("data-agent");
      clone.removeAttribute("data-type");
      clone.classList.add("agent-clone");
      const cs = getComputedStyle(el);
      FONT_PROPS.forEach((p) => (clone.style[p] = cs[p]));
      Object.assign(clone.style, { left: `${r.left + window.scrollX}px`, top: `${r.top + window.scrollY}px`, width: `${r.width}px` });

      // flatten the original into typeable tokens, keeping inline markup
      type Tok = { ch?: string; br?: true; open?: Element; close?: true };
      const toks: Tok[] = [];
      const walk = (n: Node) =>
        n.childNodes.forEach((c) => {
          if (c.nodeType === 3) [...(c.textContent ?? "")].forEach((ch) => toks.push({ ch }));
          else if (c.nodeName === "BR") toks.push({ br: true });
          else if (c.nodeType === 1) { toks.push({ open: c as Element }); walk(c); toks.push({ close: true }); }
        });
      walk(el);

      const render = (n: number) => {
        clone.textContent = "";
        const stack: Node[] = [clone];
        for (let k = 0; k < n; k++) {
          const t = toks[k];
          const top = stack[stack.length - 1];
          if (t.ch) top.appendChild(document.createTextNode(t.ch));
          else if (t.br) top.appendChild(document.createElement("br"));
          else if (t.open) { const e = t.open.cloneNode(false); top.appendChild(e); stack.push(e); }
          else if (t.close) stack.pop();
        }
        const caret = document.createElement("span");
        caret.className = "caret";
        stack[stack.length - 1].appendChild(caret);
      };

      render(0);
      document.body.appendChild(clone);
      extras.add(clone);
      el.classList.add("agent-ghost");
      let i = 0;
      const step = () => {
        if (i > toks.length) {
          el.classList.remove("agent-ghost");
          clone.remove();
          extras.delete(clone);
          later(done, 700);
          return;
        }
        render(i);
        i++;
        later(step, toks[i - 1]?.ch === " " ? 30 : 45 + Math.random() * 40);
      };
      later(step, 500);
    };

    const work = (a: Agent) => {
      const pool = visibleTargets();
      if (!pool.length) return wander(a);
      const typeable = pool.filter((t) => t.hasAttribute("data-type"));
      const t = a.name === "Copy" && typeable.length ? typeable[Math.floor(Math.random() * typeable.length)] : pool[Math.floor(Math.random() * pool.length)];
      locked.add(t);
      a.busy = true;
      const r = t.getBoundingClientRect();
      const px = r.left + window.scrollX, py = r.top + window.scrollY;
      a.tx = px + r.width - 8;
      a.ty = py + r.height - 6;

      const sel = document.createElement("div");
      sel.className = "agent-sel";
      sel.style.color = a.color;
      sel.style.borderColor = a.color;
      Object.assign(sel.style, { left: `${px - 6}px`, top: `${py - 6}px`, width: `${r.width + 12}px`, height: `${r.height + 12}px` });
      sel.innerHTML = `<i></i><i></i><i></i><i></i><span class="st" style="background:${a.color}">${a.name}<em>${a.verb}</em></span>`;
      document.body.appendChild(sel);
      extras.add(sel);
      later(() => sel.classList.add("on"), 450);
      setLog(`${a.name} → ${a.verb} "${(t.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 24)}…"`);

      const done = () => {
        sel.classList.remove("on");
        later(() => { sel.remove(); extras.delete(sel); }, 400);
        locked.delete(t);
        a.busy = false;
        wander(a);
      };
      if (t.hasAttribute("data-type") && a.name === "Copy") retype(t, done);
      else later(done, 1800 + Math.random() * 1600);
    };

    let raf = 0;
    const tick = () => {
      if (onRef.current)
        agents.forEach((a) => {
          a.x += (a.tx - a.x) * a.speed;
          a.y += (a.ty - a.y) * a.speed;
          a.el.style.transform = `translate(${a.x}px,${a.y}px)`;
          if (!a.busy && Math.hypot(a.tx - a.x, a.ty - a.y) < 6) wander(a);
        });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const sched = window.setInterval(() => {
      if (!onRef.current || document.hidden) return;
      const idle = agents.filter((a) => !a.busy);
      if (idle.length && agents.length - idle.length < 4) work(idle[Math.floor(Math.random() * idle.length)]);
    }, 900);

    let st = 0;
    const onScroll = () => {
      clearTimeout(st);
      st = window.setTimeout(() => agents.forEach((a) => !a.busy && wander(a)), 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(sched);
      clearTimeout(st);
      timers.forEach((id) => clearTimeout(id));
      window.removeEventListener("scroll", onScroll);
      extras.forEach((e) => e.remove());
      document.querySelectorAll(".agent-ghost").forEach((e) => e.classList.remove("agent-ghost"));
      agents.forEach((a) => a.el.remove());
    };
  }, [pathname]);

  return (
    <>
      <div ref={layerRef} className="agents" style={{ opacity: on ? 1 : 0 }} aria-hidden />
      <div className="live" role="status">
        <span className="pulse" style={{ background: on ? undefined : "#555", animation: on ? undefined : "none" }} />
        <span>{on ? "10 agents live" : "agents paused"}</span>
        <span className="sep" />
        <span className="log">{on ? log : "click to resume"}</span>
        <button
          type="button"
          className={on ? "" : "off"}
          aria-pressed={on}
          onClick={() => {
            setOn((v) => !v);
            setLog(on ? "agents paused" : "agents resumed");
          }}
        >
          {on ? "Agents on" : "Agents off"}
        </button>
      </div>
    </>
  );
}
