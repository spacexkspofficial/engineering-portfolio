import { About } from "../components/home/About";
import { ContactBlock } from "../components/home/ContactBlock";
import { ExperienceSummary } from "../components/home/ExperienceSummary";
import { Hero } from "../components/home/Hero";
import { SelectedWork } from "../components/home/SelectedWork";
import { SceneBackground } from "../components/three/SceneBackground";

export function Home() {
  return (
    <>
      <SceneBackground />
      <Hero />
      <div className="page-body">
        <SelectedWork />
        <ExperienceSummary />
        <About />
        <section className="section" id="contact" aria-labelledby="contact-title">
          <ContactBlock />
        </section>
      </div>
    </>
  );
}
