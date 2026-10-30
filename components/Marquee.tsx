"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLenis } from "./SmoothScroll";

// Endless ticker that speeds up with scroll velocity and flips with scroll direction.
export default function Marquee({ words }: { words: string[] }) {
  const track = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let dir = 1;
    let boost = 0;
    const onScroll = ({ velocity, direction }: { velocity: number; direction: number }) => {
      if (direction) dir = direction;
      boost = Math.min(Math.abs(velocity) * 0.6, 18);
    };
    lenis?.on("scroll", onScroll);

    const tick = () => {
      const half = el.scrollWidth / 2;
      x -= (1 + boost) * dir;
      boost *= 0.92;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      gsap.set(el, { x });
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.off("scroll", onScroll);
    };
  }, [lenis]);

  const row = words.map((word) => (
    <Fragment key={word}>
      <span>{word}</span>
      <b>✦</b>
    </Fragment>
  ));

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track" ref={track}>
        <div className="marquee__row">{row}</div>
        <div className="marquee__row">{row}</div>
      </div>
    </div>
  );
}
