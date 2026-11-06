import { layerMeta, type LayerId } from "@/data/site";

const COLORS: Record<LayerId, string> = {
  ui: layerMeta.ui.color,
  api: layerMeta.api.color,
  ai: layerMeta.ai.color,
  cloud: layerMeta.cloud.color,
};

/* bottom → top */
const ORDER: LayerId[] = ["cloud", "ai", "api", "ui"];
const LABEL: Record<LayerId, string> = { ui: "L1 /ui", api: "L2 /api", ai: "L3 /ai", cloud: "L4 /cloud" };

function UiPlate() {
  return (
    <div className="flex h-full flex-col gap-[6%] p-[9%]">
      <div className="flex items-center gap-[4%]">
        <div className="h-[6px] w-[18%] rounded-full bg-ui" />
        <div className="h-[6px] w-[10%] rounded-full bg-paper/20" />
        <div className="h-[6px] w-[10%] rounded-full bg-paper/20" />
      </div>
      <div className="flex flex-1 gap-[5%]">
        <div className="w-[22%] space-y-[10%] rounded-md bg-paper/[0.04] p-[5%]">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-[5px] rounded-full bg-paper/15" />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-[6%]">
          <div className="grid grid-cols-3 gap-[6%]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[4/3] rounded-md border border-paper/10 bg-paper/[0.03]" />
            ))}
          </div>
          <div className="flex flex-1 items-end gap-[5%] rounded-md border border-paper/10 p-[5%]">
            {[40, 65, 50, 85, 60, 95].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-ui/70" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ApiPlate() {
  const rows = ["GET /inspections", "POST /reports", "PATCH /actions/:id", "GET /kpis"];
  return (
    <div className="flex h-full flex-col justify-center gap-[7%] p-[10%] font-mono text-[9px] leading-none text-paper/70">
      {rows.map((r) => (
        <div key={r} className="flex items-center justify-between rounded border border-paper/10 px-[6%] py-[5%]">
          <span>{r}</span>
          <span className="text-api">200</span>
        </div>
      ))}
    </div>
  );
}

function AiPlate() {
  const cols = [3, 4, 2];
  return (
    <div className="flex h-full items-center justify-around p-[12%]">
      {cols.map((n, ci) => (
        <div key={ci} className="flex flex-col gap-3">
          {Array.from({ length: n }).map((_, r) => (
            <div key={r} className="h-3 w-3 rounded-full bg-ai shadow-[0_0_12px_var(--color-ai)]" />
          ))}
        </div>
      ))}
    </div>
  );
}

function InfraPlate() {
  const nodes = ["build", "test", "deploy"];
  return (
    <div className="flex h-full items-center justify-center p-[10%]">
      <div className="flex w-full items-center">
        {nodes.map((n, i) => (
          <div key={n} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-full border border-infra/60 bg-infra/10">
                <div className="h-2 w-2 rounded-full bg-infra" />
              </div>
              <span className="font-mono text-[9px] text-paper/60">{n}</span>
            </div>
            {i < nodes.length - 1 && <div className="mx-1 mb-5 h-px flex-1 bg-infra/40" />}
          </div>
        ))}
      </div>
    </div>
  );
}

const CONTENT: Record<LayerId, () => React.JSX.Element> = { ui: UiPlate, api: ApiPlate, ai: AiPlate, cloud: InfraPlate };

/**
 * Isometric 3-layer stack: the visual signature of the site.
 * `spread` 0..1 separates the plates; `active` highlights one layer.
 */
export default function StackVisual({
  spread = 0,
  active = null,
  size = 300,
}: {
  spread?: number;
  active?: LayerId | null;
  size?: number;
}) {
  const gap = 26 + spread * 64;

  return (
    <div className="iso-scene relative grid place-items-center" style={{ width: size * 1.45, height: size * 1.35 }} aria-hidden>
      <div className="iso-stack relative" style={{ width: size, height: size }}>
        {ORDER.map((id, i) => {
          const isActive = active === id;
          const dimmed = active !== null && !isActive;
          const Content = CONTENT[id];
          return (
            <div
              key={id}
              className="iso-plate absolute inset-0 rounded-xl border bg-ink-2/90"
              style={{
                transform: `translateZ(${(i - 1.5) * gap + (isActive ? 18 : 0)}px)`,
                borderColor: isActive ? COLORS[id] : "rgb(236 235 228 / 0.14)",
                boxShadow: isActive
                  ? `0 0 0 1px ${COLORS[id]}, 0 30px 80px -10px color-mix(in srgb, ${COLORS[id]} 45%, transparent)`
                  : "0 30px 60px -20px rgba(0,0,0,0.7)",
                opacity: dimmed ? 0.4 : 1,
              }}
            >
              <span
                className="absolute -top-6 left-0 font-mono text-[11px] tracking-wide"
                style={{ color: COLORS[id] }}
              >
                {LABEL[id]}
              </span>
              <Content />
            </div>
          );
        })}
      </div>
    </div>
  );
}
