import { asset } from "../../utils/assets";

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="wrap about">
        <header className="section-head about__head">
          <h2 id="about-title">About</h2>
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
    </section>
  );
}
