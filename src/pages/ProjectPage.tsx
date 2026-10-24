import { PROJECTS, type Project } from "../data/projects";
import { asset } from "../utils/assets";
import { Figure } from "../components/ui/Figure";
import { FileList } from "../components/ui/FileList";
import { RouterLink } from "../components/ui/RouterLink";

function FigureGroup({ project, indices }: { project: Project; indices: number[] }) {
  const figures = indices.map((i) => project.figures[i]).filter(Boolean);
  if (figures.length === 0) return null;
  const allPortrait = figures.every((f) => f.height > f.width * 1.15);
  const layout = figures.length === 1 ? "single" : allPortrait || figures.length > 2 ? "grid" : "pair";
  return (
    <div className={`case__figures case__figures--${layout}`}>
      {figures.map((figure) => (
        <Figure key={figure.src} figure={figure} />
      ))}
    </div>
  );
}

export function ProjectPage({ project }: { project: Project }) {
  const position = PROJECTS.findIndex((p) => p.id === project.id);
  const previous = PROJECTS[position - 1];
  const next = PROJECTS[position + 1];
  const placed = new Set(project.sections.flatMap((s) => s.figures ?? []));
  const unplaced = project.figures.map((_, i) => i).filter((i) => !placed.has(i));

  return (
    <article className="page-body page-body--top case" aria-labelledby="case-title">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <RouterLink href="/projects">Work</RouterLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.short}</span>
        </nav>

        <header className="case__head">
          <p className="kicker">
            {project.context} · {project.period}
          </p>
          <h1 id="case-title">{project.title}</h1>
          <p className="case__lede">{project.summary}</p>
        </header>

        <dl className="title-block">
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        {project.links && (
          <p className="case__links">
            {project.links.map((link) => {
              const external = /^https?:/i.test(link.href);
              return (
                <a
                  key={link.href}
                  className="button button--primary"
                  href={external ? link.href : asset(link.href)}
                  {...(external ? { rel: "noreferrer" } : {})}
                >
                  {link.label}
                </a>
              );
            })}
          </p>
        )}

        <div className="case__body">
          {project.sections.map((section) => (
            <section className="case__section" key={section.heading}>
              <h2>{section.heading}</h2>
              <div className="prose">
                {section.paragraphs?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
              {section.figures && <FigureGroup project={project} indices={section.figures} />}
            </section>
          ))}

          {unplaced.length > 0 && (
            <section className="case__section">
              <h2>Figures</h2>
              <FigureGroup project={project} indices={unplaced} />
            </section>
          )}

          {project.files && project.files.length > 0 && (
            <section className="case__section">
              <h2>Files</h2>
              <FileList files={project.files} label={`Files for ${project.short}`} />
            </section>
          )}
        </div>

        <nav className="case__pager" aria-label="More projects">
          {previous ? (
            <RouterLink href={`/projects/${previous.id}`} rel="prev">
              <span className="kicker">Previous</span>
              {previous.short}
            </RouterLink>
          ) : (
            <span />
          )}
          <RouterLink href="/projects" className="case__pager-index">
            All work
          </RouterLink>
          {next ? (
            <RouterLink href={`/projects/${next.id}`} rel="next">
              <span className="kicker">Next</span>
              {next.short}
            </RouterLink>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </article>
  );
}
