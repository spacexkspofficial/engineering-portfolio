import { useEffect, useState } from "react";
import { PERSON } from "../../data/profile";
import { useRoute } from "../../utils/router";
import { RouterLink } from "../ui/RouterLink";

const NAV: { to: string; label: string; active: (path: string) => boolean }[] = [
  { to: "/projects", label: "Work", active: (p) => p.startsWith("/projects") },
  { to: "/experience", label: "Experience", active: (p) => p === "/experience" },
  { to: "/about", label: "About", active: (p) => p === "/about" },
  { to: "/resume", label: "Resume", active: (p) => p === "/resume" },
  { to: "/contact", label: "Contact", active: (p) => p === "/contact" },
];

export function SiteHeader({ overlay }: { overlay: boolean }) {
  const route = useRoute();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [route.path, route.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = !overlay || scrolled || open;
  return (
    <header className={`site-header${solid ? " is-solid" : ""}${open ? " is-open" : ""}`}>
      <div className="wrap site-header__inner">
        <RouterLink href="/" className="site-header__name">
          {PERSON.name}
        </RouterLink>
        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="site-nav" className="site-nav" aria-label="Primary">
          <ul>
            {NAV.map((item) => {
              const active = item.active(route.path);
              return (
                <li key={item.to}>
                  <RouterLink href={item.to} aria-current={active ? "page" : undefined} className={active ? "is-active" : undefined}>
                    {item.label}
                  </RouterLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
