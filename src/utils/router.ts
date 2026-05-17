import { useEffect, useState, useCallback } from "react";

export interface Route {
  path: string;
  query: Record<string, string>;
  hash: string;
}

function parseHash(raw: string): Route {
  const stripped = raw.replace(/^#/, "");
  const [pathPart, queryPart = ""] = stripped.split("?");
  let path = pathPart || "/";
  if (!path.startsWith("/")) path = `/${path}`;
  const query: Record<string, string> = {};
  if (queryPart) {
    for (const pair of queryPart.split("&")) {
      const [k, v = ""] = pair.split("=");
      if (k) query[decodeURIComponent(k)] = decodeURIComponent(v);
    }
  }
  return { path, query, hash: raw };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export function navigate(to: string): void {
  const target = to.startsWith("#") ? to : `#${to.startsWith("/") ? to : `/${to}`}`;
  if (window.location.hash === target) {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  } else {
    window.location.hash = target;
  }
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
}

export function useNavigate() {
  return useCallback((to: string) => navigate(to), []);
}

export function isInternalRoute(href: string): boolean {
  if (!href) return false;
  if (href.startsWith("http://") || href.startsWith("https://")) return false;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  if (href.startsWith("#")) return true;
  return href.startsWith("/");
}
