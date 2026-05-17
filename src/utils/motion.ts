import { useEffect, useRef, useState, type MutableRefObject } from "react";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => prefersReducedMotion());
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
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

export function useMousePosition(): { x: number; y: number } {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        setPos({ x, y });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  return pos;
}

export function useScrollProgressRef(): MutableRefObject<number> {
  const ref = useRef(0);
  useEffect(() => {
    const compute = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute, { passive: true });
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);
  return ref;
}
