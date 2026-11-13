"""
Ask Mujeeb — FastAPI service behind mujeeb's portfolio.

Runs as a Vercel Python serverless function next to the Next.js app.
Routes live under /api/py so they never collide with Next.js routes.

  GET  /api/py/health    service + runtime info
  GET  /api/py/profile   structured profile
  POST /api/py/ask       question -> BM25 retrieval -> (optional) LLM answer
  GET  /api/py/docs      OpenAPI docs

Retrieval is a hand-written BM25 ranker over a small knowledge base. If an
ANTHROPIC_API_KEY or OPENAI_API_KEY env var is set, the top passages ground an
LLM answer; otherwise the retrieved passages are returned directly.
"""

from __future__ import annotations

import json
import math
import os
import platform
import re
import time
import urllib.request
from collections import Counter, defaultdict, deque

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, Field

BOOT = time.time()

app = FastAPI(
    title="Ask Mujeeb API",
    version="1.0.0",
    description="Retrieval-augmented Q&A about Mujeeb Ansari's work.",
    docs_url="/api/py/docs",
    openapi_url="/api/py/openapi.json",
    redoc_url=None,
)

# ─────────────────────────── knowledge base ───────────────────────────
# Keep every line true. This is what the assistant is allowed to say.

KB: list[dict[str, str]] = [
    {"id": "summary", "title": "Summary",
     "text": "Mujeeb Ansari is a Full Stack AI Engineer based in Mumbai, India, with 6+ years of experience. His strongest layer is frontend (React, TypeScript, design systems, accessibility), and he also builds Python backends with FastAPI and Django, PostgreSQL data layers, LLM-powered features, and CI/CD on Azure and AWS."},
    {"id": "current-role", "title": "Current role · Vodafone Idea",
     "text": "Since 2024 Mujeeb has worked on Vodafone Idea (Vi) products: ViCare AI Assist, an AI-assisted customer self-care and support platform, and Service IQ, an analytics dashboard with an AI process assistant built on live APIs."},
    {"id": "service-iq", "title": "Service IQ dashboard",
     "text": "Service IQ is a React, TypeScript and Tailwind analytics dashboard with a KPI strip, an achievement-rate ring, debt-ageing bucket charts, billing versus collections charts, AI-generated insights in a modal, and a session-aware process-assistant chat. Mujeeb normalised KPI data from several live APIs into one typed model and mounted the chat through a React portal to fix z-index conflicts."},
    {"id": "sqms", "title": "Site Quality Management System",
     "text": "The Site Quality Management System manages inspections, quality reports and corrective actions across multiple sites. Mujeeb built the React, TypeScript, Tailwind and RTK Query frontend with role-based access control for six user roles, connected inspection to report to corrective action as one workflow, used RTK Query cache tags so dependent views refresh automatically, and set up Azure DevOps CI/CD deploying to Azure Static Web Apps."},
    {"id": "vistra", "title": "Vistra · OnePayroll",
     "text": "From 2023 to 2024 Mujeeb was a Senior Frontend Engineer (React) at Vistra, building the OnePayroll platform: pay cycles, payslip generation, tax and compliance reporting, admin and employee portals, JWT-secured calls to a .NET API through RTK Query, HR-system integrations, and internationalisation (i18n)."},
    {"id": "niyogin", "title": "Niyogin FinTech",
     "text": "From 2022 to 2023 Mujeeb worked as a Frontend Developer through Psychx86 Technologies, on site at Niyogin FinTech, owning complex financial dashboard layouts and component architecture in Vue, Vuex and Nuxt for loans, customer accounts and transaction history."},
    {"id": "early", "title": "Early career",
     "text": "Mujeeb started in 2019 as a UI Developer at Oblix Technologies building responsive websites with HTML, CSS, jQuery and Bootstrap, then worked as a Frontend Developer at Cloudage Software Solution from 2021 to 2022. He also built the Saffola Oil brand website."},
    {"id": "frontend", "title": "Frontend skills",
     "text": "Frontend: React, Next.js, TypeScript, Redux Toolkit, RTK Query, Tailwind CSS, Vue and Nuxt, Recharts, Three.js and React Three Fiber. He focuses on design systems, reusable component libraries, accessibility (keyboard, screen readers, focus management, reduced motion) and scalable frontend architecture."},
    {"id": "backend", "title": "Backend skills",
     "text": "Backend: Python with FastAPI and Django, Pydantic validation, REST API design, JWT authentication, Node.js, and SQL with PostgreSQL. The API answering this question is a FastAPI service Mujeeb wrote, running as a serverless Python function."},
    {"id": "ai", "title": "AI and LLM work",
     "text": "AI: Mujeeb builds LLM features inside products, such as AI insights on analytics dashboards, an AI process assistant chat at Vodafone Idea, and retrieval-augmented generation (RAG) where relevant passages are retrieved first and then used to ground the model. This assistant uses a BM25 retriever he wrote in pure Python, with optional LLM generation."},
    {"id": "data", "title": "Data",
     "text": "Data: PostgreSQL schema design and SQL for application data and analytics, response normalisation for inconsistent upstream APIs, and vector search with embeddings (pgvector) for retrieval use cases."},
    {"id": "cloud", "title": "Cloud and DevOps",
     "text": "Cloud and DevOps: Azure DevOps CI/CD pipelines, Azure Static Web Apps, AWS, Docker containers, GitHub Actions, Vercel deployments, and Kubernetes basics. He sets up pipelines so every merge is built, checked and deployed the same way."},
    {"id": "portfolio", "title": "This portfolio",
     "text": "This portfolio is a full-stack project: a Next.js 15 and React 19 frontend with an animated layer of AI-agent cursors, a FastAPI backend under /api/py with OpenAPI docs at /api/py/docs, a BM25 retrieval pipeline, and a single Vercel deploy for frontend and backend. The source is on GitHub at github.com/mujeeb100/mujeeb_portfolio."},
    {"id": "agency", "title": "Elite Workforce International",
     "text": "Mujeeb is the founder of Elite Workforce International (eliteworkforceintl.com), an IT services and creative agency offering web and mobile development, custom software, UI/UX design, IT consulting and cloud services."},
    {"id": "hire", "title": "Availability and contact",
     "text": "Mujeeb is open to senior frontend, full stack and AI engineering roles, full-time or contract, remote or in Mumbai, and takes on selected freelance projects. Contact him at muzeeb100@yahoo.co.in, on LinkedIn at linkedin.com/in/mujeebansari786, or on GitHub as mujeeb100."},
    {"id": "how-work", "title": "How he works",
     "text": "Mujeeb models permissions and configuration as data instead of scattered conditionals, keeps server state in a typed cache layer, builds accessibility in from the first commit, and owns features end to end from design through API to deployment."},
]

