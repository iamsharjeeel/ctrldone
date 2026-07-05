"use client";

import { useEffect } from "react";
import { initLenis, destroyLenis } from "@/lib/lenis";
import { gsap, REVEAL_EASE } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { ThemeProvider } from "./ThemeProvider";
import { ModalProvider } from "./ModalProvider";

function SmoothScrollInit() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    initLenis();
    document.documentElement.classList.add("lenis", "lenis-smooth");

    return () => {
      destroyLenis();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return null;
}

function ScrollRevealInit() {
  useEffect(() => {
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>(".reveal-group");

      groups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>(".reveal");
        if (!items.length) return;

        if (reduced) {
          gsap.set(items, { autoAlpha: 1, y: 0 });
          return;
        }

        gsap.from(items, {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          ease: REVEAL_EASE,
          stagger: 0.06,
          scrollTrigger: {
            trigger: group,
            start: "top 82%",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ModalProvider>
        <SmoothScrollInit />
        <ScrollRevealInit />
        {children}
      </ModalProvider>
    </ThemeProvider>
  );
}
