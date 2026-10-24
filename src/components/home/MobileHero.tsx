import { PERSON } from "../../data/profile";
import { HeroActions, HeroFacts } from "./Hero";

/** The mobile opening has its own composition; the portfolio content is shared. */
export function MobileHero() {
  return (
    <section className="mobile-hero" aria-labelledby="hero-name">
      <div className="mobile-hero__viewport">
        <div className="wrap mobile-hero__copy">
          <p className="kicker">Aerospace engineering · UC Irvine</p>
          <h1 id="hero-name" className="mobile-hero__name">
            {PERSON.givenName}
            <span>{PERSON.name.replace(`${PERSON.givenName} `, "")}</span>
          </h1>
          <p className="mobile-hero__lede">Mechanical design, structures<br />and hardware integration.</p>
          <a className="mobile-hero__scroll" href="#/work">
            <span>Scroll to explore</span><span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function MobileIntroduction() {
  return (
    <section className="mobile-intro wrap" aria-label="Introduction">
      <p className="kicker">Alexander Amadeo-Ranch</p>
      <p className="mobile-intro__lede">Aerospace engineering student at UC Irvine, working on mechanical design, structures and hardware integration.</p>
      <HeroActions />
      <HeroFacts />
      <p className="mobile-intro__credit">Opening: Earth footage and a third-party CubeSat model, for illustration.</p>
    </section>
  );
}
