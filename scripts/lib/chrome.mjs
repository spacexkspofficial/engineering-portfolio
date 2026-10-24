// Minimal headless-Chrome driver over the DevTools protocol.
// Used by the resume PDF build and the QA screenshot script. No npm
// dependencies: Node 22+ provides the global WebSocket client.
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(dirname(fileURLToPath(import.meta.url))));

const CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

export function findChrome() {
  const found = CANDIDATES.find((p) => existsSync(p));
  if (!found) throw new Error("Chrome/Edge not found. Set CHROME_PATH to a Chromium-based browser.");
  return found;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

class Connection {
  constructor(ws) {
    this.ws = ws;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Set();
    ws.addEventListener("message", (event) => {
      const msg = JSON.parse(typeof event.data === "string" ? event.data : event.data.toString());
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(`${msg.error.message} (${msg.error.code})`));
        else resolve(msg.result);
      } else {
        for (const listener of this.listeners) listener(msg);
      }
    });
  }

  send(method, params = {}, sessionId, timeoutMs = 90000) {
    const id = this.nextId++;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`${method} timed out after ${timeoutMs} ms`));
      }, timeoutMs);
      this.pending.set(id, {
        resolve: (value) => {
          clearTimeout(timer);
          resolve(value);
        },
        reject: (error) => {
          clearTimeout(timer);
          reject(error);
        },
      });
      this.ws.send(JSON.stringify(payload));
    });
  }
}

export class Page {
  constructor(conn, sessionId) {
    this.conn = conn;
    this.sessionId = sessionId;
    this.console = [];
    this.failedRequests = [];
    this.loadWaiters = [];
    this.requestUrls = new Map();
    conn.listeners.add((msg) => {
      if (msg.sessionId !== sessionId) return;
      const p = msg.params ?? {};
      switch (msg.method) {
        case "Page.loadEventFired":
          this.loadWaiters.splice(0).forEach((fn) => fn());
          break;
        case "Runtime.consoleAPICalled":
          this.console.push({
            type: p.type,
            text: (p.args ?? []).map((a) => a.value ?? a.description ?? "").join(" "),
          });
          break;
        case "Runtime.exceptionThrown":
          this.console.push({ type: "exception", text: p.exceptionDetails?.exception?.description ?? p.exceptionDetails?.text });
          break;
        case "Log.entryAdded":
          this.console.push({ type: `log:${p.entry.level}`, text: `${p.entry.text} ${p.entry.url ?? ""}`.trim() });
          break;
        case "Network.requestWillBeSent":
          this.requestUrls.set(p.requestId, p.request.url);
          break;
        case "Network.responseReceived":
          if (p.response.status >= 400) this.failedRequests.push({ url: p.response.url, status: p.response.status });
          break;
        case "Network.loadingFailed":
          if (!p.canceled) this.failedRequests.push({ url: this.requestUrls.get(p.requestId), error: p.errorText });
          break;
        default:
          break;
      }
    });
  }

  send(method, params) {
    return this.conn.send(method, params, this.sessionId);
  }

  async setViewport({ width, height, deviceScaleFactor = 1, mobile = false }) {
    await this.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor, mobile });
    await this.send("Emulation.setTouchEmulationEnabled", mobile ? { enabled: true, maxTouchPoints: 5 } : { enabled: false });
  }

  async setMedia(features) {
    await this.send("Emulation.setEmulatedMedia", { features });
  }

  async goto(url, { settleMs = 1500, timeoutMs = 30000 } = {}) {
    const loaded = new Promise((resolve) => this.loadWaiters.push(resolve));
    await this.send("Page.navigate", { url });
    await Promise.race([loaded, sleep(timeoutMs)]);
    await sleep(settleMs);
  }

  async evaluate(expression) {
    const result = await this.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description ?? "evaluate failed");
    return result.result.value;
  }

  // Scroll through the document so scroll-triggered content renders before capture.
  async scrollThrough(stepMs = 120) {
    await this.evaluate(`(async () => {
      const step = Math.max(200, Math.floor(window.innerHeight * 0.8));
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, ${stepMs}));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 600));
    })()`);
  }

  async screenshot(path, { fullPage = false, maxHeight = 12000 } = {}) {
    const params = { format: "png" };
    if (fullPage) {
      const { width, height } = await this.evaluate(
        "({ width: document.documentElement.clientWidth, height: Math.ceil(document.documentElement.scrollHeight) })",
      );
      params.captureBeyondViewport = true;
      params.clip = { x: 0, y: 0, width, height: Math.min(height, maxHeight), scale: 1 };
    }
    const { data } = await this.send("Page.captureScreenshot", params);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, Buffer.from(data, "base64"));
  }

  async pdf(path, options = {}) {
    const { data } = await this.send("Page.printToPDF", {
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      generateTaggedPDF: true,
      generateDocumentOutline: true,
      ...options,
    });
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, Buffer.from(data, "base64"));
  }
}

export class Browser {
  static async launch({ extraArgs = [] } = {}) {
    const profileDir = join(repoRoot, ".cache", `chrome-profile-${process.pid}-${Date.now()}`);
    await mkdir(profileDir, { recursive: true });
    const args = [
      "--headless=new",
      "--remote-debugging-port=0",
      `--user-data-dir=${profileDir}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--hide-scrollbars",
      "--mute-audio",
      "--autoplay-policy=no-user-gesture-required",
      "--enable-unsafe-swiftshader",
      ...extraArgs,
      "about:blank",
    ];
    const proc = spawn(findChrome(), args, { stdio: "ignore" });
    // Never leave a headless browser behind if this script exits or is interrupted.
    const killTree = () => {
      if (proc.exitCode !== null) return;
      if (process.platform === "win32") spawnSync("taskkill", ["/F", "/T", "/PID", String(proc.pid)], { stdio: "ignore" });
      else proc.kill("SIGKILL");
    };
    process.once("exit", killTree);
    for (const signal of ["SIGINT", "SIGTERM"]) process.once(signal, () => process.exit(130));
    const portFile = join(profileDir, "DevToolsActivePort");
    let info = "";
    for (let i = 0; i < 200 && !info; i++) {
      await sleep(100);
      if (existsSync(portFile)) info = (await readFile(portFile, "utf8")).trim();
    }
    if (!info) throw new Error("Chrome did not expose a DevTools port");
    const [port, path] = info.split(/\r?\n/);
    const ws = new WebSocket(`ws://127.0.0.1:${port}${path}`);
    await new Promise((resolve, reject) => {
      ws.addEventListener("open", resolve, { once: true });
      ws.addEventListener("error", reject, { once: true });
    });
    return new Browser(proc, new Connection(ws), profileDir, killTree);
  }

  constructor(proc, conn, profileDir, killTree) {
    this.proc = proc;
    this.conn = conn;
    this.profileDir = profileDir;
    this.killTree = killTree;
  }

  async newPage() {
    const { targetId } = await this.conn.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await this.conn.send("Target.attachToTarget", { targetId, flatten: true });
    const page = new Page(this.conn, sessionId);
    await page.send("Page.enable");
    await page.send("Runtime.enable");
    await page.send("Log.enable");
    await page.send("Network.enable");
    page.targetId = targetId;
    return page;
  }

  async close() {
    try {
      await this.conn.send("Browser.close", {}, undefined, 5000);
    } catch {
      // fall through to a hard kill
    }
    await sleep(500);
    this.killTree();
    await sleep(300);
    for (let i = 0; i < 5; i++) {
      try {
        await rm(this.profileDir, { recursive: true, force: true });
        break;
      } catch {
        await sleep(400);
      }
    }
  }
}
