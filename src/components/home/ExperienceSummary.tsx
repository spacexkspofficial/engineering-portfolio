import { EXPERIENCE, type Organization } from "../../data/profile";
import { getProject } from "../../data/projects";
import { formatRange } from "../../utils/format";
import { RouterLink } from "../ui/RouterLink";

function CompactRow({ org }: { org: Organization }) {
  const [latest, ...earlier] = org.roles;
  return (
    <li className="xp-row">
      <span className="xp-row__years">{formatRange(latest.start, latest.end)}</span>
      <span className="xp-row__main">
        <strong>{latest.title}</strong>, {org.name}
        {earlier.length > 0 && (
          <span className="xp-row__earlier">
            {" "}
            Earlier: {earlier.map((r) => r.title).join(", ")}.
          </span>
        )}
      </span>
      {org.summary && <span className="xp-row__note">{org.summary}</span>}
      <div className="xp-row__details"><ExperienceNotes org={org} /></div>
    </li>
  );
}

function ExperienceNotes({ org }: { org: Organization }) {
  return (
    <details className="inline-notes experience-notes">
      <summary>Roles & contributions <span aria-hidden="true">+</span></summary>
      <div className="inline-notes__body prose">
        {org.location && <p className="kicker">{org.location}</p>}
        {org.roles.map((role) => <section className="project-note" key={role.title}>
          <h4>{role.title}</h4>
          <p className="note">{formatRange(role.start, role.end)}</p>
          {role.bullets && <ul>{role.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
        </section>)}
        {org.workstreams?.map((work) => <section className="project-note" key={work.heading}>
          <h4>{work.heading}</h4><ul>{work.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
        </section>)}
      </div>
    </details>
  );
}

export function ExperienceSummary() {
  const engineering = EXPERIENCE.filter((o) => o.group === "engineering");
  const software = EXPERIENCE.filter((o) => o.group === "software");
  const operations = EXPERIENCE.filter((o) => o.group === "operations");

  return (
    <section className="section" id="experience" data-scroll-section="Experience" aria-labelledby="experience-title">
      <div className="wrap">
        <header className="section-head">
          <div><p className="kicker">02 / Where I've worked</p><h2 id="experience-title">Experience</h2></div>
          <p>
            Current UAV and spacecraft work, supported by software delivery, team leadership and technical communication. Expand a role for its dates and contributions.
          </p>
        </header>

        <div className="xp-engineering">
          {engineering.map((org) => (
            <article className="xp-org" key={org.id} aria-labelledby={`xp-${org.id}`}>
              <header className="xp-org__head">
                <h3 id={`xp-${org.id}`}>{org.name}</h3>
                {org.descriptor && <p className="kicker">{org.descriptor}</p>}
              </header>
              <ol className="xp-roles">
                {org.roles.map((role) => (
                  <li key={role.title}>
                    <span className="xp-roles__title">{role.title}</span>
                    <span className="xp-roles__dates">{formatRange(role.start, role.end)}</span>
                  </li>
                ))}
              </ol>
              <p>{org.summary}</p>
              {org.id === "uci-cubesat" && <p className="note">Coordinated mechanical, electrical and payload interfaces across subteams and served as the liaison to the STMS research group.</p>}
              {org.note && <p className="note">{org.note}</p>}
              {org.projectId && (
                <RouterLink href={`/projects/${org.projectId}`} className="text-link">
                  Jump to {getProject(org.projectId)?.short}
                </RouterLink>
              )}
              <ExperienceNotes org={org} />
            </article>
          ))}
        </div>

        <div className="xp-groups">
          <div>
            <h3 className="xp-group-title">Software, web and automation</h3>
            <ul className="xp-list">
              {software.map((org) => (
                <CompactRow key={org.id} org={org} />
              ))}
            </ul>
          </div>
          <div>
            <h3 className="xp-group-title">Operations, teaching and other work</h3>
            <ul className="xp-list">
              {operations.map((org) => (
                <CompactRow key={org.id} org={org} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
