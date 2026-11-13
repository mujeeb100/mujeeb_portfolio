"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { id: "top", label: "Home" },
  { id: "work", label: "Work" },
  { id: "ask", label: "Ask AI", hideSm: true },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [active, setActive] = useState("top");

  useEffect(() => {
    if (pathname !== "/") {
      setActive("work");
      return;
    }
    const onScroll = () => {
      let cur = "top";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = l.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <nav className="pill-nav" aria-label="Primary">
      <Link href="/" className="logo" aria-label="Mujeeb Ansari, home">
        M
      </Link>
      {links.map((l) => (
        <Link
          key={l.id}
          href={l.id === "top" ? "/#top" : `/#${l.id}`}
          className={`lnk ${active === l.id ? "on" : ""} ${l.hideSm ? "hide-sm" : ""}`}
        >
          {l.label}
        </Link>
      ))}
      <button type="button" onClick={() => window.dispatchEvent(new Event("open-cmdk"))} aria-label="Open command menu">
        ⌘K
      </button>
    </nav>
  );
}
