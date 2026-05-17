export interface SkillCluster {
  id: string;
  title: string;
  blurb: string;
  skills: string[];
}

export const SKILL_CLUSTERS: SkillCluster[] = [
  {
    id: "aerospace",
    title: "Aerospace & Structures",
    blurb: "Spacecraft analysis, mission design, and hardware-aware engineering work.",
    skills: ["ANSYS", "FEA", "CubeSat structures", "Astrodynamics", "Mission analysis", "Lambert solvers", "Porkchop plots", "Modal analysis"],
  },
  {
    id: "controls",
    title: "Controls & Robotics",
    blurb: "Closed-loop reasoning, PID design, and experimental verification.",
    skills: ["PID design", "Tuning", "MAE 106 robotics", "Verification", "Test iteration", "Closed-loop response"],
  },
  {
    id: "software",
    title: "Software & Simulation",
    blurb: "MATLAB, Python, and embedded tooling for engineering problems.",
    skills: ["MATLAB", "Python", "NumPy", "CoolProp", "Matplotlib", "FastAPI", "WebSocket", "Read-only safety", "ISO 15765-4 CAN", "UDS / SAE J1979"],
  },
  {
    id: "writing",
    title: "Technical Writing",
    blurb: "Proposals, memos, decks, and reports that move technical work between audiences.",
    skills: ["Technical proposals", "Policy memos", "Decks", "Report writing", "Audience framing"],
  },
  {
    id: "hands-on",
    title: "Hands-on Execution",
    blurb: "Diagnostics, installation, troubleshooting, and documented follow-through.",
    skills: ["Diagnostics", "Installation", "Mechanical troubleshooting", "Documentation", "Vehicle modification"],
  },
];
