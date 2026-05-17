import { asset } from "../../utils/assets";
import { Reveal } from "../ui/Reveal";
import { RouterLink } from "../ui/RouterLink";

export function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal>
          <div className="cta-panel">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Open to internships, research, and engineering roles.</h2>
              <p>
                LinkedIn is the primary contact point for portfolio follow-up, project questions, and recruiting outreach. The resume and project files are linked throughout the site for review ahead of any conversation.
              </p>
              <div className="button-row">
                <a
                  className="button primary"
                  href="https://linkedin.com/in/alexamadeoranch"
                  target="_blank"
                  rel="noreferrer"
                >
                  Connect on LinkedIn
                </a>
                <a
                  className="button secondary"
                  href={asset("assets/downloads/resume/alexander-amadeo-ranch-resume.pdf")}
                  download
                >
                  Download resume
                </a>
                <RouterLink href="/contact" className="button ghost">
                  Contact page
                </RouterLink>
              </div>
            </div>

            <div className="cta-notes">
              <article className="note-card">
                <strong>Relevant areas</strong>
                <p>Spacecraft structures, controls, mission analysis, simulation, technical writing, and hands-on engineering support.</p>
              </article>
              <article className="note-card">
                <strong>Recommended first reads</strong>
                <p>CubeSat Structures, OBD-II Diagnostic Dashboard, MAE 106 PID Controller Design, and the resume PDF.</p>
              </article>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
