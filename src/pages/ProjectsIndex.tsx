import { PROJECTS, PROJECT_GROUPS, coverFigure, teaser } from "../data/projects";
import { asset } from "../utils/assets";
import { RouterLink } from "../components/ui/RouterLink";

export function ProjectsIndex() {
  return (
    <div className="page-body page-body--top">
      <div className="wrap">
        <header className="page-head">
          <h1>Work</h1>
          <p className="page-head__lede">
            Engineering work, course projects and tools I've built, with the reports and code behind them. Each page says
            what I did, how it was checked and what is still open.
          </p>
        </header>

        {PROJECT_GROUPS.map((group) => {
          const items = PROJECTS.filter((p) => p.group === group.id).sort((a, b) => b.sortKey.localeCompare(a.sortKey));
          if (items.length === 0) return null;
          return (
            <section className="register" key={group.id} aria-labelledby={`group-${group.id}`}>
              <header className="register__head">
                <h2 id={`group-${group.id}`}>{group.title}</h2>
                <p>{group.blurb}</p>
              </header>
              <ol className="register__list">
                {items.map((project) => {
                  const cover = coverFigure(project);
                  return (
                    <li key={project.id} id={project.id} className="register__item">
                      <span className="register__period">{project.period}</span>
                      <div className="register__body">
                        <h3 className="register__title">
                          <RouterLink href={`/projects/${project.id}`} className="register__link">
                            {project.title}
                          </RouterLink>
                        </h3>
                        <p className="register__context">{project.context}</p>
                        <p className="register__teaser">{teaser(project)}</p>
                      </div>
                      <span className={`register__thumb${cover ? "" : " register__thumb--plate"}`} aria-hidden="true">
                        {cover && cover.kind === "image" && (
                          <img src={asset(cover.src)} alt="" loading="lazy" decoding="async" width={cover.width} height={cover.height} />
                        )}
                        {cover && cover.kind === "video" && cover.poster && (
                          <img src={asset(cover.poster)} alt="" loading="lazy" decoding="async" />
                        )}
                        {!cover && project.plate && <span>{project.plate}</span>}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </div>
  );
}
