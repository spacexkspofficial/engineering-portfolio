import { PERSON } from "../../data/profile";
import { asset } from "../../utils/assets";
import { RouterLink } from "../ui/RouterLink";

/** Contact details, shared by the home page and #/contact. */
export function ContactBlock({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return (
    <div className="wrap contact">
      <header className="section-head">
        <div><p className="kicker">04 / Get in touch</p><Heading id="contact-title">Let's build aerospace hardware.</Heading></div>
        <p>
          Based in the {PERSON.location.replace(" Metropolitan Area", " area")}. {PERSON.availability} LinkedIn is the best way
          to reach me.
        </p>
      </header>
      <p className="contact__focus"><strong>Role interests:</strong> {PERSON.targetRoles}. {PERSON.workAuthorization}.</p>
      <div className="contact__actions">
        <a href={PERSON.linkedin} className="button button--primary" rel="noreferrer">Connect on LinkedIn ↗</a>
        <a href={asset("assets/downloads/resume/alexander-amadeo-ranch-engineering-resume.pdf")} className="button">Engineering resume (1 page) ↓</a>
      </div>
      <dl className="contact__list">
        <div>
          <dt>LinkedIn</dt>
          <dd>
            <a href={PERSON.linkedin} rel="noreferrer">
              {PERSON.linkedinLabel}
            </a>
          </dd>
        </div>
        <div>
          <dt>Resume</dt>
          <dd>
            <RouterLink href="/resume">Read online</RouterLink>
            <span aria-hidden="true"> · </span>
            <a href={asset("assets/downloads/resume/alexander-amadeo-ranch-engineering-resume.pdf")}>One-page engineering PDF</a>
            <span aria-hidden="true"> · </span>
            <a href={asset("assets/downloads/resume/alexander-amadeo-ranch-resume.pdf")}>Full background PDF</a>
          </dd>
        </div>
      </dl>
    </div>
  );
}
