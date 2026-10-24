// The resume as a single semantic document. Rendered inside the site at
// #/resume and to static HTML/PDF by scripts/build-resume.mjs, so both always
// show the same text. Keep this component free of hooks, routing and browser
// APIs: it must render on the server.
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  HONORS,
  PERSON,
  SKILLS,
  type Organization,
  type Workstream as WorkstreamData,
} from "../data/profile";
import { Fragment } from "react";
import { ENGINEERING_PROJECTS, RESUME_TAGLINE, SOFTWARE_PROJECTS, type ResumeProject } from "../data/resume";
import { formatMonth, formatRange } from "../utils/format";

export type ResumeVariant = "full" | "engineering";

// In the one-page engineering resume, keep only the first N bullets per role
// and leave out the earliest administrative role.
const ENGINEERING_BULLET_LIMIT: Record<string, number> = {
  "Structural Engineer": 1,
  "Chief Integration Officer": 1,
};
const ENGINEERING_HIDDEN_ROLES = ["Executive Assistant"];

function Contact() {
  return (
    <p className="r-contact">
      <span>{PERSON.location}</span>
      <span>
        <a href={PERSON.site}>{PERSON.siteLabel}</a>
      </span>
      <span>
        <a href={PERSON.linkedin}>{PERSON.linkedinLabel}</a>
      </span>
      <span>{PERSON.workAuthorization}</span>
    </p>
  );
}

function Education({ variant }: { variant: ResumeVariant }) {
  return (
    <section className="r-section" aria-labelledby="r-education">
      <h2 id="r-education">Education</h2>
      <article className="r-entry">
        <div className="r-line">
          <h3 className="r-org">{EDUCATION.school}</h3>
          <span className="r-date">{formatMonth(EDUCATION.start)} – Present</span>
        </div>
        <div className="r-line">
          <span className="r-title">{EDUCATION.degree}</span>
          <span className="r-date">
            GPA {EDUCATION.gpa}
            {variant === "engineering" ? ` · ${EDUCATION.honors[0].split(",")[0]}` : ""}
          </span>
        </div>
        <p className="r-text">
          {EDUCATION.minor}. {EDUCATION.status}; available for full-time work from {PERSON.availableFrom}.
        </p>
        <p className="r-text">
          <span className="r-label">Relevant coursework:</span>{" "}
          {(variant === "engineering" ? EDUCATION.coursework.slice(0, 6) : EDUCATION.coursework).join(", ")}.
        </p>
        {variant === "full" && (
          <p className="r-text">
            <span className="r-label">Honors:</span> {EDUCATION.honors.join("; ")}.
          </p>
        )}
      </article>
      {variant === "full" && (
        <article className="r-entry r-entry--compact">
          <div className="r-line">
            <h3 className="r-org">{EDUCATION.highSchool.school}</h3>
            <span className="r-date">2019 – 2023</span>
          </div>
          <p className="r-text">High school diploma with honors; {EDUCATION.highSchool.honors.join(", ")}.</p>
        </article>
      )}
    </section>
  );
}

