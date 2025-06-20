import About from "@/components/about/page";
import Conatct from "@/components/contact/page";
import WorkExperience from "@/components/experience/page";
import Home1 from "@/components/home/page";
import Projects from "@/components/projects/page";
import TechnicalSkills from "@/components/skills/page";

export default function Home() {
  return (
    <div>
      <Home1 />
     <About />
     <WorkExperience />
     <Projects />
     <TechnicalSkills />
     <Conatct/>
    </div>
  );
}
