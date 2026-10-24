// Resume-specific wording for projects. Organization, education, skills and
// credential facts come from profile.ts so the site and the resume agree.

export interface ResumeProject {
  id?: string;
  title: string;
  context: string;
  period: string;
  bullets: string[];
  /** Included in the one-page engineering resume. */
  engineering?: boolean;
  /** Bullets kept in the one-page version (defaults to all). */
  engineeringBullets?: number;
}

export const RESUME_TAGLINE = "Aerospace Engineering · Mechanical Design, Structures and Hardware Integration";

export const ENGINEERING_PROJECTS: ResumeProject[] = [
  {
    id: "mae-106-autonomous",
    title: "Autonomous Robot Design and Verification",
    context: "MAE 106, team of four, experimental lead",
    period: "Jan – Mar 2026",
    engineering: true,
    engineeringBullets: 1,
    bullets: [
      "Ran the team's experiments on a pneumatic autonomous robot: five solenoid duty cycles × 10 runs at 30 psi (chose 100 ms ON / 900 ms OFF for consistent speed) and five hopper hinge heights × 10 runs (fixed at 210 mm, 2.83 m per five hops).",
      "Calibrated the magnetometer in MATLAB, measured heading noise and one-hour drift, and quantified servo position error (about 10° mean overshoot) before integration.",
    ],
  },
  {
    id: "mae-146-didymos",
    title: "Mission to Didymos Transfer Analysis",
    context: "MAE 146 Astronautics, course project",
    period: "Feb – Mar 2026",
    engineering: true,
    bullets: [
      "Wrote MATLAB two-body propagation, element-conversion and universal-variable Lambert functions; searched 16,290 departure/arrival pairs on a 201 × 201 grid, reducing transfer Δv from 20.028 km/s for the assigned dates to 7.873 km/s.",
    ],
  },
  {
    id: "mae-106-pid",
    title: "Inverted-Pendulum Controller Design",
    context: "MAE 106, individual assignment",
    period: "Feb 2026",
    bullets: [
      "Derived closed-loop poles for a cart–pendulum under PD control and selected Kp = 50 and Kd = 5 (poles at −2.5 ± 5.39j); stable from initial angles up to 0.78 rad in simulation.",
    ],
  },
  {
    id: "extrakpak-drone",
    title: "Heavy-Lift Recovery UAV Proposal (ExtrakPak)",
    context: "ENGR 190W, team of three",
    period: "Jan – Mar 2025",
    bullets: [
      "Wrote the airframe, propulsion, grappling-system, remote-command and regulatory sections of a concept proposal with 200 kg payload and one-hour endurance targets, including thrust-to-weight feasibility estimates. Concept only; not built.",
    ],
  },
  {
    id: "lunar-impact",
    title: "Reinforced Ice for Lunar Micrometeoroid Protection",
    context: "ENGR 54, team of seven",
    period: "May – Jun 2025",
    bullets: [
      "Ran drop-impact tests on ice reinforced with paper and plastic and an energy balance showing passive ice shielding is impractical against a modeled 3 cm, 42 km/s iron micrometeoroid.",
    ],
  },
  {
    id: "periodic-table-db",
    title: "Periodic Table Database",
    context: "MAE 10, team project",
    period: "Sep – Dec 2023",
    bullets: ["Built a MATLAB tool for element lookup and periodic-trend plots from a structured CSV dataset."],
  },
];

export const SOFTWARE_PROJECTS: ResumeProject[] = [
  {
    id: "aerolab-suite",
    title: "AeroLab 2D and 3D",
    context: "Personal, alexengineer.net/aerolab",
    period: "Published Aug 2026",
    bullets: [
      "Built browser aerodynamics labs in JavaScript and WebGL 2: lattice-Boltzmann flow view, Hess–Smith panel method and integral boundary layer for airfoils; vortex-lattice aircraft analysis, Barrowman rocket stability and a re-entry trajectory model.",
    ],
  },
  {
    id: "exohunt",
    title: "EXOHUNT",
    context: "Personal, open source",
    period: "Jul 2026 – Present",
    bullets: [
      "Building an open-source Python pipeline for public TESS light curves: BLS transit searches, a known-planet benchmark and catalog cross-checks; other signals are treated as unvetted candidates.",
    ],
  },
  {
    id: "obd-scanner",
    title: "Read-Only OBD-II Diagnostic Dashboard",
    context: "Personal",
    period: "Published May 2026",
    bullets: [
      "Built a local FastAPI/WebSocket dashboard for live vehicle diagnostic data, restricted by design to an allowlist of read-only OBD-II and UDS services.",
    ],
  },
  {
    title: "Slamcaster",
    context: "Personal",
    period: "Aug 2025",
    bullets: ["Built and maintained a multi-page static publishing site on GitHub Pages with a custom domain (180+ commits)."],
  },
];
