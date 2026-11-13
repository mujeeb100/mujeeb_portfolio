import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Nav from "@/components/Nav";
import AgentLayer from "@/components/AgentLayer";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import { site } from "@/data/site";

const description =
  "Mujeeb Ansari: Full Stack AI Engineer in Mumbai. React, TypeScript, Python, FastAPI, Django, PostgreSQL, LLM features, Azure and AWS. AI products built end to end, interface to cloud.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Full Stack AI Engineer`,
    template: `%s · ${site.name}`,
  },
  description,
  keywords: ["Mujeeb Ansari", "Full Stack AI Engineer", "Frontend Engineer", "FastAPI", "Django", "Python", "LLM", "Azure", "AWS", "React", "TypeScript", "Full Stack Developer", "Mumbai", "Design Systems", "Accessibility"],
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} · Full Stack AI Engineer`,
    description,
    siteName: site.name,
    images: ["/mujeeb-cutout.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · Full Stack AI Engineer`,
    description,
    images: ["/mujeeb-cutout.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="grain font-sans antialiased">
        <a
          href="#main"
          className="sr-only z-[200] rounded bg-ui px-4 py-2 font-mono text-sm text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <div className="rail" aria-hidden />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <CommandPalette />
        <AgentLayer />
      </body>
    </html>
  );
}
