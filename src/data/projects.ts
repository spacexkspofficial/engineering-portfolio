// Complete project records for the scrolling homepage and inline notes. Each project says
// only what its artifacts or confirmed facts support; limitations are part of
// the record, not an afterthought. IDs remain stable links (#/projects/<id>) and
// legacy links (#/projects?id=<id>) redirect to them.

export type ProjectGroup = "engineering" | "course" | "software" | "hands-on" | "archive";

export interface Figure {
  kind: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** Plots and diagrams with a white background are shown on a light plate. */
  plate?: boolean;
  /** 800 × 600 crop used when this figure is a project's thumbnail. */
  thumb?: string;
}

export interface FileLink {
  label: string;
  href: string;
  type: "PDF" | "DOCX" | "PPTX" | "MATLAB" | "Notebook" | "Video" | "App" | "Repository" | "Image";
  note?: string;
}

export interface Section {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  /** Index into `figures` to show after this section. */
  figures?: number[];
}

export interface Project {
  id: string;
  title: string;
  /** Shorter title for indexes and navigation. */
  short: string;
  group: ProjectGroup;
  context: string;
  period: string;
  sortKey: string;
  summary: string;
  /** One line for indexes; defaults to the first sentence of the summary. */
  teaser?: string;
  facts: { label: string; value: string }[];
  sections: Section[];
  figures: Figure[];
  files?: FileLink[];
  links?: FileLink[];
  /** Figure used as the thumbnail in indexes. */
  cover?: number;
  /** Short label shown on a plain plate when a project has no image to show. */
  plate?: string;
  featured?: number;
}

