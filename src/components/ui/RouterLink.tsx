import { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { isInternalRoute, navigate } from "../../utils/router";

interface RouterLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

/** Link to an in-app hash route ("/projects" renders as "#/projects"). */
export function RouterLink({ href, children, onClick, ...rest }: RouterLinkProps) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (!isInternalRoute(href)) return;
    e.preventDefault();
    navigate(href);
  };
  const resolved = href.startsWith("#") || /^[a-z]+:/i.test(href) ? href : `#${href.startsWith("/") ? href : `/${href}`}`;
  return (
    <a href={resolved} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
