import { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { isInternalRoute, navigate } from "../../utils/router";

interface RouterLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

export function RouterLink({ href, children, onClick, ...rest }: RouterLinkProps) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (!isInternalRoute(href)) return;
    e.preventDefault();
    navigate(href);
  };
  return (
    <a href={href.startsWith("#") || href.startsWith("http") ? href : `#${href.startsWith("/") ? href : `/${href}`}`} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
