import { createElement, useRef, MouseEvent, ReactNode, CSSProperties } from "react";
import { useReducedMotion } from "../../utils/motion";

type GlassTag = "article" | "div" | "section" | "li";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  style?: CSSProperties;
  as?: GlassTag;
  id?: string;
}

export function GlassCard({
  children,
  className = "",
  tilt = true,
  style,
  as = "article",
  id,
}: GlassCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || reduced) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    el.style.setProperty("--my", `${(y / rect.height) * 100}%`);
    if (tilt) {
      const rx = ((y / rect.height) - 0.5) * -4;
      const ry = ((x / rect.width) - 0.5) * 5;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
    }
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
    el.style.transform = "";
  };

  return createElement(
    as,
    {
      ref,
      id,
      className: `glass-card ${className}`.trim(),
      style,
      onMouseMove,
      onMouseLeave,
    },
    children,
  );
}
