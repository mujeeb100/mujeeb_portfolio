import { experience } from "@/data/experience";
import { site } from "@/data/site";
import Reveal from "./Reveal";

export default function Record() {
  return (
    <section id="log" className="sec">
      <div className="wrap record">
        <Reveal>
          <div className="eyebrow">Track record</div>
          <h2 className="display" style={{ fontSize: "clamp(52px,6.5vw,96px)", margin: "14px 0 30px" }} data-agent data-type>
            Built fast.
            <br />
            <span className="accent">Shipped real.</span>
          </h2>
          <div className="big-num" data-agent>
            {site.years.replace("+", "")}
            <span style={{ color: "#fff" }}>+</span>
          </div>
          <p style={{ color: "#bbb", maxWidth: 330, marginTop: 18, fontSize: 15 }}>
            Years turning product briefs into production software, from hand-written layouts in 2019 to AI products today.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div style={{ borderTop: "1px solid #1f1f1f" }}>
            {experience.map((e) => (
              <div className="tl" key={e.hash} data-agent>
                <span className="yr">{e.period.replace(" — Now", " →").replace(" — ", " – ")}</span>
                <div>
                  <h4>{e.title}</h4>
                  <p>{e.summary}</p>
                </div>
                <span className="co">{e.company}</span>
              </div>
            ))}
            <div className="tl" data-agent>
              <span className="yr">Founder</span>
              <div>
                <h4>{site.agency.name}</h4>
                <p>IT services and creative agency: web and mobile apps, custom software, UI/UX and cloud.</p>
              </div>
              <span className="co">Agency</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
