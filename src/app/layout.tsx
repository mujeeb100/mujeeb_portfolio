import type { Metadata } from "next";
import { Geist, Geist_Mono , Poppins} from "next/font/google";
import "./globals.css";
import Header from "@/header/page";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mujeeb Ansari | Full Stack Developer",
  description: "Portfolio of Mujeeb Ansari, a Full Stack Developer",
};
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="Portfolio of Mujeeb Ansari, a Full stack Developer" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} antialiased`}
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
