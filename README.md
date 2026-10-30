# alexengineer.net

Engineering portfolio of Alexander Amadeo-Ranch. Vite + React + TypeScript, with
React Three Fiber for the home-page CubeSat scene. Static site on GitHub Pages
(custom domain `alexengineer.net`), hash routing, no backend, analytics or accounts.

## Run locally

Node 20+ (Node 22+ for the resume and QA scripts, which use the built-in WebSocket).

```bash
npm install
npm run dev        # http://127.0.0.1:5173/#/
npm run build      # typecheck + production build into dist/ (also writes dist/404.html)
npm run preview    # serve dist/ on port 4173
```

From the outer `Engineering Portfolio` folder, `run.bat` starts the dev server too.

## Where content lives

All professional facts are data, not markup. Change them here and every page and
resume picks them up.

| File | Holds |
| --- | --- |
| `src/data/profile.ts` | Name, contact links, availability, education, every role and its bullets, skills, certifications, honors |
| `src/data/projects.ts` | Complete project records: summary, facts, technical notes, figures and files |
| `src/data/positioning.ts` | Selected engineering contributions and skill-to-project links, derived from the confirmed profile and project records |
| `src/components/home/ProjectStream.tsx` | Single-page project sequence and concise takeaways; full records expand inline |
| `src/data/resume.ts` | Resume-only wording for project entries and the header tagline |
| `public/assets/` | Images, video, downloads (URLs are stable; existing links keep working) |

Writing rules the data follows: say what Alexander did versus the team, label
analysis as analysis and concepts as concepts, keep dates exact, and leave out
results that no artifact or confirmation supports.

## Routes

| Route | Page |
| --- | --- |
| `#/` | One scrolling portfolio: Earth/CubeSat hero, every project, all experience, background and contact |
| `#/work`, `#/experience`, `#/about`, `#/contact` | Same homepage, scrolled to that section |
| `#/projects` | Same homepage, scrolled to Projects |
| `#/projects/<id>` | Same homepage, scrolled to that project (`<id>` remains stable) |
| `#/projects?id=<id>` | Old link format; redirects to `#/projects/<id>` |
| `#/resume` | Resume (same component as the PDF) |
| `#/privacy`, `#/terms` | Policies |
| `/resume/`, `/resume/engineering.html` | Static resume pages (no JavaScript needed) |
| `/aerolab/`, `/aerolab-3d/` | Standalone AeroLab demos |

The fixed header tracks the section currently being read, its progress, the
current project and overall page progress. Navigation follows scrolling as well
as links. Every project figure and file appears in the main scroll; complete
technical notes and role contributions use native inline disclosures. The old
work index, case-study and contact page components have been removed, while their
shared URLs still work. Resume HTML/PDFs and legal pages retain their own views.
The Projects opening gives three selected engineering contributions before the
complete project stream, with direct links by skill. The one-page engineering
resume is the default at `#/resume`; the full background can be selected there.
The fixed reading bar links to the engineering PDF throughout the homepage.

## Resume

One React component, `src/resume/ResumeDocument.tsx`, renders the resume for the
`#/resume` page, the static HTML pages and the PDFs, so they cannot drift apart.
Styles are in `src/resume/resume.css` (Georgia name, Calibri body, ~11 pt, navy accent).

Regenerate after editing `src/data/*.ts`:

```bash
npm run resume
```

This writes:

- `public/resume/index.html` and `public/resume/engineering.html`
- `public/assets/downloads/resume/alexander-amadeo-ranch-resume.pdf` (full resume; this path is the long-standing public link)
- `public/assets/downloads/resume/alexander-amadeo-ranch-engineering-resume.pdf` (one-page engineering version)

PDFs are printed by a local Chrome or Edge (`CHROME_PATH` overrides the lookup)
through `scripts/lib/chrome.mjs`. Calibri and Georgia come from Windows; on other
systems the CSS falls back to Carlito/Arial and Times, so check page breaks after
regenerating elsewhere. Then check the PDFs: page count (full: 4, engineering: 1),
no orphaned role titles, and extracted text (`pdftotext` or `pypdf`) in reading order.

## QA scripts

```bash
# Screenshots plus console errors and failed requests for a list of pages
node scripts/qa-capture.mjs <config.json>

# Follow every route, collect every link/image/video URL and request each one
node scripts/qa-links.mjs http://127.0.0.1:4173 <report.json>
```

Both drive headless Chrome over the DevTools protocol with no extra npm packages.
`qa-capture` configs can set viewport, mobile emulation, reduced motion, scroll
position and a no-WebGL mode.

## Home-page scene

`src/components/three/`:

- `SceneBackground.tsx`: fixed layer behind the hero. Poster image first, then the
  Earth video (1280 × 720, including on phones), then the WebGL model. Skips
  video and model when the browser asks to save data, pauses everything once the
  hero has scrolled away, and keeps the model still with reduced motion.
- `Scene.tsx`: camera, lights and where the satellite sits for wide, medium and
  portrait/phone layouts (as fractions of the visible frame).
- `FloatingObjects.tsx`: splits the GLB into parts and drives the scroll-linked
  exploded view.
- `SceneErrorBoundary.tsx`: a WebGL or model failure leaves the poster in place
  instead of breaking the page.

### Mobile opening

`Home.tsx` selects `MobileHero.tsx` at widths up to 900 px, or up to 1100 px with
a coarse pointer (including landscape phones and small tablets). The desktop
hero and all portfolio sections use the same content. The mobile opening gives
the Earth and CubeSat one viewport, with direct project, AeroLab 2D and resume PDF
actions visible in the opening, alongside engineering availability and LinkedIn.
The scene fades as the introduction enters;
scrolling back restores it. Short landscape viewports allow room for the opening
copy and buttons. Stable viewport units avoid jumps when browser chrome changes.

Mobile uses the full-resolution Earth video, an antialiased canvas capped at 2×
pixel density, and demand rendering paced at 30 fps. Brighter lighting, exposure
and footage grading lift the model and background; a lighter shade and text
shadow keep the opening readable. Video and model stop when the scene is
invisible or the tab is hidden. Reduced motion keeps a still model and poster,
without downloading video; Save-Data skips both video and WebGL. Deep links into
home sections avoid starting the scene until the opening becomes visible.

`lumid-cubesat-mobile.glb` is a pre-split, indexed and quantized copy of the original
model, about 53% smaller, so phones skip the connected-component processing.
Regenerate it after changing the original model or `modelParts.ts`:

```bash
npm run model:mobile
```

The CubeSat model (`public/assets/models/lumid-cubesat.glb`) is a free-use
third-party CAD model; the site credits it as illustration, not Alexander's design.

Contact: LinkedIn is the only public point of contact. Email and phone are
intentionally absent from the site, its metadata and the published resumes.

## Deploy

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every
push to `main`. `public/CNAME` keeps the custom domain. Nothing deploys until a push.
