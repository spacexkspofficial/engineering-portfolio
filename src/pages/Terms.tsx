import { PERSON } from "../data/profile";

export function Terms() {
  return (
    <div className="page-body page-body--top">
      <article className="wrap legal" aria-labelledby="terms-title">
        <header className="page-head">
          <h1 id="terms-title">Terms</h1>
          <p className="page-head__lede">This is a personal portfolio for people evaluating my work.</p>
        </header>
        <div className="prose">
          <h2>Using the material</h2>
          <p>
            You're welcome to read, download and share these pages and files for hiring, collaboration or study. Please
            don't republish them as your own.
          </p>
          <h2>Team and course work</h2>
          <p>
            Several projects were team or course work. Each project page says which parts were mine. Team reports, posters
            and course handouts belong to their authors and institutions as well.
          </p>
          <h2>Accuracy</h2>
          <p>
            I've tried to state results with their limits: analysis is labeled as analysis, concepts as concepts. Course
            projects and demos are learning work, not certified designs, and the AeroLab tools give estimates for
            exploration, not engineering sign-off.
          </p>
          <h2>Third-party material</h2>
          <p>
            The home-page background uses Earth footage and a CubeSat CAD model made by others, for illustration only.
          </p>
          <h2>No warranty</h2>
          <p>The site and its files are provided as they are, without warranty.</p>
          <p>
            Questions: send me a message on{" "}
            <a href={PERSON.linkedin} rel="noreferrer">
              LinkedIn
            </a>
            .
          </p>
          <p className="note">Updated October 2026.</p>
        </div>
      </article>
    </div>
  );
}
