import { useState } from "react";
import { ResumeDocument, type ResumeVariant } from "../resume/ResumeDocument";
import { asset } from "../utils/assets";
import "../resume/resume.css";

export function ResumePage() {
  const [variant, setVariant] = useState<ResumeVariant>("engineering");
  return (
    <div className="page-body page-body--top resume-page">
      <div className="wrap">
        <header className="page-head resume-page__head">
          <h1>Resume</h1>
          <p className="page-head__lede">
            The one-page engineering resume, current as of October 2026. The full background version includes all roles, projects and training.
          </p>
          <p className="resume-page__actions">
            <a className="button button--primary" href={asset("assets/downloads/resume/alexander-amadeo-ranch-engineering-resume.pdf")}>
              One-page engineering resume (PDF)
            </a>
            <a className="button" href={asset("assets/downloads/resume/alexander-amadeo-ranch-resume.pdf")}>
              Full background (PDF)
            </a>
            <button type="button" className="button button--quiet" onClick={() => window.print()}>
              Print
            </button>
          </p>
        </header>
        <div className="resume-page__variants" role="group" aria-label="Resume displayed below">
          <button type="button" className="button" aria-pressed={variant === "engineering"} onClick={() => setVariant("engineering")}>Engineering overview</button>
          <button type="button" className="button" aria-pressed={variant === "full"} onClick={() => setVariant("full")}>Full background</button>
        </div>
        <div className="resume-sheet">
          <ResumeDocument variant={variant} embedded />
        </div>
      </div>
    </div>
  );
}
