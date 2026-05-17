import { RouterLink } from "../components/ui/RouterLink";

export function NotFound() {
  return (
    <main id="main" className="page-fade">
      <section className="section page-section-first">
        <div className="container" style={{ textAlign: "center", padding: "4rem 0" }}>
          <p className="kicker">404</p>
          <h1>That page is not in the archive.</h1>
          <p className="lead" style={{ margin: "0 auto 2rem", maxWidth: "48ch" }}>
            The link you followed didn't match a route. Try the home page, the full project archive, or the contact page.
          </p>
          <div className="button-row" style={{ justifyContent: "center" }}>
            <RouterLink href="/" className="button primary">Home</RouterLink>
            <RouterLink href="/projects" className="button secondary">Projects</RouterLink>
            <RouterLink href="/contact" className="button ghost">Contact</RouterLink>
          </div>
        </div>
      </section>
    </main>
  );
}
