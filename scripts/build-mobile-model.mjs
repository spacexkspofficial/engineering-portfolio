// Pre-split the CAD model once, then weld duplicate vertices for mobile delivery.
// Run after changing the original GLB or modelParts.ts: npm run model:mobile
import { readFile, writeFile, mkdir, unlink } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import { BufferAttribute, Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// GLTFExporter uses FileReader to assemble its GLB buffer in Node.
globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buffer) => {
      this.result = buffer;
      this.onloadend?.();
    });
  }
};

const root = resolve(import.meta.dirname, "..");
const cache = resolve(root, ".cache");
await mkdir(cache, { recursive: true });
const modulePath = resolve(cache, `model-parts-${process.pid}.mjs`);
const source = await readFile(resolve(root, "src/components/three/modelParts.ts"), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
});
await writeFile(modulePath, outputText);
try {
  const { makePartMeshes } = await import(pathToFileURL(modulePath).href);
  const original = await readFile(resolve(root, "public/assets/models/lumid-cubesat.glb"));
  const gltf = await new GLTFLoader().parseAsync(original.buffer.slice(original.byteOffset, original.byteOffset + original.byteLength), "");
  const group = new Group();
  let vertices = 0;
  for (const part of makePartMeshes(gltf.scene)) {
    const geometry = part.mesh.geometry;
    // The tolerance is well below the precision visible at mobile resolutions.
    part.mesh.geometry = mergeVertices(geometry, 0.00001);
    geometry.dispose();
    // Quantized attributes are natively supported by GLTFLoader and the GPU.
    // A uniform node scale restores model units without runtime decompression.
    const position = part.mesh.geometry.attributes.position;
    const normal = part.mesh.geometry.attributes.normal;
    let extent = 0;
    for (const value of position.array) extent = Math.max(extent, Math.abs(value));
    extent ||= 1;
    part.mesh.geometry.setAttribute("position", new BufferAttribute(
      Int16Array.from(position.array, (value) => Math.round(value / extent * 32767)), 3, true,
    ));
    part.mesh.geometry.setAttribute("normal", new BufferAttribute(
      Int8Array.from(normal.array, (value) => Math.round(Math.max(-1, Math.min(1, value)) * 127)), 3, true,
    ));
    part.mesh.scale.setScalar(extent);
    vertices += part.mesh.geometry.attributes.position.count;
    part.mesh.name = part.spec.id;
    part.mesh.userData.partId = part.spec.id;
    group.add(part.mesh);
  }
  const binary = await new GLTFExporter().parseAsync(group, { binary: true, onlyVisible: true });
  await writeFile(resolve(root, "public/assets/models/lumid-cubesat-mobile.glb"), Buffer.from(binary));
  console.log(`Mobile CubeSat: ${group.children.length} parts, ${vertices} vertices, ${binary.byteLength} bytes (${Math.round((1 - binary.byteLength / original.byteLength) * 100)}% smaller).`);
} finally {
  await unlink(modulePath);
}
