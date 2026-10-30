import { asset } from "../../utils/assets";
import { CERTIFICATIONS, EDUCATION, HONORS, SKILLS, PERSON } from "../../data/profile";
import { formatMonth } from "../../utils/format";

export function About() {
  return (
    <section className="section" id="about" data-scroll-section="About" aria-labelledby="about-title">
      <div className="wrap about">
        <header className="section-head about__head">
          <p className="kicker">03 / Background & capabilities</p><h2 id="about-title">About</h2>
        </header>
        <img
          className="about__portrait"
          src={asset("assets/images/headshot-2026.jpg")}
          alt="Portrait of Alexander Amadeo-Ranch"
          width={400}
          height={400}
          loading="lazy"
          decoding="async"
        />
        <div className="about__text prose">
          <p>
            Watching Falcon Heavy's test flight live with my parents is what got me hooked on space. I spent the next few
            years making space and science videos on YouTube. Now I study aerospace engineering at UC Irvine, mostly on
            the hardware side: structures, mechanical design and getting systems to fit together.
          </p>
          <p>
            On UCI CubeSat, I've taken on documentation, cross-team integration, structural analysis and hands-on fixture
            design. At Boundary, I translate engineering findings into hardware decisions with managers across departments.
            My Management minor complements that technical work with a business perspective.
          </p>
          <p>
            Outside the lab, I've supervised a public pool's staff of 75+, led emergency responses and written training
            documentation. Tutoring math, physics and computer science taught me to explain technical ideas to different
            audiences. I bring that experience to a team alongside the practical skills I've built maintaining my own cars.
          </p>
          <p>
            I'm seeking new graduate roles in mechanical design, structural analysis, or hardware integration and test,
            with a particular interest in spacecraft and aerospace hardware. {PERSON.availability}
          </p>
        </div>
      </div>
      <div className="wrap background-grid">
        <section className="background-block">
          <h3>Education</h3>
          <p className="background-block__lead">{EDUCATION.school}</p>
          <p>{EDUCATION.degree}<br />{EDUCATION.minor}</p>
          <p className="note">{EDUCATION.gpaLabel}: {EDUCATION.gpa} · {EDUCATION.status}<br />{PERSON.workAuthorization} · Full-time from {PERSON.availableFrom}</p>
          <ul>{EDUCATION.honors.map((h) => <li key={h}>{h}</li>)}</ul>
          <details className="inline-notes"><summary>Coursework & earlier education <span aria-hidden="true">+</span></summary><div className="inline-notes__body prose">
            <p>{EDUCATION.coursework.join(" · ")}</p>
            <h4>{EDUCATION.highSchool.school}</h4><p>{EDUCATION.highSchool.detail}</p><p>{EDUCATION.highSchool.honors.join(" · ")}</p>
          </div></details>
        </section>
        <section className="background-block">
          <h3>Skills</h3>
          <dl className="skill-list">{SKILLS.map((group) => <div key={group.label}><dt>{group.label}</dt><dd>{group.items.join(" · ")}</dd></div>)}</dl>
        </section>
        <section className="background-block">
          <h3>Certifications & courses</h3>
          {CERTIFICATIONS.map((group) => <div className="credential-group" key={group.label}><h4>{group.label}</h4><ul>{group.items.map((c) => <li key={c.name}>{c.name}{c.issuer && ` · ${c.issuer}`}<span className="note">{formatMonth(c.date)}{c.expired && ` · expired ${formatMonth(c.expired)}`}</span></li>)}</ul></div>)}
        </section>
        <section className="background-block">
          <h3>Beyond engineering</h3>
          <ul>{HONORS.map((h) => <li key={h.name}>{h.name}<span className="note">{h.date}{h.detail && ` · ${h.detail}`}</span></li>)}</ul>
        </section>
      </div>
    </section>
  );
}
