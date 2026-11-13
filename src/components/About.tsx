import { layers, services, site } from "@/data/site";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="sec">
      <div className="wrap">
        <div className="eyebrow">About</div>
        <h2 className="display h-xl" style={{ margin: "14px 0 60px" }} data-agent data-type>
          Not just code.
          <br />
          <span className="accent">Code that ships.</span>
        </h2>
        <div className="about-grid">
          <Reveal>
            <p style={{ fontSize: 19, color: "#dcdcdc", lineHeight: 1.6 }} data-agent>
              I&apos;m a full stack engineer who&apos;s strongest on the frontend: React, TypeScript, design systems and
              accessibility. Around that I build Python services, PostgreSQL data layers, LLM features and the pipelines that
              ship them.
            </p>
            <p style={{ color: "#9a9a9a", marginTop: 18 }}>
              Outside the day job I run{" "}
              <a href={site.agency.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline", textUnderlineOffset: 4 }}>
                {site.agency.name}
              </a>
              , an agency building websites, apps and cloud solutions for clients.
            </p>
            <dl className="kv" style={{ marginTop: 40, borderTop: "1px solid #1f1f1f" }}>
              {layers.map((l) => (
                <div key={l.id} data-agent>
                  <dt>{l.name}</dt>
                  <dd>{l.tools.join(", ")}</dd>
                </div>
              ))}
              <div data-agent>
                <dt>Education</dt>
                <dd>
                  MCA, RTM Nagpur University (2015–18)
                  <br />
                  B.Sc. IT, University of Mumbai (2012–15)
                </dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.08}>
            <div id="services" style={{ borderTop: "1px solid #1f1f1f" }}>
              {services.map((s) => (
                <div className="pr" key={s.n} data-agent>
                  <b>{s.n}</b>
                  <div>
                    <h5>{s.title}</h5>
                    <p>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="stamp" data-agent>
              <h6>Ship the feature. Then make it fast, accessible and impossible to break.</h6>
              <small>— How I work</small>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
