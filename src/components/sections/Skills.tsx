import { SKILL_CLUSTERS } from "../../data/skills";
import { GlassCard } from "../ui/GlassCard";
import { Reveal } from "../ui/Reveal";

export function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal className="section-intro">
          <div>
            <p className="eyebrow">Skills</p>
            <h2>Tools and topics across the portfolio.</h2>
          </div>
          <p>
            Grouped by area - the actual evidence is in each project's report, source files, and clips, not in a checklist.
          </p>
        </Reveal>

        <Reveal className="skills-grid" stagger>
          {SKILL_CLUSTERS.map((cluster) => (
            <GlassCard key={cluster.id} className="skill-cluster" as="article">
              <p className="small-label">{cluster.id.toUpperCase()}</p>
              <h3>{cluster.title}</h3>
              <p>{cluster.blurb}</p>
              <div className="skill-pills">
                {cluster.skills.map((s) => (
                  <span key={s} className="skill-pill">
                    {s}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
