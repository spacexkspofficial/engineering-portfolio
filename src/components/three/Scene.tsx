import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, PerspectiveCamera, Preload } from "@react-three/drei";
import * as THREE from "three";
import { FloatingObjects } from "./FloatingObjects";
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

interface SceneContentProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
  compact: boolean;
}

function SceneContent({ mouseRef, scrollRef, reducedMotion, compact }: SceneContentProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const satelliteAnchor = compact ? new THREE.Vector3(0, -2.15, 0) : new THREE.Vector3(0, -2.8, 0);

  useFrame((_state, delta) => {
    if (!cameraRef.current) return;
    const m = mouseRef.current;

    const baseZ = compact ? 21 : 18;
    const targetY = compact ? 0.2 + (reducedMotion ? 0 : m.y * -0.12) : 0 + (reducedMotion ? 0 : m.y * -0.25);
    const targetX = reducedMotion ? 0 : m.x * (compact ? 0.18 : 0.35);
    const ease = Math.min(1, delta * 1.6);
    cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * ease;
    cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * ease;
    cameraRef.current.position.z += (baseZ - cameraRef.current.position.z) * ease;

    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={compact ? 50 : 42}
        near={0.1}
        far={500}
        position={[0, compact ? 0.2 : 0, compact ? 21 : 18]}
      />

      {/* Soft fill ambient so the satellite isn't pure black on its dark side */}
      <ambientLight intensity={0.58} color="#92a7cf" />

      {/* Key sun-like light from upper-right (matches the image's lit horizon) */}
      <directionalLight position={[14, 8, 6]} intensity={3.4} color="#fff4df" />

      {/* Cool rim light from below — Earth's reflected blue */}
      <directionalLight position={[-4, -10, 4]} intensity={1.25} color="#6da0ea" />

      {/* Subtle backlight to separate satellite silhouette from the dark sky */}
      <directionalLight position={[-6, 4, -8]} intensity={0.85} color="#b6ccf0" />

      <FloatingObjects
        mouseRef={mouseRef}
        scrollRef={scrollRef}
        reducedMotion={reducedMotion}
        anchor={satelliteAnchor}
        orbitRadius={compact ? 3.25 : 4}
      />
    </>
  );
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
      dpr={compact ? [1, 1.2] : [1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.32;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <Suspense fallback={null}>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <SceneContent
          mouseRef={mouseRef}
          scrollRef={scrollRef}
          reducedMotion={reducedMotion}
          compact={compact}
        />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
