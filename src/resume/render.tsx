// Server-side entry used by scripts/build-resume.mjs (via Vite's ssrLoadModule).
// Produces standalone HTML for the static /resume/ pages and the PDF print.
import { renderToStaticMarkup } from "react-dom/server";
import { PERSON } from "../data/profile";
import { ResumeDocument, type ResumeVariant } from "./ResumeDocument";
import resumeCss from "./resume.css?inline";

const SHELL_CSS = `
html { background: #e9e7e1; }
body { margin: 0; padding: 24px 12px 48px; }
.toolbar { max-width: 8.5in; margin: 0 auto 14px; display: flex; flex-wrap: wrap; gap: 6px 18px;
  font: 14px/1.4 "Segoe UI", "Helvetica Neue", Arial, sans-serif; color: #3b434b; }
.toolbar a { color: #1f3d57; text-underline-offset: 3px; }
.toolbar a:focus-visible { outline: 2px solid #1f3d57; outline-offset: 2px; }
.sheet { box-sizing: border-box; max-width: 8.5in; margin: 0 auto; background: #fff;
  padding: 0.55in 0.62in 0.6in; box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 8px 30px rgba(0,0,0,.08); }
@media (max-width: 640px) { body { padding: 12px 0 32px; } .toolbar { padding: 0 16px; } .sheet { padding: 22px 16px; } }
@media print {
  html { background: none; }
  body { padding: 0; }
  .toolbar { display: none; }
  .sheet { max-width: none; padding: 0; box-shadow: none; }
}
`;

const TITLES: Record<ResumeVariant, string> = {
  full: `${PERSON.name} | Resume`,
  engineering: `${PERSON.name} | Engineering Resume (one page)`,
};

const DESCRIPTIONS: Record<ResumeVariant, string> = {
  full: `Full resume of ${PERSON.name}: aerospace engineering student at UC Irvine; UAV hardware engineering intern; UCI CubeSat systems engineer.`,
  engineering: `One-page engineering resume of ${PERSON.name}: mechanical design, structures and hardware integration.`,
};

function toolbar(variant: ResumeVariant): string {
  const other =
    variant === "full"
      ? `<a href="engineering.html">One-page engineering version</a>`
      : `<a href="./">Full resume</a>`;
  const pdf =
    variant === "full"
      ? "/assets/downloads/resume/alexander-amadeo-ranch-resume.pdf"
      : "/assets/downloads/resume/alexander-amadeo-ranch-engineering-resume.pdf";
  return `<nav class="toolbar" aria-label="Resume"><a href="/">alexengineer.net</a><a href="${pdf}">Download PDF</a>${other}</nav>`;
}

export function renderResumePage(variant: ResumeVariant, { forPrint = false } = {}): string {
  const body = renderToStaticMarkup(<ResumeDocument variant={variant} />);
  const canonical = variant === "full" ? `${PERSON.site}/resume/` : `${PERSON.site}/resume/engineering.html`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${TITLES[variant]}</title>
<meta name="description" content="${DESCRIPTIONS[variant]}">
<meta name="author" content="${PERSON.name}">
<link rel="canonical" href="${canonical}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>${resumeCss}${SHELL_CSS}</style>
</head>
<body>
${forPrint ? "" : toolbar(variant)}
<main class="sheet">${body}</main>
</body>
</html>
`;
}
