import Image from "next/image";
import { experience } from "@/data/experience";
import { site } from "@/data/site";
import Reveal from "./Reveal";
import photo from "../../public/mujeeb.jpg";

export default function ExperienceLog() {
  return (
    <section id="log" className="border-b border-line py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="font-mono text-xs text-ui">03 / About & log</p>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
            {site.years} years, <span className="font-serif font-normal italic text-mute">one commit at a time.</span>
          </h2>
          <div className="mt-10 flex items-start gap-5">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-line grayscale transition-all duration-700 hover:grayscale-0">
              <Image src={photo} alt="Portrait of Mujeeb Ansari" fill sizes="96px" className="object-cover" placeholder="blur" />
            </div>
            <div className="space-y-4 text-mute">
              <p>
                I started in 2019 hand-writing responsive layouts in jQuery and Bootstrap. Since then I have moved into
                React and TypeScript, worked on fintech, payroll and telecom products, and taken on the backend and CI/CD
                work around the UI.
              </p>
              <p>
                I also run{" "}
                <a href={site.agency.url} target="_blank" rel="noopener noreferrer" className="text-paper underline decoration-line underline-offset-4 hover:decoration-ui">
                  {site.agency.name}
                </a>
                , an IT services and design agency, for projects that need a full team.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-line bg-ink-2/60 font-mono text-[13px]">
            <div className="flex items-center justify-between border-b border-line px-5 py-3 text-[11px] text-dim">
              <span>
                <span className="text-infra">~/career</span> $ git log --graph
              </span>
              <span>{experience.length} commits</span>
            </div>
            <ol className="p-5 sm:p-6">
              {experience.map((e, i) => (
                <li key={e.hash} className="relative grid grid-cols-[1.25rem_1fr] gap-4 pb-8 last:pb-0">
                  {i < experience.length - 1 && <span className="absolute left-[0.4rem] top-4 h-full w-px bg-line" aria-hidden />}
                  <span
                    className={`relative mt-1 h-3 w-3 rounded-full border-2 ${e.current ? "border-ui bg-ui/30" : "border-dim bg-ink-2"}`}
                    aria-hidden
                  />
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-api">{e.hash}</span>
                      {e.current && <span className="text-[11px] text-ui">(HEAD → present)</span>}
                      <span className="text-[11px] text-dim">{e.period}</span>
                    </div>
                    <p className="mt-2 font-sans text-base font-semibold text-paper">
                      {e.title} <span className="font-normal text-mute">@ {e.company}</span>
                    </p>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-mute">{e.summary}</p>
                    <p className="mt-3 text-[11px] text-dim">
                      {e.stack.map((s) => `+${s}`).join("  ")}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
