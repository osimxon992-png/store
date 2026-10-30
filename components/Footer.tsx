"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollLink from "./ScrollLink";

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ founderUrl, founderHandle }: { founderUrl: string; founderHandle: string }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer__big span", {
        yPercent: 100,
        ease: "expo.out",
        duration: 1.4,
        stagger: 0.06,
        scrollTrigger: { trigger: ".footer__big", start: "top 95%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={root}>
      <div className="footer__big" aria-hidden="true">
        {"one23".split("").map((ch, i) => (
          <span key={i} className={i > 2 ? "gold" : undefined}>
            {ch}
          </span>
        ))}
      </div>
      <div className="footer__row">
        <p>© 2026 one23 · Barchaga mos kiyimlar</p>
        <p>
          Founder:{" "}
          <a href={founderUrl} target="_blank" rel="noopener">
            {founderHandle}
          </a>
        </p>
        <ScrollLink href="#top">Yuqoriga ↑</ScrollLink>
      </div>
    </footer>
  );
}
