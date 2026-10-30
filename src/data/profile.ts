// Single source of truth for professional facts used by the site and the
// resume (HTML page, static /resume/ pages and PDFs). Edit facts here, then run
// `npm run resume` to regenerate the resume files. Dates are "YYYY-MM";
// a missing `end` means the role is current.

export const PERSON = {
  name: "Alexander Amadeo-Ranch",
  givenName: "Alexander",
  headline: "Aerospace engineering student, UC Irvine",
  focus: "Mechanical design, structures and hardware integration",
  targetRoles: "Mechanical design, structural analysis and hardware integration / test",
  introduction: "Aerospace engineering student at UC Irvine. I design, analyze and build hardware for CubeSat ground integration.",
  location: "Los Angeles Metropolitan Area",
  // LinkedIn is the only public point of contact (owner's choice): no email or
  // phone on the site or in the published resumes.
  linkedin: "https://www.linkedin.com/in/alexamadeoranch/",
  linkedinLabel: "linkedin.com/in/alexamadeoranch",
  github: "https://github.com/spacexkspofficial",
  githubLabel: "github.com/spacexkspofficial",
  site: "https://alexengineer.net",
  siteLabel: "alexengineer.net",
  workAuthorization: "U.S. citizen",
  availableFrom: "April 2027",
  availability: "Available for full-time engineering roles from April 2027.",
  /** Shown in the hero and resume header. Keep in sync with EXPERIENCE. */
  currentRoles: [
    { title: "UAV Hardware Engineering Intern", org: "Boundary Remote Subsurface Solutions", since: "2026-09" },
    { title: "Systems Engineer", org: "UCI CubeSat", since: "2026-03" },
  ],
} as const;

export interface Role {
  title: string;
  start: string;
  end?: string;
  location?: string;
  bullets?: string[];
}

export interface Workstream {
  heading: string;
  bullets: string[];
  /** Render after this role title (defaults to after all roles). */
  afterRole?: string;
}

export type ExperienceGroup = "engineering" | "software" | "operations";

export interface Organization {
  id: string;
  name: string;
  descriptor?: string;
  location?: string;
  group: ExperienceGroup;
  roles: Role[];
  /** Work that spans roles at the same organization (not attributable to one title). */
  workstreams?: Workstream[];
  /** One line for the home-page summary. */
  summary?: string;
  projectId?: string;
  note?: string;
}

