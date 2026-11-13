import Image from "next/image";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import photo from "../../public/mujeeb-cutout.webp";

export default function Hero() {
  const [first, last] = site.name.split(" ");
  const current = experience.find((e) => e.current) ?? experience[0];
  const startYear = experience[experience.length - 1]?.period.match(/\d{4}/)?.[0];

  return (
    <header className="hero" id="top">
      <div className="wordmark" aria-hidden>
        Portfolio
      </div>

      <div className="portrait">
        <Image src={photo} alt={`Portrait of ${site.name}`} priority sizes="(max-width: 900px) 84vw, 500px" />
      </div>

      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
        <div className="hero-left">
          <div className="hello" data-agent>
            Hello, I&apos;m
          </div>
          <h1 className="display hname" data-agent>
            {first}
            <br />
            {last}
            <span className="accent">.</span>
          </h1>
          <div className="hrole" data-agent data-type>
            Full Stack
            <br />
            AI Engineer
          </div>
          <p data-agent>
            I build fast, accessible React interfaces, the Python services behind them, and LLM features that actually ship.{" "}
            {site.years} years across fintech, payroll, telecom and enterprise quality systems.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            <a href="#work" className="btn" data-agent>
              View work ↗
            </a>
            <a href="#ask" className="btn ghost">
              Ask my AI
            </a>
          </div>
          <div className="meta">Based in {site.location} · Open to relocation</div>
        </div>

        <div className="hero-stats">
          <div className="stat" data-agent>
            <b>{site.years.replace("+", "")}+</b>
            <span>Years shipping</span>
          </div>
          <div className="stat" data-agent>
            <b>{String(projects.length).padStart(2, "0")}</b>
            <span>Case studies</span>
          </div>
          <div className="stat" data-agent>
            <b>&apos;{startYear?.slice(2) ?? "19"}</b>
            <span>Shipping since</span>
          </div>
        </div>
      </div>
      <span className="sr-only">Currently: {current.title} at {current.company}</span>
    </header>
  );
}
