import { createElement, ReactNode, useEffect, useRef } from "react";

type RevealTag = "div" | "section" | "article" | "header" | "main" | "aside";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: RevealTag;
  stagger?: boolean;
}

export function Reveal({ children, className = "", delay = 0, as = "div", stagger = false }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.transition = `opacity 720ms cubic-bezier(0.22, 0.7, 0.24, 1) ${delay}ms, transform 760ms cubic-bezier(0.22, 0.7, 0.24, 1) ${delay}ms`;
            target.classList.add("is-visible");
            if (stagger) {
              const kids = target.querySelectorAll<HTMLElement>(":scope > *");
              kids.forEach((kid, i) => {
                kid.style.transition = `opacity 700ms cubic-bezier(0.22, 0.7, 0.24, 1) ${delay + 80 + i * 70}ms, transform 760ms cubic-bezier(0.22, 0.7, 0.24, 1) ${delay + 80 + i * 70}ms`;
                kid.style.opacity = "0";
                kid.style.transform = "translateY(16px)";
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    kid.style.opacity = "";
                    kid.style.transform = "";
                  });
                });
              });
            }
            io.unobserve(target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, stagger]);

  return createElement(
    as,
    {
      ref,
      "data-reveal": true,
      className,
    },
    children,
  );
}
