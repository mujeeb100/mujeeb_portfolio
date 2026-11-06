export type Experience = {
  hash: string;
  title: string;
  company: string;
  period: string;
  current?: boolean;
  summary: string;
  stack: string[];
};

/* Shown as a `git log`. Newest first. */
export const experience: Experience[] = [
  {
    hash: "a3f9c21",
    title: "Software Engineer", // EDIT: confirm your exact title
    company: "Vodafone Idea (Vi)",
    period: "2024 — Now",
    current: true,
    summary:
      "Building AI-assisted support flows for ViCare and the Service IQ analytics dashboard: KPI views, charts and a process-assistant chat on top of live APIs.",
    stack: ["React", "TypeScript", "Tailwind", "Recharts", "LLM APIs"],
  },
  {
    hash: "7be04d8",
    title: "Senior Frontend Engineer (React)",
    company: "Vistra International Expansion",
    period: "2023 — 2024",
    summary:
      "Built the frontend of a multi-country payroll platform: pay cycles, payslips, employee portals and compliance reporting, with HR-system integrations.",
    stack: ["React", "Redux", "RTK Query", "TypeScript", "i18n"],
  },
  {
    hash: "c51e9a0",
    title: "Frontend Developer",
    company: "Psychx86 Technologies · at Niyogin FinTech",
    period: "2022 — 2023",
    summary:
      "Owned complex financial dashboard layouts and component architecture for Niyogin's lending and accounts portal.",
    stack: ["Vue", "Vuex", "Nuxt", "Bootstrap"],
  },
  {
    hash: "19d3f7e",
    title: "Frontend Developer",
    company: "Cloudage Software Solution",
    period: "2021 — 2022",
    summary: "Built modular, responsive web interfaces from product specs alongside stakeholders.",
    stack: ["JavaScript", "HTML", "CSS", "Bootstrap"],
  },
  {
    hash: "0e8b2c4",
    title: "UI Developer",
    company: "Oblix Technologies",
    period: "2019 — 2021",
    summary: "Shipped responsive, cross-browser websites and interactive UI. This is where it started.",
    stack: ["jQuery", "Bootstrap", "CSS3", "HTML5"],
  },
];
