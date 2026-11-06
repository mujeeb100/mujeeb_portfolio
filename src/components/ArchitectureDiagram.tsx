import type { Project } from "@/data/projects";
import type { LayerId } from "@/data/site";

const META: Record<LayerId, { label: string; color: string; text: string }> = {
  ui: { label: "L1 · Interface", color: "border-ui/50", text: "text-ui" },
  api: { label: "L2 · Application", color: "border-api/50", text: "text-api" },
  infra: { label: "L3 · Infrastructure", color: "border-infra/50", text: "text-infra" },
};

export default function ArchitectureDiagram({ p }: { p: Project }) {
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-line bg-ink-2/60 p-5 sm:p-8">
      <div className="grid-bg absolute inset-0 opacity-50" aria-hidden />
      <div className="relative space-y-3">
        {p.architecture.map((row, i) => {
          const m = META[row.layer];
          return (
            <div key={row.layer}>
              <div className={`rounded-xl border ${m.color} bg-ink/80 p-4 sm:p-5`}>
                <div className={`mb-3 font-mono text-[11px] ${m.text}`}>{m.label}</div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {row.nodes.map((n) => (
                    <div key={n} className="rounded-md border border-line bg-ink-2 px-3 py-2.5 font-mono text-xs text-paper/85">
                      {n}
                    </div>
                  ))}
                </div>
              </div>
              {i < p.architecture.length - 1 && (
                <div className="flex justify-center py-1 font-mono text-[10px] text-dim" aria-hidden>
                  ↕
                </div>
              )}
            </div>
          );
        })}
      </div>
      <figcaption className="relative mt-5 font-mono text-[11px] text-dim">fig. 1: how the layers fit together</figcaption>
    </figure>
  );
}
