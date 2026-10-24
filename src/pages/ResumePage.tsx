import { ResumeDocument } from "../resume/ResumeDocument";
import { asset } from "../utils/assets";
import "../resume/resume.css";

export function ResumePage() {
  return (
    <div className="page-body page-body--top resume-page">
      <div className="wrap">
        <header className="page-head resume-page__head">
          <h1>Resume</h1>
          <p className="page-head__lede">
            The full resume, current as of October 2026. It covers every role; the one-page version keeps to engineering.
          </p>
          <p className="resume-page__actions">
            <a className="button button--primary" href={asset("assets/downloads/resume/alexander-amadeo-ranch-resume.pdf")}>
              Full resume (PDF)
            </a>
            <a className="button" href={asset("assets/downloads/resume/alexander-amadeo-ranch-engineering-resume.pdf")}>
              One-page engineering resume (PDF)
            </a>
            <button type="button" className="button button--quiet" onClick={() => window.print()}>
              Print
            </button>
          </p>
        </header>
        <div className="resume-sheet">
          <ResumeDocument variant="full" embedded />
        </div>
      </div>
    </div>
  );
}
