import { domains, services, site } from "@/data/site";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="border-b border-line py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="font-mono text-xs text-ui">04 / Work with me</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl">
              Full-time, contract, <span className="font-serif font-normal italic text-mute">or a project.</span>
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-md text-mute">
              I&apos;m open to senior frontend and design-engineering roles, and I take on a small number of freelance projects.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {domains.map((d) => (
                <span key={d} className="rounded-full border border-line px-3 py-1 text-xs text-mute">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06} className="group border-b border-r border-line p-7 transition-colors hover:bg-ink-2">
              <span className="font-mono text-xs text-dim transition-colors group-hover:text-ui">{s.n}</span>
              <h3 className="mt-10 text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">{s.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line px-6 py-5">
          <p className="text-sm text-mute">
            Need a full team: design, web, mobile, cloud?{" "}
            <span className="text-paper">{site.agency.name}</span> handles larger engagements.
          </p>
          <a
            href={site.agency.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-paper underline decoration-line underline-offset-4 hover:decoration-ui"
          >
            eliteworkforceintl.com ↗
          </a>
        </Reveal>
      </div>
    </section>
  );
}
