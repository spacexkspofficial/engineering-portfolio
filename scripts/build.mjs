import { copyFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";
import react from "@vitejs/plugin-react";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

await build({
  configFile: false,
  root,
  base: "/",
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets-bundle",
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
  },
});

await copyFile(join(root, "dist", "index.html"), join(root, "dist", "404.html"));