export const EXPERIENCE: Organization[] = [
  {
    id: "boundary",
    name: "Boundary Remote Subsurface Solutions",
    location: "Los Angeles Metropolitan Area",
    group: "engineering",
    projectId: "boundary-uav-assessment",
    summary:
      "Completed a system-level assessment of the company's UAV design, two weeks ahead of schedule. The findings informed a change in hardware direction.",
    note: "Assessment complete; internship ongoing. Specific findings are confidential.",
    roles: [
      {
        title: "UAV Hardware Engineering Intern",
        start: "2026-09",
        bullets: [
          "Completed a system-level engineering assessment of the current UAV design covering mass and power budgets, structural load paths, thrust, propeller performance and the flight envelope, using SOLIDWORKS, ANSYS and COMSOL.",
          "Delivered the assessment two weeks ahead of its deadline; the findings informed a change in the company's hardware direction.",
          "Collaborated across departments and presented technical findings to nontechnical managers to support hardware decisions.",
        ],
      },
    ],
  },
  {
    id: "uci-cubesat",
    name: "UCI CubeSat",
    descriptor: "Student spacecraft program",
    location: "Irvine, CA",
    group: "engineering",
    projectId: "cubesat-structures",
    summary:
      "Built FlatSat V1, an avionics bench fixture for up to 12 PCBs, and designed, printed and installed its 14 mounts. Structural analysis since early 2025.",
    roles: [
      {
        title: "Systems Engineer",
        start: "2026-03",
        bullets: [
          "Built FlatSat V1, a modular aluminum-extrusion bench fixture that holds up to 12 avionics PCBs for ground integration and testing; simplifying the design reduced the total FlatSat purchase-order cost by 30% compared with V0.",
          "Designed, 3D-printed in PLA and installed all 14 custom extrusion mounts, replacing an expensive commercial part with a long lead time so assembly did not wait on procurement.",
        ],
      },
      {
        title: "Structural Engineer",
        start: "2025-09",
        end: "2026-03",
        bullets: [
          "Designed and evaluated structural components for internal bus integration and external radiation shielding under mass, stiffness and envelope constraints, using SOLIDWORKS and ANSYS Mechanical static-structural and modal analysis.",
          "Ran trade studies on manufacturability, integration tolerances and launch survivability, and produced documentation for fabrication, assembly and integration.",
          "Coordinated payload-interface work with the STMS research group.",
        ],
      },
      {
        title: "Chief Integration Officer",
        start: "2024-10",
        end: "2025-09",
        bullets: [
          "Coordinated mechanical, electrical and payload interfaces across subteams during integration and served as the primary liaison between CubeSat leadership and the STMS research group.",
          "Contributed to internal and external communications on spacecraft integration and program status.",
        ],
      },
      {
        title: "Executive Assistant",
        start: "2023-09",
        end: "2024-10",
        bullets: [
          "Supported project leadership with documentation, scheduling and internal coordination during early program development.",
        ],
      },
    ],
    workstreams: [
      {
        heading: "Structural analysis, 2025–present",
        afterRole: "Structural Engineer",
        bullets: [
          "Analyzed the M3 standoffs carrying the internal bus stack for end-cap-to-end-cap tension and launch vibration, considering PCB vibration limits; calculated a factor of safety of 5 against yield by calculation and simulation (physical vibration testing pending). Design approved by subteam leads and project managers.",
          "Designed to thermal constraints supplied by the thermal-analysis subteam and reviewed their documentation.",
        ],
      },
    ],
  },
  {
    id: "founder-to-founder",
    name: "Founder to Founder Partners",
    location: "San Francisco Bay Area",
    group: "software",
    summary: "Built an AI-assisted Python/Node.js research pipeline that delivered 1,000 verified lead records across all 50 states.",
    roles: [
      {
        title: "System Engineer",
        start: "2026-07",
        bullets: [
          "Built an AI-assisted Python/Node.js research pipeline that turned licensing, Census, federal-contract, industry-directory and company data into 1,000 unique qualified lead records spanning all 50 states.",
          "Added verification and traceability controls: screening against a 1,193-record exclusion registry, maintaining 3,822 source-evidence records and documenting 154 disqualifications before delivery.",
          "Delivered the complete system in approximately 18 engineering hours (about 56 leads per hour), saving 30% of the client's budget with $0 in external operating costs.",
        ],
      },
    ],
  },
  {
    id: "spirit-hero",
    name: "Spirit Hero, LLC",
    location: "California",
    group: "software",
    summary: "Shopify storefront performance and front-end fixes; a web parser that produced a 100,000+ record lead workbook.",
    roles: [
      { title: "Systems & Automation Engineer", start: "2026-06" },
      {
        title: "Software Developer",
        start: "2026-03",
        end: "2026-06",
        bullets: [
          "Modernized Shopify theme UI/UX and collection pages while keeping the existing brand.",
          "Reduced page load time by 5–10% and front-end warnings by 20% through JavaScript cleanup, Liquid debugging and conservative theme refactors.",
          "Built a web parser that produced a 100,000+ record lead workbook, with an updatable extraction and search setup for repeat runs.",
        ],
      },
    ],
  },
  {
    id: "sherman-oaks-chamber",
    name: "Sherman Oaks Chamber of Commerce",
    location: "Los Angeles, CA",
    group: "software",
    summary: "Built the Sherman Oaks 2027 centennial website end to end; now maintain it.",
    roles: [
      { title: "Website Maintainer", start: "2026-10" },
      {
        title: "Web Developer",
        start: "2026-05",
        end: "2026-10",
        bullets: [
          "Built the Sherman Oaks 2027 centennial website end to end in HTML, CSS and vanilla JavaScript: one hub for four events, sponsorship outreach and resident participation.",
          "Built an interactive Leaflet/MapLibre map of 8 historic locations with 7 then-and-now photo comparisons, synchronized pins and shareable location links.",
          "Built sponsorship comparison and inquiry flows covering 20 offerings across the 4 events.",
          "Deferred more than 1 MB of mapping libraries and checked layouts from 320 to 1440 px; added technical SEO across 7 canonical pages and keyboard, focus and contrast fixes, reaching zero automated axe-core violations across 36 page-and-viewport combinations.",
        ],
      },
    ],
  },
  {
    id: "amadeo-associates",
    name: "Amadeo & Associates",
    location: "California",
    group: "software",
    roles: [
      { title: "Software Engineer", start: "2025-10" },
      { title: "Automotive Technician", start: "2020-12", end: "2026-10" },
      { title: "Administrative Assistant", start: "2014-08", end: "2020-12" },
    ],
  },
  {
    id: "target",
    name: "Target",
    location: "Irvine, CA",
    group: "operations",
    roles: [{ title: "Closing Expert", start: "2026-08" }],
  },
  {
    id: "town-of-danville",
    name: "Town of Danville",
    descriptor: "Aquatics",
    location: "Danville, CA",
    group: "operations",
    summary: "Worked up from Junior Guard to Pool Manager, supervising a staff of 75+ and writing its training documentation.",
    roles: [
      {
        title: "Pool Manager",
        start: "2022-08",
        end: "2024-09",
        bullets: [
          "Supervised a staff of 75+ and up to 120+ patrons at a time; planned logistics for and supervised select events with 100+ attendees.",
          "Led responses to real (non-drill) facility emergencies.",
          "Wrote training documentation and manager report templates.",
        ],
      },
      {
        title: "Senior Guard",
        start: "2021-08",
        end: "2022-08",
        bullets: ["Supported facility operations, patron safety and emergency-response procedures."],
      },
      { title: "Lifeguard", start: "2019-08", end: "2021-08" },
      { title: "Junior Guard", start: "2016-06", end: "2019-08" },
    ],
  },
  {
    id: "tutoring",
    name: "Freelance",
    group: "operations",
    location: "California",
    summary: "Math, physics and computer science, middle school through college; some students for up to three years.",
    roles: [
      {
        title: "Private Tutor",
        start: "2021-10",
        end: "2026-06",
        bullets: [
          "Taught mathematics, physics and computer science one-on-one to students from middle school through college, with individualized lesson plans; some client relationships lasted up to three years.",
        ],
      },
    ],
  },
  {
    id: "furflex",
    name: "FurFlex",
    group: "operations",
    location: "California",
    summary: "Ran a small e-commerce business end to end, from suppliers to fulfillment.",
    roles: [
      {
        title: "Founder",
        start: "2025-05",
        end: "2026-05",
        bullets: [
          "Ran a small e-commerce business: finances, domestic supplier coordination for Walmart and Amazon sales, marketing, fulfillment and back-end web infrastructure; liquidated the infrastructure to Spirit Locker Organization.",
        ],
      },
    ],
  },
  {
    id: "swim-instruction",
    name: "Self-employed",
    group: "operations",
    location: "California",
    summary: "Private lessons for all ages and skill levels.",
    roles: [
      {
        title: "Private Swim Instructor",
        start: "2021-05",
        end: "2024-10",
        bullets: ["Taught private swim lessons across ages and skill levels; managed scheduling, session planning and safety."],
      },
    ],
  },
  {
    id: "youtube",
    name: "YouTube",
    group: "operations",
    summary: "Wrote, edited and published space and science videos.",
    roles: [
      {
        title: "YouTube Partner",
        start: "2019-04",
        end: "2023-10",
        bullets: [
          "Produced educational space and science videos (scripting, editing, publishing), moderated the channel community and coordinated sponsorships.",
        ],
      },
    ],
  },
];

