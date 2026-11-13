import Link from "next/link";
import { site } from "@/data/site";
import LocalTime from "./LocalTime";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <div className="grid gap-10 font-mono text-xs sm:grid-cols-4">
          <div className="sm:col-span-2">
            <p className="text-dim">Status</p>
            <p className="mt-3 flex items-center gap-2 text-paper">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-infra" aria-hidden />
              {site.available ? "Available for new work" : "Booked"}
            </p>
            <p className="mt-2 text-mute">
              {site.location} · IST (UTC+5:30) · <LocalTime seconds />
            </p>
          </div>
          <div>
            <p className="text-dim">Navigate</p>
            <ul className="mt-3 space-y-2 text-mute">
              {[
                ["/#work", "Work"],
                ["/#ask", "Ask AI"],
                ["/#log", "Track record"],
                ["/#about", "About"],
                ["/#contact", "Contact"],
              ].map(([h, l]) => (
                <li key={h}>
                  <Link href={h} className="hover:text-paper">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-dim">Elsewhere</p>
            <ul className="mt-3 space-y-2 text-mute">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          className="mt-20 select-none whitespace-nowrap text-center display text-[clamp(3rem,15vw,15rem)] leading-[0.8] text-paper/[0.06]"
          aria-hidden
        >
          Mujeeb Ansari
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pb-24 pt-6 font-mono text-[11px] text-dim">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Built with agents in the loop · Next.js · FastAPI · Vercel</span>
          <a href="#main" className="hover:text-paper">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
