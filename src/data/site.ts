/* ────────────────────────────────────────────────────────────
   All personal info lives here. Edit this file, not the components.
   ──────────────────────────────────────────────────────────── */

export const site = {
  name: "Mujeeb Ansari",
  short: "MA",
  role: "Full Stack AI Engineer",
  location: "Mumbai, India",
  timezone: "Asia/Kolkata",
  email: "muzeeb100@yahoo.co.in",
  url: "https://mujeeb-portfolio-eight.vercel.app",
  available: true,
  years: "6+",
  agency: {
    name: "Elite Workforce International",
    url: "https://eliteworkforceintl.com",
  },
  socials: [
    { label: "GitHub", handle: "mujeeb100", href: "https://github.com/mujeeb100" },
    { label: "LinkedIn", handle: "mujeebansari786", href: "https://www.linkedin.com/in/mujeebansari786/" },
    /* Handle now matches the URL. If your real X handle is different, change both. */
    { label: "X", handle: "@mujeeb20010", href: "https://x.com/mujeeb20010" },
  ],
} as const;

export type LayerId = "ui" | "api" | "ai" | "cloud";

export const layerMeta: Record<LayerId, { path: string; name: string; color: string }> = {
  ui: { path: "/ui", name: "Interface", color: "var(--color-ui)" },
  api: { path: "/api", name: "Services", color: "var(--color-api)" },
  ai: { path: "/ai", name: "Data & AI", color: "var(--color-ai)" },
  cloud: { path: "/cloud", name: "Cloud", color: "var(--color-cloud)" },
};

export const layers: {
  id: LayerId;
  index: string;
  name: string;
  path: string;
  headline: string;
  body: string;
  proof: string[];
  tools: string[];
}[] = [
  {
    id: "ui",
    index: "L1",
    name: "Interface",
    path: "/ui",
    headline: "Interfaces that stay fast and accessible as they grow.",
    body: "This is my strongest layer. I build component systems in React and TypeScript, keep keyboard and screen-reader support in from the first commit, and structure state so a 50-screen app stays as easy to change as a 5-screen one. I also build real-time and 3D interfaces when the product calls for them.",
    proof: [
      "Role-aware UI for 6 user roles from one codebase",
      "Design systems and reusable component libraries",
      "Streaming AI chat UIs, data dashboards, WebGL / Three.js",
    ],
    tools: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux Toolkit", "RTK Query", "Three.js", "Vue"],
  },
  {
    id: "api",
    index: "L2",
    name: "Services",
    path: "/api",
    headline: "Python and Node services with clear, typed contracts.",
    body: "I build the APIs the frontend depends on: FastAPI for fast typed services, Django when a project needs admin, ORM and auth out of the box, and Node where it fits. The API backing this site is a FastAPI service I wrote.",
    proof: [
      "FastAPI services with Pydantic validation and OpenAPI docs",
      "Django apps with ORM, auth and admin",
      "JWT auth, pagination and response normalisation",
    ],
    tools: ["Python", "FastAPI", "Django", "Pydantic", "Node.js", "REST", "JWT", "WebSockets"],
  },
  {
    id: "ai",
    index: "L3",
    name: "Data & AI",
    path: "/ai",
    headline: "LLM features that are grounded in real data.",
    body: "I add AI where it removes work: assistants that answer from a company's own data, insight panels on top of analytics, and chat that lives inside the product. Under that are PostgreSQL schemas and retrieval pipelines built to be reliable.",
    proof: [
      "AI process-assistant chat and AI insights in a live telecom dashboard",
      "Retrieval pipelines (BM25 / vector search) feeding LLM prompts",
      "PostgreSQL data modelling and SQL for analytics",
    ],
    tools: ["LLM APIs", "Azure OpenAI", "RAG", "Embeddings", "pgvector", "PostgreSQL", "SQL", "Prompt engineering"],
  },
  {
    id: "cloud",
    index: "L4",
    name: "Cloud",
    path: "/cloud",
    headline: "Pipelines and infrastructure from merge to production.",
    body: "Shipping is part of the job. I set up CI/CD so every merge is built, checked and deployed the same way, on Azure, AWS or Vercel, and I keep environments boring and predictable.",
    proof: [
      "Azure DevOps pipelines deploying to Azure Static Web Apps",
      "Containerised services with Docker",
      "Serverless Python + Next.js deploys (this site)",
    ],
    tools: ["Azure", "Azure DevOps", "AWS", "Docker", "GitHub Actions", "Vercel", "Kubernetes", "Linux"],
  },
];

export const services = [
  {
    n: "01",
    title: "Frontend architecture & builds",
    body: "New product or a legacy app that has become hard to change. I set up the structure, state and component patterns, then build it with your team.",
  },
  {
    n: "02",
    title: "Design systems & accessibility",
    body: "One component library that designers and developers both trust, with accessibility built in rather than audited in at the end.",
  },
  {
    n: "03",
    title: "Dashboards & internal tools",
    body: "Data-heavy, role-based applications: analytics, workflows, approvals, reporting. This is the work I have done most.",
  },
  {
    n: "04",
    title: "AI features & backends",
    body: "LLM assistants grounded in your data, plus the FastAPI or Django services and PostgreSQL behind them, deployed on Azure or AWS.",
  },
];

/* Only industries with real shipped work */
export const domains = ["Fintech", "Payroll & HR", "Telecom & AI", "Quality & Operations", "FMCG"];
