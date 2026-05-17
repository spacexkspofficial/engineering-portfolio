import { useEffect, useMemo, useState } from "react";
import { asset } from "../utils/assets";
import { PROJECTS, PROJECT_FILTERS, type ProjectCategory } from "../data/projects";
import { GlassCard } from "../components/ui/GlassCard";
import { Reveal } from "../components/ui/Reveal";
import { useRoute } from "../utils/router";
import { ProjectEntry } from "../components/sections/ProjectEntry";

export function Projects() {
  const route = useRoute();
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const highlighted = route.query.id;

  useEffect(() => {
    if (!highlighted) return;
    const target = document.getElementById(highlighted);
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, [highlighted]);

  const visible = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.categories.includes(filter));
  }, [filter]);

  return (
    <main id="main" className="page-fade">
      <section className="section page-section-first">
        <div className="container">
          <Reveal className="page-hero-grid">
            <div>
              <p className="eyebrow">Project Archive</p>
              <h1>Projects, reports, media, and source files.</h1>
              <p className="lead" style={{ marginTop: "1rem" }}>
                Direct access to aerospace, controls, simulation, writing, and hands-on engineering work - everything indexed and one click from the file.
              </p>
              <div className="button-row">
                <a
                  className="button primary"
                  href={asset("assets/downloads/resume/alexander-amadeo-ranch-resume.pdf")}
                  download
                >
                  Download resume
                </a>
                <a
                  className="button secondary"
                  href="https://linkedin.com/in/alexamadeoranch"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <GlassCard as="div" className="reading-panel" tilt={false}>
              <p className="small-label">Highlighted Files</p>
              <strong>Quick access to key project documents.</strong>
              <ul className="compact-list">
                <li><strong>Resume:</strong> current resume PDF.</li>
                <li><strong>MAE 146:</strong> final report and MATLAB source.</li>
                <li><strong>MAE 106:</strong> robotics and controls reports.</li>
                <li><strong>CubeSat:</strong> structural analysis clips and overview PDF.</li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <Reveal className="section-intro">
            <div>
              <p className="eyebrow">Filter</p>
              <h2>Browse by skill area.</h2>
            </div>
            <p>Projects grouped by primary skill area - click a tag to narrow the archive.</p>
          </Reveal>

          <div className="filter-row" role="tablist" aria-label="Project filter">
            {PROJECT_FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`filter-button ${filter === f.key ? "active" : ""}`}
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <div className="archive-shell">
            {visible.length === 0 && (
              <p className="meta" style={{ textAlign: "center", padding: "3rem 0" }}>
                No projects match that filter yet.
              </p>
            )}
            {visible.map((p) => (
              <ProjectEntry key={p.id} project={p} highlighted={highlighted === p.id} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
