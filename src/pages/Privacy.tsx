import { asset } from "../utils/assets";
import { Reveal } from "../components/ui/Reveal";

export function Privacy() {
  return (
    <main id="main" className="page-fade">
      <section className="section page-section-first">
        <div className="container">
          <Reveal className="legal-hero">
            <div>
              <p className="kicker">Privacy Policy</p>
              <h1>How this portfolio handles visitor information.</h1>
              <p className="lead" style={{ marginTop: "1rem" }}>
                This policy explains what information may be collected when someone visits the site or interacts with linked services.
              </p>
            </div>
            <div className="legal-visual">
              <img src={asset("assets/images/legal-privacy.svg")} alt="Privacy document illustration" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <Reveal className="section-intro">
            <div>
              <p className="eyebrow">Overview</p>
              <h2>What gets collected and why.</h2>
            </div>
            <p>The basics: what information may flow through the site and how it's used.</p>
          </Reveal>

          <Reveal className="policy-grid" stagger>
            <article className="legal-card">
              <h3>Information collected</h3>
              <p>The website may collect information you choose to provide, such as your name, company, and message details if you connect through linked services or future contact tools.</p>
            </article>
            <article className="legal-card">
              <h3>Usage data</h3>
              <p>Basic technical information such as browser type, device information, pages visited, referral source, and visit timing may be collected through hosting logs and analytics tools.</p>
            </article>
            <article className="legal-card">
              <h3>Purpose</h3>
              <p>Information is used to respond to inquiries, improve the site experience, understand portfolio traffic, and maintain the security and performance of the website.</p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-intro">
            <div>
              <p className="eyebrow">Detail</p>
              <h2>Specifics on data handling.</h2>
            </div>
            <p>Cookies, retention, security, and your choices.</p>
          </Reveal>

          <Reveal className="legal-grid" stagger>
            <article className="legal-card">
              <h3>Contact requests</h3>
              <p>If you submit a message, the information you provide may be stored in email, form-processing software, or a connected CRM so the conversation can be continued appropriately.</p>
            </article>
            <article className="legal-card">
              <h3>Cookies and analytics</h3>
              <p>Analytics and embedded third-party services used by the website may rely on cookies or similar technologies to understand usage patterns.</p>
            </article>
            <article className="legal-card">
              <h3>Third-party links</h3>
              <p>The website may link to external services such as LinkedIn or other professional platforms. Those services manage their own privacy practices, and visitors should review their policies separately.</p>
            </article>
            <article className="legal-card">
              <h3>Retention</h3>
              <p>Information is kept only as long as reasonably necessary to respond to inquiries, maintain records, or support legitimate business and legal needs.</p>
            </article>
            <article className="legal-card">
              <h3>Security</h3>
              <p>Reasonable steps are taken to protect submitted information, but no internet transmission or storage method can be guaranteed to be fully secure.</p>
            </article>
            <article className="legal-card">
              <h3>Your choices</h3>
              <p>
                You may request updates or deletion of personal information shared through this website by reaching out on{" "}
                <a href="https://linkedin.com/in/alexamadeoranch" target="_blank" rel="noreferrer">LinkedIn</a>.
              </p>
            </article>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