export const EDUCATION = {
  school: "University of California, Irvine",
  degree: "B.S. Aerospace Engineering, in progress",
  minor: "Minor in Management, Paul Merage School of Business",
  start: "2023-09",
  status: "Coursework ends March 23, 2027",
  gpa: "3.759",
  gpaLabel: "Cumulative UC GPA",
  /** Transcript-verified courses listed first; the one-page resume uses those six. */
  coursework: [
    "Mechanics of Structures and Lab",
    "Lightweight Structures",
    "Dynamics",
    "Mechanical Systems Lab",
    "Aerospace Lab",
    "Introduction to Control Systems",
    "Statics",
    "Fluid Dynamics I",
    "Thermodynamics",
    "Materials Science",
    "Electric Circuits",
    "Engineering Computations (MATLAB)",
    "CubeSat I–III",
  ],
  honors: [
    "Dean's Honor List, multiple quarters",
    "Sigma Gamma Tau, national aerospace engineering honor society (initiation in progress)",
  ],
  highSchool: {
    school: "Monte Vista High School",
    detail: "High school diploma with honors, 2019–2023",
    honors: ["California Scholarship Federation", "National Honor Society", "eight-semester honor roll"],
  },
} as const;

export interface SkillGroup {
  label: string;
  items: string[];
  /** Shorter list for the one-page engineering resume. */
  compact?: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    label: "Design and analysis",
    items: [
      "SOLIDWORKS (CSWA)",
      "ANSYS Mechanical (static structural, modal)",
      "COMSOL (UAV assessment)",
      "MATLAB",
      "mass, power and load-path budgeting",
    ],
    compact: ["SOLIDWORKS (Certified SOLIDWORKS Associate, Oct 2025)", "ANSYS Mechanical (static, modal)", "COMSOL", "MATLAB"],
  },
  {
    label: "Fabrication and test",
    items: [
      "PLA 3D printing",
      "mechanical assembly",
      "soldering",
      "laser cutting",
      "bandsaw",
      "automotive maintenance",
      "Arduino sensor calibration and test logging",
    ],
    compact: ["PLA 3D printing", "mechanical assembly", "soldering", "laser cutting", "bandsaw", "Arduino sensor testing"],
  },
  {
    label: "Software",
    items: ["Python", "Node.js", "JavaScript", "HTML/CSS", "Shopify Liquid", "WebGL", "Git/GitHub"],
  },
  { label: "Languages", items: ["English (native)", "Spanish (elementary)"] },
];

