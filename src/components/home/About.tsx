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
            A lot of what I know about building things comes from doing it. On the CubeSat team I've gone from scheduling
            meetings as an executive assistant to designing, printing and installing parts for our bench fixture. At home I
            maintain and modify my own cars. I've also managed a public pool's staff of 75+ and tutored math and physics for
            almost five years, and I'm an Eagle Scout with a first-degree black belt in taekwondo.
          </p>
          <p>
            I want to build spacecraft and aerospace hardware with a team that takes on ambitious goals and expects people
            to learn fast.
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
