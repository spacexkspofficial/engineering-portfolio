import { CAPABILITY_LINKS, ENGINEERING_EVIDENCE } from "../../data/positioning";
import { PERSON } from "../../data/profile";
import { RouterLink } from "../ui/RouterLink";

export function EngineeringOverview() {
  return (
    <div className="engineering-overview">
      <p className="engineering-overview__fit">
        <strong>Seeking new graduate engineering roles.</strong> {PERSON.targetRoles}.
      </p>
      <div className="engineering-evidence" aria-label="Selected engineering contributions">
        {ENGINEERING_EVIDENCE.map((item) => (
          <article className="engineering-evidence__item" key={item.projectId}>
            <p className="kicker">{item.skill}</p>
            <h3>{item.outcome}</h3>
            <p>{item.contribution}</p>
            <RouterLink href={`/projects/${item.projectId}`} className="text-link">{item.linkLabel}</RouterLink>
          </article>
        ))}
      </div>
      <nav className="capability-links" aria-label="Find work by engineering skill">
        <p className="kicker">Explore by skill</p>
        <ul>{CAPABILITY_LINKS.map((item) => (
          <li key={item.projectId}><RouterLink href={`/projects/${item.projectId}`}>{item.label}<span aria-hidden="true"> ↗</span></RouterLink></li>
        ))}</ul>
      </nav>
    </div>
  );
}
