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
    layers: ["ui", "api", "infra"],
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
        layer: "infra",
        title: "Merge → build → deploy",
        body: "An Azure DevOps pipeline builds, checks and deploys every merge to Azure Static Web Apps with environment-specific configuration, so a release is a routine merge rather than a separate event.",
      },
    ],
    architecture: [
      { layer: "ui", nodes: ["React + TypeScript", "Role-based routing", "Tailwind design tokens"] },
      { layer: "api", nodes: ["RTK Query cache", "Tag-based invalidation", "REST API"] },
      { layer: "infra", nodes: ["Azure DevOps pipeline", "Azure Static Web Apps", "Env config"] },
    ],
    outcomes: [
      { value: "6", label: "user roles served from one codebase" },
      { value: "3", label: "workflow stages connected end to end" },
      { value: "1", label: "pipeline from merge to production" },
    ],
    showRoleMatrix: true,
  },
  {
    slug: "service-iq",
    title: "Service IQ & ViCare AI Assist",
    client: "Vodafone Idea (Vi)",
    year: "2024 — Now",
    role: "Frontend engineer",
    tagline:
      "An analytics dashboard with an AI process assistant built in, running on live telecom data.",
    tint: "#7c9cff",
    layers: ["ui", "api"],
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
        layer: "api",
        title: "Normalising messy upstream data",
        body: "Several live APIs returned KPIs in different shapes. A normalisation layer turns them into one typed model, and a dedicated INR formatter keeps currency readable everywhere.",
      },
    ],
    architecture: [
      { layer: "ui", nodes: ["Dashboard + charts", "AI insights modal", "Portal-mounted chat"] },
      { layer: "api", nodes: ["KPI normaliser", "Session-managed chat API", "Multiple live REST sources"] },
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
