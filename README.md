# Alexander Amadeo-Ranch — Engineering Portfolio

Immersive 3D engineering portfolio built with **Vite**, **React**, **TypeScript**,
**React Three Fiber**, **drei**, **Three.js**, **GSAP**, and **ScrollTrigger**.
Deployed for free through GitHub Pages on the custom domain **alexengineer.net**.

The full content of the prior static site is preserved — projects, reports, media,
and downloads still live under `public/assets/` and continue to ship in the build
output.

## Stack

| Concern        | Tool                                          |
| -------------- | --------------------------------------------- |
| Build / dev    | Vite                                          |
| UI             | React 18 + TypeScript                         |
| 3D             | three.js via @react-three/fiber + @react-three/drei |
| Animation      | GSAP + ScrollTrigger                          |
| Hosting        | GitHub Pages (free) — custom domain via CNAME |

No paid services, no analytics, no premium libraries, no third-party accounts.

## Run locally

Requires **Node 18+** (Node 20 recommended).

```bash
npm install
npm run dev
```

Open <http://localhost:5173>.

### Other scripts

```bash
npm run typecheck   # tsc --noEmit (project references)
npm run build       # typecheck + production build into ./dist
npm run preview     # serve ./dist locally on port 4173
```

## Project structure

```
engineering portfolio/
├── index.html                  # Vite entry
├── vite.config.ts
├── tsconfig*.json
├── public/
│   ├── CNAME                   # alexengineer.net
│   └── assets/                 # original images / media / downloads / resume
│       ├── images/
│       ├── media/
│       └── downloads/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── styles/global.css
│   ├── data/
│   │   ├── projects.ts         # all project entries, chips, downloads
│   │   └── skills.ts
│   ├── utils/
│   │   ├── assets.ts           # resolves URLs against import.meta.env.BASE_URL
│   │   ├── router.ts           # tiny hash-based router (no react-router dep)
│   │   └── motion.ts           # reduced-motion + mouse-position helpers
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── three/              # Scene, FloatingObjects, ParticleField
│   │   ├── sections/           # Hero, About, ProjectsPreview, Skills, Contact, ProjectEntry
│   │   └── ui/                 # GlassCard, RouterLink, Reveal
│   └── pages/                  # Home, Projects, Contact, Privacy, Terms, NotFound
└── .github/workflows/deploy.yml
```

## Routing

A small in-house hash router (no `react-router` dependency) drives navigation:

| Route                                  | Page                  |
| -------------------------------------- | --------------------- |
| `#/`                                   | Home                  |
| `#/projects`                           | Full project archive  |
| `#/projects?id=<project-id>`           | Archive scrolled / highlighted to that project |
| `#/contact`                            | Contact               |
| `#/privacy`                            | Privacy Policy        |
| `#/terms`                              | Terms & Conditions    |

Hash routing means direct URLs work on GitHub Pages without a 404-redirect trick.

## Assets

All preserved assets are served from `public/assets/`. The `asset(path)` helper
in `src/utils/assets.ts` joins paths against `import.meta.env.BASE_URL`, so they
continue to work whether the site is deployed at the root of a custom domain
(`base: "/"`) or under a sub-path on `*.github.io`.

Resume PDF: `public/assets/downloads/resume/alexander-amadeo-ranch-resume.pdf`

## Deploy to GitHub Pages

This repo includes a free GitHub Actions workflow at
`.github/workflows/deploy.yml` that:

1. Installs Node 20.
2. Runs `npm ci`.
3. Builds with `npm run build`.
4. Uploads `dist/` as a Pages artifact and deploys it.

### One-time GitHub setup

1. Repo → **Settings → Pages → Source**: choose **GitHub Actions**.
2. Push to `main`. The workflow runs, the site goes live.

### Custom domain (`alexengineer.net`)

* `public/CNAME` is preserved — Vite copies it into `dist/CNAME` on build, so
  GitHub Pages keeps the custom domain across deploys.
* DNS for `alexengineer.net` should `CNAME` to `spacexkspofficial.github.io`
  (already configured for the existing site).
* `vite.config.ts` ships with `base: "/"` because the deployment target is the
  custom-domain root. If you ever drop the custom domain and deploy under
  `https://spacexkspofficial.github.io/engineering-portfolio/` instead, switch
  to `base: "/engineering-portfolio/"`.

### Manual deploy (no Actions)

If you'd rather deploy from your machine:

```bash
npm run build
# then commit dist/ to a gh-pages branch with gh-pages CLI, or push dist to
# the branch GitHub Pages is configured to serve. Actions is simpler.
```

## Notes

* Reduced motion is respected — particle drift, hero parallax, GSAP reveals,
  and card tilt all stand down when `prefers-reduced-motion: reduce` is set.
* The 3D scene falls back to a quiet message if WebGL is unavailable; the rest
  of the page remains fully functional.
* No lint script is configured — TypeScript strict mode plus `npm run typecheck`
  handles correctness for this project.
