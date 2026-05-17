import { asset } from "../../utils/assets";
import { GlassCard } from "../ui/GlassCard";
import { Reveal } from "../ui/Reveal";

export function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <Reveal className="section-intro">
          <div>
            <p className="eyebrow">About</p>
            <h2>Engineering, end to end.</h2>
          </div>
          <p>
            UC Irvine aerospace student. Structural analysis, astrodynamics, controls, simulation, embedded software, and hands-on mechanical work - with reports, code, and clips attached to each project.
          </p>
        </Reveal>

        <div className="about-grid">
          <Reveal>
            <GlassCard tilt={false}>
              <p className="small-label">How I work</p>
              <h3>Define, build, verify.</h3>
              <p>
                Each project starts with the problem, picks a method that respects real constraints, builds the model or hardware, and verifies against measurements or analytical limits. Nothing here is just a screenshot.
              </p>
              <div className="about-stats">
                <div className="about-stat">
                  <strong>12+</strong>
                  <span>Projects with docs and source</span>
                </div>
                <div className="about-stat">
                  <strong>5</strong>
                  <span>Focus areas</span>
                </div>
                <div className="about-stat">
                  <strong>2,100+</strong>
                  <span>DTC entries in the OBD-II tool</span>
                </div>
                <div className="about-stat">
                  <strong>100%</strong>
                  <span>Read-only safety on the diagnostics app</span>
                </div>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={120}>
            <GlassCard>
              <p className="small-label">Start here</p>
              <h3>Pick a project.</h3>
              <ul className="compact-list">
                <li><strong>CubeSat Structures</strong> - static + frequency analysis on a student spacecraft component.</li>
                <li><strong>OBD-II Dashboard</strong> - read-only CAN bus streaming over USB.</li>
                <li><strong>MAE 146 Didymos</strong> - astrodynamics and a Lambert transfer to a near-Earth asteroid.</li>
                <li><strong>MAE 106 PID</strong> - controller design with tuning and closed-loop response.</li>
              </ul>
              <div className="button-row">
                <a
                  className="button secondary tiny"
                  href={asset("assets/downloads/resume/alexander-amadeo-ranch-resume.pdf")}
                  download
                >
                  Resume PDF
                </a>
                <a
                  className="button ghost tiny"
                  href="https://linkedin.com/in/alexamadeoranch"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