# ─────────────────────────── BM25 retrieval ───────────────────────────

STOP = set("""a an the and or of to in on for with at by from is are was were be been being do does did
what who whom which how why when where can could would should will shall may might about his her him he she
it its this that these those as into than then so if not no yes you your me my i we our us tell give show
has have had any some more most there their them they just like also""".split())

SYNONYMS = {
    "ai": ["llm", "rag", "assistant", "insights"], "llm": ["ai"], "genai": ["ai", "llm"],
    "ml": ["ai"], "chatbot": ["assistant", "chat", "ai"], "gpt": ["llm", "ai"], "openai": ["llm", "ai"],
    "backend": ["fastapi", "django", "python", "api"], "server": ["backend", "api"],
    "python": ["fastapi", "django"], "api": ["rest", "fastapi"],
    "frontend": ["react", "typescript", "ui"], "ui": ["frontend", "react"], "javascript": ["typescript", "react"],
    "cloud": ["azure", "aws", "devops"], "aws": ["cloud", "devops", "docker"], "azure": ["cloud", "devops"], "devops": ["pipelines", "azure", "docker", "ci"], "deploy": ["devops", "pipelines"],
    "database": ["postgresql", "sql", "data"], "db": ["postgresql", "sql"], "postgres": ["postgresql"],
    "hire": ["contact", "available", "roles"], "email": ["contact"], "reach": ["contact"], "job": ["roles", "hire"],
    "experience": ["role", "worked"], "company": ["worked", "role"], "current": ["since", "2024"],
    "skills": ["frontend", "backend", "ai", "cloud"], "stack": ["skills"], "3d": ["three", "js"],
    "quality": ["sqms", "inspections"], "payroll": ["vistra", "onepayroll"], "vodafone": ["vi", "vicare"],
    "fintech": ["niyogin"], "agency": ["elite", "workforce"], "company's": ["agency"],
}


