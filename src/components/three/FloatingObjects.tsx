import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { asset } from "../../utils/assets";

interface SceneProps {
  mouseRef: MutableRefObject<{ x: number; y: number }>;
  scrollRef: MutableRefObject<number>;
  reducedMotion: boolean;
}

type CubeSatGltf = { scene: THREE.Group };
const CUBESAT_MODEL_URL = asset("assets/models/lumid-cubesat.glb");

type PartId =
  | "core"
  | "topPlate"
  | "bottomPlate"
  | "wallPX"
  | "wallNX"
  | "wallPZ"
  | "wallNZ"
  | "solarPX"
  | "solarNX"
  | "solarPZ"
  | "solarNZ"
  | "fastenerPX"
  | "fastenerNX"
  | "fastenerPZ"
  | "fastenerNZ"
  | "fastenerTop"
  | "fastenerBottom";

interface PartSpec {
  id: PartId;
  label?: string;
  color: string;
  direction: THREE.Vector3;
  distanceScale: number;
  spin?: [number, number, number];
}

interface ComponentInfo {
  center: THREE.Vector3;
  size: THREE.Vector3;
  triangles: number;
  volume: number;
  maxDim: number;
}

interface TriangleComponent extends ComponentInfo {
  triangleIndices: number[];
}

interface GeometryBucket {
  spec: PartSpec;
  positions: number[];
  normals: number[];
}

interface ProcessedPart {
  spec: PartSpec;
  mesh: THREE.Mesh;
  labelPosition: THREE.Vector3;
}

const PART_ORDER: PartId[] = [
  "core",
  "topPlate",
  "bottomPlate",
  "wallPX",
  "wallNX",
  "wallPZ",
  "wallNZ",
  "solarPX",
  "solarNX",
  "solarPZ",
  "solarNZ",
  "fastenerPX",
  "fastenerNX",
  "fastenerPZ",
  "fastenerNZ",
  "fastenerTop",
  "fastenerBottom",
];

const PART_SPECS: Record<PartId, PartSpec> = {
  core: {
    id: "core",
    label: "Core bus",
    color: "#f4f6fb",
    direction: new THREE.Vector3(0, 0, -0.05),
    distanceScale: 0.2,
    spin: [0, 0.04, 0],
  },
  topPlate: {
    id: "topPlate",
    label: "Top wall",
    color: "#ffffff",
    direction: new THREE.Vector3(0, 1, 0),
    distanceScale: 1.05,
    spin: [0.05, 0, 0],
  },
  bottomPlate: {
    id: "bottomPlate",
    label: "Bottom wall",
    color: "#c6ccd6",
    direction: new THREE.Vector3(0, -1, 0),
    distanceScale: 1.05,
    spin: [-0.05, 0, 0],
  },
  wallPX: {
    id: "wallPX",
    label: "Right wall",
    color: "#d9dde5",
    direction: new THREE.Vector3(1, 0.16, 0),
    distanceScale: 0.9,
    spin: [0, 0.18, 0],
  },
  wallNX: {
    id: "wallNX",
    label: "Left wall",
    color: "#cdd2dc",
    direction: new THREE.Vector3(-1, 0.16, 0),
    distanceScale: 0.9,
    spin: [0, -0.18, 0],
  },
  wallPZ: {
    id: "wallPZ",
    label: "Front wall",
    color: "#e6e9ef",
    direction: new THREE.Vector3(0, 0.18, 0.55),
    distanceScale: 0.9,
    spin: [-0.16, 0, 0],
  },
  wallNZ: {
    id: "wallNZ",
    label: "Rear wall",
    color: "#b8beca",
    direction: new THREE.Vector3(0, 0.18, -0.55),
    distanceScale: 0.9,
    spin: [0.16, 0, 0],
  },
  solarPX: {
    id: "solarPX",
    label: "Solar wing",
    color: "#747b87",
    direction: new THREE.Vector3(1, 0.55, 0),
    distanceScale: 1.25,
    spin: [0, 0.16, 0],
  },
  solarNX: {
    id: "solarNX",
    color: "#68707d",
    direction: new THREE.Vector3(-1, 0.55, 0),
    distanceScale: 1.25,
    spin: [0, -0.16, 0],
  },
  solarPZ: {
    id: "solarPZ",
    color: "#7d8490",
    direction: new THREE.Vector3(0, 0.65, 0.45),
    distanceScale: 1.25,
    spin: [-0.14, 0, 0],
  },
  solarNZ: {
    id: "solarNZ",
    color: "#626a77",
    direction: new THREE.Vector3(0, 0.65, -0.45),
    distanceScale: 1.25,
    spin: [0.14, 0, 0],
  },
  fastenerPX: {
    id: "fastenerPX",
    label: "Fasteners",
    color: "#ffffff",
    direction: new THREE.Vector3(1, 0.34, 0),
    distanceScale: 1.35,
    spin: [0.1, 0.26, 0],
  },
  fastenerNX: {
    id: "fastenerNX",
    color: "#eef1f6",
    direction: new THREE.Vector3(-1, 0.34, 0),
    distanceScale: 1.35,
    spin: [0.1, -0.26, 0],
  },
  fastenerPZ: {
    id: "fastenerPZ",
    color: "#ffffff",
    direction: new THREE.Vector3(0, 0.45, 0.45),
    distanceScale: 1.35,
    spin: [-0.24, 0.08, 0],
  },
  fastenerNZ: {
    id: "fastenerNZ",
    color: "#eef1f6",
    direction: new THREE.Vector3(0, 0.45, -0.45),
    distanceScale: 1.35,
    spin: [0.24, -0.08, 0],
  },
  fastenerTop: {
    id: "fastenerTop",
    color: "#ffffff",
    direction: new THREE.Vector3(0, 1, 0),
    distanceScale: 1.35,
    spin: [0.22, 0.05, 0],
  },
  fastenerBottom: {
    id: "fastenerBottom",
    color: "#e6eaf1",
    direction: new THREE.Vector3(0, -1, 0),
    distanceScale: 1.35,
    spin: [-0.22, 0.05, 0],
  },
};

