import { useEffect, useRef, useState, type MutableRefObject } from "react";

// Width-based layouts also cover narrow desktop windows; coarse pointers include
// phones in landscape and small tablets. Keep in sync with the mobile CSS.
export const MOBILE_QUERY = "(max-width: 900px), (max-width: 1100px) and (pointer: coarse)";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True when the visitor asked to save data (Chromium's Save-Data hint). */
export function prefersSavedData(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(connection?.saveData);
}

export function useMousePositionRef(): MutableRefObject<{ x: number; y: number }> {
  const ref = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        ref.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        ref.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  return ref;
}

/**
 * Shared scene progress. Mobile fades against the measured opening section;
 * desktop retains the original first-viewport exploded view.
 */
export function useHeroScroll(mobile = false): {
  progressRef: MutableRefObject<number>;
  sceneRef: MutableRefObject<HTMLDivElement | null>;
  visible: boolean;
} {
  const progressRef = useRef(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(mobile ? ".mobile-hero" : ".hero");
    let frame = 0;
    let start = 0;
    let distance = 1;
    let cutoff = 1;
    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
      progressRef.current = progress;
      const fade = Math.min(1, Math.max(0, (progress - 0.24) / 0.76));
      const opacity = mobile ? 1 - fade * fade * (3 - 2 * fade) : 1;
      if (sceneRef.current) sceneRef.current.style.opacity = String(opacity);
      if (mobile && hero) hero.style.setProperty("--hero-opacity", String(opacity));
      setVisible(mobile ? opacity > 0 : window.scrollY < cutoff);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      const h = Math.max(1, window.innerHeight);
      start = hero ? hero.getBoundingClientRect().top + window.scrollY : 0;
      // Fade out as the shared content enters, using the actual hero dimensions.
      distance = mobile && hero ? Math.max(1, hero.offsetHeight - h * 0.3) : h;
      cutoff = h * 1.15;
      schedule();
    };
    const observer = new ResizeObserver(measure);
    if (hero) observer.observe(hero);
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
    };
  }, [mobile]);
  return { progressRef, sceneRef, visible };
}
