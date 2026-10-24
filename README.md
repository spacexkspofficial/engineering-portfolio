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
| `src/data/projects.ts` | Work index and case-study pages: summary, facts, sections, figures, files |
| `src/data/resume.ts` | Resume-only wording for project entries and the header tagline |
| `public/assets/` | Images, video, downloads (URLs are stable; existing links keep working) |

Writing rules the data follows: say what Alexander did versus the team, label
analysis as analysis and concepts as concepts, keep dates exact, and leave out
results that no artifact or confirmation supports.

## Routes

| Route | Page |
| --- | --- |
| `#/` | Home: hero over the Earth/CubeSat scene, selected work, experience, about, contact |
| `#/work`, `#/experience`, `#/about` | Home, scrolled to that section |
| `#/projects` | Work index |
| `#/projects/<id>` | Case study (`<id>` is stable, e.g. `cubesat-structures`) |
| `#/projects?id=<id>` | Old link format; redirects to `#/projects/<id>` |
| `#/resume` | Resume (same component as the PDF) |
| `#/contact`, `#/privacy`, `#/terms` | Contact and policies |
| `/resume/`, `/resume/engineering.html` | Static resume pages (no JavaScript needed) |
| `/aerolab/`, `/aerolab-3d/` | Standalone AeroLab demos |

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
  Earth video (an 854 px version on small screens), then the WebGL model. Skips
  video and model when the browser asks to save data, pauses everything once the
  hero has scrolled away, and keeps the model still with reduced motion.
- `Scene.tsx`: camera, lights and where the satellite sits for wide, medium and
  portrait/phone layouts (as fractions of the visible frame).
- `FloatingObjects.tsx`: splits the GLB into parts and drives the scroll-linked
  exploded view.
- `SceneErrorBoundary.tsx`: a WebGL or model failure leaves the poster in place
  instead of breaking the page.

The CubeSat model (`public/assets/models/lumid-cubesat.glb`) is a free-use
third-party CAD model; the site credits it as illustration, not Alexander's design.

Contact: LinkedIn is the only public point of contact. Email and phone are
intentionally absent from the site, its metadata and the published resumes.

## Deploy

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every
push to `main`. `public/CNAME` keeps the custom domain. Nothing deploys until a push.
