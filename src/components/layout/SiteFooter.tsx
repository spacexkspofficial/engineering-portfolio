import { PERSON } from "../../data/profile";
import { RouterLink } from "../ui/RouterLink";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <p className="site-footer__name">{PERSON.name}</p>
        <ul className="site-footer__links">
          <li>
            <a href={PERSON.linkedin} rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={PERSON.github} rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <RouterLink href="/resume">Resume</RouterLink>
          </li>
          <li>
            <RouterLink href="/privacy">Privacy</RouterLink>
          </li>
          <li>
            <RouterLink href="/terms">Terms</RouterLink>
          </li>
        </ul>
        <p className="site-footer__note">
          © 2026 {PERSON.name}. Home-page background: Earth footage and a third-party CubeSat CAD model, used for
          illustration; neither is my work. Hosted on GitHub Pages; no analytics or cookies.
        </p>
      </div>
    </footer>
  );
}
