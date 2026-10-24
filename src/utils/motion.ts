import { useEffect, useRef, useState, type MutableRefObject } from "react";

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
 * Scroll progress through the first viewport (0 at the top of the page, 1 once
 * the hero has scrolled away) plus whether the background is still visible.
 */
export function useHeroScroll(): { progressRef: MutableRefObject<number>; visible: boolean } {
  const progressRef = useRef(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const update = () => {
      const h = Math.max(1, window.innerHeight);
      progressRef.current = Math.min(1, Math.max(0, window.scrollY / h));
      setVisible(window.scrollY < h * 1.15);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return { progressRef, visible };
}
