"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

type Source = { id: string; title: string; score: number };
type AskOut = { answer: string; mode: string; model: string | null; retriever: string; sources: Source[]; latency_ms: number };
type Health = { status: string; framework: string; python: string; region: string; llm: string; kb_documents: number };
type Msg = { role: "user" | "ai"; text: string; meta?: AskOut; error?: boolean };

const SUGGESTIONS = [
  "What AI work has Mujeeb done?",
  "Does he know FastAPI and Django?",
  "Tell me about the Site Quality project",
  "What cloud experience does he have?",
  "How can I hire him?",
];

export default function AskSection() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [health, setHealth] = useState<Health | null>(null);
  const [healthMs, setHealthMs] = useState<number | null>(null);
  const [healthErr, setHealthErr] = useState(false);
  const [last, setLast] = useState<{ req: string; res: AskOut | null; ms: number } | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t0 = performance.now();
    fetch("/api/py/health")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        setHealth(d);
        setHealthMs(Math.round(performance.now() - t0));
      })
      .catch(() => setHealthErr(true));
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  const ask = async (question: string) => {
    const text = question.trim();
    if (!text || busy) return;
    setQ("");
    setMsgs((m) => [...m, { role: "user", text }]);
    setBusy(true);
    const t0 = performance.now();
    try {
      const r = await fetch("/api/py/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const ms = Math.round(performance.now() - t0);
      if (!r.ok) {
        const detail = r.status === 429 ? "Too many questions. Give it a minute." : "The API returned an error.";
        setMsgs((m) => [...m, { role: "ai", text: detail, error: true }]);
        setLast({ req: text, res: null, ms });
        return;
      }
      const d: AskOut = await r.json();
      setMsgs((m) => [...m, { role: "ai", text: d.answer, meta: d }]);
      setLast({ req: text, res: d, ms });
    } catch {
      setMsgs((m) => [...m, { role: "ai", text: "Couldn't reach the API. Check your connection and try again.", error: true }]);
    } finally {
      setBusy(false);
    }
  };

  const maxScore = Math.max(1, ...(last?.res?.sources.map((s) => s.score) ?? [1]));

  return (
    <section id="ask" className="sec relative">
      <div className="pointer-events-none absolute right-0 top-20 h-[420px] w-[520px] rounded-full bg-ui/10 blur-[140px]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow">Ask my AI</p>
            <h2 className="display mt-4 text-[clamp(52px,7vw,104px)]" data-agent data-type>
              Don&apos;t take my word.
              <br />
              <span className="accent">Ask my backend.</span>
            </h2>
          </div>
          <p className="max-w-md text-mute lg:justify-self-end">
            This chat calls a FastAPI service I wrote. It runs a BM25 retriever over a knowledge base of my work and returns the
            sources it used. The panel on the right shows the real request and response.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          {/* chat */}
          <Reveal className="flex h-[560px] flex-col overflow-hidden rounded-2xl border border-line bg-ink-2/70 backdrop-blur">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-ai/15 font-mono text-[10px] text-ai">AI</span>
                <div>
                  <p className="text-sm font-semibold leading-none">Ask Mujeeb</p>
                  <p className="mt-1 font-mono text-[10px] text-dim">fastapi · bm25 · {health?.llm === "configured" ? "llm-grounded" : "retrieval"}</p>
                </div>
              </div>
              {msgs.length > 0 && (
                <button type="button" onClick={() => setMsgs([])} className="font-mono text-[10px] text-dim hover:text-paper">
                  clear
                </button>
              )}
            </div>

            <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-5" aria-live="polite">
              {msgs.length === 0 && (
                <div className="flex h-full flex-col justify-end">
                  <p className="text-sm text-mute">Try one of these, or ask your own question (Hinglish works too):</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => ask(s)}
                        className="rounded-full border border-line px-3.5 py-2 text-left text-xs text-paper/85 transition-colors hover:border-ai/60 hover:text-paper"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {msgs.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-paper px-4 py-2.5 text-sm text-ink">{m.text}</p>
                  </div>
                ) : (
                  <div key={i} className="max-w-[92%]">
                    <p className={`rounded-2xl rounded-bl-sm border px-4 py-3 text-sm leading-relaxed ${m.error ? "border-ui/40 text-ui" : "border-line bg-ink text-paper/90"}`}>
                      {m.text}
                    </p>
                    {m.meta && m.meta.sources.length > 0 && (
                      <div className="mt-2 flex flex-wrap items-center gap-1.5 font-mono text-[10px] text-dim">
                        <span>sources:</span>
                        {m.meta.sources.map((s) => (
                          <span key={s.id} className="rounded border border-line px-1.5 py-0.5 text-mute">
                            {s.title}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
              {busy && (
                <div className="flex items-center gap-1.5 px-1" aria-label="Thinking">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="pulse-dot h-1.5 w-1.5 rounded-full bg-ai" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(q);
              }}
              className="flex items-center gap-2 border-t border-line p-3"
            >
              <label htmlFor="ask-input" className="sr-only">
                Ask a question about Mujeeb
              </label>
              <input
                id="ask-input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                maxLength={400}
                placeholder="Ask about AI work, FastAPI, cloud, hiring…"
                className="h-11 flex-1 rounded-md border border-line bg-ink px-4 text-sm text-paper outline-none placeholder:text-dim focus:border-ai/60"
              />
              <button
                type="submit"
                disabled={busy || q.trim().length < 2}
                className="h-11 rounded-md bg-paper px-5 text-sm font-semibold text-ink transition-colors hover:bg-ai disabled:opacity-40"
              >
                Ask
              </button>
            </form>
          </Reveal>

          {/* under the hood */}
          <Reveal delay={0.08} className="flex flex-col gap-5 font-mono text-[12px]">
            <div className="rounded-2xl border border-line bg-ink-2/70 p-5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-dim">
                  <span className="text-infra">GET</span> /api/py/health
                </span>
                <span className={healthErr ? "text-ui" : health ? "text-infra" : "text-dim"}>
                  {healthErr ? "offline" : health ? `200 · ${healthMs}ms` : "…"}
                </span>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                {[
                  ["framework", health?.framework],
                  ["python", health?.python],
                  ["region", health?.region],
                  ["kb docs", health?.kb_documents],
                ].map(([k, v]) => (
                  <div key={k as string}>
                    <dt className="text-[10px] text-dim">{k}</dt>
                    <dd className="mt-0.5 text-paper/85">{v ?? "—"}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex-1 rounded-2xl border border-line bg-ink-2/70 p-5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-dim">
                  <span className="text-api">POST</span> /api/py/ask
                </span>
                {last && <span className={last.res ? "text-infra" : "text-ui"}>{last.res ? `200 · ${last.ms}ms` : "error"}</span>}
              </div>
              {!last ? (
                <p className="mt-6 text-dim">Ask something to see the request and the ranked sources.</p>
              ) : (
                <div className="mt-4 space-y-4">
                  <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-md bg-ink p-3 text-[11px] text-paper/80">
                    {JSON.stringify({ question: last.req }, null, 2)}
                  </pre>
                  {last.res && (
                    <>
                      <div className="grid grid-cols-3 gap-2 text-[10px]">
                        <div>
                          <div className="text-dim">mode</div>
                          <div className="mt-0.5 text-ai">{last.res.mode}</div>
                        </div>
                        <div>
                          <div className="text-dim">retriever</div>
                          <div className="mt-0.5 text-paper/85">{last.res.retriever}</div>
                        </div>
                        <div>
                          <div className="text-dim">server</div>
                          <div className="mt-0.5 text-paper/85">{last.res.latency_ms}ms</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-dim">top-k passages · bm25 score</div>
                        <ul className="mt-2 space-y-2">
                          {last.res.sources.length === 0 && <li className="text-dim">none above threshold</li>}
                          {last.res.sources.map((s) => (
                            <li key={s.id}>
                              <div className="flex justify-between text-[11px]">
                                <span className="truncate text-paper/85">{s.title}</span>
                                <span className="text-dim">{s.score.toFixed(2)}</span>
                              </div>
                              <div className="mt-1 h-1 rounded-full bg-line">
                                <div className="h-1 rounded-full bg-ai" style={{ width: `${(s.score / maxScore) * 100}%` }} />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              )}
              <a href="/api/py/docs" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-[11px] text-mute underline decoration-line underline-offset-4 hover:text-paper">
                OpenAPI docs ↗
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
