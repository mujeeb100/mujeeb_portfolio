import About from "@/components/about/page";
import ConsultationPage from "@/components/Consultation/Consultation";
import Conatct from "@/components/contact/page";
import WorkExperience from "@/components/experience/page";
import Footer from "@/components/footer/page";
import Home1 from "@/components/home/page";
import Projects from "@/components/projects/page";
import TechnicalSkills from "@/components/skills/page";

export default function Home() {
  return (
    <div>
      <Home1 />
     <About />
     <ConsultationPage />
     <WorkExperience />
     <Projects />
     <TechnicalSkills />
     <Conatct/>
      <Footer />
    </div>
  );
}