def _stem(w: str) -> str:
    for suf in ("ing", "ies", "ed", "es", "s"):
        if len(w) > 4 and w.endswith(suf):
            return w[: -len(suf)] + ("y" if suf == "ies" else "")
    return w


def tokenize(text: str) -> list[str]:
    words = re.findall(r"[a-z0-9][a-z0-9.+#']*", text.lower())
    return [_stem(w.strip(".'")) for w in words if w not in STOP and len(w) > 1]


class BM25:
    def __init__(self, docs: list[dict[str, str]], k1: float = 1.4, b: float = 0.75):
        self.docs, self.k1, self.b = docs, k1, b
        self.toks = [tokenize(d["title"] + " " + d["title"] + " " + d["text"]) for d in docs]
        self.tf = [Counter(t) for t in self.toks]
        self.avgdl = sum(map(len, self.toks)) / len(self.toks)
        df: dict[str, int] = defaultdict(int)
        for t in self.toks:
            for term in set(t):
                df[term] += 1
        n = len(docs)
        self.idf = {t: math.log(1 + (n - f + 0.5) / (f + 0.5)) for t, f in df.items()}

    def expand(self, q: list[str]) -> list[tuple[str, float]]:
        out = [(t, 1.0) for t in q]
        for t in q:
            for s in SYNONYMS.get(t, []):
                out.append((_stem(s), 0.5))
        return out

    def search(self, query: str, k: int = 3) -> list[tuple[dict[str, str], float]]:
        q = self.expand(tokenize(query))
        scores = []
        for i, tf in enumerate(self.tf):
            dl = len(self.toks[i])
            s = 0.0
            for term, w in q:
                f = tf.get(term)
                if not f:
                    continue
                s += w * self.idf.get(term, 0) * f * (self.k1 + 1) / (f + self.k1 * (1 - self.b + self.b * dl / self.avgdl))
            scores.append((self.docs[i], s))
        scores.sort(key=lambda x: x[1], reverse=True)
        return [(d, s) for d, s in scores[:k] if s > 0.6]


INDEX = BM25(KB)

# ─────────────────────────── optional LLM ───────────────────────────

SYSTEM = (
    "You are the assistant on Mujeeb Ansari's portfolio. Answer in at most 4 short sentences, in the same "
    "language as the question, using ONLY the provided context about Mujeeb. Refer to him in the third person. "
    "If the context doesn't contain the answer, say you don't know and suggest emailing muzeeb100@yahoo.co.in."
)


def _post(url: str, headers: dict[str, str], body: dict) -> dict:
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={"content-type": "application/json", **headers})
    with urllib.request.urlopen(req, timeout=12) as r:  # noqa: S310 (fixed https URLs)
        return json.loads(r.read())


def llm_answer(question: str, passages: list[dict[str, str]]) -> tuple[str, str] | None:
    context = "\n\n".join(f"[{p['title']}] {p['text']}" for p in passages)
    user = f"Context:\n{context}\n\nQuestion: {question}"
    try:
        if key := os.getenv("ANTHROPIC_API_KEY"):
            model = os.getenv("LLM_MODEL", "claude-haiku-5-5")
            data = _post("https://api.anthropic.com/v1/messages",
                         {"x-api-key": key, "anthropic-version": "2023-06-01"},
                         {"model": model, "max_tokens": 300, "system": SYSTEM, "messages": [{"role": "user", "content": user}]})
            return data["content"][0]["text"].strip(), model
        if key := os.getenv("OPENAI_API_KEY"):
            model = os.getenv("LLM_MODEL", "gpt-4o-mini")
            data = _post("https://api.openai.com/v1/chat/completions", {"authorization": f"Bearer {key}"},
                         {"model": model, "max_tokens": 300, "messages": [{"role": "system", "content": SYSTEM}, {"role": "user", "content": user}]})
            return data["choices"][0]["message"]["content"].strip(), model
    except Exception:  # noqa: BLE001 — fall back to retrieval on any provider error
        return None
    return None


