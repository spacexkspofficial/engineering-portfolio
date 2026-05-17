import { Suspense, lazy, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRoute } from "./utils/router";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { ContactPage } from "./pages/Contact";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { NotFound } from "./pages/NotFound";

gsap.registerPlugin(ScrollTrigger);

const BackgroundScene = lazy(() => import("./components/three/Scene").then((m) => ({ default: m.Scene })));

function useGsapReveals() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(id);
  }, []);
}

function RouteOutlet() {
  const route = useRoute();
  switch (route.path) {
    case "/":
    case "":
      return <Home />;
    case "/projects":
      return <Projects />;
    case "/contact":
      return <ContactPage />;
    case "/privacy":
      return <Privacy />;
    case "/terms":
      return <Terms />;
    default:
      return <NotFound />;
  }
}

export default function App() {
  useGsapReveals();

  const route = useRoute();
  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Alexander Amadeo-Ranch | Aerospace Engineering Portfolio",
      "/projects": "Projects | Alexander Amadeo-Ranch",
      "/contact": "Contact | Alexander Amadeo-Ranch",
      "/privacy": "Privacy Policy | Alexander Amadeo-Ranch",
      "/terms": "Terms and Conditions | Alexander Amadeo-Ranch",
    };
    document.title = titles[route.path] ?? "Alexander Amadeo-Ranch | Aerospace Engineering Portfolio";
  }, [route.path]);

  useEffect(() => {
    if (!window.location.hash) {
      history.replaceState(null, "", "#/");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  }, []);

  const showScene = route.path === "/" || route.path === "";

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      {showScene && (
        <div className="scene-bg" aria-hidden="true">
          <Suspense fallback={null}>
            <BackgroundScene />
          </Suspense>
        </div>
      )}

      <Navbar />
      <RouteOutlet />
      <Footer />
    </>
  );
}
