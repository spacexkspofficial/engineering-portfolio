import { EXPERIENCE, type Organization } from "../../data/profile";
import { getProject } from "../../data/projects";
import { formatRange, formatYears } from "../../utils/format";
import { RouterLink } from "../ui/RouterLink";

function span(org: Organization): string {
  const starts = org.roles.map((r) => r.start).sort();
  const current = org.roles.some((r) => !r.end);
  const ends = org.roles.map((r) => r.end ?? "9999").sort();
  return formatYears(starts[0], current ? undefined : ends[ends.length - 1]);
}

function CompactRow({ org }: { org: Organization }) {
  const [latest, ...earlier] = org.roles;
  return (
    <li className="xp-row">
      <span className="xp-row__years">{span(org)}</span>
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
    </li>
  );
}

export function ExperienceSummary() {
  const engineering = EXPERIENCE.filter((o) => o.group === "engineering");
  const software = EXPERIENCE.filter((o) => o.group === "software");
  const operations = EXPERIENCE.filter((o) => o.group === "operations");

  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="wrap">
        <header className="section-head">
          <h2 id="experience-title">Experience</h2>
          <p>
            Engineering in detail; software, operations and teaching in brief. The{" "}
            <RouterLink href="/resume">full resume</RouterLink> has every role.
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
              {org.note && <p className="note">{org.note}</p>}
              {org.projectId && (
                <RouterLink href={`/projects/${org.projectId}`} className="text-link">
                  {getProject(org.projectId)?.short}
                </RouterLink>
              )}
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
