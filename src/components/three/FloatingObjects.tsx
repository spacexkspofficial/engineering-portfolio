import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { asset } from "../../utils/assets";
import { makePartMeshes, readPartMeshes, type ProcessedPart } from "./modelParts";

interface SceneProps {
  mouseRef: MutableRefObject<{ x: number; y: number }>;
  /** 0 at the top of the page, 1 once the hero has scrolled away. Drives the exploded view. */
  progressRef: MutableRefObject<number>;
  reducedMotion: boolean;
  earthCenter?: THREE.Vector3;
  orbitRadius?: number;
  anchor?: THREE.Vector3;
  scale?: number;
  showLabels?: boolean;
  mobile?: boolean;
}

type CubeSatGltf = { scene: THREE.Group };
const CUBESAT_MODEL_URL = asset("assets/models/lumid-cubesat.glb");
const MOBILE_MODEL_URL = asset("assets/models/lumid-cubesat-mobile.glb");

// Orbit motion is intentionally small: the satellite stays roughly fixed in view.
// A subtle scroll-driven drift across a narrow arc; no aggressive sweep.
const ORBIT_DRIFT_DEG = 8;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function FloatingObjects({
  mouseRef,
  progressRef,
  reducedMotion,
  earthCenter = new THREE.Vector3(0, 0, 0),
  orbitRadius = 22,
  anchor,
  scale,
  showLabels = false,
  mobile = false,
}: SceneProps) {
  const orbitRef = useRef<THREE.Group>(null);
  const containerRef = useRef<THREE.Group>(null);
  const partGroupRefs = useRef<(THREE.Group | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gltf = useGLTF(mobile ? MOBILE_MODEL_URL : CUBESAT_MODEL_URL) as unknown as CubeSatGltf;
  const { size } = useThree();
  const isPhone = size.width < 520;
  const isCompact = size.width < 720;

  const parts = useMemo<ProcessedPart[]>(
    () => mobile ? readPartMeshes(gltf.scene) : makePartMeshes(gltf.scene),
    [gltf.scene, mobile],
  );
  // Reuse scratch vectors in the render loop instead of allocating for every part.
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const offset = useMemo(() => new THREE.Vector3(), []);

  // Explosion reach kept similar to the original — preserves the same animation feel
  const explodeReach = isPhone ? 0.18 : isCompact ? 0.19 : 0.19;
  const satScale = scale ?? (isPhone ? 4.35 : isCompact ? 5 : 6);

  useFrame((state, delta) => {
    if (!orbitRef.current || !containerRef.current) return;
    // With reduced motion the model stays assembled and still.
    const t = reducedMotion ? 0 : progressRef.current;
    const time = state.clock.getElapsedTime();

    // === Anchor: satellite holds station against the Earth horizon.
    // Subtle scroll drift + slow continuous bob to suggest orbital motion.
    const drift = THREE.MathUtils.degToRad(ORBIT_DRIFT_DEG) * (t - 0.5) * 2;
    const base = anchor ?? earthCenter;
    const driftX = Math.sin(drift) * orbitRadius * 0.6;
    const driftY = Math.cos(drift) * orbitRadius * 0.15;
    const bobX = reducedMotion ? 0 : Math.sin(time * 0.18) * 0.25;
    const bobY = reducedMotion ? 0 : Math.cos(time * 0.13) * 0.22;
    targetPos.set(
      base.x + driftX + bobX,
      base.y + driftY + bobY,
      base.z,
    );

    const m = mouseRef.current;
    if (!reducedMotion) {
      targetPos.x += m.x * 0.35;
      targetPos.y += -m.y * 0.2;
    }

    // With reduced motion the scene renders on demand, so snap instead of easing.
    const ease = reducedMotion ? 1 : Math.min(1, delta * 1.6);
    orbitRef.current.position.lerp(targetPos, ease);

    // Slow continuous yaw — gives the orbital impression without looking chaotic.
    // Pitch is held with subtle mouse parallax. No roll, no tumble.
    const baseYaw = reducedMotion ? -0.7 : -0.7 + time * 0.045;
    const yawTarget = baseYaw + drift * 0.3 + (reducedMotion ? 0 : m.x * 0.05);
    const pitchTarget = -0.24 + (reducedMotion ? 0 : m.y * -0.04 + Math.sin(time * 0.21) * 0.02);
    containerRef.current.rotation.y = yawTarget;
    containerRef.current.rotation.x += (pitchTarget - containerRef.current.rotation.x) * ease;
    containerRef.current.rotation.z += ((reducedMotion ? 0.08 : 0.08 + m.x * 0.018) - containerRef.current.rotation.z) * ease;

    // === Explosion: clean radial-with-vertical-bias separation. No time-driven tumbling. ===
    const explodeT = Math.min(1, t / 0.62);
    const eased = easeInOutCubic(explodeT);
    for (let i = 0; i < parts.length; i++) {
      const group = partGroupRefs.current[i];
      if (!group) continue;
      const spec = parts[i].spec;
      offset.copy(spec.direction).multiplyScalar(eased * explodeReach * spec.distanceScale);
      // Vertical bias — pieces fly UP more than sideways/forward, but bounded so debris stays in frame
      offset.x *= isPhone ? 0.45 : 0.55;
      offset.y *= isPhone ? 1.28 : 1.5;
      offset.z *= isPhone ? 0.45 : 0.55;
      group.position.copy(offset);
      // Hold each piece at its assembled rotation — no spin during explosion.
      group.rotation.set(0, 0, 0);
    }

    const LABEL_MAX = 0.8;
    const labelAlpha = showLabels ? smoothstep(0.58, 0.8, t) * LABEL_MAX : 0;
    for (let i = 0; i < labelRefs.current.length; i++) {
      const el = labelRefs.current[i];
      if (!el) continue;
      el.style.opacity = String(labelAlpha);
      el.style.transform = `translate(-50%, -50%) translateY(${(1 - labelAlpha / LABEL_MAX) * 5}px)`;
    }

    // Steady scale — no flex during explosion
    containerRef.current.scale.setScalar(satScale);
  });

  return (
    <group ref={orbitRef} dispose={null}>
      <group ref={containerRef} scale={satScale}>
        {parts.map((part, index) => (
          <group
            key={part.spec.id}
            ref={(element) => {
              partGroupRefs.current[index] = element;
            }}
          >
            <primitive object={part.mesh} />
            {showLabels && part.spec.label && (
              <Html position={part.labelPosition.toArray()} center distanceFactor={9} zIndexRange={[10, 0]} occlude={false}>
                <div
                  ref={(element) => {
                    labelRefs.current[index] = element;
                  }}
                  className="cubesat-label"
                  style={{ opacity: 0 }}
                >
                  <span className="cubesat-label__dot" />
                  <span className="cubesat-label__text">{part.spec.label}</span>
                </div>
              </Html>
            )}
          </group>
        ))}
      </group>
    </group>
  );
}