export interface Credential {
  name: string;
  issuer: string;
  date: string;
  expired?: string;
}

export const CERTIFICATIONS: { label: string; items: Credential[] }[] = [
  {
    label: "Engineering and safety",
    items: [
      { name: "Certified SOLIDWORKS Associate (CSWA)", issuer: "", date: "2025-10" },
      { name: "Laboratory Safety", issuer: "UC Learning Center", date: "2026-04" },
      { name: "Shop Safety", issuer: "UC Learning Center", date: "2025-10" },
      { name: "Hazardous Waste", issuer: "UC Learning Center", date: "2025-10" },
      { name: "Hazardous Materials Incidents Emergency Procedures", issuer: "UC Learning Center", date: "2025-10" },
    ],
  },
  {
    label: "AI and cloud courses",
    // Listed for completeness; the resume prints this group in one compact line.
    items: [
      { name: "AI Infrastructure and Operations Fundamentals", issuer: "NVIDIA", date: "2026-06" },
      { name: "Generative AI and AI Agents with Amazon Bedrock", issuer: "AWS", date: "2026-06" },
      { name: "AI & ML Engineering", issuer: "Microsoft", date: "2026-06" },
      { name: "Generative AI Engineering", issuer: "Microsoft", date: "2026-06" },
      { name: "Gen AI in Social Media Marketing", issuer: "Meta", date: "2026-06" },
      { name: "Google AI Professional Certificate", issuer: "Google", date: "2026-04" },
    ],
  },
  {
    label: "Historical",
    items: [{ name: "American Red Cross Lifeguard", issuer: "Town of Danville", date: "2023-06", expired: "2025-06" }],
  },
];

export const HONORS: { name: string; date: string; detail?: string }[] = [
  { name: "Eagle Scout with Gold Palm, Scouts BSA", date: "Apr 2022" },
  { name: "Taekwondo first-degree black belt (1st Dan)", date: "2016", detail: "taught classes 2015–2016" },
];
