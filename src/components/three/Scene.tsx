import { Suspense, useEffect, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { FloatingObjects } from "./FloatingObjects";
import { useMousePositionRef } from "../../utils/motion";

export type SceneLayout = "wide" | "medium" | "compact" | "mobile";

// Where the satellite sits for each viewport class, as fractions of the visible
// half-width/half-height so the composition holds across aspect ratios. On
// landscape screens it holds station above the Earth's limb to the right of
// the hero text; on phones and portrait tablets it moves into the open sky
// above the text instead of sitting behind it.
const LAYOUTS: Record<
  SceneLayout,
  { x: number; y: number; scale: [number, number, number]; cameraZ: number; fov: number; orbitRadius: number }
> = {
  wide: { x: 0.45, y: -0.3, scale: [4.6, 0.5, 5.4], cameraZ: 18, fov: 42, orbitRadius: 4 },
  medium: { x: 0.42, y: -0.2, scale: [3.9, 0.46, 4.6], cameraZ: 19, fov: 44, orbitRadius: 3.5 },
  compact: { x: 0.02, y: 0.44, scale: [3.9, 0.63, 4.8], cameraZ: 21, fov: 50, orbitRadius: 3 },
  mobile: { x: 0, y: 0.14, scale: [3, 0.87, 6.8], cameraZ: 18, fov: 44, orbitRadius: 2 },
};

interface SceneProps {
  progressRef: MutableRefObject<number>;
  active: boolean;
  reducedMotion: boolean;
  layout: SceneLayout;
}

function SceneContent({ progressRef, reducedMotion, layout }: Omit<SceneProps, "active">) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const mouseRef = useMousePositionRef();
  const compact = layout === "compact" || layout === "mobile";
  const { size } = useThree();
  const config = layout === "mobile" && size.width > size.height
    ? { ...LAYOUTS.mobile, x: 0.52, y: -0.02, scale: [2.2, 0.24, 3.4] }
    : LAYOUTS[layout];
  const halfHeight = Math.tan(THREE.MathUtils.degToRad(config.fov / 2)) * config.cameraZ;
  const halfWidth = halfHeight * (size.width / Math.max(1, size.height));
  const [minScale, perHalfWidth, maxScale] = config.scale;
  const scale = THREE.MathUtils.clamp(halfWidth * perHalfWidth, minScale, maxScale);
  const anchor = new THREE.Vector3(config.x * halfWidth, config.y * halfHeight, 0);

  useFrame((_state, delta) => {
    if (!cameraRef.current) return;
    const m = mouseRef.current;
    const targetY = reducedMotion ? 0 : m.y * (compact ? -0.12 : -0.25);
    const targetX = reducedMotion ? 0 : m.x * (compact ? 0.18 : 0.35);
    const ease = reducedMotion ? 1 : Math.min(1, delta * 1.6);
    cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * ease;
    cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * ease;
    cameraRef.current.position.z += (config.cameraZ - cameraRef.current.position.z) * ease;
    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={config.fov} near={0.1} far={500} position={[0, 0, config.cameraZ]} />

      {/* Soft fill so the satellite's shaded side isn't pure black */}
      <ambientLight intensity={0.58} color="#92a7cf" />
      {/* Key light from the upper right, matching the lit limb in the footage */}
      <directionalLight position={[14, 8, 6]} intensity={3.4} color="#fff4df" />
      {/* Cool rim light from below: Earth's reflected blue */}
      <directionalLight position={[-4, -10, 4]} intensity={1.25} color="#6da0ea" />
      {/* Back light to separate the silhouette from the sky */}
      <directionalLight position={[-6, 4, -8]} intensity={0.85} color="#b6ccf0" />

      <FloatingObjects
        mouseRef={mouseRef}
        progressRef={progressRef}
        reducedMotion={reducedMotion}
        anchor={anchor}
        orbitRadius={config.orbitRadius}
        scale={scale}
        mobile={layout === "mobile"}
      />
    </>
  );
}

export function Scene({ progressRef, active, reducedMotion, layout }: SceneProps) {
  return (
    <Canvas
      // Stop rendering entirely once the hero has scrolled away; with reduced
      // motion, render only when something changes.
      frameloop={!active ? "never" : reducedMotion || layout === "mobile" ? "demand" : "always"}
      dpr={layout === "mobile" ? [1, 1] : layout === "compact" ? [1, 1.25] : [1, 1.6]}
      gl={{ antialias: layout !== "mobile", alpha: true, powerPreference: layout === "mobile" ? "low-power" : "high-performance" }}
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.32;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <Suspense fallback={null}>
        <MobileFrameLoop active={active && !reducedMotion && layout === "mobile"} />
        <AdaptiveDpr pixelated />
        <SceneContent progressRef={progressRef} reducedMotion={reducedMotion} layout={layout} />
      </Suspense>
    </Canvas>
  );
}

/** Demand rendering avoids a full-rate RAF loop on phones, including offscreen. */
function MobileFrameLoop({ active }: { active: boolean }) {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(invalidate, 1000 / 30);
    return () => window.clearInterval(timer);
  }, [active, invalidate]);
  return null;
}
