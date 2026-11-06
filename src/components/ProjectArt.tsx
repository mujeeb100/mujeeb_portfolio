import type { Project } from "@/data/projects";

/**
 * Abstract, brand-free preview of a product UI, tinted per project.
 * Swap for real screenshots in /public when you have them:
 *   <Image src={`/work/${p.slug}.png`} ... />
 */
export default function ProjectArt({ p, className = "" }: { p: Project; className?: string }) {
  const t = p.tint;
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-line bg-ink-2 ${className}`}
      style={{ background: `radial-gradient(120% 80% at 80% 0%, color-mix(in srgb, ${t} 22%, transparent), transparent 60%), var(--color-ink-2)` }}
      aria-hidden
    >
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="absolute inset-[8%] flex flex-col overflow-hidden rounded-lg border border-paper/10 bg-ink/80 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-1.5 border-b border-paper/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-paper/20" />
          <span className="h-2 w-2 rounded-full bg-paper/20" />
          <span className="h-2 w-2 rounded-full bg-paper/20" />
          <span className="ml-2 truncate font-mono text-[9px] text-paper/40">{p.slug}.app</span>
        </div>
        <div className="flex flex-1 gap-3 p-3">
          <div className="hidden w-1/5 space-y-2 sm:block">
            {[1, 0.5, 0.5, 0.5, 0.5].map((o, i) => (
              <div key={i} className="h-1.5 rounded-full" style={{ background: i === 0 ? t : "rgb(236 235 228 / 0.12)", opacity: o === 1 ? 1 : undefined }} />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-md border border-paper/10 p-2">
                  <div className="h-1 w-1/2 rounded-full bg-paper/15" />
                  <div className="mt-2 h-2.5 w-3/4 rounded-sm" style={{ background: i === 0 ? t : "rgb(236 235 228 / 0.25)" }} />
                </div>
              ))}
            </div>
            <div className="flex flex-1 items-end gap-1.5 rounded-md border border-paper/10 p-2">
              {[35, 55, 42, 70, 58, 82, 66, 90, 74].map((h, i) => (
                <div key={i} className="flex-1 rounded-[2px]" style={{ height: `${h}%`, background: `color-mix(in srgb, ${t} ${40 + i * 6}%, transparent)` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
