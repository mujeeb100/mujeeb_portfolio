# mujeeb.dev — From interface to infrastructure

Personal portfolio of Mujeeb Ansari. Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Motion.

## Edit content (no component changes needed)
- `src/data/site.ts` — name, email, socials, the three stack layers, services
- `src/data/projects.ts` — case studies (each gets a page at `/work/<slug>`)
- `src/data/experience.ts` — the `git log` timeline

## Add real screenshots
Put images in `public/work/<slug>.png` and swap `ProjectArt` for `next/image` in `Work.tsx` and `app/work/[slug]/page.tsx`.

## Run
```bash
npm install
npm run dev
```

Keyboard: `⌘K` / `Ctrl+K` opens the command menu.
