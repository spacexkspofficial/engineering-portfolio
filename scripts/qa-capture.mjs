// Capture QA screenshots and console/network findings for a list of pages.
//
//   node scripts/qa-capture.mjs <config.json>
//
// Config: { "base": "http://127.0.0.1:8765", "out": "<dir>", "shots": [
//   { "name": "home-1440", "path": "/#/", "width": 1440, "height": 900,
//     "mobile": false, "fullPage": false, "scrollTo": 0, "reducedMotion": false,
//     "settleMs": 2500, "disableWebGL": false } ] }
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { Browser } from "./lib/chrome.mjs";

const configPath = resolve(process.argv[2] ?? "");
const config = JSON.parse(await readFile(configPath, "utf8"));
const outDir = resolve(dirname(configPath), config.out);
await mkdir(outDir, { recursive: true });

const groups = new Map();
for (const shot of config.shots) {
  const key = shot.disableWebGL ? "nowebgl" : "default";
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(shot);
}

const report = [];
for (const [key, shots] of groups) {
  const browser = await Browser.launch({
    extraArgs: key === "nowebgl" ? ["--disable-webgl", "--disable-3d-apis"] : ["--use-angle=swiftshader"],
  });
  try {
    for (const shot of shots) {
      const page = await browser.newPage();
      await page.setViewport({
        width: shot.width,
        height: shot.height,
        mobile: !!shot.mobile,
        deviceScaleFactor: shot.dpr ?? 1,
      });
      await page.setMedia([
        { name: "prefers-reduced-motion", value: shot.reducedMotion ? "reduce" : "no-preference" },
      ]);
      await page.goto(`${config.base}${shot.path}`, { settleMs: shot.settleMs ?? 2500 });
      if (shot.scrollTo) {
        await page.evaluate(`window.scrollTo(0, ${shot.scrollTo}); new Promise(r => setTimeout(r, ${shot.scrollSettleMs ?? 1200}))`);
      }
      if (shot.eval) await page.evaluate(shot.eval);
      if (shot.fullPage) await page.scrollThrough();
      const file = join(outDir, `${shot.name}.png`);
      try {
        await page.screenshot(file, { fullPage: !!shot.fullPage });
      } catch (error) {
        console.log(`failed ${shot.name}: ${error.message}`);
      }
      const probe = shot.probe ? await page.evaluate(shot.probe) : undefined;
      report.push({
        name: shot.name,
        url: `${config.base}${shot.path}`,
        viewport: `${shot.width}x${shot.height}${shot.mobile ? " mobile" : ""}`,
        reducedMotion: !!shot.reducedMotion,
        webgl: !shot.disableWebGL,
        console: page.console.filter((c) => /error|exception|warn/i.test(c.type)),
        failedRequests: page.failedRequests,
        probe,
      });
      await browser.conn.send("Target.closeTarget", { targetId: page.targetId }).catch(() => {});
      console.log(`captured ${shot.name}`);
    }
  } finally {
    await browser.close();
  }
}

await writeFile(join(outDir, "capture-report.json"), JSON.stringify(report, null, 2));
console.log(`report: ${join(outDir, "capture-report.json")}`);
