import { RouterLink } from "../components/ui/RouterLink";

export function NotFound() {
  return (
    <div className="page-body page-body--top">
      <div className="wrap page-head">
        <h1>Page not found</h1>
        <p className="page-head__lede">That link doesn't match anything here. It may point to a page that moved.</p>
        <p>
          <RouterLink href="/projects" className="text-link">
            Browse the work
          </RouterLink>
        </p>
        <p>
          <RouterLink href="/" className="text-link">
            Go to the home page
          </RouterLink>
        </p>
      </div>
    </div>
  );
}
