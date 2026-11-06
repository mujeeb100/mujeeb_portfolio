import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import Loader from "@/components/Loader";
import { site } from "@/data/site";

const description =
  "Mujeeb Ansari: frontend-first full stack engineer in Mumbai. React, TypeScript, design systems, accessibility, and the pipelines that ship them. From interface to infrastructure.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · From interface to infrastructure`,
    template: `%s · ${site.name}`,
  },
  description,
  keywords: ["Mujeeb Ansari", "Frontend Engineer", "React", "TypeScript", "Full Stack Developer", "Mumbai", "Design Systems", "Accessibility"],
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} · From interface to infrastructure`,
    description,
    siteName: site.name,
    images: ["/mujeeb.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · From interface to infrastructure`,
    description,
    images: ["/mujeeb.jpg"],
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
        <Loader />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}
