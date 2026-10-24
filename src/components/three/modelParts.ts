import * as THREE from "three";

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
  | "antenna"
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

export interface ProcessedPart {
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
  "antenna",
  "fastenerPX",
  "fastenerNX",
  "fastenerPZ",
  "fastenerNZ",
  "fastenerTop",
  "fastenerBottom",
];

interface MaterialSpec {
  color: string;
  metalness: number;
  roughness: number;
  emissive?: string;
  emissiveIntensity?: number;
  opacity?: number;
}

const PART_SPECS: Record<PartId, PartSpec & MaterialSpec> = {
  core: {
    id: "core",
    label: "Avionics core",
    color: "#445169",
    metalness: 0.38,
    roughness: 0.58,
    emissive: "#172844",
    emissiveIntensity: 0.22,
    opacity: 0.88,
    direction: new THREE.Vector3(0, 0.32, -0.05),
    distanceScale: 0.22,
    spin: [0, 0.04, 0],
  },
  topPlate: {
    id: "topPlate",
    label: "Top wall",
    color: "#d8b070",
    metalness: 0.95,
    roughness: 0.28,
    direction: new THREE.Vector3(0, 1, 0),
    distanceScale: 1.15,
    spin: [0.05, 0, 0],
  },
  bottomPlate: {
    id: "bottomPlate",
    label: "Bottom wall",
    color: "#b89860",
    metalness: 0.95,
    roughness: 0.32,
    direction: new THREE.Vector3(0, -1, 0),
    distanceScale: 1.0,
    spin: [-0.05, 0, 0],
  },
  wallPX: {
    id: "wallPX",
    label: "Right wall",
    color: "#e4ba70",
    metalness: 0.92,
    roughness: 0.34,
    direction: new THREE.Vector3(1, 0.16, 0),
    distanceScale: 0.9,
    spin: [0, 0.18, 0],
  },
  wallNX: {
    id: "wallNX",
    label: "Left wall",
    color: "#d6a958",
    metalness: 0.92,
    roughness: 0.36,
    direction: new THREE.Vector3(-1, 0.16, 0),
    distanceScale: 0.9,
    spin: [0, -0.18, 0],
  },
  wallPZ: {
    id: "wallPZ",
    label: "Front wall",
    color: "#e8c075",
    metalness: 0.92,
    roughness: 0.3,
    direction: new THREE.Vector3(0, 0.18, 0.55),
    distanceScale: 0.9,
    spin: [-0.16, 0, 0],
  },
  wallNZ: {
    id: "wallNZ",
    label: "Rear wall",
    color: "#c8a050",
    metalness: 0.92,
    roughness: 0.38,
    direction: new THREE.Vector3(0, 0.18, -0.55),
    distanceScale: 0.9,
    spin: [0.16, 0, 0],
  },
  solarPX: {
    id: "solarPX",
    label: "Solar wing",
    color: "#16285e",
    metalness: 0.85,
    roughness: 0.18,
    emissive: "#1a2a55",
    emissiveIntensity: 0.18,
    direction: new THREE.Vector3(1, 0.55, 0),
    distanceScale: 1.25,
    spin: [0, 0.16, 0],
  },
  solarNX: {
    id: "solarNX",
    color: "#11214d",
    metalness: 0.85,
    roughness: 0.2,
    emissive: "#1a2a55",
    emissiveIntensity: 0.14,
    direction: new THREE.Vector3(-1, 0.55, 0),
    distanceScale: 1.25,
    spin: [0, -0.16, 0],
  },
  solarPZ: {
    id: "solarPZ",
    color: "#142557",
    metalness: 0.85,
    roughness: 0.2,
    emissive: "#1a2a55",
    emissiveIntensity: 0.16,
    direction: new THREE.Vector3(0, 0.65, 0.45),
    distanceScale: 1.25,
    spin: [-0.14, 0, 0],
  },
  solarNZ: {
    id: "solarNZ",
    color: "#0e1d44",
    metalness: 0.85,
    roughness: 0.22,
    emissive: "#1a2a55",
    emissiveIntensity: 0.12,
    direction: new THREE.Vector3(0, 0.65, -0.45),
    distanceScale: 1.25,
    spin: [0.14, 0, 0],
  },
  antenna: {
    id: "antenna",
    label: "Antenna",
    color: "#dfe8f8",
    metalness: 0.9,
    roughness: 0.2,
    direction: new THREE.Vector3(-0.55, 0.75, 0.15),
    distanceScale: 1.35,
    spin: [0.04, -0.08, 0],
  },
  fastenerPX: {
    id: "fastenerPX",
    label: "Fasteners",
    color: "#f0f2f6",
    metalness: 0.95,
    roughness: 0.18,
    direction: new THREE.Vector3(1, 0.34, 0),
    distanceScale: 1.4,
    spin: [0.1, 0.26, 0],
  },
  fastenerNX: {
    id: "fastenerNX",
    color: "#e6e8ec",
    metalness: 0.95,
    roughness: 0.2,
    direction: new THREE.Vector3(-1, 0.34, 0),
    distanceScale: 1.4,
    spin: [0.1, -0.26, 0],
  },
  fastenerPZ: {
    id: "fastenerPZ",
    color: "#f0f2f6",
    metalness: 0.95,
    roughness: 0.18,
    direction: new THREE.Vector3(0, 0.45, 0.45),
    distanceScale: 1.4,
    spin: [-0.24, 0.08, 0],
  },
  fastenerNZ: {
    id: "fastenerNZ",
    color: "#e6e8ec",
    metalness: 0.95,
    roughness: 0.2,
    direction: new THREE.Vector3(0, 0.45, -0.45),
    distanceScale: 1.4,
    spin: [0.24, -0.08, 0],
  },
  fastenerTop: {
    id: "fastenerTop",
    color: "#f0f2f6",
    metalness: 0.95,
    roughness: 0.18,
    direction: new THREE.Vector3(0, 1, 0),
    distanceScale: 1.4,
    spin: [0.22, 0.05, 0],
  },
  fastenerBottom: {
    id: "fastenerBottom",
    color: "#dcdee4",
    metalness: 0.95,
    roughness: 0.22,
    direction: new THREE.Vector3(0, -1, 0),
    distanceScale: 1.4,
    spin: [-0.22, 0.05, 0],
  },
};

