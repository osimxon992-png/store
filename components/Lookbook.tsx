"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isUpload } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

// Frames travel at different speeds so the gallery feels layered.
const SPEEDS = [-18, 26, -10, 34];

export default function Lookbook({ images }: { images: string[] }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true };
      gsap.utils.toArray<HTMLElement>(".lb", root.current).forEach((fig, i) => {
        gsap.to(fig, { yPercent: SPEEDS[i] * -1, ease: "none", scrollTrigger: st });
        gsap.fromTo(fig.querySelector(".lb__inner"), { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: st });
      });
      gsap.fromTo(".lookbook__title", { scale: 0.8 }, { scale: 1.1, ease: "none", scrollTrigger: st });
    }, root);
    return () => mm.revert();
  }, []);

  return (
    <section className="lookbook" ref={root}>
      <h2 className="lookbook__title">
        Look
        <br />
        <em>book</em>
      </h2>
      {images.map((src, i) => (
        <figure className={`lb lb--${i + 1}`} key={src}>
          <div className="lb__inner">
            <Image src={src} alt="one23 lookbook" fill unoptimized={isUpload(src)} sizes="(max-width: 640px) 50vw, 32vw" />
          </div>
        </figure>
      ))}
    </section>
  );
}
