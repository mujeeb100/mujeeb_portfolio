import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/data/projects";
import type { LayerId } from "@/data/site";
import ProjectArt from "@/components/ProjectArt";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import RoleMatrix from "@/components/RoleMatrix";
import Reveal from "@/components/Reveal";

const TEXT: Record<LayerId, string> = { ui: "text-ui", api: "text-api", ai: "text-ai", cloud: "text-cloud" };
const NAME: Record<LayerId, string> = { ui: "/ui", api: "/api", ai: "/ai", cloud: "/cloud" };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} — case study`,
    description: p.tagline,
    openGraph: { title: `${p.title} — case study`, description: p.tagline },
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article>
      {/* hero */}
      <header className="relative overflow-hidden border-b border-line pt-28 sm:pt-36">
        <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Link href="/#work" className="font-mono text-xs text-mute hover:text-paper">
              ← All work
            </Link>
            <p className="mt-10 font-mono text-xs text-ui">Case study · 0{idx + 1}</p>
            <h1 className="display mt-5 max-w-5xl text-[clamp(3rem,8vw,7.5rem)]" data-agent data-type>
              {p.title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-mute">{p.tagline}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-line py-8 font-mono text-xs sm:grid-cols-4">
              <div>
                <dt className="text-dim">Client</dt>
                <dd className="mt-2 text-paper">{p.client}</dd>
              </div>
              <div>
                <dt className="text-dim">Role</dt>
                <dd className="mt-2 text-paper">{p.role}</dd>
              </div>
              <div>
                <dt className="text-dim">When</dt>
                <dd className="mt-2 text-paper">{p.year}</dd>
              </div>
              <div>
                <dt className="text-dim">Layers</dt>
                <dd className="mt-2 flex gap-3">
                  {p.layers.map((l) => (
                    <span key={l} className={TEXT[l]}>
                      {NAME[l]}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.15}>
            <ProjectArt p={p} className="aspect-[16/8] w-full rounded-b-none border-b-0" />
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* challenge */}
        <section className="grid gap-10 border-b border-line py-24 lg:grid-cols-[0.35fr_0.65fr]">
          <Reveal>
            <h2 className="font-mono text-xs text-dim">01 · The challenge</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-2xl leading-snug tracking-tight text-paper sm:text-3xl">{p.challenge}</p>
          </Reveal>
        </section>

        {/* approach */}
        <section className="grid gap-10 border-b border-line py-24 lg:grid-cols-[0.35fr_0.65fr]">
          <Reveal>
            <h2 className="font-mono text-xs text-dim">02 · What I did</h2>
          </Reveal>
          <ol className="space-y-12">
            {p.approach.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 0.05} className="grid gap-4 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-sm text-dim">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <span className={`font-mono text-[11px] ${TEXT[a.layer]}`}>{NAME[a.layer]}</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{a.title}</h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-mute">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* architecture */}
        <section className="grid gap-10 border-b border-line py-24 lg:grid-cols-[0.35fr_0.65fr]">
          <Reveal>
            <h2 className="font-mono text-xs text-dim">03 · Architecture</h2>
          </Reveal>
          <div className="space-y-6">
            <Reveal>
              <ArchitectureDiagram p={p} />
            </Reveal>
            {p.showRoleMatrix && (
              <Reveal>
                <RoleMatrix />
              </Reveal>
            )}
          </div>
        </section>

        {/* outcomes + stack */}
        <section className="grid gap-10 border-b border-line py-24 lg:grid-cols-[0.35fr_0.65fr]">
          <Reveal>
            <h2 className="font-mono text-xs text-dim">04 · Outcome</h2>
          </Reveal>
          <div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {p.outcomes.map((o, i) => (
                <Reveal key={o.label} delay={i * 0.06} className="bg-ink p-7">
                  <div className="display text-5xl text-ui sm:text-6xl">{o.value}</div>
                  <div className="mt-3 text-sm text-mute">{o.label}</div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-dim">Stack</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded border border-line px-2.5 py-1 font-mono text-xs text-mute">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-10">
                {p.link ? (
                  <a
                    href={p.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ui"
                  >
                    Visit {p.link.label} ↗
                  </a>
                ) : (
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-paper transition-colors hover:border-paper/40"
                  >
                    {p.privateNote ?? "Ask me about this project"} →
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* next */}
        <Link href={`/work/${next.slug}`} className="group block py-24">
          <p className="font-mono text-xs text-dim">Next case study</p>
          <p className="display mt-4 text-5xl transition-colors group-hover:text-ui sm:text-7xl">
            {next.title} <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
          </p>
        </Link>
      </div>
    </article>
  );
}
