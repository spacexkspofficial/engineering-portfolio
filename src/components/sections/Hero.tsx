import { asset } from "../../utils/assets";
import { GlassCard } from "../ui/GlassCard";
import { Reveal } from "../ui/Reveal";
import { RouterLink } from "../ui/RouterLink";

export function Hero() {
  return (
    <section className="hero hero--full" id="top">
      <div className="container">
        <div className="hero-narrative">
          <Reveal>
            <p className="eyebrow">UC Irvine - Aerospace</p>
            <h1>
              Building aerospace stuff.<br />
              <span className="accent">Documenting it well.</span>
            </h1>
            <p className="lead" style={{ marginTop: "1.1rem" }}>
              Structures, controls, mission analysis, simulation, embedded software, and hands-on mechanical work. Reports, code, and clips for every project - one click away.
            </p>
            <div className="cta-row">
              <RouterLink href="/projects" className="button primary">View projects</RouterLink>
              <a
                href={asset("assets/downloads/resume/alexander-amadeo-ranch-resume.pdf")}
                download
                className="button secondary"
              >
                Resume
              </a>
              <a
                href="https://linkedin.com/in/alexamadeoranch"
                target="_blank"
                rel="noreferrer"
                className="button ghost"
              >
                LinkedIn
              </a>
            </div>

            <div className="hero-meta">
              <span>Aerospace</span>
              <span>Controls</span>
              <span>Simulation</span>
              <span>Hands-on</span>
            </div>
          </Reveal>
        </div>

        <Reveal className="hero-quick-grid" stagger>
          <GlassCard>
            <p className="small-label">Aerospace</p>
            <h3>UCI CubeSat Structures</h3>
            <p>Static and modal analysis on a student spacecraft component.</p>
            <div className="chip-list">
              <span className="chip">ANSYS</span>
              <span className="chip">Structures</span>
              <span className="chip">Modal</span>
            </div>
            <div className="button-row">
              <RouterLink href="/projects?id=cubesat-structures" className="button ghost tiny">
                Open
              </RouterLink>
            </div>
          </GlassCard>

          <GlassCard>
            <p className="small-label">Embedded</p>
            <h3>OBD-II Diagnostic Dashboard</h3>
            <p>Live CAN bus streaming over USB with a hard-coded read-only safety contract.</p>
            <div className="chip-list">
              <span className="chip">Python</span>
              <span className="chip">FastAPI</span>
              <span className="chip">CAN / UDS</span>
            </div>
            <div className="button-row">
              <RouterLink href="/projects?id=obd-scanner" className="button ghost tiny">
                Open
              </RouterLink>
            </div>
          </GlassCard>

          <GlassCard>
            <p className="small-label">Controls</p>
            <h3>MAE 106 Projects</h3>
            <p>PID controller design and robotics verification.</p>
            <div className="chip-list">
              <span className="chip">PID</span>
              <span className="chip">Robotics</span>
              <span className="chip">Testing</span>
            </div>
            <div className="button-row">
              <RouterLink href="/projects?id=mae-106-pid" className="button ghost tiny">
                Open
              </RouterLink>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
