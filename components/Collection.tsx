"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isUpload, type Category } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

type Props = { categories: Category[]; instagramUrl: string; instagramHandle: string };

export default function Collection({ categories, instagramUrl, instagramHandle }: Props) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    // Desktop: pin the section and turn vertical scroll into horizontal movement.
    mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;

      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Each image slides inside its frame as the row moves past.
      gsap.utils.toArray<HTMLElement>(".cat__parallax", el).forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -12 },
          {
            xPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="collection" id="kolleksiya" ref={root}>
      <div className="collection__pin">
        <div className="collection__head">
          <p className="eyebrow">Kolleksiya</p>
          <h2 className="h2">
            Kundalik uslub
            <br />
            uchun hamma narsa
          </h2>
        </div>
        <div className="collection__track" ref={track}>
          {categories.map((cat, i) => (
            <article className="cat" key={cat.title}>
              <div className="cat__img">
                <div className="cat__parallax">
                  <Image src={cat.image} alt={cat.title} fill unoptimized={isUpload(cat.image)} sizes="(max-width: 768px) 80vw, 30vw" />
                </div>
              </div>
              <div className="cat__meta">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{cat.title}</h3>
              </div>
            </article>
          ))}
          <article className="cat cat--cta">
            <p>Yangi kolleksiyalar birinchi bo&apos;lib Instagramda</p>
            <a href={instagramUrl} target="_blank" rel="noopener" className="btn">
              {instagramHandle} <span className="arrow">↗</span>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
