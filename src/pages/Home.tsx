import { About } from "../components/home/About";
import { ContactBlock } from "../components/home/ContactBlock";
import { ExperienceSummary } from "../components/home/ExperienceSummary";
import { Hero } from "../components/home/Hero";
import { MobileHero, MobileIntroduction } from "../components/home/MobileHero";
import { SelectedWork } from "../components/home/SelectedWork";
import { SceneBackground } from "../components/three/SceneBackground";
import { MOBILE_QUERY, useMediaQuery } from "../utils/motion";

export function Home() {
  const mobile = useMediaQuery(MOBILE_QUERY);
  return (
    <>
      <SceneBackground mobile={mobile} />
      {mobile ? <MobileHero /> : <Hero />}
      <div className="page-body">
        {mobile && <MobileIntroduction />}
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
