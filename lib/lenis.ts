import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "./gsap";

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

  return lenis;
}
