import { layers } from "@/data/site";

export default function Marquee() {
  const tools = Array.from(new Set(layers.flatMap((l) => l.tools)));
  const row = [...tools, ...tools];
  return (
    <div className="mq" aria-label="Tech stack">
      <div className="track">
        {row.map((t, i) => (
          <span key={i} aria-hidden={i >= tools.length}>
            {t}
            <i>/</i>
          </span>
        ))}
      </div>
    </div>
  );
}
