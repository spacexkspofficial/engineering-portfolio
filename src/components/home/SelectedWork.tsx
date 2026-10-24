import { PROJECTS, coverFigure, featuredProjects, getProject, teaser } from "../../data/projects";
import { Figure } from "../ui/Figure";
import { RouterLink } from "../ui/RouterLink";

export function SelectedWork() {
  const flatsat = getProject("cubesat-structures")!;
  const boundary = getProject("boundary-uav-assessment")!;
  const scope = boundary.sections.find((s) => s.heading === "Scope")?.list ?? [];
  const rest = featuredProjects().filter((p) => p.id !== flatsat.id && p.id !== boundary.id);

  return (
    <section className="section section--first" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <header className="section-head">
          <h2 id="work-title">Selected work</h2>
          <p>
            Hardware and analysis first. Each project page separates my work from the team's and says what has and
            hasn't been tested.
          </p>
        </header>

        <article className="feature" aria-labelledby="feature-flatsat">
          <Figure figure={flatsat.figures[0]} className="feature__figure" caption={null} />
          <div className="feature__text">
            <p className="kicker">UCI CubeSat · Systems Engineer · Mar 2026 – present</p>
            <h3 id="feature-flatsat">FlatSat V1 avionics bench fixture</h3>
            <p>
              A ground fixture that lets the avionics team integrate and test up to 12 PCBs together before anything goes
              into the spacecraft. I built it and designed, printed and installed all 14 of its mounts.
            </p>
            <dl className="figures-row">
              <div>
                <dt>12</dt>
                <dd>avionics PCBs, fixture capacity</dd>
              </div>
              <div>
                <dt>14</dt>
                <dd>PLA mounts I designed, printed and installed</dd>
              </div>
              <div>
                <dt>30%</dt>
                <dd>lower total purchase order than V0</dd>
              </div>
            </dl>
            <p className="note">
              Also on the page: M3 standoff analysis (factor of safety 5 against yield, vibration test pending) and
              hinge-plate FEA.
            </p>
            <RouterLink href={`/projects/${flatsat.id}`} className="text-link">
              FlatSat and CubeSat structures
            </RouterLink>
          </div>
        </article>

        <article className="feature feature--text" aria-labelledby="feature-boundary">
          <div className="feature__text">
            <p className="kicker">Boundary Remote Subsurface Solutions · Sep 2026 – present</p>
            <h3 id="feature-boundary">UAV hardware assessment</h3>
            <p>
              A system-level assessment of the company's current UAV design, delivered two weeks before its deadline. I
              presented the results to nontechnical managers, and the findings informed a change in hardware direction.
            </p>
            <p className="note">Assessment complete; internship ongoing. Findings are under NDA, so there are no figures.</p>
            <RouterLink href={`/projects/${boundary.id}`} className="text-link">
              About the assessment
            </RouterLink>
          </div>
          <div className="feature__aside">
            <p className="kicker">Scope</p>
            <ol className="scope-list">
              {scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p className="kicker">Tools</p>
            <p>SOLIDWORKS, ANSYS, COMSOL</p>
          </div>
        </article>

        <ul className="work-row" aria-label="More selected projects">
          {rest.map((project) => {
            const cover = coverFigure(project);
            return (
            <li key={project.id}>
              <article aria-labelledby={`row-${project.id}`}>
                {cover && (
                  <RouterLink href={`/projects/${project.id}`} tabIndex={-1} aria-hidden="true" className="work-row__media">
                    <Figure figure={cover} caption={null} />
                  </RouterLink>
                )}
                <p className="kicker">{project.period}</p>
                <h3 id={`row-${project.id}`}>
                  <RouterLink href={`/projects/${project.id}`}>{project.short}</RouterLink>
                </h3>
                <p>{teaser(project)}</p>
              </article>
            </li>
            );
          })}
        </ul>

        <p className="section-foot">
          <RouterLink href="/projects" className="text-link">
            All {PROJECTS.length} projects, with reports and code
          </RouterLink>
        </p>
      </div>
    </section>
  );
}