for (const spec of Object.values(PART_SPECS)) {
  spec.direction.normalize();
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function sideFastenerId(center: THREE.Vector3): PartId {
  const ax = Math.abs(center.x);
  const ay = Math.abs(center.y);
  const az = Math.abs(center.z);

  if (ay > ax && ay > az) return center.y >= 0 ? "fastenerTop" : "fastenerBottom";
  if (ax >= az) return center.x >= 0 ? "fastenerPX" : "fastenerNX";
  return center.z >= 0 ? "fastenerPZ" : "fastenerNZ";
}

function solarId(center: THREE.Vector3): PartId {
  if (Math.abs(center.x) >= Math.abs(center.z)) return center.x >= 0 ? "solarPX" : "solarNX";
  return center.z >= 0 ? "solarPZ" : "solarNZ";
}

function classifyComponent(component: ComponentInfo): PartId {
  const { center, size, triangles, volume, maxDim } = component;
  const ax = Math.abs(center.x);
  const ay = Math.abs(center.y);
  const az = Math.abs(center.z);

  const isFastenerLike = triangles <= 24 || maxDim < 0.012 || volume < 2.5e-7;
  if (isFastenerLike) return sideFastenerId(center);

  const isSolarLike = size.x > 0.26 || size.z > 0.26 || ax > 0.22 || az > 0.22;
  if (isSolarLike) return solarId(center);

  const isLargeCore = maxDim > 0.42 || (size.x > 0.18 && size.y > 0.18 && size.z > 0.18);
  if (isLargeCore) return "core";

  const isPlate = ay > 0.135 && size.y < 0.05 && size.x > 0.05 && size.z > 0.05;
  if (isPlate) return center.y >= 0 ? "topPlate" : "bottomPlate";

  if (ax >= az && ax > 0.07 && size.x < 0.06) return center.x >= 0 ? "wallPX" : "wallNX";
  if (az > 0.07 && size.z < 0.06) return center.z >= 0 ? "wallPZ" : "wallNZ";
  if (ay > 0.11) return center.y >= 0 ? "topPlate" : "bottomPlate";

  return "core";
}

function buildComponents(
  mesh: THREE.Mesh,
  assemblyCenter: THREE.Vector3,
  precision = 100000,
): TriangleComponent[] {
  const geometry = mesh.geometry;
  const position = geometry.attributes.position;
  const index = geometry.index;
  const triCount = Math.floor((index ? index.count : position.count) / 3);
  const parent = new Int32Array(triCount);
  const ownerByVertex = new Map<string, number>();
  const scratch = new THREE.Vector3();

  for (let i = 0; i < triCount; i++) parent[i] = i;

  const find = (value: number): number => {
    let root = value;
    while (parent[root] !== root) root = parent[root];
    while (parent[value] !== value) {
      const next = parent[value];
      parent[value] = root;
      value = next;
    }
    return root;
  };

  const unite = (a: number, b: number) => {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) parent[rootB] = rootA;
  };

  const vertexIndex = (triangleIndex: number, corner: number): number => {
    const offset = triangleIndex * 3 + corner;
    return index ? index.getX(offset) : offset;
  };

  const vertexKey = (vi: number): string => {
    scratch.fromBufferAttribute(position, vi);
    return `${Math.round(scratch.x * precision)},${Math.round(scratch.y * precision)},${Math.round(scratch.z * precision)}`;
  };

  for (let triangleIndex = 0; triangleIndex < triCount; triangleIndex++) {
    for (let corner = 0; corner < 3; corner++) {
      const key = vertexKey(vertexIndex(triangleIndex, corner));
      const owner = ownerByVertex.get(key);
      if (owner === undefined) ownerByVertex.set(key, triangleIndex);
      else unite(triangleIndex, owner);
    }
  }

  const byRoot = new Map<number, TriangleComponent>();
  const addWorldPoint = (component: TriangleComponent, vi: number) => {
    scratch.fromBufferAttribute(position, vi).applyMatrix4(mesh.matrixWorld).sub(assemblyCenter);
    component.center.add(scratch);
    component.size.min(scratch);
    (component as TriangleComponent & { max: THREE.Vector3 }).max.max(scratch);
  };

  for (let triangleIndex = 0; triangleIndex < triCount; triangleIndex++) {
    const root = find(triangleIndex);
    let component = byRoot.get(root) as (TriangleComponent & { max: THREE.Vector3 }) | undefined;
    if (!component) {
      component = {
        center: new THREE.Vector3(),
        size: new THREE.Vector3(Infinity, Infinity, Infinity),
        max: new THREE.Vector3(-Infinity, -Infinity, -Infinity),
        triangles: 0,
        volume: 0,
        maxDim: 0,
        triangleIndices: [],
      };
      byRoot.set(root, component);
    }

    component.triangleIndices.push(triangleIndex);
    component.triangles++;
    for (let corner = 0; corner < 3; corner++) {
      addWorldPoint(component, vertexIndex(triangleIndex, corner));
    }
  }

  return Array.from(byRoot.values()).map((raw) => {
    const component = raw as TriangleComponent & { max: THREE.Vector3 };
    const min = component.size.clone();
    const max = component.max.clone();
    const size = max.sub(min);
    const center = min.add(component.max).multiplyScalar(0.5);
    return {
      center,
      size,
      triangles: component.triangles,
      volume: size.x * size.y * size.z,
      maxDim: Math.max(size.x, size.y, size.z),
      triangleIndices: component.triangleIndices,
    };
  });
}

