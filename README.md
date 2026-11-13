# Mujeeb Ansari — Full Stack AI Engineer portfolio

Personal portfolio of Mujeeb Ansari.

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion, Anton display type, and an "agents in the loop" cursor layer (`src/components/AgentLayer.tsx`)
- **Backend:** FastAPI (Python) in `api/index.py`, deployed as a Vercel Python function under `/api/py/*`
- **AI:** "Ask Mujeeb" — hand-written BM25 retrieval over a knowledge base, with optional LLM grounding
- **Docs:** `/api/py/docs` (OpenAPI)

### Enable LLM answers (optional)
In Vercel → Project → Settings → Environment Variables, add **one** of:
- `ANTHROPIC_API_KEY` (optional `LLM_MODEL`, default `claude-haiku-5-5`)
- `OPENAI_API_KEY` (optional `LLM_MODEL`, default `gpt-4o-mini`)

Without a key the assistant answers with the retrieved passages directly.

### Edit what the assistant knows
`KB` list at the top of `api/index.py`. Keep every line true.

## Edit content (no component changes needed)
- `src/data/site.ts` — name, email, socials, the three stack layers, services
- `src/data/projects.ts` — case studies (each gets a page at `/work/<slug>`)
- `src/data/experience.ts` — the `git log` timeline

## Add real screenshots
Put images in `public/work/<slug>.png` and swap `ProjectArt` for `next/image` in `Work.tsx` and `app/work/[slug]/page.tsx`.

## Run locally
```bash
npm install
pip install -r requirements.txt uvicorn
npm run dev:api   # FastAPI on :8000
npm run dev       # Next.js on :3000 (proxies /api/py → :8000)
```

Keyboard: `⌘K` / `Ctrl+K` opens the command menu.