for (const spec of Object.values(PART_SPECS)) {
  spec.direction.normalize();
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

  const isAntennaLike =
    size.y > 0.18 && size.x < 0.01 && size.z < 0.01 && ax > 0.08 && ax < 0.14 && az < 0.14;
  if (isAntennaLike) return "antenna";

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

export function makePartMeshes(scene: THREE.Group): ProcessedPart[] {
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

    const spec = bucket.spec as PartSpec & MaterialSpec;
    const material = new THREE.MeshStandardMaterial({
      color: spec.color,
      metalness: spec.metalness ?? 0.6,
      roughness: spec.roughness ?? 0.35,
      emissive: spec.emissive ? new THREE.Color(spec.emissive) : new THREE.Color("#000000"),
      emissiveIntensity: spec.emissiveIntensity ?? 0,
      envMapIntensity: 1.4,
      opacity: spec.opacity ?? 1,
      transparent: spec.opacity !== undefined && spec.opacity < 1,
      depthWrite: spec.opacity === undefined || spec.opacity >= 1,
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

/** Mobile assets already contain named, indexed parts. No topology work at load. */
export function readPartMeshes(scene: THREE.Group): ProcessedPart[] {
  const parts: ProcessedPart[] = [];
  scene.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    const id = object.userData.partId as PartId;
    const spec = PART_SPECS[id];
    if (!spec) return;
    object.geometry.computeBoundingBox();
    const labelPosition = new THREE.Vector3();
    object.geometry.boundingBox?.getCenter(labelPosition);
    parts.push({ spec, mesh: object.clone(), labelPosition });
  });
  return parts;
}

