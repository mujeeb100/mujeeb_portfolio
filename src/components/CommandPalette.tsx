"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

type Cmd = { id: string; group: string; label: string; hint?: string; run: () => void };

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    lastFocus.current?.focus();
  }, []);

  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router]
  );

  const commands: Cmd[] = useMemo(
    () => [
      { id: "work", group: "Navigate", label: "Selected work", hint: "/#work", run: () => go("/#work") },
      { id: "stack", group: "Navigate", label: "The stack: UI / API / Infra", hint: "/#stack", run: () => go("/#stack") },
      { id: "log", group: "Navigate", label: "Experience log", hint: "/#log", run: () => go("/#log") },
      { id: "services", group: "Navigate", label: "Work with me", hint: "/#services", run: () => go("/#services") },
      { id: "contact", group: "Navigate", label: "Contact", hint: "/#contact", run: () => go("/#contact") },
      ...projects.map((p) => ({
        id: p.slug,
        group: "Case studies",
        label: p.title,
        hint: p.client,
        run: () => go(`/work/${p.slug}`),
      })),
      {
        id: "copy",
        group: "Actions",
        label: "Copy email address",
        hint: site.email,
        run: () => {
          navigator.clipboard?.writeText(site.email);
          close();
          setToast("Email copied");
          setTimeout(() => setToast(null), 1800);
        },
      },
      ...site.socials.map((s) => ({
        id: s.label,
        group: "Actions",
        label: `Open ${s.label}`,
        hint: s.handle,
        run: () => {
          close();
          window.open(s.href, "_blank", "noopener,noreferrer");
        },
      })),
    ],
    [go, close]
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return commands;
    return commands.filter((c) => `${c.label} ${c.hint ?? ""} ${c.group}`.toLowerCase().includes(s));
  }, [q, commands]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) lastFocus.current = document.activeElement as HTMLElement;
          return !o;
        });
      }
    };
    const onOpen = () => {
      lastFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-cmdk", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-cmdk", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(filtered.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    } else if (e.key === "Escape") {
      close();
    }
  };

  let lastGroup = "";

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center bg-ink/70 px-4 pt-[14vh] backdrop-blur-sm" onMouseDown={close}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-xl border border-line bg-ink-2 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span className="font-mono text-sm text-ui" aria-hidden>
                ›
              </span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search pages, case studies, actions…"
                className="h-12 w-full bg-transparent text-sm text-paper outline-none placeholder:text-dim focus-visible:outline-none"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-list"
                aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
              />
              <kbd className="rounded border border-line px-1.5 font-mono text-[10px] text-dim">esc</kbd>
            </div>
            <ul id="cmdk-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-mute">No results</li>}
              {filtered.map((c, i) => {
                const header = c.group !== lastGroup;
                lastGroup = c.group;
                return (
                  <li key={c.id} role="presentation">
                    {header && <div className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-dim">{c.group}</div>}
                    <button
                      id={`cmd-${c.id}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseEnter={() => setActive(i)}
                      onClick={c.run}
                      className={`flex w-full items-center justify-between gap-4 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                        i === active ? "bg-ink-3 text-paper" : "text-mute"
                      }`}
                    >
                      <span>{c.label}</span>
                      {c.hint && <span className="truncate font-mono text-[11px] text-dim">{c.hint}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 z-[130] -translate-x-1/2 rounded-md border border-line bg-ink-2 px-4 py-2 font-mono text-xs text-paper transition-all ${
          toast ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        {toast}
      </div>
    </>
  );
}
