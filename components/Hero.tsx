"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollLink from "./ScrollLink";
import { isUpload } from "@/lib/types";
import { onIntro } from "@/lib/intro";

gsap.registerPlugin(ScrollTrigger);

// Each frame drifts at its own pace while scrolling out of the hero.
const SPEEDS = [14, 26, 10];

export default function Hero({ images }: { images: string[] }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".line > span", { yPercent: 110 });
      gsap.set(".hero__fade", { y: 30, opacity: 0 });
      gsap.set(".hero__frame", { clipPath: "inset(100% 0 0 0)" });
      gsap.set(".hero__parallax", { scale: 1.25 });

      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.utils.toArray<HTMLElement>(".hero__parallax").forEach((el, i) => {
        gsap.to(el, { yPercent: SPEEDS[i], ease: "none", scrollTrigger: st });
      });
      gsap.to(".hero__inner", { yPercent: -30, opacity: 0, ease: "none", scrollTrigger: st });
    }, root);

    // ctx.add keeps selectors scoped to the hero (the signal fires from the loader's own GSAP callback).
    const off = onIntro(() =>
      ctx.add(() => {
        gsap
          .timeline()
          .to(".hero__frame", { clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "expo.inOut", stagger: 0.12 }, 0)
          .to(".hero__parallax", { scale: 1, duration: 2.2, ease: "expo.out", stagger: 0.12 }, 0.3)
          .to(".line > span", { yPercent: 0, duration: 1.3, ease: "expo.out", stagger: 0.12 }, 0.6)
          .to(".hero__fade", { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.1 }, 0.9);
      }),
    );
    return () => {
      off();
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero" ref={root}>
      <div className="hero__media">
        {images.map((src, i) => (
          <div className={`hero__frame hero__frame--${i + 1}`} key={src}>
            <div className="hero__parallax">
              <Image src={src} alt="one23 kiyimlari" fill priority unoptimized={isUpload(src)} sizes="(max-width: 768px) 100vw, 34vw" />
            </div>
          </div>
        ))}
      </div>
      <div className="hero__inner">
        <p className="eyebrow hero__fade">Premium style 👑 · Toshkent</p>
        <h1 className="hero__title">
          <span className="line">
            <span>Boshqalardan</span>
          </span>
          <span className="line">
            <span>
              ajralib <em>turing</em>
            </span>
          </span>
        </h1>
        <div className="hero__bottom">
          <p className="hero__lead hero__fade">
            Kurtkalar, keng bichimli shimlar, trikotaj va kostyumlar — kundalik uslub uchun zamonaviy va
            minimalistik obrazlar.
          </p>
          <ScrollLink href="#mahsulotlar" className="btn hero__fade">
            Obrazlarni ko&apos;rish <span className="arrow">→</span>
          </ScrollLink>
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <span>Pastga aylantiring</span>
        <i />
      </div>
    </section>
  );
}
