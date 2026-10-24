import { useEffect, useRef, type MouseEvent } from "react";
import { getProject } from "./data/projects";
import { PERSON } from "./data/profile";
import { replaceRoute, useRoute, type Route } from "./utils/router";
import { SiteHeader } from "./components/layout/SiteHeader";
import { SiteFooter } from "./components/layout/SiteFooter";
import { Home } from "./pages/Home";
import { ProjectsIndex } from "./pages/ProjectsIndex";
import { ProjectPage } from "./pages/ProjectPage";
import { ResumePage } from "./pages/ResumePage";
import { ContactPage } from "./pages/Contact";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { NotFound } from "./pages/NotFound";

// Home-page sections that also have their own route, e.g. #/experience.
const HOME_SECTIONS: Record<string, string> = {
  "/work": "work",
  "/experience": "experience",
  "/about": "about",
};

type View =
  | { kind: "home"; section?: string }
  | { kind: "projects" }
  | { kind: "project"; id: string }
  | { kind: "resume" | "contact" | "privacy" | "terms" | "missing" };

function resolve(route: Route): View {
  if (route.path === "/") return { kind: "home" };
  if (HOME_SECTIONS[route.path]) return { kind: "home", section: HOME_SECTIONS[route.path] };
  if (route.segments[0] === "projects") {
    if (route.segments.length === 1) return { kind: "projects" };
    if (route.segments.length === 2 && getProject(route.segments[1])) return { kind: "project", id: route.segments[1] };
    return { kind: "missing" };
  }
  switch (route.path) {
    case "/resume":
      return { kind: "resume" };
    case "/contact":
      return { kind: "contact" };
    case "/privacy":
      return { kind: "privacy" };
    case "/terms":
      return { kind: "terms" };
    default:
      return { kind: "missing" };
  }
}

function titleFor(view: View): string {
  const name = PERSON.name;
  switch (view.kind) {
    case "home":
      return view.section === "experience"
        ? `Experience | ${name}`
        : view.section === "about"
          ? `About | ${name}`
          : `${name} | Aerospace engineering: mechanical design, structures and integration`;
    case "projects":
      return `Work | ${name}`;
    case "project":
      return `${getProject(view.id)?.title} | ${name}`;
    case "resume":
      return `Resume | ${name}`;
    case "contact":
      return `Contact | ${name}`;
    case "privacy":
      return `Privacy | ${name}`;
    case "terms":
      return `Terms | ${name}`;
    default:
      return `Page not found | ${name}`;
  }
}

/** Old links like #/projects?id=obd-scanner now have their own pages. */
function useLegacyRedirects(route: Route) {
  useEffect(() => {
    if (route.path === "/projects" && route.query.id && getProject(route.query.id)) {
      replaceRoute(`/projects/${route.query.id}`);
    } else if (route.path === "/home") {
      replaceRoute("/");
    }
  }, [route]);
}

/** Scroll and focus management for hash navigation. Runs on every navigation,
 * including a click on the link for the page or section already showing. */
function useRouteFocus(view: View, route: Route) {
  const first = useRef(true);
  useEffect(() => {
    const isFirst = first.current;
    first.current = false;
    const main = document.getElementById("main");
    const section = view.kind === "home" ? view.section : undefined;
    const run = () => {
      if (section) {
        const target = document.getElementById(section);
        if (target) {
          target.scrollIntoView({ block: "start" });
          if (!isFirst) {
            target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
          }
          return;
        }
      }
      if (!isFirst) {
        window.scrollTo(0, 0);
        main?.focus({ preventScroll: true });
      }
    };
    requestAnimationFrame(run);
  }, [route]);
}

export default function App() {
  const route = useRoute();
  const view = resolve(route);
  useLegacyRedirects(route);
  useRouteFocus(view, route);

  const title = titleFor(view);
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (!window.location.hash) history.replaceState(null, "", "#/");
  }, []);

  const skipToContent = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const main = document.getElementById("main");
    main?.focus();
    main?.scrollIntoView();
  };

  let content;
  switch (view.kind) {
    case "home":
      content = <Home />;
      break;
    case "projects":
      content = route.query.id && getProject(route.query.id) ? null : <ProjectsIndex />;
      break;
    case "project":
      content = <ProjectPage project={getProject(view.id)!} />;
      break;
    case "resume":
      content = <ResumePage />;
      break;
    case "contact":
      content = <ContactPage />;
      break;
    case "privacy":
      content = <Privacy />;
      break;
    case "terms":
      content = <Terms />;
      break;
    default:
      content = <NotFound />;
  }

  return (
    <>
      <a className="skip-link" href="#main" onClick={skipToContent}>
        Skip to content
      </a>
      <SiteHeader overlay={view.kind === "home"} />
      <main id="main" tabIndex={-1} className={view.kind === "home" ? "main main--home" : "main"}>
        {content}
      </main>
      <SiteFooter />
    </>
  );
}
