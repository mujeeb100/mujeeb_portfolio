import Link from "next/link";
import { projects, smallProjects } from "@/data/projects";
import type { LayerId } from "@/data/site";
import ProjectArt from "./ProjectArt";
import Reveal from "./Reveal";

const DOT: Record<LayerId, string> = { ui: "bg-ui", api: "bg-api", infra: "bg-infra" };

function Layers({ ids }: { ids: LayerId[] }) {
  return (
    <span className="flex items-center gap-1" title={ids.map((i) => `/${i}`).join(" ")}>
      {(["ui", "api", "infra"] as LayerId[]).map((id) => (
        <span key={id} className={`h-1.5 w-1.5 rounded-full ${ids.includes(id) ? DOT[id] : "bg-paper/10"}`} />
      ))}
      <span className="sr-only">Layers: {ids.join(", ")}</span>
    </span>
  );
}

export default function Work() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="border-b border-line py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-ui">01 / Selected work</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-6xl">
              Case studies<span className="font-serif font-normal italic text-mute">, not cards.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-mute">
            Products built for real teams. Each one shows the problem, the decisions I made, and which layers of the stack I worked on.
          </p>
        </Reveal>

        {/* featured */}
        <Reveal delay={0.1}>
          <Link
            href={`/work/${featured.slug}`}
            className="group mt-16 grid overflow-hidden rounded-2xl border border-line bg-ink-2/50 transition-colors hover:border-paper/25 lg:grid-cols-2"
          >
            <div className="flex flex-col justify-between gap-10 p-7 sm:p-10">
              <div>
                <div className="flex items-center gap-3 font-mono text-[11px] text-mute">
                  <span className="rounded-full border border-ui/40 px-2 py-0.5 text-ui">Featured</span>
                  <span>{featured.role}</span>
                </div>
                <h3 className="mt-6 text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">{featured.title}</h3>
                <p className="mt-5 max-w-md text-mute">{featured.tagline}</p>
              </div>
              <div>
                <div className="grid grid-cols-3 gap-4 border-t border-line pt-6">
                  {featured.outcomes.map((o) => (
                    <div key={o.label}>
                      <div className="text-2xl font-semibold tracking-tight sm:text-3xl">{o.value}</div>
                      <div className="mt-1 text-xs leading-snug text-mute">{o.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <Layers ids={featured.layers} />
                  <span className="font-mono text-xs text-paper transition-transform group-hover:translate-x-1">Read case study →</span>
                </div>
              </div>
            </div>
            <ProjectArt p={featured} className="m-3 min-h-[280px] transition-transform duration-700 group-hover:scale-[1.015] lg:m-4" />
          </Link>
        </Reveal>

        {/* index */}
        <ul className="mt-6 border-t border-line">
          {rest.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.06}>
              <Link
                href={`/work/${p.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-line py-7 sm:grid-cols-[3rem_1.4fr_1fr_auto_auto] sm:gap-8"
              >
                <span className="font-mono text-xs text-dim">0{i + 2}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-paper sm:text-2xl">
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                      {p.title}
                    </span>
                  </h3>
                  <p className="mt-1 text-sm text-mute sm:hidden">{p.client}</p>
                </div>
                <p className="hidden text-sm text-mute sm:block">{p.client}</p>
                <span className="hidden font-mono text-xs text-dim sm:block">{p.year}</span>
                <span className="flex items-center gap-5">
                  <Layers ids={p.layers} />
                  <span className="text-mute transition-all group-hover:translate-x-1 group-hover:text-paper" aria-hidden>
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 flex flex-wrap gap-x-10 gap-y-3 font-mono text-xs text-dim">
          <span>Also built:</span>
          {smallProjects.map((s) =>
            s.href ? (
              <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer" className="text-mute hover:text-paper">
                {s.title} ↗
              </a>
            ) : (
              <span key={s.title} className="text-mute">
                {s.title} <span className="text-dim">· {s.stack}</span>
              </span>
            )
          )}
        </Reveal>
      </div>
    </section>
  );
}
