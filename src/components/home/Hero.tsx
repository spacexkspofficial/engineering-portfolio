import { EDUCATION, PERSON } from "../../data/profile";
import { RouterLink } from "../ui/RouterLink";
import { asset } from "../../utils/assets";

export function Hero() {
  return (
    <section className="hero" id="intro" aria-labelledby="hero-name">
      <div className="wrap hero__inner">
        <h1 id="hero-name" className="hero__name">
          {PERSON.givenName} <span className="nowrap">{PERSON.name.replace(`${PERSON.givenName} `, "")}</span>
        </h1>
        <p className="hero__lede">
          Aerospace engineering student at UC Irvine, working on mechanical design, structures and hardware integration.
        </p>

        <HeroFacts />
        <HeroActions />
      </div>
      <p className="hero__credit wrap">Background: Earth footage and a third-party CubeSat model, for illustration.</p>
    </section>
  );
}

export function HeroFacts() {
  return (
    <dl className="hero__facts">
      <div>
        <dt>Now</dt>
        <dd>
          <span>UAV Hardware Engineering Intern, Boundary Remote Subsurface Solutions</span>
          <span>Systems Engineer, UCI CubeSat</span>
        </dd>
      </div>
      <div>
        <dt>Study</dt>
        <dd>
          <span>B.S. Aerospace Engineering, GPA {EDUCATION.gpa}</span>
          <span>Coursework ends March 2027</span>
        </dd>
      </div>
      <div>
        <dt>Available</dt>
        <dd>
          <span>Full-time from {PERSON.availableFrom}</span>
        </dd>
      </div>
    </dl>
  );
}

export function HeroActions() {
  return (
    <div className="hero__actions">
      <RouterLink href="/work" className="button button--primary">
        Explore projects ↓
      </RouterLink>
      <a href={asset("aerolab/")} className="button">
        Run AeroLab 2D ↗
      </a>
      <a href={asset("assets/downloads/resume/alexander-amadeo-ranch-engineering-resume.pdf")} className="button button--quiet">
        Resume PDF ↓
      </a>
    </div>
  );
}
