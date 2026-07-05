import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "./gsap";

let current: Lenis | null = null;

export function initLenis(): Lenis {
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  current = lenis;
  return lenis;
}

export function getLenis(): Lenis | null {
  return current;
}

export function destroyLenis() {
  current?.destroy();
  current = null;
}