function appendTriangle(
  bucket: GeometryBucket,
  mesh: THREE.Mesh,
  normalMatrix: THREE.Matrix3,
  assemblyCenter: THREE.Vector3,
  triangleIndex: number,
) {
  const geometry = mesh.geometry;
  const position = geometry.attributes.position;
  const normal = geometry.attributes.normal;
  const index = geometry.index;
  const vertex = new THREE.Vector3();
  const normalVector = new THREE.Vector3();

  for (let corner = 0; corner < 3; corner++) {
    const offset = triangleIndex * 3 + corner;
    const vi = index ? index.getX(offset) : offset;

    vertex.fromBufferAttribute(position, vi).applyMatrix4(mesh.matrixWorld).sub(assemblyCenter);
    bucket.positions.push(vertex.x, vertex.y, vertex.z);

    if (normal) {
      normalVector.fromBufferAttribute(normal, vi).applyMatrix3(normalMatrix).normalize();
      bucket.normals.push(normalVector.x, normalVector.y, normalVector.z);
    }
  }
}

function makePartMeshes(scene: THREE.Group): ProcessedPart[] {
  const clone = scene.clone(true);
  clone.updateWorldMatrix(true, true);

  const assemblyBox = new THREE.Box3().setFromObject(clone);
  const assemblyCenter = new THREE.Vector3();
  assemblyBox.getCenter(assemblyCenter);

  const buckets = new Map<PartId, GeometryBucket>();
  for (const id of PART_ORDER) {
    buckets.set(id, { spec: PART_SPECS[id], positions: [], normals: [] });
  }

  const meshes: THREE.Mesh[] = [];
  clone.traverse((object) => {
    if (object instanceof THREE.Mesh) meshes.push(object);
  });

  for (const mesh of meshes) {
    mesh.updateWorldMatrix(true, false);
    const normalMatrix = new THREE.Matrix3().getNormalMatrix(mesh.matrixWorld);
    const components = buildComponents(mesh, assemblyCenter);

    for (const component of components) {
      const bucket = buckets.get(classifyComponent(component));
      if (!bucket) continue;

      for (const triangleIndex of component.triangleIndices) {
        appendTriangle(bucket, mesh, normalMatrix, assemblyCenter, triangleIndex);
      }
    }
  }

  return PART_ORDER.flatMap((id) => {
    const bucket = buckets.get(id);
    if (!bucket || bucket.positions.length === 0) return [];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(bucket.positions, 3));
    if (bucket.normals.length === bucket.positions.length) {
      geometry.setAttribute("normal", new THREE.Float32BufferAttribute(bucket.normals, 3));
    } else {
      geometry.computeVertexNormals();
    }
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

    const material = new THREE.MeshStandardMaterial({
      color: bucket.spec.color,
      metalness: 0.4,
      roughness: 0.52,
      envMapIntensity: 0.85,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = false;
    mesh.receiveShadow = false;

    const labelPosition = new THREE.Vector3();
    geometry.boundingBox?.getCenter(labelPosition);

    return [{ spec: bucket.spec, mesh, labelPosition }];
  });
}

export function FloatingObjects({ mouseRef, scrollRef, reducedMotion }: SceneProps) {
  const containerRef = useRef<THREE.Group>(null);
  const partGroupRefs = useRef<(THREE.Group | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gltf = useGLTF(CUBESAT_MODEL_URL) as unknown as CubeSatGltf;
  const { size } = useThree();
  const isPhone = size.width < 520;
  const isCompact = size.width < 720;

  const parts = useMemo<ProcessedPart[]>(() => makePartMeshes(gltf.scene), [gltf.scene]);

  const explodeReach = isPhone ? 0.23 : isCompact ? 0.2 : 0.18;
  const assembledScale = isPhone ? 10.8 : isCompact ? 9.4 : 12;
  const explodedScale = isPhone ? 16.6 : isCompact ? 13.8 : 15.8;

  useFrame((state, delta) => {
    if (!containerRef.current) return;
    const t = scrollRef.current;
    const time = state.clock.getElapsedTime();

    if (!reducedMotion) {
      const m = mouseRef.current;
      const desiredY = -0.58 + t * Math.PI * 0.34 + m.x * 0.12;
      const desiredX = -0.16 + m.y * -0.08 + Math.sin(time * 0.25) * 0.025;
      const ease = Math.min(1, delta * 1.35);
      containerRef.current.rotation.y += (desiredY - containerRef.current.rotation.y) * ease;
      containerRef.current.rotation.x += (desiredX - containerRef.current.rotation.x) * ease;
      const targetX = isCompact ? m.x * 0.03 : 0.85 + m.x * 0.045;
      const targetY = (isPhone ? 0.3 : isCompact ? 0.45 : -0.32) + Math.sin(time * 0.42) * 0.04;
      containerRef.current.position.x += (targetX - containerRef.current.position.x) * ease;
      containerRef.current.position.y += (targetY - containerRef.current.position.y) * ease;
    } else {
      containerRef.current.rotation.set(-0.16, -0.58 + t * Math.PI * 0.3, 0);
      containerRef.current.position.set(isCompact ? 0 : 0.85, isPhone ? 0.3 : isCompact ? 0.45 : -0.32, 0);
    }

    const explodeT = Math.min(1, t / 0.62);
    const eased = easeInOutCubic(explodeT);
    for (let i = 0; i < parts.length; i++) {
      const group = partGroupRefs.current[i];
      if (!group) continue;
      const spec = parts[i].spec;
      const offset = spec.direction.clone().multiplyScalar(eased * explodeReach * spec.distanceScale);
      if (isCompact) {
        offset.x *= isPhone ? 0.58 : 0.7;
        offset.y *= isPhone ? 1.72 : 1.45;
        offset.z *= 0.86;
      }
      group.position.copy(offset);
      if (spec.spin) {
        group.rotation.set(spec.spin[0] * eased, spec.spin[1] * eased, spec.spin[2] * eased);
      }
    }

    const LABEL_MAX = 0.8;
    const labelAlpha = smoothstep(0.58, 0.8, t) * LABEL_MAX;
    for (let i = 0; i < labelRefs.current.length; i++) {
      const el = labelRefs.current[i];
      if (!el) continue;
      el.style.opacity = String(labelAlpha);
      el.style.transform = `translate(-50%, -50%) translateY(${(1 - labelAlpha / LABEL_MAX) * 5}px)`;
    }

    const lateFade = 1 - smoothstep(0.92, 1.0, t) * 0.28;
    const scaleT = smoothstep(0.12, 0.62, t);
    containerRef.current.scale.setScalar((assembledScale + (explodedScale - assembledScale) * scaleT) * lateFade);
  });

  return (
    <group ref={containerRef} scale={assembledScale} dispose={null}>
      <ambientLight intensity={1.05} />
      <directionalLight position={[6, 7, 5]} intensity={1.65} color="#ffffff" />
      <directionalLight position={[-5, -2, -3]} intensity={0.9} color="#ffffff" />
      <pointLight position={[0, 0, 8]} intensity={0.75} color="#ffffff" />

      {parts.map((part, index) => (
        <group
          key={part.spec.id}
          ref={(element) => {
            partGroupRefs.current[index] = element;
          }}
        >
          <primitive object={part.mesh} />
          {part.spec.label && (
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
  );
}

useGLTF.preload(CUBESAT_MODEL_URL);
