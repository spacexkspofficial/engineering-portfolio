import { About } from "../components/sections/About";
import { Contact } from "../components/sections/Contact";
import { Hero } from "../components/sections/Hero";
import { ProjectsPreview } from "../components/sections/ProjectsPreview";
import { Skills } from "../components/sections/Skills";

export function Home() {
  return (
    <main id="main" className="page-fade">
      <Hero />
      <About />
      <ProjectsPreview />
      <Skills />
      <Contact />
    </main>
  );
}
