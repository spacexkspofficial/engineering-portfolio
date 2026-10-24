import { PERSON } from "../../data/profile";
import { asset } from "../../utils/assets";
import { RouterLink } from "../ui/RouterLink";

/** Contact details, shared by the home page and #/contact. */
export function ContactBlock({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return (
    <div className="wrap contact">
      <header className="section-head">
        <Heading id="contact-title">Contact</Heading>
        <p>
          Based in the {PERSON.location.replace(" Metropolitan Area", " area")}. {PERSON.availability} LinkedIn is the best way
          to reach me.
        </p>
      </header>
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
            <a href={asset("assets/downloads/resume/alexander-amadeo-ranch-resume.pdf")}>Full PDF</a>
            <span aria-hidden="true"> · </span>
            <a href={asset("assets/downloads/resume/alexander-amadeo-ranch-engineering-resume.pdf")}>One-page engineering PDF</a>
          </dd>
        </div>
      </dl>
    </div>
  );
}
