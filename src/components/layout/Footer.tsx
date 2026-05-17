import { asset } from "../../utils/assets";
import { RouterLink } from "../ui/RouterLink";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <RouterLink href="/" className="brand">
              <span className="brand-mark">A</span>
              <span className="brand-copy">
                <strong>Alexander Amadeo-Ranch</strong>
                <span>Aerospace Engineering</span>
              </span>
            </RouterLink>
            <p style={{ marginTop: "1rem", maxWidth: "36ch" }}>
              Spacecraft structures, controls, mission analysis, simulation, technical writing, and hands-on engineering work - gathered here as a recruiter-ready archive.
            </p>
          </div>
          <div>
            <p className="footer-h">Site</p>
            <ul className="footer-list">
              <li><RouterLink href="/">Home</RouterLink></li>
              <li><RouterLink href="/projects">Projects</RouterLink></li>
              <li><RouterLink href="/contact">Contact</RouterLink></li>
            </ul>
          </div>
          <div>
            <p className="footer-h">Selected work</p>
            <ul className="footer-list">
              <li><RouterLink href="/projects?id=cubesat-structures">CubeSat Structures</RouterLink></li>
              <li><RouterLink href="/projects?id=obd-scanner">OBD-II Dashboard</RouterLink></li>
              <li><RouterLink href="/projects?id=mae-146-didymos">Mission to Didymos</RouterLink></li>
              <li><RouterLink href="/projects?id=photon-paths">Photon Paths</RouterLink></li>
            </ul>
          </div>
          <div>
            <p className="footer-h">Connect</p>
            <ul className="footer-list">
              <li>
                <a href="https://linkedin.com/in/alexamadeoranch" target="_blank" rel="noreferrer">
                  linkedin.com/in/alexamadeoranch
                </a>
              </li>
              <li>
                <a href={asset("assets/downloads/resume/alexander-amadeo-ranch-resume.pdf")} download>
                  Resume (PDF)
                </a>
              </li>
              <li><RouterLink href="/privacy">Privacy Policy</RouterLink></li>
              <li><RouterLink href="/terms">Terms & Conditions</RouterLink></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Copyright 2026 Alexander Amadeo-Ranch. All rights reserved.</span>
          <span>Built with React, Three.js, and GSAP - deployed via GitHub Pages.</span>
        </div>
      </div>
    </footer>
  );
}
