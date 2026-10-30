"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 76.3, decimals: 1, suffix: "K+", label: "Instagramdagi obunachilar" },
  { text: "10–22", label: "Har kuni ochiqmiz" },
  { value: 100, decimals: 0, suffix: "%", label: "Barchaga mos bichim" },
];

export default function Manifesto({ text }: { text: string }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Words light up one by one, tied to scroll position.
      gsap.to(".w", {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: ".manifesto__text", start: "top 80%", end: "bottom 50%", scrub: true },
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals);
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="manifesto" id="biz-haqimizda" ref={root}>
      <p className="eyebrow">Biz haqimizda</p>
      <p className="manifesto__text">
        {text.split(" ").map((word, i) => (
          <span className="w" key={i}>
            {word}{" "}
          </span>
        ))}
      </p>
      <div className="manifesto__stats">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            {"text" in s ? (
              <span className="stat__num">{s.text}</span>
            ) : (
              <>
                <span className="stat__num" data-count={s.value} data-decimals={s.decimals}>
                  0
                </span>
                <span className="stat__suffix">{s.suffix}</span>
              </>
            )}
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
