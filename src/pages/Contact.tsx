import { asset } from "../utils/assets";
import { GlassCard } from "../components/ui/GlassCard";
import { Reveal } from "../components/ui/Reveal";
import { RouterLink } from "../components/ui/RouterLink";

export function ContactPage() {
  return (
    <main id="main" className="page-fade">
      <section className="section page-section-first">
        <div className="container">
          <Reveal className="page-hero-grid">
            <div>
              <p className="eyebrow">Contact</p>
              <h1>Open to internships, research, and engineering roles.</h1>
              <p className="lead" style={{ marginTop: "1rem" }}>
                LinkedIn is the primary contact point for opportunities related to structures, controls, simulation, mission analysis, and hands-on engineering work.
              </p>
              <div className="button-row">
                <a className="button primary" href="https://linkedin.com/in/alexamadeoranch" target="_blank" rel="noreferrer">
                  Connect on LinkedIn
                </a>
                <a
                  className="button secondary"
                  href={asset("assets/downloads/resume/alexander-amadeo-ranch-resume.pdf")}
                  download
                >
                  Download resume
                </a>
              </div>
            </div>

            <GlassCard as="div" className="reading-panel" tilt={false}>
              <p className="small-label">Current Focus</p>
              <strong>Opportunities of interest</strong>
              <ul className="compact-list">
                <li><strong>Internships:</strong> aerospace, mechanical, or analysis-focused roles.</li>
                <li><strong>Research:</strong> spacecraft structures, controls, mission analysis, or simulation.</li>
                <li><strong>Engineering support:</strong> documentation, testing, modeling, and hands-on technical projects.</li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-intro">
            <div>
              <p className="eyebrow">Highlighted Links</p>
              <h2>Key documents and project pages.</h2>
            </div>
            <p>Direct links to resume and representative projects.</p>
          </Reveal>

          <Reveal className="fit-grid" stagger>
            <GlassCard>
              <p className="meta">Overview</p>
              <h3>Resume</h3>
              <p>A quick pass on coursework, experience, and direction.</p>
              <div className="button-row">
                <a
                  className="button ghost tiny"
                  href={asset("assets/downloads/resume/alexander-amadeo-ranch-resume.pdf")}
                  download
                >
                  Open resume
                </a>
              </div>
            </GlassCard>
            <GlassCard>
              <p className="meta">Hardware + analysis</p>
              <h3>CubeSat entry</h3>
              <p>Spacecraft structures project with simulation clips and supporting materials.</p>
              <div className="button-row">
                <RouterLink href="/projects?id=cubesat-structures" className="button ghost tiny">
                  Open CubeSat
                </RouterLink>
              </div>
            </GlassCard>
            <GlassCard>
              <p className="meta">Mission analysis</p>
              <h3>MAE 146 Didymos</h3>
              <p>Mission-analysis project with astrodynamics code and final report.</p>
              <div className="button-row">
                <RouterLink href="/projects?id=mae-146-didymos" className="button ghost tiny">
                  Open MAE 146
                </RouterLink>
              </div>
            </GlassCard>
            <GlassCard>
              <p className="meta">Controls + testing</p>
              <h3>MAE 106 projects</h3>
              <p>Autonomous robot and PID controller projects with reports and verification documents.</p>
              <div className="button-row">
                <RouterLink href="/projects?id=mae-106-autonomous" className="button ghost tiny">
                  Open MAE 106
                </RouterLink>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-intro">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>Sample visuals from the portfolio.</h2>
            </div>
            <p>Representative visuals from simulation, spacecraft analysis, and hands-on project work.</p>
          </Reveal>

          <Reveal className="contact-visual-grid" stagger>
            <figure className="figure-card">
              <img src={asset("assets/media/photons/photon-blackhole-simulation.png")} alt="Photon simulation still from MATLAB work" loading="lazy" />
              <figcaption>Readable MATLAB output from the black-hole photon simulation.</figcaption>
            </figure>
            <figure className="figure-card">
              <video controls muted playsInline preload="metadata" poster={asset("assets/images/poster-cubesat-static.png")}>
                <source src={asset("assets/media/cubesat/hinge-plate-static-analysis.mp4")} type="video/mp4" />
              </video>
              <figcaption>CubeSat structural analysis clip with direct hardware relevance.</figcaption>
            </figure>
            <figure className="figure-card">
              <img src={asset("assets/media/charger/charger-rotor-pad-upgrade.jpg")} alt="Brake upgrade work from the mechanical project archive" loading="lazy" />
              <figcaption>Hands-on brake work from the mechanical logs.</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta-panel">
              <div>
                <p className="eyebrow">Reach out</p>
                <h2>Let's talk about engineering work.</h2>
                <p>
                  The fastest way to start a conversation is LinkedIn. Resume and project files are linked across the site for review ahead of any chat.
                </p>
                <div className="button-row">
                  <a className="button primary" href="https://linkedin.com/in/alexamadeoranch" target="_blank" rel="noreferrer">
                    Open LinkedIn
                  </a>
                  <RouterLink href="/projects" className="button secondary">
                    View projects
                  </RouterLink>
                </div>
              </div>
              <div className="cta-notes">
                <article className="note-card">
                  <strong>Response time</strong>
                  <p>LinkedIn messages and connection requests are reviewed regularly.</p>
                </article>
                <article className="note-card">
                  <strong>Best first reads</strong>
                  <p>Resume PDF, MAE 146 final report, and CubeSat clips give the fastest read on technical depth.</p>
                </article>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
