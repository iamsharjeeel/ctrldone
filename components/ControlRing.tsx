"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

const ControlRingCanvas = dynamic(
  () => import("./ControlRingCanvas").then((m) => m.ControlRingCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 ring-placeholder" aria-hidden />
    ),
  }
);

export function ControlRing() {
  const progressRef = useRef(0);
  const [docked, setDocked] = useState(false);
  const [reducedMotion] = useState(() =>
    typeof window !== "undefined" ? prefersReducedMotion() : false
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const why = document.getElementById("why");
    const services = document.getElementById("services");
    if (!hero || !why) return;

    const assembly = ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      endTrigger: why,
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = reducedMotion ? 1 : self.progress;
      },
    });

    const dock = services
      ? ScrollTrigger.create({
          trigger: why,
          start: "bottom center",
          endTrigger: services,
          end: "top center",
          scrub: true,
          onUpdate: (self) => {
            if (self.progress >= 0.95) setDocked(true);
            else if (self.progress <= 0.05) setDocked(false);
          },
        })
      : null;

    if (reducedMotion) {
      progressRef.current = 1;
    }

    return () => {
      assembly.kill();
      dock?.kill();
    };
  }, [reducedMotion]);

  return (
    <>
      <div
        ref={containerRef}
        className="control-ring-stage pointer-events-none fixed top-0 right-0 z-0 h-screen transition-opacity duration-700"
        style={{
          opacity: docked ? 0 : 1,
        }}
        aria-hidden
      >
        <ControlRingCanvas
          progressRef={progressRef}
          reducedMotion={reducedMotion}
        />
      </div>

      <div
        className="docked-indicator transition-all duration-700"
        style={{
          opacity: docked ? 1 : 0,
          transform: docked ? "scale(1)" : "scale(0.5)",
        }}
        aria-hidden
      >
        <svg
          viewBox="0 0 48 48"
          className="docked-indicator__pulse w-full h-full"
          fill="none"
        >
          <circle
            cx="24"
            cy="24"
            r="18"
            stroke="var(--signal-blue)"
            strokeWidth="2"
          />
          <path
            d="M16 24 L22 30 L33 17"
            stroke="var(--signal-lime)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
}
