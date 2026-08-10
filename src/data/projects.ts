export type ProjectCategory = "aerospace" | "software" | "analysis" | "policy" | "hands-on";

export interface ProjectMedia {
  kind: "video" | "image" | "code";
  src: string;
  poster?: string;
  alt?: string;
  caption?: string;
  code?: string;
}

export interface ProjectInsight {
  label: string;
  body: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  primary?: boolean;
  external?: boolean;
}

export interface DocumentPanel {
  label: string;
  title: string;
  body: string;
  links: { label: string; href?: string }[];
}

export interface Project {
  id: string;
  title: string;
  meta: string;
  summary: string;
  categories: ProjectCategory[];
  chips: string[];
  insights: ProjectInsight[];
  primaryActions: ProjectLink[];
  media: ProjectMedia[];
  documents?: DocumentPanel[];
}

export const PROJECTS: Project[] = [
  {
    id: "aerolab-suite",
    title: "AeroLab Interactive Aerodynamics Suite",
    meta: "Personal project - Browser-based aerospace simulation",
    summary:
      "Two self-contained engineering laboratories built for the browser: a 2D NACA airfoil flow lab and a 3D aircraft, rocket, and atmospheric re-entry lab. Both combine interactive visualization with live coefficients, diagnostics, plots, and device-aware performance controls.",
    categories: ["aerospace", "software", "analysis"],
    chips: ["WebGL 2", "Aerodynamics", "Numerical methods", "Aircraft stability", "Rocket analysis", "Re-entry"],
    insights: [
      {
        label: "AeroLab 2D",
        body: "Pairs a GPU D2Q9 lattice-Boltzmann flow solver with a Hess-Smith panel method and integral boundary-layer model for NACA airfoil exploration, pressure distributions, force history, transition, and separation diagnostics.",
      },
      {
        label: "AeroLab 3D",
        body: "Combines vortex-lattice aircraft analysis, viscous performance estimates, Barrowman rocket stability and drag methods, and an atmospheric re-entry model in one interactive 3D workspace.",
      },
      {
        label: "Engineering UX",
        body: "Responsive control drawers, touch-friendly inputs, keyboard shortcuts, accessible states, automatic mobile-safe rendering profiles, and graceful WebGL fallbacks keep the labs usable across devices.",
      },
      {
        label: "Delivery",
        body: "Runs entirely client-side with no account, install, backend, or data collection. Each laboratory is a portable standalone application that launches directly from this portfolio.",
      },
    ],
    primaryActions: [
      { label: "Launch AeroLab 2D", href: "aerolab/index.html", primary: true, external: true },
      { label: "Launch AeroLab 3D", href: "aerolab-3d/index.html", external: true },
    ],
    media: [
      {
        kind: "image",
        src: "assets/media/aerolab/aerolab-2d-airfoil-wake.png",
        alt: "AeroLab 2D visualization of flow separating around an airfoil and forming a vortex wake",
        caption: "AeroLab 2D: resolved airfoil flow field with separated shear layers and a downstream vortex street.",
      },
      {
        kind: "image",
        src: "assets/media/aerolab/aerolab-3d-rocket-stability.png",
        alt: "AeroLab 3D rocket analysis showing flow tracers, static aerodynamics, center of pressure, center of gravity, and drag breakdown",
        caption: "AeroLab 3D: rocket flow-tracer view with live static-stability and drag-build-up results.",
      },
    ],
  },
  {
    id: "cubesat-structures",
    title: "UCI CubeSat Structures",
    meta: "Team spacecraft - Structural analysis",
    summary:
      "Structural analysis work for a student spacecraft team, tied to component behavior, interface constraints, and integration context. Also includes FlatSat V1 - a modular bench-test platform built as systems engineer to integrate and test the satellite's hardware stack.",
    categories: ["aerospace", "analysis"],
    chips: ["ANSYS", "Structures", "Modal analysis", "Hardware context", "Systems engineering", "FlatSat"],
    insights: [
      { label: "Scope", body: "Static and frequency analysis on a CubeSat structural component." },
      { label: "Deliverables", body: "Static and frequency clips showing structural response and modal behavior." },
      { label: "Skills", body: "FEA workflow, design review support, and hardware-aware analysis." },
      { label: "FlatSat V1", body: "As systems engineer (since April 2026), designed and built FlatSat V1 - a modular, fully serviceable platform that holds the satellite's PCB stack (up to 12 boards) so subteams can integrate and bench-test hardware together before flight." },
    ],
    primaryActions: [
      { label: "Static clip", href: "assets/media/cubesat/hinge-plate-static-analysis.mp4" },
      { label: "Frequency clip", href: "assets/media/cubesat/hinge-plate-frequency-analysis.mp4" },
      { label: "Overview PDF", href: "assets/downloads/projects/extrakpak/what-is-uci-cubesat.pdf" },
    ],
    media: [
      {
        kind: "video",
        src: "assets/media/cubesat/hinge-plate-static-analysis.mp4",
        poster: "assets/images/poster-cubesat-static.png",
        caption: "Static simulation artifact for the hinge-plate component.",
      },
      {
        kind: "video",
        src: "assets/media/cubesat/hinge-plate-frequency-analysis.mp4",
        poster: "assets/images/poster-cubesat-frequency.png",
        caption: "Frequency-view clip for the same part, useful for discussing dynamic behavior.",
      },
      {
        kind: "image",
        src: "assets/media/cubesat/flatsat-v1-cad.jpg",
        alt: "SolidWorks CAD render of the FlatSat V1 modular extrusion frame",
        caption: "FlatSat V1 (CAD) - the modular extrusion frame that carries the satellite's PCB stack for bench testing.",
      },
      {
        kind: "image",
        src: "assets/media/cubesat/flatsat-v1-assembly.jpg",
        alt: "Assembled FlatSat V1 aluminum extrusion frame in the lab",
        caption: "FlatSat V1 assembled in the lab from 1010 aluminum extrusion and custom mounts.",
      },
    ],
  },
  {
    id: "obd-scanner",
    title: "OBD-II Read-Only Diagnostic Dashboard",
    meta: "Personal project - Embedded diagnostics + web app",
    summary:
      "A local web application that streams a vehicle's diagnostic bus in real time over USB, built around a hard-coded read-only safety contract. The app cannot - by design - send any command, write, or control frame to the vehicle. FastAPI + WebSocket backend, single-page JS frontend, drag-and-drop JSON vehicle profiles, and a passive capture/replay layer for unknown manufacturer identifiers.",
    categories: ["software", "hands-on", "analysis"],
    chips: [
      "Python",
      "FastAPI",
      "WebSocket",
      "ISO 15765-4 CAN",
      "UDS",
      "SAE J1979",
      "FTDI / STN2120",
      "Read-only safety",
    ],
    insights: [
      {
        label: "Scope",
        body: "Real-time live PID streaming, stored / pending / permanent DTC reads, UDS Mode $22 DID lookup, MIL state banner, supported-PID discovery, and per-vehicle technical reference (specs, fluids, fuses, warning lights).",
      },
      {
        label: "Safety",
        body: "Every outbound frame is funneled through a single hard-coded allowlist of read-only service IDs ($01, $02, $03, $07, $09, $0A, $22, $19, $3E). Writes, resets, security access, routine control, code clears, and flashing are rejected at the lowest serial layer. A regression test suite guards the contract.",
      },
      {
        label: "Adapters",
        body: "OBDLink EX (STN2120, FCA-aware) as the primary cable with FTDI VID/PID auto-detect; generic ELM327 fallback for any compatible USB adapter; a mock adapter generates plausible telemetry so the UI runs without hardware. All adapters share one transmit whitelist - no bypass paths.",
      },
      {
        label: "Capture & replay",
        body: "A passive NDJSON recorder logs every observed ECU response, including negative responses and unknown DIDs. A slow Mode $22 range sweep probes manufacturer DID space at a configurable rate so undocumented identifiers surface in the log without ever issuing a write.",
      },
      {
        label: "Extensibility",
        body: "Vehicles are plain JSON files describing protocol, PID groups + poll rates, UDS DIDs, diagram callouts, and threshold overrides. Adding a new car is drag-and-drop - no code changes - with the SVG/PNG diagram becoming the overlay surface for live data.",
      },
      {
        label: "Data depth",
        body: "2,100+ DTC entries spanning the full P / B / C / U range, including generic SAE J2012 codes and manufacturer-specific FCA / Dodge codes, with categories derived from SAE structure (engine, fuel, ignition, emissions, transmission, body, chassis, network, etc.).",
      },
    ],
    primaryActions: [
      { label: "Concept hero", href: "assets/media/obd-scanner/obd-scanner-hero.png" },
      { label: "Technical blueprint", href: "assets/media/obd-scanner/obd-scanner-blueprint.png" },
      { label: "Source infographic", href: "assets/media/obd-scanner/obd-scanner-infographic.png" },
    ],
    media: [
      {
        kind: "image",
        src: "assets/media/obd-scanner/obd-scanner-hero.png",
        alt: "Concept-study hero banner used on the OBD scanner welcome screen",
        caption: "Concept-study hero banner used on the application's welcome screen.",
      },
      {
        kind: "image",
        src: "assets/media/obd-scanner/obd-scanner-blueprint.png",
        alt: "Technical blueprint overlay used as the dashboard surface for live telemetry callouts",
        caption: "Technical-blueprint overlay used as the dashboard surface for anchored live telemetry callouts.",
      },
    ],
    documents: [
      {
        label: "Architecture",
        title: "Module Layout",
        body: "Read-only safety core, adapter abstraction, sampler, capture/sweep, and a single-page UI. The whitelist is the only path to the serial line.",
        links: [
          { label: "backend/safety.py - transmit whitelist (safety core)" },
          { label: "backend/app.py - FastAPI app, WebSocket stream, capture + reference endpoints" },
          { label: "backend/serial_io.py - adapter abstraction, registry, capture-hook plumbing" },
          { label: "backend/adapters/ - OBDLink EX, generic ELM327, mock (and a deliberately-failing Ross-Tech stub)" },
          { label: "backend/sampler.py - background polling worker (per-group poll rates)" },
          { label: "backend/capture_log.py + capture_sweep.py - passive NDJSON recorder and slow $22 sweep" },
          { label: "backend/obd_pids.py + uds_client.py - SAE J1979 decoders, read-only $22 / $19 / $3E" },
          { label: "backend/vehicles/*.json - vehicle profiles (PID groups, callouts, DIDs, thresholds)" },
          { label: "backend/vehicle_reference/*.json - static reference (specs, fluids, fuses, warning lights)" },
          { label: "backend/dtc_database.json - 2,100+ P / B / C / U code lookup table" },
          { label: "frontend/ - single-page UI, blueprint overlay, capture controls, reference screen" },
          { label: "tests/test_whitelist.py - regression tests guarding the read-only contract" },
        ],
      },
      {
        label: "What it deliberately does not do",
        title: "Out of Scope by Design",
        body: "Source code is not published; the application enforces these boundaries at the protocol layer.",
        links: [
          { label: "No DTC clearing - the UI has no Clear Codes button" },
          { label: "No ECU resets, idle adjustments, actuator tests, or routine control" },
          { label: "No flashing, reprogramming, or module coding" },
          { label: "No security access, key / PATS programming, or feature unlocking" },
          { label: "No third-party telemetry - everything stays on the local machine" },
        ],
      },
    ],
  },
  {
    id: "mae-146-didymos",
    title: "Mission to Didymos",
    meta: "MAE 146 - Mission analysis with MATLAB",
    summary:
      "A preliminary Earth-to-Didymos mission analysis built in MATLAB. The project propagates planetary states, solves Lambert transfers, computes total delta-v, and maps candidate windows with a porkchop plot.",
    categories: ["aerospace", "software", "analysis"],
    chips: ["MATLAB", "Astrodynamics", "Lambert solver", "Porkchop plot"],
    insights: [
      { label: "Scope", body: "Orbital propagation and transfer-planning code built around Earth and Didymos reference elements." },
      { label: "Deliverables", body: "Final report, mission script, Lambert solver, and supporting orbital mechanics functions." },
      { label: "Skills", body: "Astrodynamics, MATLAB modeling, transfer analysis, and delta-v optimization." },
    ],
    primaryActions: [
      { label: "Final report", href: "assets/downloads/projects/mae-146-didymos/mae-146-mission-to-didymos-final-report.pdf", primary: true },
      { label: "Main script", href: "assets/downloads/projects/mae-146-didymos/problem4_didymos.m" },
      { label: "Lambert solver", href: "assets/downloads/projects/mae-146-didymos/lambert_universal.m" },
    ],
    media: [
      {
        kind: "code",
        src: "mae-146-snippet",
        caption: "Preliminary mission analysis driver, condensed.",
        code: `% Preliminary mission analysis for Earth to Didymos transfer
t_earth = 12 * day2sec;
t_didymos = 412 * day2sec;
rv_earth_dep = propagate_elliptical(rv_earth_ref, t_earth, MU);
rv_didymos_arr = propagate_elliptical(rv_didymos_ref, t_didymos, MU);

[v1_trans, v2_trans, ~] = lambert_universal( ...
    r1_nom, r2_nom, tof_nom, MU, 0, 1e-8, 1e-8);
dV_tot_nom = norm(v1_trans - v1_earth) + norm(v2_trans - v2_didymos);`,
      },
    ],
    documents: [
      {
        label: "Files",
        title: "Report and Code",
        body: "Final report, project PDF, and MATLAB source files.",
        links: [
          { label: "MAE 146 final report", href: "assets/downloads/projects/mae-146-didymos/mae-146-mission-to-didymos-final-report.pdf" },
          { label: "Project 4 PDF", href: "assets/downloads/projects/mae-146-didymos/mae-146-didymos-project-4.pdf" },
          { label: "Mission script", href: "assets/downloads/projects/mae-146-didymos/problem4_didymos.m" },
          { label: "Lambert solver", href: "assets/downloads/projects/mae-146-didymos/lambert_universal.m" },
          { label: "Keplerian to state vector", href: "assets/downloads/projects/mae-146-didymos/kep2rv.m" },
          { label: "State vector to Keplerian", href: "assets/downloads/projects/mae-146-didymos/rv2kep.m" },
          { label: "Mean anomaly to true anomaly", href: "assets/downloads/projects/mae-146-didymos/ma2ta.m" },
          { label: "True anomaly to mean anomaly", href: "assets/downloads/projects/mae-146-didymos/ta2ma.m" },
          { label: "Elliptical propagator", href: "assets/downloads/projects/mae-146-didymos/propagate_elliptical.m" },
          { label: "True-anomaly propagator", href: "assets/downloads/projects/mae-146-didymos/propagate_elliptical_ta.m" },
          { label: "Stumpff functions", href: "assets/downloads/projects/mae-146-didymos/stumpff.m" },
        ],
      },
    ],
  },
  {
    id: "photon-paths",
    title: "Photon Paths Near a Black Hole",
    meta: "Simulation - MATLAB",
    summary:
      "A computational physics project that models photon capture, escape, and critical trajectories and presents the result as a readable visual output.",
    categories: ["software", "analysis"],
    chips: ["MATLAB", "Computational physics", "Visualization", "Numerical reasoning"],
    insights: [
      { label: "Scope", body: "Simulation of photon capture, escape, and critical trajectories near a black hole." },
      { label: "Output", body: "Plotted result showing multiple trajectory families in a single view." },
      { label: "Skills", body: "Numerical modeling, visualization, and MATLAB-based scientific computing." },
    ],
    primaryActions: [
      { label: "MATLAB script", href: "assets/downloads/projects/thermo/photon-blackhole-simulation.m", primary: true },
      { label: "Image", href: "assets/media/photons/photon-blackhole-simulation.png" },
    ],
    media: [
      {
        kind: "image",
        src: "assets/media/photons/photon-blackhole-simulation.png",
        alt: "Photon path simulation output from MATLAB",
        caption: "Final simulation output from the photon-path model.",
      },
    ],
    documents: [
      {
        label: "Files",
        title: "Simulation Source",
        body: "MATLAB source for the photon-path model.",
        links: [{ label: "Source code", href: "assets/downloads/projects/thermo/photon-blackhole-simulation.m" }],
      },
    ],
  },
  {
    id: "mae-106-autonomous",
    title: "Autonomous Robot",
    meta: "MAE 106 - Team robotics project",
    summary:
      "MAE 106 robotics project documented through the final report and experimental verification files.",
    categories: ["software", "analysis"],
    chips: ["Robotics", "Experimental verification", "Team project", "Iteration"],
    insights: [
      { label: "Scope", body: "Team robotics project documented through the final report and verification files." },
      { label: "Deliverables", body: "Final report plus experimental verification documents." },
      { label: "Skills", body: "Testing, iteration, team project documentation, and system verification." },
    ],
    primaryActions: [
      { label: "Final report", href: "assets/downloads/projects/mae-106-autonomous/mae-106-autonomous-robot-final-report.pdf", primary: true },
      { label: "Verification 1", href: "assets/downloads/projects/mae-106-autonomous/mae-106-autonomous-robot-experimental-verification-1.pdf" },
      { label: "Verification 2", href: "assets/downloads/projects/mae-106-autonomous/mae-106-autonomous-robot-experimental-verification-2.pdf" },
    ],
    media: [],
    documents: [
      {
        label: "Report",
        title: "Final Report",
        body: "Primary document for project scope, design decisions, and system-level summary.",
        links: [{ label: "Open final report", href: "assets/downloads/projects/mae-106-autonomous/mae-106-autonomous-robot-final-report.pdf" }],
      },
      {
        label: "Verification",
        title: "Experimental Checks",
        body: "Supporting verification documents from the project test process.",
        links: [
          { label: "Experimental verification 1", href: "assets/downloads/projects/mae-106-autonomous/mae-106-autonomous-robot-experimental-verification-1.pdf" },
          { label: "Experimental verification 2", href: "assets/downloads/projects/mae-106-autonomous/mae-106-autonomous-robot-experimental-verification-2.pdf" },
        ],
      },
    ],
  },
  {
    id: "mae-106-pid",
    title: "PID Controller Design",
    meta: "MAE 106 - Controls",
    summary: "Controls-focused report covering PID design, tuning, and closed-loop response reasoning.",
    categories: ["software", "analysis"],
    chips: ["Controls", "PID", "Closed-loop behavior", "Design reasoning"],
    insights: [
      { label: "Scope", body: "PID controller design, tuning logic, and response analysis." },
      { label: "Deliverable", body: "Controls report focused on closed-loop behavior and design tradeoffs." },
      { label: "Skills", body: "Controls analysis, tuning, and technical reporting." },
    ],
    primaryActions: [
      { label: "Open report", href: "assets/downloads/projects/mae-106-pid/mae-106-pid-controller-design-report.pdf", primary: true },
    ],
    media: [],
    documents: [
      {
        label: "Report",
        title: "Controller Design Report",
        body: "Primary project document covering design choices, tuning, and response behavior.",
        links: [{ label: "PID controller design report", href: "assets/downloads/projects/mae-106-pid/mae-106-pid-controller-design-report.pdf" }],
      },
    ],
  },
  {
    id: "extrakpak-drone",
    title: "ExtrakPak SAR Drone Concept",
    meta: "ENGR 190W - Technical proposal",
    summary:
      "A heavy-lift search-and-recovery drone proposal framed around system requirements, operational practicality, and risk rather than only concept sketches.",
    categories: ["aerospace", "policy"],
    chips: ["Aerospace systems", "Technical writing", "Concept development", "Risk framing"],
    insights: [
      { label: "Scope", body: "Airframe layout, grappling concept, remote command unit, payload framing, and risk considerations." },
      { label: "Deliverables", body: "Technical proposal document and presentation deck." },
      { label: "Skills", body: "Systems thinking, technical writing, and requirements framing." },
    ],
    primaryActions: [
      { label: "Proposal", href: "assets/downloads/projects/extrakpak/military-sar-drone-technical-proposal.docx", primary: true },
      { label: "Presentation", href: "assets/downloads/projects/extrakpak/military-sar-drone-technical-proposal-presentation.pptx" },
    ],
    media: [],
    documents: [
      {
        label: "Report",
        title: "Technical Proposal",
        body: "Primary document covering system concept, operations, and risk considerations.",
        links: [{ label: "Technical proposal", href: "assets/downloads/projects/extrakpak/military-sar-drone-technical-proposal.docx" }],
      },
      {
        label: "Deck",
        title: "Presentation",
        body: "Condensed project overview for presentation format.",
        links: [{ label: "Presentation deck", href: "assets/downloads/projects/extrakpak/military-sar-drone-technical-proposal-presentation.pptx" }],
      },
    ],
  },
  {
    id: "lunar-impact",
    title: "Lunar Micrometeoroid Protection",
    meta: "ENGR 54 - Materials and impact analysis",
    summary:
      "A project exploring reinforced ice concepts for lunar protection, combining experimental framing with fast impact and feasibility reasoning.",
    categories: ["aerospace", "analysis"],
    chips: ["Materials", "Impact reasoning", "Tradeoff analysis", "Presentation"],
    insights: [
      { label: "Scope", body: "Damage behavior, reinforcement concepts, and scale estimates for high-speed micrometeoroid impacts." },
      { label: "Deliverable", body: "Presentation covering comparisons, feasibility framing, and impact reasoning." },
      { label: "Skills", body: "Analytical framing, comparison work, and presentation development." },
    ],
    primaryActions: [
      { label: "Presentation", href: "assets/downloads/projects/lunar-impact/lunar-micrometeoroid-impact-projection-analysis.pptx", primary: true },
    ],
    media: [],
    documents: [
      {
        label: "Deck",
        title: "Impact Analysis Presentation",
        body: "Primary project file covering concept comparison and feasibility analysis.",
        links: [{ label: "Open presentation", href: "assets/downloads/projects/lunar-impact/lunar-micrometeoroid-impact-projection-analysis.pptx" }],
      },
    ],
  },
  {
    id: "periodic-table-db",
    title: "Periodic Table Database",
    meta: "MAE 10 - MATLAB data tool",
    summary:
      "A MATLAB project that combines element lookup with trend plotting, built to return both direct values and a visual read on periodic behavior.",
    categories: ["software"],
    chips: ["MATLAB", "Data handling", "Visualization", "User-oriented scripting"],
    insights: [
      { label: "Scope", body: "Element lookup plus periodic-trend plotting for mass, electronegativity, ionization energy, and related properties." },
      { label: "Deliverable", body: "MATLAB project report for the database and plotting workflow." },
      { label: "Skills", body: "Data handling, plotting, and MATLAB scripting." },
    ],
    primaryActions: [
      { label: "Project report", href: "assets/downloads/projects/matlab-db/matlab-periodic-table-database-report.docx", primary: true },
    ],
    media: [],
    documents: [
      {
        label: "Report",
        title: "Project Report",
        body: "Primary file for the database structure, outputs, and plotted trends.",
        links: [{ label: "Open report", href: "assets/downloads/projects/matlab-db/matlab-periodic-table-database-report.docx" }],
      },
    ],
  },
  {
    id: "thermo-notebooks",
    title: "Thermodynamics Notebook Set",
    meta: "MAE 91 - Python notebooks",
    summary:
      "A set of Python notebooks focused on state-property calculations, plotted sweeps, and cycle behavior across adiabatic mixing, Rankine analysis, turbine power, and isothermal expansion.",
    categories: ["software", "analysis"],
    chips: ["Python", "CoolProp", "NumPy", "Matplotlib"],
    insights: [
      { label: "Scope", body: "Cycle analysis, state-property work, plotted parameter sweeps, and engineering calculations in notebook form." },
      { label: "Deliverables", body: "Three direct-open notebooks covering Rankine, gas and turbine plots, and isothermal expansion." },
      { label: "Skills", body: "Python workflow, thermodynamics calculations, and plotted engineering outputs." },
    ],
    primaryActions: [
      { label: "Mixing + Rankine", href: "assets/downloads/projects/thermo/adiabatic-mixing-and-rankine-cycle.ipynb", primary: true },
      { label: "Gas + turbine", href: "assets/downloads/projects/thermo/polytropic-ideal-gas-and-turbine-plots.ipynb" },
      { label: "Isothermal plots", href: "assets/downloads/projects/thermo/temperature-conversion-and-isothermal-expansion.ipynb" },
    ],
    media: [],
    documents: [
      {
        label: "Files",
        title: "Notebook Set",
        body: "Three notebooks covering thermodynamics calculations and plots.",
        links: [
          { label: "Adiabatic mixing and Rankine", href: "assets/downloads/projects/thermo/adiabatic-mixing-and-rankine-cycle.ipynb" },
          { label: "Polytropic gas and turbine plots", href: "assets/downloads/projects/thermo/polytropic-ideal-gas-and-turbine-plots.ipynb" },
          { label: "Temperature conversion and isothermal expansion", href: "assets/downloads/projects/thermo/temperature-conversion-and-isothermal-expansion.ipynb" },
        ],
      },
    ],
  },
  {
    id: "policy-writing",
    title: "Internet Policy Writing",
    meta: "ICS 11 - Technical writing and policy analysis",
    summary:
      "Policy work on data caps, throttling, net neutrality, H.R. 1870, and BEAD, presented through memos, research, and slide decks.",
    categories: ["policy", "analysis"],
    chips: ["Research synthesis", "Policy writing", "Recommendations", "Audience-aware communication"],
    insights: [
      { label: "Scope", body: "Technical issues with policy implications, written as memos, presentations, and recommendation-focused analysis." },
      { label: "Deliverables", body: "Memos, slide decks, and policy analysis documents." },
      { label: "Skills", body: "Research synthesis, technical writing, and audience-aware communication." },
    ],
    primaryActions: [
      { label: "H.R. 1870 memo", href: "assets/downloads/projects/policy/hr-1870-analysis.docx", primary: true },
      { label: "H.R. 1870 deck", href: "assets/downloads/projects/policy/hr-1870-presentation.pptx" },
      { label: "Data caps deck", href: "assets/downloads/projects/policy/fcc-data-throttling-and-data-caps-analysis.pptx" },
    ],
    media: [],
    documents: [
      {
        label: "Memo",
        title: "H.R. 1870 Analysis",
        body: "Primary writing sample from the policy section.",
        links: [{ label: "Open memo", href: "assets/downloads/projects/policy/hr-1870-analysis.docx" }],
      },
      {
        label: "Decks",
        title: "Presentation Files",
        body: "Supporting deck materials from the policy section.",
        links: [
          { label: "H.R. 1870 deck", href: "assets/downloads/projects/policy/hr-1870-presentation.pptx" },
          { label: "Data caps deck", href: "assets/downloads/projects/policy/fcc-data-throttling-and-data-caps-analysis.pptx" },
          { label: "Data caps writeup", href: "assets/downloads/projects/policy/fcc-data-throttling-and-data-caps-presentation.docx" },
        ],
      },
    ],
  },
  {
    id: "mechanical-logs",
    title: "Mechanical Project Logs",
    meta: "Hands-on engineering - Vehicle projects",
    summary:
      "Documented work across two personal vehicle platforms, covering suspension, braking, lighting, exhaust, tuning, trim, and supporting upgrade tasks.",
    categories: ["hands-on"],
    chips: ["Diagnostics", "Installation", "Mechanical troubleshooting", "Real-world follow-through"],
    insights: [
      { label: "Scope", body: "Coilover work, braking upgrades, lighting projects, muffler changes, tuning, and visual trim updates." },
      { label: "Media", body: "Install clips and stills from completed mechanical projects." },
      { label: "Skills", body: "Diagnostics, installation, troubleshooting, and documentation." },
    ],
    primaryActions: [
      { label: "Coilover clip", href: "assets/media/charger/charger-coilover-upgrade.mp4", primary: true },
      { label: "Tail-light clip", href: "assets/media/mustang/mustang-tail-light-upgrade.mp4" },
      { label: "Brake still", href: "assets/media/charger/charger-rotor-pad-upgrade.jpg" },
      { label: "Brake clip", href: "assets/media/charger/charger-rotor-pad-upgrade.mp4" },
      { label: "Exhaust clip", href: "assets/media/mustang/mustang-muffler-delete.mp4" },
    ],
    media: [
      {
        kind: "video",
        src: "assets/media/charger/charger-coilover-upgrade.mp4",
        poster: "assets/images/poster-hands-on.png",
        caption: "Coilover installation clip from the Charger project set.",
      },
      {
        kind: "image",
        src: "assets/media/charger/charger-rotor-pad-upgrade.jpg",
        alt: "Rotor and pad upgrade work on a Dodge Charger",
        caption: "Brake upgrade still from the mechanical project work.",
      },
      {
        kind: "video",
        src: "assets/media/charger/charger-rotor-pad-upgrade.mp4",
        poster: "assets/images/poster-hands-on.png",
        caption: "Rotor and pad upgrade clip from the Charger project set.",
      },
      {
        kind: "image",
        src: "assets/media/charger/charger-airbag-upgrade.jpg",
        alt: "Airbag and trim upgrade on a Dodge Charger",
        caption: "Interior and supporting modification work from the vehicle project work.",
      },
      {
        kind: "image",
        src: "assets/media/charger/charger-spoiler-install.jpg",
        alt: "Spoiler install on a Dodge Charger",
        caption: "Exterior trim installation from the Charger project set.",
      },
      {
        kind: "image",
        src: "assets/media/mustang/mustang-flash-tune.jpg",
        alt: "Flash tune device during Mustang project work",
        caption: "Flash-tune workflow from the Mustang project set.",
      },
      {
        kind: "video",
        src: "assets/media/mustang/mustang-muffler-delete.mp4",
        poster: "assets/images/poster-hands-on.png",
        caption: "Exhaust work clip from the Mustang project set.",
      },
    ],
  },
];

export const FEATURED_PROJECT_IDS = [
  "aerolab-suite",
  "cubesat-structures",
  "obd-scanner",
  "photon-paths",
  "mechanical-logs",
] as const;

export const PROJECT_FILTERS: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "aerospace", label: "Aerospace" },
  { key: "software", label: "Software" },
  { key: "analysis", label: "Analysis" },
  { key: "policy", label: "Writing" },
  { key: "hands-on", label: "Hands-on" },
];
