import { PERSON } from "../data/profile";

export function Privacy() {
  return (
    <div className="page-body page-body--top">
      <article className="wrap legal" aria-labelledby="privacy-title">
        <header className="page-head">
          <h1 id="privacy-title">Privacy</h1>
          <p className="page-head__lede">Short version: this site doesn't collect anything about you.</p>
        </header>
        <div className="prose">
          <h2>What this site does</h2>
          <ul>
            <li>No analytics, tracking pixels, advertising or cookies.</li>
            <li>No forms, comments or accounts.</li>
            <li>The AeroLab demos run entirely in your browser and send nothing back.</li>
          </ul>
          <h2>Third parties involved in loading the site</h2>
          <ul>
            <li>
              GitHub Pages hosts the site. Like any web host, GitHub may log technical request data such as IP addresses;
              see GitHub's privacy statement.
            </li>
            <li>Fonts load from Google Fonts, which receives a standard request from your browser when a page opens.</li>
            <li>Links to LinkedIn and GitHub take you to those services, which have their own policies.</li>
          </ul>
          <h2>Questions</h2>
          <p>
            Send me a message on{" "}
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
