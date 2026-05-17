import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import react from "@vitejs/plugin-react";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const port = Number(process.env.PORT || 5173);

const server = await createServer({
  configFile: false,
  root,
  base: "/",
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port,
    strictPort: true,
  },
});

await server.listen();
server.printUrls();
setInterval(() => {}, 2147483647);
