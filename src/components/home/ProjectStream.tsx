import { PROJECTS, PROJECT_GROUPS, type Project } from "../../data/projects";
import { asset } from "../../utils/assets";
import { Figure } from "../ui/Figure";
import { FileList } from "../ui/FileList";
import { RouterLink } from "../ui/RouterLink";
import { EngineeringOverview } from "./EngineeringOverview";

// Bring the live demo forward; keep every other record in its existing order.
const projects = [...PROJECTS].sort((a, b) => Number(b.id === "aerolab-suite") - Number(a.id === "aerolab-suite"));

const HIGHLIGHTS: Record<string, string[]> = {
  "cubesat-structures": ["Designed, printed and installed all 14 PLA mounts. Simplifying the overall fixture reduced the total purchase order by 30% versus V0.", "M3 standoffs: factor of safety 5 against yield by analysis. Hinge-plate static and modal FEA shown below."],
  "boundary-uav-assessment": ["Mass and power budgets, load paths, thrust, propeller performance and flight envelope.", "SOLIDWORKS, ANSYS and COMSOL; findings presented to nontechnical managers. Vehicle details and results are under NDA."],
  "aerolab-suite": ["2D: live flow, pressure, lift/drag and boundary-layer estimates. 3D: vortex-lattice aircraft analysis, rocket stability and re-entry trajectories.", "Built with JavaScript + WebGL 2. Runs entirely in your browser; no install or account."],
  "mae-106-autonomous": ["Calibrated the magnetometer and characterized servo accuracy, noise and drift using MATLAB and Arduino.", "Duty-cycle and hinge-height sweeps informed the team's settings; the robot met its 3 ft → 90° turn → 3 ft requirement. Teammates owned mechanical, controls and electrical design."],
  "mae-146-didymos": ["Wrote orbital conversions, Kepler propagation and a universal-variable Lambert solver; searched 16,290 transfers.", "The grid minimum lies at the search boundary; a wider window could find lower values. No launch-vehicle or arrival constraints were modeled."],
  "extrakpak-drone": ["Worked through requirements, architecture, thrust-to-weight estimates, FAA/OSHA constraints and user risk.", "Proposed six-motor, roughly 2 m carbon-fiber vehicle: 200 kg payload and hour-long endurance targets, with four compliant grappling arms."],
  "lunar-impact": ["Helped plan and run drops of 33 reinforced ice spheres from 0.5–8 m and the energy-balance analysis.", "Small samples and visual damage estimates limit the data. Low-speed drops do not validate hypervelocity impact behavior."],
  "mae-106-pid": ["Derived the dynamics and selected Kp = 50, Kd = 5; poles at −2.5 ± 5.39j. Recovered from initial angles up to 0.78 rad in simulation.", "Used course-provided simulation code. An integral term was unnecessary for the modeled case without constant disturbance."],
  exohunt: ["Python transit search with catalog checks, resumable campaigns and a local Node.js dashboard.", "Four of five benchmark planets recovered at catalog periods; the stress case exposed a half-period alias."],
  "obd-scanner": ["Python/FastAPI, WebSocket and USB OBD-II adapters; live parameters, trouble codes, vehicle profiles and passive ECU capture."],
};

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const cover = project.cover ?? 0;
  const hero = project.figures[cover];
  const remaining = project.figures.filter((_, i) => i !== cover);
  const status = project.facts.filter((f) => f.label === "Status" || f.label === "Disclosure");
  const facts = project.facts.filter((f) => f.label !== "Status" && f.label !== "Disclosure");
  const visibleFacts = facts.filter((f) => ["Role", "My part", "Tools", "Built with", "Methods"].includes(f.label));
  const detailFacts = facts.filter((f) => !visibleFacts.includes(f));
  const notes = project.sections.filter((s) => s.paragraphs?.length || s.list?.length);

  return (
    <article className={`project-entry${hero ? "" : " project-entry--text"}`} id={`project-${project.id}`} data-project={project.short} data-project-index={index + 1} aria-labelledby={`title-${project.id}`}>
      <div className="wrap">
        <div className="project-entry__marker">
          <span className="project-entry__number">{String(index + 1).padStart(2, "0")} <span>/ {String(projects.length).padStart(2, "0")}</span></span>
          <span>{PROJECT_GROUPS.find((g) => g.id === project.group)?.title} · {project.period}</span>
          <RouterLink href={`/projects/${project.id}`} aria-label={`Link to ${project.short}`} className="project-entry__permalink">#</RouterLink>
        </div>
        <div className="project-entry__opening">
          <header className="project-entry__head">
            <p className="kicker">{project.context}</p>
            <h3 id={`title-${project.id}`}>{project.title}</h3>
            <p className="project-entry__summary">{project.summary}</p>
            {visibleFacts.length > 0 && <dl className="project-entry__credentials">{visibleFacts.map((fact) => (
              <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
            ))}</dl>}
            {project.links?.length ? (
              <div className="project-entry__actions">
                {project.links.map((link) => (
                  <a className="button button--primary" href={/^https?:/i.test(link.href) ? link.href : asset(link.href)} key={link.href}>
                    {link.label.replace("Open AeroLab", "Run AeroLab")} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            ) : null}
          </header>
          {hero && <Figure figure={hero} className="project-entry__hero" />}
          <div className="project-entry__takeaways">
            {HIGHLIGHTS[project.id] && <ul className="project-entry__highlights">{HIGHLIGHTS[project.id].map((text) => <li key={text}>{text}</li>)}</ul>}
            {status.length > 0 && <p className="project-entry__status">{status.map((s) => s.value).join(". ")}</p>}
          </div>
        </div>
        {remaining.length > 0 && (
          <div className="project-entry__gallery" aria-label={`More figures from ${project.short}`}>
            {remaining.map((figure) => <Figure figure={figure} key={figure.src} />)}
          </div>
        )}
        {project.files?.length ? (
          <div className="project-entry__files">
            <h4>Reports, code & files</h4>
            <FileList files={project.files} label={`Files for ${project.short}`} />
          </div>
        ) : null}
        {(notes.length > 0 || detailFacts.length > 0) && (
          <details className="inline-notes">
            <summary>Technical notes & project details <span aria-hidden="true">+</span></summary>
            <div className="inline-notes__body">
              {detailFacts.length > 0 && <dl className="project-facts">{detailFacts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl>}
              {notes.map((section) => (
                <section className="project-note" key={section.heading}>
                  <h4>{section.heading.replace("What this page doesn't show", "Disclosure")}</h4>
                  <div className="prose">
                    {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                    {section.list && <ul>{section.list.map((item) => <li key={item}>{item}</li>)}</ul>}
                  </div>
                </section>
              ))}
            </div>
          </details>
        )}
      </div>
    </article>
  );
}

export function ProjectStream() {
  return (
    <section id="work" className="project-stream" data-scroll-section="Projects" aria-labelledby="work-title">
      <div className="wrap section-intro">
        <header className="section-head">
          <div><p className="kicker">01 / Engineering in practice</p><h2 id="work-title">Projects</h2></div>
          <p>Hardware built, decisions informed and experiments documented. Start with three engineering contributions, then explore all {projects.length} projects with their figures, reports and code.</p>
        </header>
        <EngineeringOverview />
        <details className="project-index inline-notes">
          <summary>Jump to a project <span aria-hidden="true">+</span></summary>
          <nav className="project-directory" aria-label="Jump to a project">
          {projects.map((p, i) => <RouterLink href={`/projects/${p.id}`} key={p.id}><span>{String(i + 1).padStart(2, "0")}</span> {p.short}</RouterLink>)}
          </nav>
        </details>
      </div>
      {projects.map((project, index) => <ProjectEntry project={project} index={index} key={project.id} />)}
    </section>
  );
}
