import { asset } from "../../utils/assets";
import type { Project } from "../../data/projects";
import { GlassCard } from "../ui/GlassCard";

interface ProjectEntryProps {
  project: Project;
  highlighted?: boolean;
}

export function ProjectEntry({ project, highlighted = false }: ProjectEntryProps) {
  return (
    <article
      id={project.id}
      className="project-entry"
      style={highlighted ? { boxShadow: "0 0 0 1px var(--accent), 0 24px 60px rgba(123,227,255,0.18)" } : undefined}
    >
      <div className="entry-head">
        <p className="meta">{project.meta}</p>
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
        <div className="chip-list">
          {project.chips.map((c) => (
            <span key={c} className="chip">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="entry-layout">
        <div>
          <div className="insight-grid">
            {project.insights.map((insight) => (
              <article key={insight.label} className="insight-card">
                <p className="small-label">{insight.label}</p>
                <p>{insight.body}</p>
              </article>
            ))}
          </div>

          {project.primaryActions.length > 0 && (
            <div className="button-row">
              {project.primaryActions.map((a, idx) => (
                <a
                  key={a.label}
                  className={`button ${idx === 0 ? "primary" : idx === 1 ? "secondary" : "ghost"} tiny`}
                  href={asset(a.href)}
                  target={a.external ? "_blank" : undefined}
                  rel={a.external ? "noreferrer" : undefined}
                >
                  {a.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="entry-media">
          {project.media.map((m, i) => {
            if (m.kind === "video") {
              return (
                <GlassCard key={i} as="div" className="media-panel" tilt={false} style={{ padding: 0 }}>
                  <figure style={{ margin: 0 }}>
                    <video controls playsInline preload="metadata" poster={m.poster ? asset(m.poster) : undefined}>
                      <source src={asset(m.src)} type="video/mp4" />
                    </video>
                    {m.caption && <figcaption>{m.caption}</figcaption>}
                  </figure>
                </GlassCard>
              );
            }
            if (m.kind === "image") {
              return (
                <GlassCard key={i} as="div" className="media-panel" tilt={false} style={{ padding: 0 }}>
                  <figure style={{ margin: 0 }}>
                    <img src={asset(m.src)} alt={m.alt ?? m.caption ?? project.title} loading="lazy" />
                    {m.caption && <figcaption>{m.caption}</figcaption>}
                  </figure>
                </GlassCard>
              );
            }
            if (m.kind === "code" && m.code) {
              return (
                <pre key={i} className="code-panel" aria-label={m.caption}>
                  <code>{m.code}</code>
                </pre>
              );
            }
            return null;
          })}

          {project.documents?.map((doc) => (
            <article key={doc.title} className="document-panel">
              <p className="small-label">{doc.label}</p>
              <h3>{doc.title}</h3>
              <p>{doc.body}</p>
              <div className="link-stack">
                {doc.links.map((l, i) =>
                  l.href ? (
                    <a key={i} href={asset(l.href)}>
                      {l.label}
                    </a>
                  ) : (
                    <span key={i}>{l.label}</span>
                  ),
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </article>
  );
}