def llm_configured() -> bool:
    return bool(os.getenv("ANTHROPIC_API_KEY") or os.getenv("OPENAI_API_KEY"))

# ─────────────────────────── rate limit (best effort) ───────────────────────────

_hits: dict[str, deque] = defaultdict(deque)


def rate_limited(ip: str, limit: int = 20, window: float = 60.0) -> bool:
    now, q = time.time(), _hits[ip]
    while q and now - q[0] > window:
        q.popleft()
    if len(q) >= limit:
        return True
    q.append(now)
    return False

# ─────────────────────────── routes ───────────────────────────


class AskIn(BaseModel):
    question: str = Field(..., min_length=2, max_length=400, examples=["What AI work has Mujeeb done?"])


class Source(BaseModel):
    id: str
    title: str
    score: float


class AskOut(BaseModel):
    answer: str
    mode: str
    model: str | None
    retriever: str
    sources: list[Source]
    latency_ms: float


GREETING = re.compile(r"^\s*(hi|hello|hey|salam|salaam|assalam|namaste|yo)\b", re.I)


@app.get("/api/py/health")
def health():
    return {
        "status": "ok",
        "service": "ask-mujeeb",
        "framework": "FastAPI",
        "python": platform.python_version(),
        "region": os.getenv("VERCEL_REGION", "local"),
        "llm": "configured" if llm_configured() else "retrieval-only",
        "kb_documents": len(KB),
        "uptime_s": round(time.time() - BOOT, 1),
    }


@app.get("/api/py/profile")
def profile():
    return {
        "name": "Mujeeb Ansari",
        "role": "Full Stack AI Engineer",
        "location": "Mumbai, India",
        "experience_years": "6+",
        "layers": {
            "ui": ["React", "TypeScript", "Next.js", "Tailwind", "RTK Query", "Three.js"],
            "api": ["Python", "FastAPI", "Django", "Node.js", "REST"],
            "ai": ["LLM APIs", "RAG", "Embeddings", "PostgreSQL"],
            "cloud": ["Azure DevOps", "Azure", "AWS", "Docker", "Vercel"],
        },
        "contact": "muzeeb100@yahoo.co.in",
    }


@app.post("/api/py/ask", response_model=AskOut)
def ask(body: AskIn, request: Request):
    t0 = time.perf_counter()
    ip = (request.headers.get("x-forwarded-for") or (request.client.host if request.client else "anon")).split(",")[0]
    if rate_limited(ip):
        raise HTTPException(status_code=429, detail="Too many questions. Try again in a minute.")

    q = body.question.strip()
    ms = lambda: round((time.perf_counter() - t0) * 1000, 1)  # noqa: E731

    if GREETING.match(q) and len(tokenize(q)) <= 2:
        return AskOut(answer="Hi! Ask me anything about Mujeeb's work: his AI projects, backend stack, cloud experience, or how to hire him.",
                      mode="smalltalk", model=None, retriever="bm25", sources=[], latency_ms=ms())

    hits = INDEX.search(q, k=3)
    sources = [Source(id=d["id"], title=d["title"], score=round(s, 2)) for d, s in hits]

    if not hits:
        return AskOut(answer="I only know about Mujeeb's work and experience, and I couldn't find that. Try asking about his AI projects, FastAPI and Django experience, cloud work, or how to contact him.",
                      mode="no-match", model=None, retriever="bm25", sources=[], latency_ms=ms())

    passages = [d for d, _ in hits]
    if llm_configured() and (res := llm_answer(q, passages)):
        text, model = res
        return AskOut(answer=text, mode="rag", model=model, retriever="bm25", sources=sources, latency_ms=ms())

    # retrieval-only: return the best passage, plus a second if it's close in score
    answer = passages[0]["text"]
    if len(hits) > 1 and hits[1][1] > hits[0][1] * 0.75:
        answer += " " + passages[1]["text"]
    return AskOut(answer=answer, mode="retrieval", model=None, retriever="bm25", sources=sources, latency_ms=ms())
