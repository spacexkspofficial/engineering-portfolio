import { useEffect, useRef, useState } from "react";
import { PERSON } from "../../data/profile";
import { RouterLink } from "../ui/RouterLink";

const NAV = [
  { to: "/work", id: "work", label: "Projects" },
  { to: "/experience", id: "experience", label: "Experience" },
  { to: "/about", id: "about", label: "About" },
  { to: "/contact", id: "contact", label: "Contact" },
];
const clamp = (n: number) => Math.min(1, Math.max(0, n));

export function SiteHeader({ overlay }: { overlay: boolean }) {
  const header = useRef<HTMLElement>(null);
  const [state, setState] = useState({ scrolled: false, active: "", context: "Scroll to explore", progress: 0, sections: [0, 0, 0, 0] });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const end = document.documentElement.scrollHeight - window.innerHeight;
      // The final section can be shorter than the viewport, so its top cannot
      // always reach the header. At the bottom, mark the whole document read.
      const atEnd = overlay && end > 0 && y >= end - 2;
      const line = y + (atEnd ? window.innerHeight : (header.current?.offsetHeight ?? 100) + 24);
      const sections = NAV.map((n) => document.getElementById(n.id));
      const tops = sections.map((el) => el ? el.getBoundingClientRect().top + y : Infinity);
      let active = "";
      let context = overlay ? "Scroll to explore" : "Engineering portfolio";
      const progress = overlay ? Math.round(clamp(y / Math.max(1, end)) * 100) : 0;
      const fills = tops.map((top, i) => {
        if (!Number.isFinite(top)) return 0;
        if (line >= top) active = NAV[i].id;
        return clamp((line - top) / Math.max(1, (tops[i + 1] ?? end + (header.current?.offsetHeight ?? 100) + 24) - top));
      });
      if (active) context = NAV.find((n) => n.id === active)!.label;
      if (active === "work") {
        const projects = [...document.querySelectorAll<HTMLElement>("[data-project]")];
        const current = projects.filter((el) => el.getBoundingClientRect().top + y <= line).pop();
        if (current) context = `${current.dataset.projectIndex?.padStart(2, "0")} / ${projects.length} · ${current.dataset.project}`;
      }
      setState({ scrolled: y > 24, active, context, progress, sections: fills });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    const main = document.getElementById("main");
    if (main) observer.observe(main);
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [overlay]);

  return (
    <header ref={header} className={`site-header${!overlay || state.scrolled ? " is-solid" : ""}`}>
      <div className="wrap site-header__inner">
        <RouterLink href="/" className="site-header__name">
          {PERSON.name}
        </RouterLink>
        <nav id="site-nav" className="site-nav" aria-label="Portfolio sections">
          <ul>
            {NAV.map((item, i) => {
              const active = state.active === item.id;
              return (
                <li key={item.to}>
                  <RouterLink href={item.to} aria-current={active ? "location" : undefined} className={active ? "is-active" : undefined}>
                    {item.label}<span className="site-nav__track" aria-hidden="true"><span style={{ transform: `scaleX(${state.sections[i]})` }} /></span>
                  </RouterLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {overlay && <div className="wrap reading-position"><span>{state.context}</span><span>{state.progress}%</span></div>}
      {overlay && <progress className="reading-progress" max={100} value={state.progress} aria-label="Portfolio reading progress" />}
    </header>
  );
}