export const PROJECTS: Project[] = [
  {
    id: "cubesat-structures",
    title: "FlatSat V1 and CubeSat structures",
    short: "FlatSat V1 and CubeSat structures",
    group: "engineering",
    context: "UCI CubeSat, student spacecraft program",
    period: "2023 – present",
    sortKey: "2026-03",
    featured: 1,
    cover: 0,
    summary:
      "FlatSat V1 is a ground fixture for integrating and testing up to 12 avionics PCBs on the bench. I built it and designed, printed and installed all 14 of its mounts, alongside spacecraft structural analysis since early 2025.",
    facts: [
      { label: "Role", value: "Systems Engineer, Mar 2026 – present. Earlier: Structural Engineer, Chief Integration Officer, Executive Assistant" },
      { label: "Tools", value: "SOLIDWORKS, ANSYS Mechanical, PLA 3D printing" },
      { label: "Status", value: "FlatSat V1 assembled (ground fixture). Standoff vibration test pending. Nothing here has flown." },
    ],
    sections: [
      {
        heading: "The fixture",
        paragraphs: [
          "Before boards go into a CubeSat stack, the subteams need to wire them up and test them together on the ground. FlatSat V1 is the bench fixture for that: an aluminum-extrusion frame that holds the avionics stack, up to 12 PCBs, so integration and testing can happen before anything goes into the spacecraft.",
        ],
        figures: [0, 1],
      },
      {
        heading: "What I did",
        list: [
          "Built V1 as the successor to the team's V0 fixture, dropping features we did not need. The total FlatSat purchase order, including aluminum extrusions, screws and other purchased parts, came in 30% lower than V0's.",
          "Designed all 14 extrusion mounts from scratch, printed them in standard PLA and installed them. The commercial alternative was expensive and had a long lead time; making the mounts in-house meant assembly did not wait on shipping.",
        ],
      },
      {
        heading: "Decisions and limits",
        list: [
          "PLA is acceptable because these are lightly loaded parts on a ground fixture. They are not flight hardware.",
          "The 30% saving is on the whole purchase order compared with V0, so it reflects the simpler design overall, not just the printed mounts.",
        ],
      },
      {
        heading: "M3 standoffs for the internal bus stack",
        paragraphs: [
          "The internal avionics stack is held together by M3 standoffs running from end cap to end cap. I analyzed them for tension along the stack and for launch-vibration conditions, with attention to the vibration limits of the boards they carry. By calculation and simulation, the standoffs have a factor of safety of 5 against yield in the modeled configuration, and the design was approved by our subteam leads and project managers.",
          "Physical vibration testing has not happened yet, so this is an analysis result, not a test result.",
        ],
      },
      {
        heading: "Hinge-plate FEA, January 2026",
        paragraphs: [
          "Static-structural and modal studies of a hinge plate in ANSYS Mechanical 2025 R2. The recordings show the strain and deformation results and the first six mode shapes; mode 1 is at about 4,157 Hz with the fixed support used in that model.",
          "The recordings show results, not the load cases and material assumptions behind them, so treat them as examples of the workflow rather than design numbers.",
        ],
        figures: [2, 3],
      },
      {
        heading: "Earlier roles",
        paragraphs: [
          "I joined in September 2023 as an executive assistant handling documentation and scheduling. As Chief Integration Officer (October 2024 – September 2025) I coordinated mechanical, electrical and payload interfaces between subteams and was the main contact between CubeSat leadership and the STMS research group. My hands-on mechanical design and modal analysis started in early 2025, during that role, and continued as Structural Engineer from September 2025.",
          "I also design to thermal constraints from the thermal-analysis subteam and review their documentation. The thermal analysis itself is their work.",
        ],
      },
    ],
    figures: [
      {
        kind: "image",
        src: "assets/media/cubesat/flatsat-v1-avionics-web.jpg",
        alt: "Stacked avionics boards connected by jumper wires on the black aluminum-extrusion frame of FlatSat V1.",
        caption: "FlatSat V1 with avionics boards and wiring installed on the aluminum-extrusion bench fixture.",
        width: 1920,
        height: 1440,
      },
      {
        kind: "image",
        src: "assets/media/cubesat/flatsat-v1-cad.jpg",
        alt: "SOLIDWORKS render of the FlatSat V1 extrusion frame showing the base, upright panel and cross member.",
        caption: "SOLIDWORKS model of the same frame.",
        width: 1204,
        height: 781,
        plate: true,
      },
      {
        kind: "video",
        src: "assets/media/cubesat/hinge-plate-static-analysis.mp4",
        poster: "assets/media/cubesat/hinge-plate-static-frame.jpg",
        alt: "ANSYS Mechanical screen recording of a static-structural strain result on a rectangular hinge plate.",
        caption: "Static-structural result on the hinge plate (equivalent elastic strain). Screen recording, 29\u00a0s.",
        width: 1920,
        height: 1080,
      },
      {
        kind: "video",
        src: "assets/media/cubesat/hinge-plate-frequency-analysis.mp4",
        poster: "assets/media/cubesat/hinge-plate-modal-frame.jpg",
        alt: "ANSYS Mechanical screen recording stepping through mode shapes of the hinge plate, with a frequency table for six modes.",
        caption: "Modal study of the same part, modes 1–6. Contour values in a modal solution are relative, not physical displacement. Screen recording, 30\u00a0s.",
        width: 1920,
        height: 1080,
      },
    ],
    files: [
      {
        label: "UCI CubeSat team poster",
        href: "assets/downloads/projects/extrakpak/what-is-uci-cubesat.pdf",
        type: "PDF",
        note: "Team-produced overview of the program, not my work alone",
      },
    ],
  },
  {
    id: "boundary-uav-assessment",
    title: "UAV hardware assessment",
    short: "UAV hardware assessment",
    group: "engineering",
    context: "Boundary Remote Subsurface Solutions, UAV Hardware Engineering Intern",
    period: "Sep 2026 – present",
    sortKey: "2026-09",
    featured: 2,
    summary:
      "A system-level engineering assessment of the company's current UAV design. I delivered it two weeks before the deadline, and the findings informed a change in the company's hardware direction.",
    facts: [
      { label: "Role", value: "UAV Hardware Engineering Intern, Sep 2026 – present" },
      { label: "Tools", value: "SOLIDWORKS, ANSYS, COMSOL" },
      { label: "Status", value: "Assessment complete; internship ongoing" },
      { label: "Disclosure", value: "Results, vehicle details and the new direction are under NDA" },
    ],
    sections: [
      {
        heading: "Scope",
        list: [
          "Mass and power budgets",
          "Structural load paths",
          "Thrust",
          "Propeller performance",
          "Flight performance envelope",
        ],
      },
      {
        heading: "How it went",
        paragraphs: [
          "I assessed the existing design across those areas using SOLIDWORKS, ANSYS and COMSOL, collaborated across departments, and delivered the assessment two weeks ahead of its deadline. I then presented the results to managers without engineering backgrounds so they could make a hardware decision. The findings informed a pivot in the company's hardware direction.",
        ],
      },
      {
        heading: "What this page doesn't show",
        paragraphs: [
          "The findings, the vehicle and the new direction are covered by a non-disclosure agreement, so this page sticks to scope, tools and outcome: no figures, numbers or test results.",
        ],
      },
    ],
    figures: [],
  },
  {
    id: "mae-106-autonomous",
    title: "Autonomous robot: test and calibration",
    short: "Autonomous robot",
    group: "course",
    context: "MAE 106 Mechanical Systems Lab, team of four",
    period: "Jan – Mar 2026",
    sortKey: "2026-01",
    featured: 3,
    cover: 0,
    teaser: "Experimental lead on a team robot: sensor calibration and the parameter sweeps behind two design decisions.",
    summary:
      "A pneumatically driven robot that had to drive 3 ft, turn about 90° and drive another 3 ft on its own. I was the team's experimental lead: sensor calibration, parameter sweeps and the data behind two design decisions.",
    facts: [
      { label: "Role", value: "Experimental lead (team roles: mechanical, controls, electrical, experimental)" },
      { label: "Hardware", value: "Arduino, LIS3MDL magnetometer, servo steering, solenoid-fired pneumatic cylinder at 30 psi, reed-switch odometry" },
      { label: "Tools", value: "MATLAB, Arduino IDE" },
      { label: "Status", value: "Course project, completed March 2026" },
    ],
    sections: [
      {
        heading: "The task",
        paragraphs: [
          "The robot pushes itself forward with a pneumatic cylinder fired by a solenoid, steers with a servo, and uses a magnetometer to hold its heading. It had to fit inside a 12-inch-diameter circle and then complete a forward–turn–forward sequence without input.",
        ],
        figures: [0],
      },
      {
        heading: "My part",
        list: [
          "Calibrated the magnetometer: logged raw readings while rotating it through 360°, computed offsets and scale factors in MATLAB, and put the calibration back into the Arduino code.",
          "Measured heading noise at fixed bearings (0°, 90°, 180°) and one-hour drift with a linear fit.",
          "Checked servo accuracy at six commanded angles with a protractor. It overshot by about 10° on average, which I noted for the TA before integration.",
          "Ran the duty-cycle and hinge-height experiments below, and helped with assembly, part fabrication and circuit troubleshooting.",
        ],
        figures: [1, 2],
      },
      {
        heading: "Decision 1: solenoid duty cycle",
        paragraphs: [
          "With the ON time fixed at 100 ms and pressure at 30 psi, I varied the OFF time across five settings from 400 to 1,400 ms, 10 runs each. The fastest setting (100/400 ms, about 2.4 m/s mean) also had the most run-to-run spread. We chose 100/900 ms: a little slower, but more consistent from run to run.",
        ],
        figures: [3],
      },
      {
        heading: "Decision 2: hopper hinge height",
        paragraphs: [
          "I tested five hinge heights from 210 to 270 mm, 10 runs of five hops each. Distance fell steadily as the hinge rose: 2.83 m at 210 mm against 0.30 m at 270 mm. We locked the hinge at 210 mm. The 225 mm setting was more repeatable (standard deviation 0.17 m versus 0.39 m) but gave up about 0.3 m per five hops; we chose distance.",
        ],
        figures: [4],
      },
      {
        heading: "Results and checks",
        paragraphs: [
          "In the final demonstration the robot drove at least 3 ft, turned about 90° and drove at least another 3 ft, which met the requirement; the run is recorded in the final report. Our measured position data was stair-stepped compared with the course simulator because the reed switch only registers a full wheel revolution.",
        ],
      },
      {
        heading: "Who did what",
        paragraphs: [
          "Teammates owned the chassis and propulsion design and its fabrication, the Arduino control code, and the wiring and electrical documentation. The final report lists each person's contributions.",
        ],
        figures: [5],
      },
    ],
    figures: [
      {
        kind: "image",
        src: "assets/media/robot/robot-hopper-hinge.jpg",
        alt: "Close-up of the robot: a laser-cut wooden frame with a ruler, the pneumatic cylinder and the bolted hinge used to set hopper height.",
        caption: "The adjustable hopper hinge used for the height sweep; bolts move the pivot between settings.",
        width: 1100,
        height: 1467,
      },
      {
        kind: "image",
        src: "assets/media/robot/magnetometer-raw.png",
        alt: "MATLAB scatter plot of raw magnetometer x–y readings forming an offset, elongated ring.",
        caption: "Raw magnetometer x–y readings during a 360° rotation: offset and unevenly scaled.",
        width: 900,
        height: 567,
      },
      {
        kind: "image",
        src: "assets/media/robot/magnetometer-calibrated.png",
        alt: "MATLAB scatter plot of calibrated magnetometer readings forming a ring centered on the origin.",
        caption: "After applying the offsets and scale factors: centered on the origin.",
        width: 900,
        height: 606,
      },
      {
        kind: "image",
        src: "assets/media/robot/robot-speed-vs-duty-cycle.png",
        alt: "Line plot of average robot speed against solenoid ON/OFF timing, falling from about 2.4 m/s at 100/400 ms to about 1.2 m/s at 100/1400 ms, with error bars.",
        caption: "Mean speed against solenoid timing, 10 runs per setting, with standard-deviation error bars.",
        width: 565,
        height: 334,
        plate: true,
      },
      {
        kind: "image",
        src: "assets/media/robot/robot-distance-vs-hinge-height.png",
        alt: "Line plot of distance travelled over five hops against hopper hinge height, falling from about 2.8 m at 210 mm to 0.3 m at 270 mm, with the 210 mm point starred as optimum.",
        caption: "Distance over five hops against hinge height, 10 runs per setting.",
        width: 1000,
        height: 647,
        plate: true,
      },
      {
        kind: "image",
        src: "assets/media/robot/robot-cad-render.jpg",
        alt: "SOLIDWORKS render of the robot: a large tire mounted on top of a column frame above a base plate with small wheels.",
        caption: "Team SOLIDWORKS model of the final robot.",
        width: 900,
        height: 1255,
        plate: true,
      },
    ],
    files: [
      { label: "Final report", href: "assets/downloads/projects/mae-106-autonomous/mae-106-autonomous-robot-final-report.pdf", type: "PDF", note: "Team report, 7.9 MB" },
      { label: "Experimental verification 1: magnetometer and servo characterization", href: "assets/downloads/projects/mae-106-autonomous/mae-106-autonomous-robot-experimental-verification-1.pdf", type: "PDF", note: "My deck, 3.3 MB" },
      { label: "Experimental verification 2: hopper hinge height", href: "assets/downloads/projects/mae-106-autonomous/mae-106-autonomous-robot-experimental-verification-2.pdf", type: "PDF", note: "My deck, 2.2 MB" },
    ],
  },
  {
    id: "mae-146-didymos",
    title: "Mission to Didymos: transfer-window search",
    short: "Mission to Didymos",
    group: "course",
    context: "MAE 146 Astronautics, course project (my code and report)",
    period: "Feb – Mar 2026",
    sortKey: "2026-02",
    featured: 4,
    cover: 1,
    teaser: "A MATLAB transfer search to a near-Earth asteroid: 16,290 Lambert solutions, cutting Δv from 20.0 to 7.9 km/s.",
    summary:
      "A preliminary Earth-to-Didymos transfer analysis in MATLAB, built on orbital-mechanics functions I wrote for the course. A porkchop search brought the transfer Δv from 20.028 km/s for the assigned dates down to 7.873 km/s.",
    facts: [
      { label: "Tools", value: "MATLAB" },
      { label: "Methods", value: "Two-body propagation (Kepler's equation), universal-variable Lambert solver, grid search" },
      { label: "Status", value: "Course analysis; preliminary, two-body only" },
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "The first three parts of the project were to write the basic astrodynamics functions: element/state conversions, propagation and a Lambert solver. The fourth used them to plan a transfer to the near-Earth asteroid Didymos. The assigned case departed Earth 12 days after the reference epoch and arrived 400 days later.",
        ],
      },
      {
        heading: "Approach",
        list: [
          "Converted reference Keplerian elements for Earth and Didymos to state vectors and propagated them with Kepler's equation.",
          "Solved Lambert's problem with a universal-variable formulation (Stumpff functions) between the departure and arrival positions.",
          "Took total Δv as the sum of departure and arrival velocity changes, assuming a zero sphere of influence at both bodies.",
          "Swept departure and arrival from 0 to 1,000 days in 5-day steps (a 201 × 201 grid), skipping flights of 100 days or less: 16,290 Lambert solutions.",
        ],
        figures: [0],
      },
      {
        heading: "Result",
        paragraphs: [
          "The fixed 400-day transfer needs 20.028 km/s. The porkchop minimum is 7.873 km/s, departing at day 595 and arriving at day 1,000.",
        ],
        figures: [1, 2],
      },
      {
        heading: "Limits",
        list: [
          "The minimum sits on the edge of the search window (arrival at day 1,000), so a wider window could find lower values.",
          "Two-body, prograde, single-revolution transfers only, with no launch-vehicle or arrival constraints. It is a course-level preliminary analysis, not a mission design.",
        ],
      },
    ],
    figures: [
      {
        kind: "image",
        src: "assets/media/didymos/didymos-porkchop.png",
        alt: "Porkchop contour plot of total delta-v against departure and arrival day, with an optimal point marked.",
        caption: "Porkchop plot of total Δv (km/s) against departure and arrival day; the marked point is the grid minimum.",
        width: 819,
        height: 874,
      },
      {
        kind: "image",
        src: "assets/media/didymos/didymos-optimal-transfer.png",
        alt: "3D plot of Earth's orbit, Didymos' orbit and the minimum-delta-v transfer arc around the Sun.",
        caption: "Minimum-Δv transfer: depart day 595, arrive day 1,000, 7.873 km/s.",
        width: 842,
        height: 442,
      },
      {
        kind: "image",
        src: "assets/media/didymos/didymos-nominal-transfer.png",
        alt: "3D plot of the assigned 400-day transfer arc between Earth's and Didymos' orbits.",
        caption: "Assigned 400-day transfer for comparison: 20.028 km/s.",
        width: 867,
        height: 424,
      },
    ],
    files: [
      { label: "Final report (problem 4)", href: "assets/downloads/projects/mae-146-didymos/mae-146-mission-to-didymos-final-report.pdf", type: "PDF" },
      { label: "Project assignment", href: "assets/downloads/projects/mae-146-didymos/mae-146-didymos-project-4.pdf", type: "PDF", note: "Course handout" },
      { label: "Mission script (problem4_didymos.m)", href: "assets/downloads/projects/mae-146-didymos/problem4_didymos.m", type: "MATLAB" },
      { label: "Lambert solver (lambert_universal.m)", href: "assets/downloads/projects/mae-146-didymos/lambert_universal.m", type: "MATLAB" },
      { label: "Kepler propagator (propagate_elliptical.m)", href: "assets/downloads/projects/mae-146-didymos/propagate_elliptical.m", type: "MATLAB" },
      { label: "True-anomaly propagator (propagate_elliptical_ta.m)", href: "assets/downloads/projects/mae-146-didymos/propagate_elliptical_ta.m", type: "MATLAB" },
      { label: "Elements to state vector (kep2rv.m)", href: "assets/downloads/projects/mae-146-didymos/kep2rv.m", type: "MATLAB" },
      { label: "State vector to elements (rv2kep.m)", href: "assets/downloads/projects/mae-146-didymos/rv2kep.m", type: "MATLAB" },
      { label: "Mean to true anomaly (ma2ta.m)", href: "assets/downloads/projects/mae-146-didymos/ma2ta.m", type: "MATLAB" },
      { label: "True to mean anomaly (ta2ma.m)", href: "assets/downloads/projects/mae-146-didymos/ta2ma.m", type: "MATLAB" },
      { label: "Stumpff functions (stumpff.m)", href: "assets/downloads/projects/mae-146-didymos/stumpff.m", type: "MATLAB" },
    ],
  },
  {
    id: "aerolab-suite",
    title: "AeroLab 2D and 3D",
    short: "AeroLab 2D and 3D",
    group: "software",
    context: "Personal project, browser-based aerodynamics tools",
    period: "Published Aug 2026",
    sortKey: "2026-08",
    featured: 5,
    cover: 0,
    teaser: "Browser aerodynamics labs for airfoils, aircraft, rockets and re-entry. Both run live on this site.",
    summary:
      "Two interactive aerodynamics labs that run in the browser. AeroLab 2D is for airfoils; AeroLab 3D covers aircraft, model rockets and atmospheric re-entry. Both are live on this site.",
    facts: [
      { label: "Built with", value: "JavaScript, WebGL 2" },
      { label: "Runs", value: "Entirely in the browser; no install, account or data collection" },
      { label: "Status", value: "Live. Educational tool; no published comparison against reference data" },
    ],
    sections: [
      {
        heading: "AeroLab 2D",
        paragraphs: [
          "Pairs a GPU lattice-Boltzmann (D2Q9) flow view with a Hess–Smith panel method and an integral boundary-layer model (Thwaites laminar, Michel transition, Head turbulent) for NACA airfoils: pressure distributions, lift and drag, transition and separation.",
        ],
        figures: [0],
      },
      {
        heading: "AeroLab 3D",
        paragraphs: [
          "Vortex-lattice aircraft analysis with viscous drag estimates and static-stability readouts, Barrowman stability and drag build-up for rockets, and an atmospheric re-entry trajectory model.",
        ],
        figures: [1],
      },
      {
        heading: "Limits",
        paragraphs: [
          "These are learning tools built on standard textbook methods, with those methods' usual assumptions. I haven't published comparisons against wind-tunnel data or reference codes, so treat the outputs as estimates.",
        ],
      },
    ],
    figures: [
      {
        kind: "image",
        src: "assets/media/aerolab/aerolab-2d-vortex-street.jpg",
        thumb: "assets/media/aerolab/aerolab-2d-vortex-street-thumb.jpg",
        alt: "AeroLab 2D vorticity view: a NACA 2412 airfoil at 14 degrees with flow separating from the upper surface and a street of red vortices shed downstream.",
        caption:
          "AeroLab 2D at 14° angle of attack (NACA 2412): the lattice-Boltzmann view shows the flow separating from the upper surface and shedding a vortex street. The lattice runs at a far lower Reynolds number than a full-size wing, so this is a qualitative picture.",
        width: 1350,
        height: 632,
      },
      {
        kind: "image",
        src: "assets/media/aerolab/aerolab-3d-rocket-stability.png",
        alt: "AeroLab 3D rocket view with flow tracers and panels showing center of pressure, center of gravity and drag breakdown.",
        caption: "AeroLab 3D: rocket stability view with center of pressure, center of gravity and drag build-up.",
        width: 1274,
        height: 879,
      },
    ],
    links: [
      { label: "Open AeroLab 2D", href: "aerolab/", type: "App" },
      { label: "Open AeroLab 3D", href: "aerolab-3d/", type: "App" },
    ],
  },
  {
    id: "extrakpak-drone",
    title: "ExtrakPak: heavy-lift recovery UAV proposal",
    short: "Recovery UAV proposal",
    group: "course",
    context: "ENGR 190W Communications in the Professional World, team of three",
    period: "Jan – Mar 2025",
    sortKey: "2025-01",
    cover: 1,
    summary:
      "A written technical proposal for a remotely operated drone that could recover fallen service members without sending a crew into danger. I wrote the vehicle, grappling-system, remote-command and regulatory sections.",
    facts: [
      { label: "My sections", value: "Introduction, proposal statement, drone, grappling system, remote command unit, regulatory compliance, user risk management" },
      { label: "Status", value: "Paper concept. Nothing was built or flown" },
    ],
    sections: [
      {
        heading: "Concept",
        paragraphs: [
          "A six-motor electric multirotor with a carbon-fiber airframe about 2 m across, targeting a 200 kg payload for about an hour, with four compliant grappling arms modeled on octopus arms and a separate remote command unit.",
        ],
        figures: [0, 1],
      },
      {
        heading: "What I worked through",
        list: [
          "Requirements and architecture for the airframe, propulsion, flight computers, communications and command unit.",
          "Thrust-to-weight and order-of-magnitude feasibility estimates at maximum payload.",
          "Regulatory constraints, including FAA Part 107 and OSHA workplace-safety rules, and the user-risk section.",
        ],
      },
      {
        heading: "Limits",
        paragraphs: [
          "Payload and endurance figures are proposal targets, not demonstrated performance. No vehicle was built, flown or certified.",
        ],
      },
    ],
    figures: [
      {
        kind: "image",
        src: "assets/media/extrakpak/extrakpak-layout.png",
        alt: "Simple top-view sketch of a six-arm multirotor around a central box labeled as the airframe housing flight computers and sensors, with an antenna.",
        caption: "Top-view layout sketch from the proposal: six rotor arms around the central airframe.",
        width: 513,
        height: 463,
      },
      {
        kind: "image",
        src: "assets/media/extrakpak/extrakpak-data-flow.png",
        alt: "Block diagram: GPS, radar, LiDAR, accelerometer, gyroscope and compass feed three independent flight computers, alongside grappler, camera, battery and cache-storage blocks, linked by antenna and satellite to the remote command unit.",
        caption: "Data-flow schematic from the proposal: sensors into three independent flight computers, linked to the remote command unit.",
        width: 889,
        height: 549,
      },
    ],
    files: [
      { label: "Technical proposal", href: "assets/downloads/projects/extrakpak/military-sar-drone-technical-proposal.docx", type: "DOCX", note: "Group paper, 1.5 MB" },
      { label: "Presentation", href: "assets/downloads/projects/extrakpak/military-sar-drone-technical-proposal-presentation.pptx", type: "PPTX", note: "4.5 MB" },
    ],
  },
  {
    id: "lunar-impact",
    title: "Reinforced ice for lunar micrometeoroid protection",
    short: "Lunar ice impact study",
    group: "course",
    context: "ENGR 54 Principles of Materials Science, team of seven",
    period: "May – Jun 2025",
    sortKey: "2025-05",
    summary:
      "Drop tests on ice reinforced with paper and plastic, plus an energy-balance estimate for stopping a micrometeoroid. Paper reinforcement helped in our tests; the estimate showed passive ice shielding doesn't scale.",
    facts: [
      { label: "My part", value: "Helped plan and run the drop tests and the energy-balance analysis" },
      { label: "Status", value: "Course project, completed" },
    ],
    sections: [
      {
        heading: "Question",
        paragraphs: [
          "Ice mined from lunar craters is exposed to micrometeoroids, and pure ice is brittle. Could waste materials on hand, like toilet paper and plastic bags, make it tougher? And how thick would ice need to be to stop a 3 cm iron micrometeoroid at 42 km/s?",
        ],
      },
      {
        heading: "Test",
        paragraphs: [
          "We froze 33 one-inch spheres: pure ice, ice with toilet-paper strips, with plastic strips, and mixes at several loadings. We dropped them from about 0.5 m to 8 m (heights from a phone barometer, checked against a measured 30 cm rise) and estimated damage visually as a percentage.",
        ],
        figures: [0, 1],
      },
      {
        heading: "Findings",
        paragraphs: [
          "Paper (cellulose) reinforcement generally reduced damage compared with plastic alone. The energy balance for the modeled micrometeoroid showed that the ice thickness needed is impractical.",
        ],
      },
      {
        heading: "Limits",
        list: [
          "One or two samples per configuration and visual damage estimates make the data noisy: pure-ice controls dropped from 8 m showed both 5% and 80% damage.",
          "Low-speed drops say nothing direct about hypervelocity impact. The micrometeoroid case was only calculated.",
        ],
        figures: [2],
      },
    ],
    cover: 0,
    figures: [
      {
        kind: "image",
        src: "assets/media/lunar/lunar-samples-in-mold.jpg",
        alt: "Ice-sphere mold on a table with crumpled toilet paper in some cavities and plastic strips in others, before freezing.",
        caption: "Samples before freezing: toilet-paper and plastic reinforcement in the sphere mold.",
        width: 900,
        height: 1200,
      },
      {
        kind: "image",
        src: "assets/media/lunar/lunar-sample-after-drop.jpg",
        alt: "A cracked, partly shattered ice sphere held in a palm after a drop test.",
        caption: "A sample after its drop; damage was estimated by eye as a percentage.",
        width: 900,
        height: 1200,
      },
      {
        kind: "image",
        src: "assets/media/lunar/lunar-pure-ice-damage-chart.png",
        alt: "Bar chart of kinetic energy and estimated damage for pure-ice samples at drop heights from 0.5 to 8 m; estimated damage varies widely between samples at the same height.",
        caption: "Team chart for the pure-ice controls: kinetic energy (blue) and estimated damage (red) by drop height. The two 8 m samples disagree sharply.",
        width: 1000,
        height: 618,
        plate: true,
      },
    ],
    files: [
      { label: "Final presentation", href: "assets/downloads/projects/lunar-impact/lunar-micrometeoroid-impact-projection-analysis.pptx", type: "PPTX", note: "Large file, 36.6 MB" },
    ],
  },
  {
    id: "mae-106-pid",
    title: "PD control of an inverted pendulum",
    short: "PD/PID controller design",
    group: "course",
    context: "MAE 106 Mechanical Systems Lab, individual assignment",
    period: "Feb 2026",
    sortKey: "2026-02",
    cover: 0,
    summary:
      "Derived the closed-loop dynamics of a cart–pendulum under PD control, chose gains and checked stability in simulation.",
    facts: [
      { label: "Tools", value: "Hand derivation; course-provided simulation code" },
      { label: "Status", value: "Simulation only; no hardware" },
    ],
    sections: [
      {
        heading: "Work",
        paragraphs: [
          "I wrote the closed-loop transfer function and its poles as functions of the gains, and found the condition on Kp for complex poles. With a 1 kg cart, a 0.5 kg pendulum and a 1 m length, I chose Kp = 50 and Kd = 5, which puts the poles at −2.5 ± 5.39j: stable and underdamped. The same controller recovered from initial angles up to 0.78 rad in simulation.",
          "I argued that an integral term isn't needed here, because there is no constant disturbance to reject, and that it would add a pole at the origin and reduce the stability margin.",
        ],
        figures: [0, 1],
      },
    ],
    figures: [
      {
        kind: "image",
        src: "assets/media/pid/pid-p-vs-pd-response.png",
        alt: "Plot of pendulum angle over 10 seconds: the P-only response oscillates with growing amplitude while the PD response settles to zero within about a second.",
        caption: "P versus PD response from the same initial angle: the derivative term supplies the damping.",
        width: 581,
        height: 432,
        plate: true,
      },
      {
        kind: "image",
        src: "assets/media/pid/pid-closed-loop-poles.png",
        alt: "Complex-plane plot with two closed-loop poles at real part −2.5 and imaginary parts ±5.4.",
        caption: "Closed-loop poles for Kp = 50, Kd = 5.",
        width: 527,
        height: 524,
        plate: true,
      },
    ],
    files: [{ label: "Controller design report", href: "assets/downloads/projects/mae-106-pid/mae-106-pid-controller-design-report.pdf", type: "PDF" }],
  },
  {
    id: "exohunt",
    title: "EXOHUNT: open TESS transit search",
    short: "EXOHUNT",
    group: "software",
    context: "Personal open-source project",
    period: "Jul 2026 – present",
    sortKey: "2026-07",
    summary:
      "A pipeline that processes public NASA TESS light curves, searches for transits and tests itself by recovering known planets. Any other signals it finds are unvetted candidates, not discoveries.",
    facts: [
      { label: "Built with", value: "Python (Lightkurve, Astroquery), pytest; Node.js for the local dashboard" },
      { label: "Status", value: "Ongoing, open source (MIT). Methods and limits are documented in the repository" },
    ],
    sections: [
      {
        heading: "What it does",
        list: [
          "Downloads processed TESS light curves, detrends them and runs a Box Least Squares period search, writing a JSON screening report and a diagnostic plot for each star.",
          "Checks itself on known planets first: a five-case benchmark, including a shallow sub-Neptune and a deliberate harmonic-alias case, confirms the pipeline works before it is pointed at new stars.",
          "Masks the transits of already-known planets in a system and searches what is left, then cross-checks signals against the NASA Exoplanet Archive's candidate and confirmed-planet tables.",
          "Builds target lists from saved selection criteria and runs resumable batch campaigns with bounded disk use, with a local-only dashboard for reviewing them.",
        ],
      },
      {
        heading: "Known-planet check",
        paragraphs: [
          "In the benchmark run of July 22, 2026, four of the five known planets came back at their catalog periods; WASP-18 b was recovered at 0.941489 days against the archive's 0.941452. TOI-700 c, the deliberate stress test, came back at half its period, which is the alias that case exists to expose.",
        ],
        figures: [0],
      },
      {
        heading: "Limits",
        paragraphs: [
          "A BLS detection is a screening result, not a planet. Eclipsing binaries, nearby stars, stellar variability and spacecraft systematics all produce look-alike signals, and a missing catalog match doesn't prove a signal is new. Anything beyond the known planets is an unvetted candidate until it has been reviewed and independently confirmed.",
        ],
      },
    ],
    cover: 0,
    figures: [
      {
        kind: "image",
        src: "assets/media/exohunt/exohunt-wasp-18b-validation.png",
        thumb: "assets/media/exohunt/exohunt-wasp-18b-thumb.jpg",
        alt: "Three-panel plot for WASP-18 in TESS sector 2: a detrended light curve with regular transit dips, a box-least-squares period search peaking near 0.94 days, and the folded transit dip.",
        caption:
          "Validation output for WASP-18 b (TESS sector 2): detrended light curve, BLS period search and the light curve folded at the recovered period.",
        width: 1200,
        height: 1080,
        plate: true,
      },
    ],
    links: [{ label: "EXOHUNT on GitHub", href: "https://github.com/spacexkspofficial/Exoplanet-Discoveries", type: "Repository" }],
  },
  {
    id: "obd-scanner",
    title: "Read-only OBD-II diagnostic dashboard",
    short: "OBD-II dashboard",
    group: "software",
    context: "Personal project, built for my 2013 Dodge Charger R/T",
    period: "Published May 2026",
    sortKey: "2026-05",
    cover: 0,
    summary:
      "A local web app that streams live vehicle diagnostic data over a USB OBD-II adapter. It is designed so it cannot write to the car: every outgoing request passes through a fixed allowlist of read-only services.",
    facts: [
      { label: "Built with", value: "Python, FastAPI, WebSocket, JavaScript" },
      { label: "Hardware", value: "OBDLink EX (STN2120) USB cable; ISO 15765-4 CAN at 500 kbps" },
      { label: "Status", value: "Personal tool; source code isn't published. The screenshot shows the app on its mock adapter" },
    ],
    sections: [
      {
        heading: "Design",
        list: [
          "FastAPI and WebSocket back end with a single-page front end for live parameter streaming and stored, pending and permanent trouble codes.",
          "Adapter layer for an OBDLink EX (STN2120) and generic ELM327 cables, with automatic port detection for the OBDLink.",
          "A mock adapter that generates synthetic data for the same car, so the interface can be developed and demonstrated without a cable.",
          "Vehicles described in plain JSON files: protocol, parameter groups and poll rates, identifiers and thresholds.",
          "A passive capture log of every ECU response, including negative responses, for studying undocumented identifiers.",
        ],
        figures: [0],
      },
      {
        heading: "Safety boundary",
        paragraphs: [
          "Only read-only diagnostic services are allowed out ($01, $02, $03, $07, $09, $0A, $19, $22, $3E). Clearing codes, resets, security access, routine control and reprogramming are rejected at the serial layer, and regression tests cover the allowlist.",
        ],
      },
    ],
    figures: [
      {
        kind: "image",
        src: "assets/media/obd-scanner/obd-dashboard-mock.jpg",
        thumb: "assets/media/obd-scanner/obd-dashboard-mock-thumb.jpg",
        alt: "OBD Scanner dashboard: read-only and mock-adapter badges, a capture-mode panel, a coolant-temperature alarm, dials for engine RPM, speed, coolant temperature, module voltage, throttle and fuel, and a table of live readings.",
        caption:
          "The dashboard on its mock adapter (synthetic 2013 Charger R/T data, not a live car): read-only badge, capture controls, live dials and the full reading table. The coolant alarm is the simulated engine still warming up.",
        width: 1600,
        height: 1000,
      },
    ],
  },
  {
    id: "mechanical-logs",
    title: "Vehicle maintenance and upgrades",
    short: "Vehicle work log",
    group: "hands-on",
    context: "Personal vehicles: 2013 Dodge Charger 5.7 L and 2008 Ford Mustang 4.0 L",
    period: "Ongoing",
    sortKey: "2025-01",
    cover: 0,
    summary: "Work on two personal vehicles: brakes, suspension, exhaust, lighting, trim and an engine-computer flash tune.",
    facts: [{ label: "Work", value: "Rotors and pads, coilovers, muffler delete, tail lights, spoiler, steering-wheel airbag cover, handheld flash tune" }],
    sections: [
      {
        heading: "Photos and clips",
        figures: [0, 1, 2, 3, 4, 5, 6],
      },
    ],
    figures: [
      {
        kind: "image",
        src: "assets/media/charger/charger-rotor-pad-upgrade-web.jpg",
        alt: "Silver Dodge Charger raised on a jack stand in a driveway with a front wheel off and tools and parts on the ground.",
        caption: "Charger: rotor and pad replacement.",
        width: 800,
        height: 1420,
      },
      {
        kind: "video",
        src: "assets/media/charger/charger-coilover-upgrade.mp4",
        poster: "assets/media/charger/charger-coilover-upgrade-poster.jpg",
        alt: "Short clip of the Charger after a coilover suspension install.",
        caption: "Charger: coilover suspension install. 9\u00a0s.",
        width: 720,
        height: 1280,
      },
      {
        kind: "video",
        src: "assets/media/charger/charger-rotor-pad-upgrade.mp4",
        poster: "assets/media/charger/charger-rotor-pad-upgrade-poster.jpg",
        alt: "Short clip from the brake job on the Charger.",
        caption: "Charger: brake job. 15\u00a0s.",
        width: 720,
        height: 1280,
      },
      {
        kind: "image",
        src: "assets/media/charger/charger-spoiler-install-web.jpg",
        alt: "Rear of a silver Dodge Charger in a garage with tools and parts laid out on a blanket behind it.",
        caption: "Charger: spoiler install.",
        width: 800,
        height: 1420,
      },
      {
        kind: "image",
        src: "assets/media/charger/charger-airbag-upgrade-web.jpg",
        alt: "Charger steering wheel with the airbag module removed and the new R/T cover held up in front of it.",
        caption: "Charger: steering-wheel airbag cover replacement.",
        width: 800,
        height: 1422,
      },
      {
        kind: "image",
        src: "assets/media/mustang/mustang-flash-tune.jpg",
        alt: "Handheld tuner showing 'Program vehicle, saving stock data, 11%' in front of a Mustang instrument cluster.",
        caption: "Mustang: flash tune in progress, saving the stock calibration first.",
        width: 1100,
        height: 2024,
      },
      {
        kind: "video",
        src: "assets/media/mustang/mustang-muffler-delete.mp4",
        poster: "assets/media/mustang/mustang-muffler-delete-poster.jpg",
        alt: "Short clip of the Mustang's exhaust after a muffler delete.",
        caption: "Mustang: exhaust after the muffler delete. 6\u00a0s, with sound.",
        width: 672,
        height: 1232,
      },
    ],
    files: [
      { label: "Mustang tail-light upgrade clip", href: "assets/media/mustang/mustang-tail-light-upgrade.mp4", type: "Video", note: "2\u00a0s" },
    ],
  },
  {
    id: "photon-paths",
    title: "Photon paths near a black hole (exploratory sketch)",
    short: "Photon paths sketch",
    group: "archive",
    context: "Personal MATLAB visualization",
    period: "Jan 2026",
    sortKey: "2026-01",
    cover: 0,
    summary:
      "A picture of light bending near a black hole, not a relativity solver. Photons are stepped with a pseudo-Newtonian pull, and the critical path is drawn by hand for illustration.",
    facts: [{ label: "Status", value: "Exploratory visualization" }],
    sections: [
      {
        heading: "How it works",
        paragraphs: [
          "Each photon starts on a straight line with a chosen impact parameter. At every step the script applies a Paczyński–Wiita acceleration, GM/(r − Rs)², renormalizes the speed to c and moves forward with explicit Euler integration. Rays launched inside the textbook critical impact parameter (3√3/2 Rs) are colored red and rays launched outside are colored yellow; the color comes from the starting offset, not from the simulated outcome.",
          "The cyan \"critical\" orbit is constructed by hand from a blended approach curve, a circular arc at the photon sphere and an inward spiral. It is not computed.",
        ],
        figures: [0],
      },
      {
        heading: "What it isn't",
        paragraphs: [
          "The Paczyński–Wiita potential was designed to mimic some orbits of massive particles, not null geodesics, and the script doesn't integrate the geodesic equations. Its capture boundary hasn't been checked against general relativity.",
        ],
      },
    ],
    figures: [
      {
        kind: "image",
        src: "assets/media/photons/photon-blackhole-simulation.png",
        alt: "MATLAB figure on a black background: red photon paths falling into a black sphere, yellow paths bending away, and a cyan path wrapping around a dashed orange photon-sphere ring.",
        caption: "Output figure. The cyan path is drawn analytically for illustration.",
        width: 1412,
        height: 979,
      },
    ],
    files: [{ label: "Source (photon-blackhole-simulation.m)", href: "assets/downloads/projects/thermo/photon-blackhole-simulation.m", type: "MATLAB" }],
  },
  {
    id: "thermo-notebooks",
    title: "Thermodynamics notebooks",
    short: "Thermodynamics notebooks",
    group: "archive",
    context: "MAE 91 Introduction to Thermodynamics, coursework",
    period: "Coursework",
    sortKey: "2024-01",
    summary:
      "Python homework notebooks using CoolProp, NumPy and Matplotlib: an adiabatic mixing chamber, a Rankine cycle, polytropic ideal-gas processes, turbine plots and isothermal expansion.",
    facts: [{ label: "Status", value: "Course assignments" }],
    cover: 0,
    sections: [
      {
        heading: "Selected plots",
        figures: [0, 1],
      },
    ],
    figures: [
      {
        kind: "image",
        src: "assets/media/thermo/rankine-ts-diagram.png",
        thumb: "assets/media/thermo/rankine-ts-diagram-thumb.jpg",
        alt: "Temperature-entropy diagram of a Rankine cycle with superheated turbine inlet, drawn over the water saturation dome.",
        caption: "T–s diagram of a Rankine cycle with a superheated turbine inlet (8 MPa, 480 °C), from the notebook's CoolProp property calls.",
        width: 583,
        height: 477,
        plate: true,
      },
      {
        kind: "image",
        src: "assets/media/thermo/water-pv-isothermal.png",
        alt: "Pressure-volume plot for water on log axes with the saturation dome and an isothermal expansion at 250 degrees Celsius through the two-phase plateau.",
        caption: "Isothermal expansion of water at 250 °C across the saturation dome, on log axes.",
        width: 653,
        height: 470,
        plate: true,
      },
    ],
    files: [
      { label: "Adiabatic mixing and Rankine cycle", href: "assets/downloads/projects/thermo/adiabatic-mixing-and-rankine-cycle.ipynb", type: "Notebook" },
      { label: "Polytropic ideal gas and turbine plots", href: "assets/downloads/projects/thermo/polytropic-ideal-gas-and-turbine-plots.ipynb", type: "Notebook" },
      { label: "Temperature conversion and isothermal expansion", href: "assets/downloads/projects/thermo/temperature-conversion-and-isothermal-expansion.ipynb", type: "Notebook" },
    ],
  },
  {
    id: "periodic-table-db",
    title: "Periodic table database in MATLAB",
    short: "Periodic table database",
    group: "archive",
    context: "MAE 10 Introduction to Engineering Computations, team project",
    period: "Sep – Dec 2023",
    sortKey: "2023-09",
    summary:
      "A MATLAB tool that loads element properties from a CSV file, answers lookups by element symbol and plots periodic trends such as electronegativity and ionization energy against atomic number.",
    facts: [{ label: "Status", value: "Team course project, completed December 2023" }],
    cover: 0,
    sections: [
      {
        heading: "Output",
        figures: [0],
      },
    ],
    figures: [
      {
        kind: "image",
        src: "assets/media/matlab-db/ionization-energy-plot.png",
        thumb: "assets/media/matlab-db/ionization-energy-plot-thumb.jpg",
        alt: "MATLAB figure plotting first ionization energy against atomic number, with peaks at the noble gases.",
        caption: "One of the tool's trend plots: first ionization energy against atomic number.",
        width: 555,
        height: 500,
        plate: true,
      },
    ],
    files: [{ label: "Project report", href: "assets/downloads/projects/matlab-db/matlab-periodic-table-database-report.docx", type: "DOCX" }],
  },
  {
    id: "policy-writing",
    title: "Broadband policy analysis",
    short: "Broadband policy analysis",
    group: "archive",
    context: "ICS 11 Internet and Public Policy, group work",
    plate: "Memos and briefing decks",
    period: "Coursework",
    sortKey: "2024-06",
    summary:
      "Staffer-style memos and decks on H.R. 1870 and broadband funding, and on FCC data caps and throttling.",
    facts: [{ label: "Status", value: "Course assignments" }],
    sections: [],
    figures: [],
    files: [
      { label: "H.R. 1870 staffer report", href: "assets/downloads/projects/policy/hr-1870-analysis.docx", type: "DOCX" },
      { label: "H.R. 1870 presentation", href: "assets/downloads/projects/policy/hr-1870-presentation.pptx", type: "PPTX", note: "4.4 MB" },
      { label: "Data caps and throttling presentation", href: "assets/downloads/projects/policy/fcc-data-throttling-and-data-caps-analysis.pptx", type: "PPTX", note: "2 MB" },
      { label: "Data caps and throttling write-up", href: "assets/downloads/projects/policy/fcc-data-throttling-and-data-caps-presentation.docx", type: "DOCX" },
    ],
  },
];

export const PROJECT_GROUPS: { id: ProjectGroup; title: string; blurb: string }[] = [
  { id: "engineering", title: "Engineering work", blurb: "Internship and spacecraft-team hardware." },
  { id: "course", title: "Course and team projects", blurb: "Lab, design and analysis projects at UC Irvine." },
  { id: "software", title: "Software and tools", blurb: "Things I built on my own time." },
  { id: "hands-on", title: "Hands-on", blurb: "Work on my own vehicles." },
  { id: "archive", title: "Archive", blurb: "Smaller coursework and an exploratory sketch, kept for reference." },
];

/** The figure used as a project's thumbnail, preferring its 4:3 crop. */
export function coverFigure(project: Project): Figure | undefined {
  if (project.cover === undefined) return undefined;
  const figure = project.figures[project.cover];
  if (!figure) return undefined;
  if (!figure.thumb) return figure;
  return { ...figure, kind: "image", src: figure.thumb, width: 800, height: 600, plate: false };
}

export function teaser(project: Project): string {
  return project.teaser ?? `${project.summary.split(/(?<=\.)\s/)[0]}`;
}

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export function featuredProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured).sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));
}
