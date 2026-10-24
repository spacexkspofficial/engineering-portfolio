import { useCallback, useEffect, useState } from "react";

export interface Route {
  path: string;
  segments: string[];
  query: Record<string, string>;
  hash: string;
}

export function parseHash(raw: string): Route {
  const stripped = raw.replace(/^#/, "");
  const [pathPart, queryPart = ""] = stripped.split("?");
  let path = pathPart || "/";
  if (!path.startsWith("/")) path = `/${path}`;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  const query: Record<string, string> = {};
  if (queryPart) {
    for (const pair of queryPart.split("&")) {
      const [k, v = ""] = pair.split("=");
      if (k) query[decodeURIComponent(k)] = decodeURIComponent(v);
    }
  }
  return { path, segments: path.split("/").filter(Boolean), query, hash: raw };
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

function toHash(to: string): string {
  return to.startsWith("#") ? to : `#${to.startsWith("/") ? to : `/${to}`}`;
}

export function navigate(to: string): void {
  const target = toHash(to);
  if (window.location.hash === target) {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  } else {
    window.location.hash = target;
  }
}

/** Swap the current URL without adding a history entry (used for legacy links). */
export function replaceRoute(to: string): void {
  history.replaceState(null, "", toHash(to));
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export function useNavigate() {
  return useCallback((to: string) => navigate(to), []);
}

export function isInternalRoute(href: string): boolean {
  if (!href) return false;
  if (/^[a-z]+:/i.test(href)) return false;
  if (href.startsWith("#")) return true;
  return href.startsWith("/") && !href.startsWith("//");
}