function Workstream({ ws, multi, variant }: { ws: WorkstreamData; multi: boolean; variant: ResumeVariant }) {
  const bullets = variant === "engineering" ? ws.bullets.slice(0, 1) : ws.bullets;
  return (
    <div className="r-role">
      <div className="r-line">
        <span className="r-title r-title--sub">{multi ? `Across roles: ${ws.heading.toLowerCase()}` : ws.heading}</span>
      </div>
      <ul className="r-bullets">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function OrganizationEntry({ org, variant }: { org: Organization; variant: ResumeVariant }) {
  const multi = org.roles.length > 1;
  return (
    <article className="r-entry">
      <div className="r-line">
        <h3 className="r-org">
          {org.name}
          {org.descriptor && <span className="r-descriptor">, {org.descriptor}</span>}
        </h3>
        <span className="r-date">{org.location}</span>
      </div>
      {org.roles
        .filter((role) => variant === "full" || !ENGINEERING_HIDDEN_ROLES.includes(role.title))
        .map((role) => {
        const limit = variant === "engineering" ? ENGINEERING_BULLET_LIMIT[role.title] : undefined;
        const bullets = (role.bullets ?? []).slice(0, limit ?? undefined);
        return (
          <Fragment key={role.title}>
            <div className="r-role">
              <div className="r-line">
                <span className="r-title">{role.title}</span>
                <span className="r-date">{formatRange(role.start, role.end)}</span>
              </div>
              {bullets.length > 0 && (
                <ul className="r-bullets">
                  {bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
            {org.workstreams
              ?.filter((ws) => ws.afterRole === role.title)
              .map((ws) => (
                <Workstream key={ws.heading} ws={ws} multi={multi} variant={variant} />
              ))}
          </Fragment>
        );
      })}
      {org.workstreams
        ?.filter((ws) => !ws.afterRole)
        .map((ws) => (
          <Workstream key={ws.heading} ws={ws} multi={multi} variant={variant} />
        ))}
    </article>
  );
}

function ProjectEntry({ project, variant }: { project: ResumeProject; variant: ResumeVariant }) {
  const bullets = variant === "engineering" ? project.bullets.slice(0, project.engineeringBullets) : project.bullets;
  return (
    <article className="r-entry r-entry--project">
      <div className="r-line">
        <h3 className="r-org">
          {project.title}
          <span className="r-descriptor">, {project.context}</span>
        </h3>
        <span className="r-date">{project.period}</span>
      </div>
      <ul className="r-bullets">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </article>
  );
}

function Skills({ variant }: { variant: ResumeVariant }) {
  const groups = variant === "engineering" ? SKILLS.filter((g) => g.label !== "Languages") : SKILLS;
  return (
    <section className="r-section" aria-labelledby="r-skills">
      <h2 id="r-skills">Skills</h2>
      {groups.map((group) => (
        <p className="r-text" key={group.label}>
          <span className="r-label">{group.label}:</span>{" "}
          {(variant === "engineering" && group.compact ? group.compact : group.items).join(", ")}.
        </p>
      ))}

    </section>
  );
}

function Certifications({ variant }: { variant: ResumeVariant }) {
  if (variant === "engineering") return null;
  return (
    <section className="r-section" aria-labelledby="r-certs">
      <h2 id="r-certs">Certifications and Training</h2>
      {CERTIFICATIONS.map((group) => {
        // Course certificates are listed by issuer and name with one date span.
        if (group.label.startsWith("AI")) {
          const dates = group.items.map((c) => c.date).sort();
          return (
            <p className="r-text" key={group.label}>
              <span className="r-label">{group.label}</span> ({formatRange(dates[0], dates[dates.length - 1])}):{" "}
              {group.items.map((c) => `${c.issuer} ${c.name.replace(new RegExp(`^${c.issuer} `), "")}`).join("; ")}.
            </p>
          );
        }
        return (
          <p className="r-text" key={group.label}>
            <span className="r-label">{group.label}:</span>{" "}
            {group.items
              .map((c) => {
                const name = c.issuer ? `${c.name} (${c.issuer})` : c.name;
                return c.expired
                  ? `${name}, issued ${formatMonth(c.date)}, expired ${formatMonth(c.expired)}`
                  : `${name}, ${formatMonth(c.date)}`;
              })
              .join("; ")}
            .
          </p>
        );
      })}
    </section>
  );
}


/**
 * `embedded`: rendered inside a site page that already has its own <h1>, so the
 * name is styled the same but is not a heading.
 */
export function ResumeDocument({ variant = "full", embedded = false }: { variant?: ResumeVariant; embedded?: boolean }) {
  const NameTag = embedded ? "p" : "h1";
  const engineering = EXPERIENCE.filter((o) => o.group === "engineering");
  const software = EXPERIENCE.filter((o) => o.group === "software");
  const operations = EXPERIENCE.filter((o) => o.group === "operations");
  const engProjects = variant === "engineering" ? ENGINEERING_PROJECTS.filter((p) => p.engineering) : ENGINEERING_PROJECTS;
  const swProjects = variant === "engineering" ? SOFTWARE_PROJECTS.filter((p) => p.engineering) : SOFTWARE_PROJECTS;

  return (
    <article className={`resume resume--${variant}`} lang="en">
      <header className="r-header">
        <NameTag className="r-name">
          {PERSON.givenName} <span className="r-nowrap">{PERSON.name.replace(`${PERSON.givenName} `, "")}</span>
        </NameTag>
        <p className="r-tagline">{RESUME_TAGLINE}</p>
        <Contact />
      </header>

      <Education variant={variant} />

      <section className="r-section" aria-labelledby="r-eng">
        <h2 id="r-eng">Engineering Experience</h2>
        {engineering.map((org) => (
          <OrganizationEntry key={org.id} org={org} variant={variant} />
        ))}
      </section>

      <section className="r-section" aria-labelledby="r-projects">
        <h2 id="r-projects">{variant === "engineering" ? "Selected Projects" : "Engineering Projects"}</h2>
        {[...engProjects, ...(variant === "engineering" ? swProjects : [])].map((p) => (
          <ProjectEntry key={p.title} project={p} variant={variant} />
        ))}
      </section>

      {variant === "full" && (
        <>
          <section className="r-section" aria-labelledby="r-software">
            <h2 id="r-software">Software, Web and Automation Experience</h2>
            {software.map((org) => (
              <OrganizationEntry key={org.id} org={org} variant={variant} />
            ))}
          </section>

          <section className="r-section" aria-labelledby="r-swprojects">
            <h2 id="r-swprojects">Software Projects</h2>
            {swProjects.map((p) => (
              <ProjectEntry key={p.title} project={p} variant={variant} />
            ))}
          </section>

          <section className="r-section" aria-labelledby="r-ops">
            <h2 id="r-ops">Operations, Leadership and Teaching</h2>
            {operations.map((org) => (
              <OrganizationEntry key={org.id} org={org} variant={variant} />
            ))}
          </section>
        </>
      )}

      <Skills variant={variant} />


      <Certifications variant={variant} />

      {variant === "full" && (
        <section className="r-section" aria-labelledby="r-honors">
          <h2 id="r-honors">Honors and Activities</h2>
          <p className="r-text">
            {HONORS.map((h) => `${h.name}, ${h.date}${h.detail ? ` (${h.detail})` : ""}`).join("; ")}.
          </p>
        </section>
      )}
    </article>
  );
}
