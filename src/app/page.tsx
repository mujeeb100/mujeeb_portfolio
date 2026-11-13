import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Marquee from "@/components/Marquee";
import Record from "@/components/Record";
import AskSection from "@/components/AskSection";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Marquee />
      <Record />
      <AskSection />
      <About />
      <Contact />
    </>
  );
}
