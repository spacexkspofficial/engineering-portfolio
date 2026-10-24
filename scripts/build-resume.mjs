// Regenerate the resume from src/data/*.ts:
//   public/resume/index.html                     full resume, static HTML
//   public/resume/engineering.html               one-page engineering resume
//   public/assets/downloads/resume/*.pdf         PDFs printed by headless Chrome
//
//   npm run resume
//
// Requires a local Chrome or Edge (set CHROME_PATH if it is not found).
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { Browser } from "./lib/chrome.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const OUTPUTS = [
  {
    variant: "full",
    html: "public/resume/index.html",
    pdf: "public/assets/downloads/resume/alexander-amadeo-ranch-resume.pdf",
  },
  {
    variant: "engineering",
    html: "public/resume/engineering.html",
    pdf: "public/assets/downloads/resume/alexander-amadeo-ranch-engineering-resume.pdf",
  },
];

const server = await createServer({
  configFile: false,
  root,
  logLevel: "error",
  plugins: [react()],
  server: { middlewareMode: true },
  appType: "custom",
});

let browser;
try {
  const { renderResumePage } = await server.ssrLoadModule("/src/resume/render.tsx");
  const printDir = join(root, ".cache", "resume-print");
  await mkdir(printDir, { recursive: true });
  browser = await Browser.launch();

  for (const output of OUTPUTS) {
    const htmlPath = join(root, output.html);
    await mkdir(dirname(htmlPath), { recursive: true });
    await writeFile(htmlPath, renderResumePage(output.variant));

    const printPath = join(printDir, `${output.variant}.html`);
    await writeFile(printPath, renderResumePage(output.variant, { forPrint: true }));

    const page = await browser.newPage();
    await page.goto(pathToFileURL(printPath).href, { settleMs: 300 });
    await page.evaluate("document.fonts.ready.then(() => true)");
    await page.pdf(join(root, output.pdf));
    console.log(`${output.variant}: ${output.html}, ${output.pdf}`);
  }
} finally {
  await browser?.close();
  await server.close();
  await rm(join(root, ".cache", "resume-print"), { recursive: true, force: true });
}
