"use client";

import { useLenis } from "./SmoothScroll";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

// In-page anchor that glides to its target through Lenis instead of jumping.
export default function ScrollLink({ href, onClick, children, ...rest }: Props) {
  const lenis = useLenis();

  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (!lenis || !href.startsWith("#")) return;
        e.preventDefault();
        lenis.scrollTo(href === "#top" ? 0 : href, { duration: 1.6 });
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
