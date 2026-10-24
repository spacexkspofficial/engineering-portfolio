// Visit every route, collect links and media URLs, and check that each resolves.
//
//   node scripts/qa-links.mjs http://127.0.0.1:4173 <report.json>
import { writeFile } from "node:fs/promises";
import { Browser } from "./lib/chrome.mjs";

const base = process.argv[2] ?? "http://127.0.0.1:4173";
const reportPath = process.argv[3];

const browser = await Browser.launch({ extraArgs: ["--disable-webgl", "--disable-3d-apis"] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });

// Start from the home page and the work index, then follow every in-app route found.
const routes = new Set(["/#/", "/#/projects", "/#/resume", "/#/contact", "/#/privacy", "/#/terms", "/#/experience", "/#/about", "/#/work"]);
const visited = new Set();
const urls = new Map(); // url -> first page it was found on
const pageReports = [];

while ([...routes].some((r) => !visited.has(r))) {
  const route = [...routes].find((r) => !visited.has(r));
  visited.add(route);
  // Hash-only changes don't fire a load event, so start each route from a blank page.
  await page.goto("about:blank", { settleMs: 0, timeoutMs: 5000 });
  await page.goto(`${base}${route}`, { settleMs: 1200 });
  const found = await page.evaluate(`(() => {
    const out = [];
    for (const a of document.querySelectorAll("a[href]")) out.push(a.href);
    for (const el of document.querySelectorAll("img[src], source[src]")) out.push(el.src);
    for (const v of document.querySelectorAll("video[poster]")) out.push(v.poster);
    return { out, h1: document.querySelector("h1")?.textContent ?? null, title: document.title,
             overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth };
  })()`);
  pageReports.push({ route, title: found.title, h1: found.h1, horizontalOverflow: found.overflow });
  for (const href of found.out) {
    const u = new URL(href);
    if (u.origin === new URL(base).origin && u.hash.startsWith("#/")) {
      const r = `/${u.hash}`;
      if (!routes.has(r)) routes.add(r);
      continue;
    }
    if (u.protocol === "mailto:") {
      urls.set(href, route);
      continue;
    }
    const key = u.hash ? href.replace(u.hash, "") : href;
    if (!urls.has(key)) urls.set(key, route);
  }
}
await browser.close();

const results = [];
for (const [url, from] of urls) {
  if (url.startsWith("mailto:")) {
    results.push({ url, from, status: "mailto" });
    continue;
  }
  try {
    const external = !url.startsWith(base);
    const res = await fetch(url, {
      method: external ? "GET" : "HEAD",
      redirect: "follow",
      headers: { "user-agent": "Mozilla/5.0 (portfolio link check)" },
    });
    results.push({ url, from, status: res.status, type: res.headers.get("content-type"), length: res.headers.get("content-length") });
  } catch (error) {
    results.push({ url, from, status: "error", error: String(error) });
  }
}

const bad = results.filter((r) => typeof r.status === "number" && r.status >= 400 || r.status === "error");
const report = { base, routes: pageReports, checked: results.length, bad, results };
if (reportPath) await writeFile(reportPath, JSON.stringify(report, null, 2));
console.log(`routes: ${pageReports.length}, urls: ${results.length}, failing: ${bad.length}`);
for (const r of pageReports) console.log(`  ${r.route}  ${r.title}${r.horizontalOverflow ? "  [horizontal overflow]" : ""}`);
for (const b of bad) console.log(`  BAD ${b.status} ${b.url} (from ${b.from})`);
