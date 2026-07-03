"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowLeft, CalendarDays } from "lucide-react";
import "./consultation.css";
/* same accent token as the rest of the site */
const ACCENT = "#3A36E0";

const domains = [
  { name: "Finance", desc: "Custom dashboards, financial analytics, portfolio tracking and secure payment portals." },
  { name: "Payroll", desc: "End-to-end payroll systems, payslip generation, leave and attendance integration." },
  { name: "E-Commerce", desc: "Online stores, cart systems, payment gateways and admin panels." },
  { name: "Healthcare", desc: "Appointment booking, patient management systems and health-tracking dashboards." },
  { name: "Education", desc: "Learning management systems, course management, student portals and grading." },
  { name: "Real Estate", desc: "Property listing platforms, booking systems and client management tools." },
  { name: "Travel & Hospitality", desc: "Booking systems, itinerary management and customer feedback portals." },
  { name: "Social Media", desc: "User profiles, content management and social interaction features." },
  { name: "Content Management", desc: "Custom CMS solutions for blogs, news sites and corporate websites." },
  { name: "Custom Solutions", desc: "Tailored web applications built around your specific business workflows." },
];

type Domain = (typeof domains)[number];

/* ── tilt + spotlight card ── */
function DomainCard({
  domain,
  index,
  onSelect,
}: {
  domain: Domain;
  index: number;
  onSelect: (n: string) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--rx", `${((y / r.height - 0.5) * -8).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((x / r.width - 0.5) * 8).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={() => onSelect(domain.name)}
      style={{ transitionDelay: `${index * 60}ms` }}
      className="tilt-card reveal group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6 text-left dark:border-white/10 dark:bg-white/[0.03]"
    >
      <div className="card-spot" />
      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between">
          <span className="font-mono text-xs text-neutral-300 transition-colors group-hover:text-[var(--accent)] dark:text-neutral-600">
            {String(index + 1).padStart(2, "0")}
          </span>
          <ArrowUpRight className="h-4 w-4 -translate-y-1 translate-x-1 text-[var(--accent)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
        </div>
        <h3 className="text-xl font-bold tracking-tight">{domain.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {domain.desc}
        </p>
      </div>
    </button>
  );
}

const ConsultationPage = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [display, setDisplay] = useState<Domain | null>(null);
  const [closing, setClosing] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  const open = (name: string) => {
    setDisplay(domains.find((d) => d.name === name) ?? null);
    setSelected(name);
  };

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setSelected(null);
      setClosing(false);
    }, 450);
  };

  /* staggered reveal */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.1 }
    );
    root.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="consultation"
      ref={root}
      style={{ ["--accent" as string]: ACCENT }}
      className="relative min-h-screen overflow-hidden bg-neutral-50 px-6 py-24 text-neutral-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-white md:px-12"
    >
      {/* aurora background */}
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />

      {/* ── GRID LAYER ── */}
      <div
        className={`relative z-10 mx-auto max-w-6xl transition-all duration-500 ${
          selected
            ? "pointer-events-none scale-[0.97] opacity-0 blur-sm"
            : "opacity-100"
        }`}
      >
        <div className="reveal mb-14 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
            02 — Work with me
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            Choose a <span className="text-[var(--accent)]">domain</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-500 dark:text-neutral-400">
            Pick the area closest to your project to explore services and book a
            consultation call.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((d, i) => (
            <DomainCard key={d.name} domain={d} index={i} onSelect={open} />
          ))}
        </div>
      </div>

      {/* ── DETAIL LAYER ── */}
      {selected && display && (
        <div
          className={`absolute inset-0 z-20 overflow-y-auto bg-neutral-50 px-6 py-24 dark:bg-neutral-950 md:px-12 ${
            closing ? "detail-exit" : "detail-enter"
          }`}
        >
          <div className="mx-auto max-w-4xl">
            <button
              onClick={close}
              className="group mb-10 inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-white/10"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Back to domains
            </button>

            <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              Service
            </span>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
              {display.name}
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-neutral-500 dark:text-neutral-400">
              {display.desc}
            </p>

            <div className="mt-10 flex items-center gap-2 font-mono text-sm text-neutral-700 dark:text-neutral-300">
              <CalendarDays className="h-4 w-4 text-[var(--accent)]" />
              Book a free 30-minute call
            </div>

            <div className="mt-4 h-[700px] overflow-hidden rounded-2xl border border-black/10 shadow-2xl dark:border-white/10">
              <iframe
                src="https://calendly.com/mujeeb977315/30min"
                title="Schedule Meeting"
                className="h-full w-full border-none"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ConsultationPage;