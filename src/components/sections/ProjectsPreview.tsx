import { asset } from "../../utils/assets";
import { FEATURED_PROJECT_IDS, PROJECTS } from "../../data/projects";
import { GlassCard } from "../ui/GlassCard";
import { Reveal } from "../ui/Reveal";
import { RouterLink } from "../ui/RouterLink";

export function ProjectsPreview() {
  const featured = FEATURED_PROJECT_IDS.map((id) => PROJECTS.find((p) => p.id === id)!);

  return (
    <section className="section" id="projects">
      <div className="container">
        <Reveal className="section-intro">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2>Project previews with media and context.</h2>
          </div>
          <p>
            Short previews for the projects most likely to matter during a recruiter or hiring-manager pass. The full archive lives on the projects page.
          </p>
        </Reveal>

        <Reveal className="project-grid" stagger>
          {featured.map((p) => {
            const cover = p.media[0];
            return (
              <GlassCard key={p.id} className="project-card">
                <div className="project-card__media">
                  {cover?.kind === "video" && (
                    <video
                      playsInline
                      muted
                      loop
                      preload="metadata"
                      poster={cover.poster ? asset(cover.poster) : undefined}
                      onMouseEnter={(e) => void e.currentTarget.play().catch(() => {})}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    >
                      <source src={asset(cover.src)} type="video/mp4" />
                    </video>
                  )}
                  {cover?.kind === "image" && (
                    <img
                      src={asset(cover.src)}
                      alt={cover.alt ?? p.title}
                      loading="lazy"
                    />
                  )}
                  {!cover && (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background:
                          "radial-gradient(400px 200px at 30% 30%, rgba(123,227,255,0.18), transparent 60%), linear-gradient(135deg, #0a1530, #050913)",
                      }}
                    />
                  )}
                </div>
                <div className="project-card__body">
                  <p className="meta">{p.meta}</p>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  <div className="chip-list">
                    {p.chips.slice(0, 4).map((c) => (
                      <span key={c} className="chip">
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="button-row">
                    <RouterLink href={`/projects?id=${p.id}`} className="button primary tiny">
                      View project
                    </RouterLink>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </Reveal>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <RouterLink href="/projects" className="button secondary">
            Open the full archive
          </RouterLink>
        </div>
      </div>
    </section>
  );
}
