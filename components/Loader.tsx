"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLenis } from "./SmoothScroll";
import { fireIntro } from "@/lib/intro";

export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    window.scrollTo(0, 0);
    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            setDone(true);
            fireIntro();
          },
        })
        .to(counter, {
          v: 23,
          duration: 1.4,
          ease: "power3.inOut",
          onUpdate: () => {
            if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(2, "0");
          },
        })
        .to(".loader__logo", { yPercent: -120, opacity: 0, duration: 0.6, ease: "power3.in" }, "+=0.15")
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut" }, "-=0.2");
    }, root);
    return () => ctx.revert();
  }, []);

  // Hold the page still until the intro has played.
  useEffect(() => {
    if (!lenis) return;
    if (done) lenis.start();
    else lenis.stop();
  }, [lenis, done]);

  if (done) return null;

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader__logo">
        <span>one</span>
        <span className="loader__num" ref={num}>
          00
        </span>
      </div>
    </div>
  );
}
