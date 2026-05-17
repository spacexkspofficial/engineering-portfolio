import { useEffect, useState } from "react";
import { asset } from "../../utils/assets";
import { useRoute } from "../../utils/router";
import { RouterLink } from "../ui/RouterLink";

const NAV_ITEMS: { to: string; label: string }[] = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const route = useRoute();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [route.path]);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <RouterLink href="/" className="brand">
          <span className="brand-avatar" aria-hidden="true">
            <img src={asset("assets/images/headshot.jpg")} alt="" loading="eager" />
          </span>
          <span className="brand-copy">
            <strong>Alexander Amadeo-Ranch</strong>
            <span>Aerospace Engineering</span>
          </span>
        </RouterLink>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav id="primary-nav" className={`nav-links ${open ? "open" : ""}`} aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const active =
              item.to === "/" ? route.path === "/" : route.path === item.to || route.path.startsWith(`${item.to}/`);
            return (
              <RouterLink
                key={item.to}
                href={item.to}
                className={`nav-link ${active ? "is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </RouterLink>
            );
          })}
          <a
            className="button primary tiny nav-cta"
            href="https://linkedin.com/in/alexamadeoranch"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </header>
  );
}
