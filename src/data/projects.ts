import type { LayerId } from "./site";

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  role: string;
  tagline: string;
  /** Hue used for the project's preview art (CSS colour) */
  tint: string;
  layers: LayerId[];
  stack: string[];
  link?: { label: string; href: string };
  /** Shown instead of a link when the product is private */
  privateNote?: string;
  challenge: string;
  approach: { title: string; body: string; layer: LayerId }[];
  architecture: { layer: LayerId; nodes: string[] }[];
  outcomes: { value: string; label: string }[];
  /** Optional extra visual on the case-study page */
  showRoleMatrix?: boolean;
};

export const projects: Project[] = [
  /* ───────────────── FEATURED ───────────────── */
  {
    slug: "site-quality-management",
    title: "Site Quality Management System",
    client: "Multi-site operations platform",
    year: "Recent", // EDIT: e.g. "2025"
    role: "Frontend engineer · CI/CD",
    tagline:
      "Inspections, quality reports and corrective actions across every site, in one role-aware workflow.",
    tint: "#ff4d1c",
    layers: ["ui", "api", "cloud"],
    stack: ["React", "TypeScript", "Tailwind CSS", "Redux Toolkit", "RTK Query", "Azure DevOps", "Azure Static Web Apps"],
    privateNote: "Internal platform · walkthrough on request",
    challenge:
      "Quality work at a site follows a chain: someone inspects, findings become a report, and the report leads to corrective actions that someone else has to close. Six different roles take part in that chain, and each needs to see and do different things. The product had to make the whole loop visible across sites without showing anyone more than their role allows.",
    approach: [
      {
        layer: "ui",
        title: "One codebase, six roles",
        body: "Permissions are modelled as data, not scattered if-statements. Route guards decide which pages a role can reach, and permission-aware components decide which actions appear on a page. Adding or changing a role is a config change, not a refactor.",
      },
      {
        layer: "ui",
        title: "Inspection → report → corrective action",
        body: "The three stages are built as one connected flow. A finding in an inspection carries straight into its report, and every corrective action links back to the finding that raised it, so nobody has to re-enter context.",
      },
      {
        layer: "api",
        title: "A data layer that keeps every view honest",
        body: "All server state goes through RTK Query. Cache tags tie inspections, reports and actions together, so closing a corrective action automatically refreshes the report and dashboard that depend on it. There is no manual refetching and no stale screens.",
      },
      {
        layer: "cloud",
        title: "Merge → build → deploy",
        body: "An Azure DevOps pipeline builds, checks and deploys every merge to Azure Static Web Apps with environment-specific configuration, so a release is a routine merge rather than a separate event.",
      },
    ],
    architecture: [
      { layer: "ui", nodes: ["React + TypeScript", "Role-based routing", "Tailwind design tokens"] },
      { layer: "api", nodes: ["RTK Query cache", "Tag-based invalidation", "REST API"] },
      { layer: "cloud", nodes: ["Azure DevOps pipeline", "Azure Static Web Apps", "Env config"] },
    ],
    outcomes: [
      { value: "6", label: "user roles served from one codebase" },
      { value: "3", label: "workflow stages connected end to end" },
      { value: "1", label: "pipeline from merge to production" },
    ],
    showRoleMatrix: true,
  },
  {
    slug: "ask-mujeeb",
    title: "Ask Mujeeb: this portfolio",
    client: "Personal · open source",
    year: "2026",
    role: "Design, frontend, backend, AI, deploy",
    tagline:
      "A Next.js + Three.js frontend and a FastAPI retrieval service, deployed together on Vercel. Ask it anything about my work.",
    tint: "#3ddc97",
    layers: ["ui", "api", "ai", "cloud"],
    stack: ["Next.js 15", "React 19", "Three.js", "React Three Fiber", "Python", "FastAPI", "BM25 retrieval", "LLM API (optional)", "Vercel"],
    link: { label: "the source on GitHub", href: "https://github.com/mujeeb100/mujeeb_portfolio" },
    challenge:
      "A portfolio claims you can do things. I wanted mine to show it. The site is a working full-stack AI product: a 3D frontend, a Python API, a retrieval pipeline, and one deploy for all of it. You can try every layer from the homepage.",
    approach: [
      {
        layer: "ui",
        title: "A 3D scene that explains the stack",
        body: "The hero is a React Three Fiber scene: four glass layers with data packets moving between them, reacting to the pointer. It loads lazily, caps device pixel ratio, and falls back to a static view for reduced motion.",
      },
      {
        layer: "api",
        title: "FastAPI on serverless Python",
        body: "The /api/py routes are a FastAPI app deployed as a Vercel Python function next to the Next.js app. Requests are validated with Pydantic, and OpenAPI docs are generated at /api/py/docs.",
      },
      {
        layer: "ai",
        title: "Retrieval first, generation second",
        body: "Questions are scored against a knowledge base of my work using a BM25 ranker I wrote in pure Python. The top passages come back with sources. If an LLM key is configured, those passages ground the model's answer; without one, the retrieved facts are returned directly.",
      },
      {
        layer: "cloud",
        title: "One repo, one deploy",
        body: "A push to master builds the Next.js app and the Python function together. Pull requests get preview deployments, and production updates on merge.",
      },
    ],
    architecture: [
      { layer: "ui", nodes: ["Next.js App Router", "React Three Fiber scene", "Ask Mujeeb chat UI"] },
      { layer: "api", nodes: ["FastAPI /api/py", "Pydantic models", "OpenAPI docs"] },
      { layer: "ai", nodes: ["Knowledge base", "BM25 ranker", "Optional LLM grounding"] },
      { layer: "cloud", nodes: ["Vercel Python runtime", "Edge-cached frontend", "Preview deploys per PR"] },
    ],
    outcomes: [
      { value: "4", label: "layers of the stack, all live on one site" },
      { value: "<1s", label: "typical retrieval response" },
      { value: "1", label: "push to deploy frontend and backend" },
    ],
  },
  {
    slug: "service-iq",
    title: "Service IQ & ViCare AI Assist",
    client: "Vodafone Idea (Vi)",
    year: "2024 — Now",
    role: "Frontend engineer",
    tagline:
      "An analytics dashboard with an AI process assistant built in, running on live telecom data.",
    tint: "#c58cff",
    layers: ["ui", "api", "ai"],
    stack: ["React", "TypeScript", "Tailwind CSS", "Recharts", "LLM APIs", "REST"],
    link: { label: "ViCare", href: "https://vicare.vodafoneidea.com" },
    challenge:
      "Teams needed to read collections and billing health at a glance (achievement rate, debt ageing, billing against collections) and then ask follow-up questions in plain language without leaving the dashboard.",
    approach: [
      {
        layer: "ui",
        title: "KPIs first, detail on demand",
        body: "A KPI strip and an achievement-rate ring give the headline. Debt-ageing buckets and billing-vs-collections charts sit below, and AI-generated insights open in a focused modal.",
      },
      {
        layer: "ui",
        title: "A chat that never fights the layout",
        body: "The process-assistant chat is its own component with session management. It renders through a React portal, which ended the z-index conflicts with charts and modals.",
      },
      {
        layer: "ai",
        title: "AI insights and a process assistant",
        body: "LLM-generated insights explain what the KPIs mean, and a session-aware assistant answers process questions in context, so analysts don't have to switch to another tool.",
      },
      {
        layer: "api",
        title: "Normalising messy upstream data",
        body: "Several live APIs returned KPIs in different shapes. A normalisation layer turns them into one typed model, and a dedicated INR formatter keeps currency readable everywhere.",
      },
    ],
    architecture: [
      { layer: "ui", nodes: ["Dashboard + charts", "AI insights modal", "Portal-mounted chat"] },
      { layer: "ai", nodes: ["LLM insights", "Process assistant", "Session memory"] },
      { layer: "api", nodes: ["KPI normaliser", "Chat API", "Multiple live REST sources"] },
    ],
    outcomes: [
      { value: "Live", label: "data from multiple backend APIs" },
      { value: "AI", label: "assistant built into the workflow" },
      { value: "₹", label: "INR-native formatting throughout" },
    ],
  },
  {
    slug: "payroll-platform",
    title: "OnePayroll Platform",
    client: "Vistra",
    year: "2023 — 2024",
    role: "Senior frontend engineer",
    tagline:
      "Multi-country payroll: pay cycles, payslips, compliance reports and employee self-service.",
    tint: "#3ddc97",
    layers: ["ui", "api"],
    stack: ["React", "TypeScript", "Redux", "RTK Query", "JWT", ".NET API", "i18n", "Tailwind CSS"],
    link: { label: "onepayroll.net", href: "https://www.onepayroll.net/" },
    challenge:
      "Payroll is unforgiving. Salary runs, tax rules, leave adjustments and payslips have to be right every cycle, for companies of very different sizes, in more than one language.",
    approach: [
      {
        layer: "ui",
        title: "Admin and employee portals",
        body: "Admins configure pay cycles, manage employee records and track disbursement history. Employees get their own portal for payslips and reports.",
      },
      {
        layer: "api",
        title: "Secure, typed API layer",
        body: "JWT-secured calls to a .NET backend go through RTK Query, with HR-system integrations feeding employee data in automatically.",
      },
      {
        layer: "ui",
        title: "Built for many markets",
        body: "Internationalisation is in from the start, so copy, formats and layouts adapt per locale without forking components.",
      },
    ],
    architecture: [
      { layer: "ui", nodes: ["Admin portal", "Employee portal", "i18n"] },
      { layer: "api", nodes: ["RTK Query", "JWT auth", ".NET services + HR sync"] },
    ],
    outcomes: [
      { value: "2", label: "portals: admin and employee" },
      { value: "i18n", label: "multi-locale from day one" },
      { value: "SMB→Ent", label: "architecture that scales by client size" },
    ],
  },
  {
    slug: "niyogin-fintech",
    title: "Niyogin Fintech Portal",
    client: "Niyogin FinTech · via Psychx86",
    year: "2022 — 2023",
    role: "Frontend developer",
    tagline: "Loan applications, customer accounts and transaction history on one portal.",
    tint: "#f5c542",
    layers: ["ui"],
    stack: ["Vue", "Vuex", "Nuxt", "TypeScript", "Tailwind CSS", "i18n"],
    link: { label: "niyogin.com", href: "https://www.niyogin.com/" },
    challenge:
      "Financial dashboards pack a lot of dense, sensitive data into a small space. The portal had to stay clear and fast while handling loans, accounts and transactions.",
    approach: [
      {
        layer: "ui",
        title: "Component architecture for dense dashboards",
        body: "I owned the complex dashboard layouts and built reusable building blocks so new financial views could be put together instead of rebuilt.",
      },
      {
        layer: "ui",
        title: "Performance on data-heavy screens",
        body: "Careful state management in Vuex and lean rendering kept the analytics views responsive.",
      },
    ],
    architecture: [{ layer: "ui", nodes: ["Nuxt app", "Vuex store", "Dashboard component kit"] }],
    outcomes: [
      { value: "3", label: "core domains: loans, accounts, transactions" },
      { value: "Vue", label: "component kit reused across views" },
      { value: "On-site", label: "embedded with the client team" },
    ],
  },
];

export const smallProjects = [
  { title: "Saffola Oil website", note: "Brand site · products, benefits, recipes", stack: "React · Redux · Tailwind" },
  { title: "Cloudage web apps", note: "Client web applications", stack: "JavaScript · Bootstrap", href: "http://cloudage.tech/" },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
