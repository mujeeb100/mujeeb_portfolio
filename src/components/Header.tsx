"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LocalTime from "./LocalTime";
import { site } from "@/data/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#stack", label: "Stack" },
  { href: "/#log", label: "Log" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mac, setMac] = useState(true);

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform));
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name}, home`}>
          <span className="grid h-8 w-8 place-items-center rounded-md border border-line bg-ink-2 font-mono text-[11px] font-semibold tracking-tight transition-colors group-hover:border-ui group-hover:text-ui">
            {site.short}
          </span>
          <span className="hidden font-mono text-xs text-mute sm:block">
            mujeeb<span className="text-dim">.dev</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group rounded-md px-3 py-1.5 font-mono text-xs text-mute transition-colors hover:text-paper"
            >
              <span className="text-dim transition-colors group-hover:text-ui">/</span>
              {l.label.toLowerCase()}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 font-mono text-[11px] text-mute lg:flex">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-infra" aria-hidden />
            Mumbai <LocalTime />
          </span>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-cmdk"))}
            className="flex items-center gap-2 rounded-md border border-line bg-ink-2 px-2.5 py-1.5 font-mono text-[11px] text-mute transition-colors hover:border-paper/30 hover:text-paper"
            aria-label="Open command menu"
          >
            <span>Menu</span>
            <kbd className="hidden rounded border border-line px-1 text-[10px] sm:inline">{mac ? "⌘" : "Ctrl"} K</kbd>
          </button>
          <Link
            href="/#contact"
            className="hidden rounded-md bg-paper px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-ui sm:block"
          >
            Hire me
          </Link>
        </div>
      </div>
    </header>
  );
}
