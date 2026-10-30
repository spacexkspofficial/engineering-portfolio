// Public positioning drawn from the project records and confirmed profile.
// These are selected examples of work, not additional performance claims.
export const ENGINEERING_EVIDENCE = [
  {
    projectId: "cubesat-structures",
    skill: "Mechanical design & fabrication",
    outcome: "30% lower purchase-order cost",
    contribution: "Built FlatSat V1 for up to 12 avionics PCBs. Designed, PLA-printed and installed all 14 custom mounts; the simpler overall design cut the purchase order versus V0.",
    linkLabel: "See the fixture & structural analysis",
  },
  {
    projectId: "boundary-uav-assessment",
    skill: "Engineering analysis & communication",
    outcome: "UAV assessment delivered two weeks early",
    contribution: "Assessed mass, power, load paths and flight performance using SOLIDWORKS, ANSYS and COMSOL. Presented findings to managers; the assessment informed a change in hardware direction.",
    linkLabel: "Read the internship overview",
  },
  {
    projectId: "mae-106-autonomous",
    skill: "Integration & experimental verification",
    outcome: "Test data behind two design decisions",
    contribution: "As experimental lead on a four-person robot team, calibrated sensors and ran duty-cycle and hinge-height sweeps. The team used the results to select its settings and met the final motion requirement.",
    linkLabel: "Review the experiments & reports",
  },
] as const;

export const CAPABILITY_LINKS = [
  { label: "CAD, fabrication & structural FEA", projectId: "cubesat-structures" },
  { label: "System-level UAV assessment", projectId: "boundary-uav-assessment" },
  { label: "Sensor calibration & test", projectId: "mae-106-autonomous" },
  { label: "MATLAB & orbital analysis", projectId: "mae-146-didymos" },
  { label: "Aerodynamics & software", projectId: "aerolab-suite" },
] as const;
