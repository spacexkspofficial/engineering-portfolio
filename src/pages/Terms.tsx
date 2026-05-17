import { asset } from "../utils/assets";
import { Reveal } from "../components/ui/Reveal";

export function Terms() {
  return (
    <main id="main" className="page-fade">
      <section className="section page-section-first">
        <div className="container">
          <Reveal className="legal-hero">
            <div>
              <p className="kicker">Terms and Conditions</p>
              <h1>Ground rules for using this portfolio website.</h1>
              <p className="lead" style={{ marginTop: "1rem" }}>
                These terms describe the general conditions for browsing the site, viewing project materials, and using linked resources.
              </p>
            </div>
            <div className="legal-visual">
              <img src={asset("assets/images/legal-terms.svg")} alt="Terms document illustration" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <Reveal className="section-intro">
            <div>
              <p className="eyebrow">Summary</p>
              <h2>Use, accuracy, and ownership.</h2>
            </div>
            <p>The portfolio is here for review - please use it that way and don't republish it as your own.</p>
          </Reveal>

          <Reveal className="legal-grid" stagger>
            <article className="legal-card">
              <h3>Use of the site</h3>
              <p>The portfolio is provided for informational purposes so visitors can review engineering experience, projects, contact details, and related professional materials.</p>
            </article>
            <article className="legal-card">
              <h3>Accuracy of information</h3>
              <p>Project descriptions, availability notes, and portfolio content are provided in good faith. Some examples, visuals, or metrics may be simplified for clarity.</p>
            </article>
            <article className="legal-card">
              <h3>Intellectual property</h3>
              <p>Unless otherwise stated, the written content, layout, and portfolio presentation belong to Alexander Amadeo-Ranch. Project examples may reference collaborative work that also involved classmates, teams, employers, or clients.</p>
            </article>
            <article className="legal-card">
              <h3>No unauthorized copying</h3>
              <p>You may review the content for hiring, collaboration, or evaluation purposes, but you may not republish, resell, or falsely represent the material as your own.</p>
            </article>
            <article className="legal-card">
              <h3>External services</h3>
              <p>The website may link to third-party services such as LinkedIn or other professional platforms. Those services are governed by their own terms and policies.</p>
            </article>
            <article className="legal-card">
              <h3>Contact and submissions</h3>
              <p>If you send a message or inquiry, you confirm that the information provided is accurate and that you are comfortable being contacted in response to your request.</p>
            </article>
            <article className="legal-card">
              <h3>Availability changes</h3>
              <p>Hiring status, project availability, contact details, and portfolio materials may change over time without advance notice.</p>
            </article>
            <article className="legal-card">
              <h3>Limitation of liability</h3>
              <p>The website is provided as-is without warranties of any kind. Alexander Amadeo-Ranch is not liable for damages arising from use of the website, reliance on its content, or interaction with third-party links.</p>
            </article>
            <article className="legal-card">
              <h3>Questions</h3>
              <p>
                Questions about these terms can be directed through{" "}
                <a href="https://linkedin.com/in/alexamadeoranch" target="_blank" rel="noreferrer">LinkedIn</a>.
              </p>
            </article>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
