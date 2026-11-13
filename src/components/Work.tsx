import Link from "next/link";
import { projects, smallProjects } from "@/data/projects";
import { domains } from "@/data/site";
import Reveal from "./Reveal";

export default function Work() {
  return (
    <section id="work" className="sec">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">Selected work</div>
            <h2 className="display h-xl" style={{ marginTop: 14 }} data-agent data-type>
              Work that
              <br />
              <span className="accent">ships.</span>
            </h2>
          </div>
          <Reveal>
            <p style={{ color: "#bdbdbd", fontSize: 15, maxWidth: 440 }} data-agent>
              Enterprise dashboards, multi-role platforms, fintech products and an AI service you can talk to on this page.
              Every project here went from a brief to something real people use.
            </p>
            <div className="mini-stats">
              <div data-agent>
                <b>
                  {String(projects.length).padStart(2, "0")}
                  <span className="accent">.</span>
                </b>
                <span>Case studies</span>
              </div>
              <div data-agent>
                <b>
                  {String(domains.length).padStart(2, "0")}
                  <span className="accent">.</span>
                </b>
                <span>Industries</span>
              </div>
              <div data-agent>
                <b>
                  06<span className="accent">.</span>
                </b>
                <span>Roles, one codebase</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="work-grid">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08}>
              <Link href={`/work/${p.slug}`} className="pcard" data-agent>
                <div className="top">
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="tag">
                    {p.client} · {p.year}
                  </span>
                </div>
                <h3 className="display" data-type>
                  {p.title}
                </h3>
                <p className="lead">{p.tagline}</p>
                <ul>
                  {p.approach.slice(0, 3).map((a) => (
                    <li key={a.title}>{a.title}</li>
                  ))}
                </ul>
                <div className="chips">
                  {p.stack.slice(0, 6).map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <div className="more">Read case study →</div>
              </Link>
            </Reveal>
          ))}

          <Reveal delay={0.08}>
            <div className="pcard" data-agent style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div className="top">
                  <span className="num">+</span>
                  <span className="tag">Also shipped</span>
                </div>
                <h3 className="display">More builds</h3>
                <ul style={{ marginTop: 18 }}>
                  {smallProjects.map((s) => (
                    <li key={s.title}>
                      <span style={{ color: "#e6e6e6" }}>{s.title}</span> · {s.note}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="chips">
                {domains.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
