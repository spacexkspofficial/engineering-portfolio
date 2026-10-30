import { PERSON } from "../../data/profile";
import { HeroActions, HeroFacts } from "./Hero";

/** The mobile opening has its own composition; the portfolio content is shared. */
export function MobileHero() {
  return (
    <section className="mobile-hero" id="intro" aria-labelledby="hero-name">
      <div className="mobile-hero__viewport">
        <div className="wrap mobile-hero__copy">
          <p className="kicker">Aerospace engineering · UC Irvine</p>
          <h1 id="hero-name" className="mobile-hero__name">
            {PERSON.givenName}
            <span>{PERSON.name.replace(`${PERSON.givenName} `, "")}</span>
          </h1>
          <p className="mobile-hero__lede">Mechanical design, structures<br />and hardware integration.</p>
          <p className="mobile-hero__availability">Full-time from {PERSON.availableFrom} · {PERSON.workAuthorization}</p>
          <HeroActions />
        </div>
      </div>
    </section>
  );
}

export function MobileIntroduction() {
  return (
    <section className="mobile-intro wrap" aria-label="Introduction">
      <HeroFacts />
      <p className="mobile-intro__credit">Opening: Earth footage and a third-party CubeSat model, for illustration.</p>
    </section>
  );
}
