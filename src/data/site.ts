/* ────────────────────────────────────────────────────────────
   All personal info lives here. Edit this file, not the components.
   ──────────────────────────────────────────────────────────── */

export const site = {
  name: "Mujeeb Ansari",
  short: "MA",
  role: "Frontend-first Full Stack Engineer",
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

export type LayerId = "ui" | "api" | "infra";

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
    body: "This is my strongest layer. I build component systems in React and TypeScript, keep keyboard and screen-reader support in from the first commit, and structure state so a 50-screen app stays as easy to change as a 5-screen one.",
    proof: [
      "Role-aware UI for 6 user roles from one codebase",
      "Design systems and reusable component libraries",
      "WCAG-minded semantics, focus management, reduced-motion support",
    ],
    tools: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux Toolkit", "RTK Query", "Vue", "Recharts"],
  },
  {
    id: "api",
    index: "L2",
    name: "Application",
    path: "/api",
    headline: "Data layers and APIs the frontend can trust.",
    body: "I design the contract between screen and server: typed API clients, cache invalidation that keeps views in sync, response normalisation, and the backend endpoints themselves when the project needs them.",
    proof: [
      "Cache-tag invalidation so dependent views refresh on their own",
      "Typed clients and normalisers for inconsistent upstream APIs",
      "REST services in Python and Node",
    ],
    tools: ["Node.js", "FastAPI", "Django", "PostgreSQL", "SQL", "REST", "JWT", "i18n"],
  },
  {
    id: "infra",
    index: "L3",
    name: "Infrastructure",
    path: "/infra",
    headline: "Pipelines that take code from merge to production.",
    body: "Shipping is part of the job. I set up CI/CD so every merge is built, checked and deployed the same way, and I keep environments boring and predictable.",
    proof: [
      "Azure DevOps pipelines deploying to Azure Static Web Apps",
      "Repeatable builds with environment-specific config",
      "Containerised services and Git-based deploy workflows",
    ],
    tools: ["Azure DevOps", "Azure Static Web Apps", "Docker", "GitHub Actions", "Vercel", "Kubernetes"],
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
    title: "CI/CD & deployment",
    body: "Pipelines on Azure DevOps, GitHub Actions or Vercel, so shipping becomes routine instead of a risky event.",
  },
];

/* Only industries with real shipped work */
export const domains = ["Fintech", "Payroll & HR", "Telecom & AI", "Quality & Operations", "FMCG"];
