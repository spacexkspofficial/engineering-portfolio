import type { UserConfig } from "vite";
import react from "@vitejs/plugin-react";

const config = {
  base: "/",
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets-bundle",
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
  },
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
} satisfies UserConfig;

export default config;
