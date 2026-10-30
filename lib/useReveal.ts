"use client";

import { RefObject, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Fades + lifts every `.reveal` element inside `scope` as it enters the viewport.
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".reveal");
      gsap.set(items, { y: 70, opacity: 0 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.1 }),
      });
    }, scope);
    return () => ctx.revert();
  }, [scope]);
}
