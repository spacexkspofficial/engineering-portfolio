import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, PerspectiveCamera, Preload } from "@react-three/drei";
import { FloatingObjects } from "./FloatingObjects";
import { ParticleField } from "./ParticleField";
import { useMousePositionRef, useReducedMotion, useScrollProgressRef } from "../../utils/motion";

function CanvasFallback() {
  return <div className="scene-loader" aria-hidden="true" />;
}

function WebGLFallback() {
  return <div className="scene-fallback" aria-hidden="true" />;
}

function useCompactViewport(): boolean {
  const [compact, setCompact] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia("(max-width: 720px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const onChange = (event: MediaQueryListEvent) => setCompact(event.matches);
    setCompact(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return compact;
}

function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

export function Scene() {
  const mouseRef = useMousePositionRef();
  const scrollRef = useScrollProgressRef();
  const reducedMotion = useReducedMotion();
  const compact = useCompactViewport();
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => setHasWebGL(detectWebGL()), []);

  if (hasWebGL === false) return <WebGLFallback />;
  if (hasWebGL === null) return <CanvasFallback />;

  return (
    <Canvas
      dpr={compact ? [1, 1.25] : [1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      camera={{ position: [0, 0, 30], fov: compact ? 46 : 50 }}
    >
      <Suspense fallback={null}>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <PerspectiveCamera makeDefault position={[0, 0, 30]} fov={compact ? 46 : 50} />
        <FloatingObjects mouseRef={mouseRef} scrollRef={scrollRef} reducedMotion={reducedMotion} />
        <ParticleField count={compact ? 180 : 500} reducedMotion={reducedMotion} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
