import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const REVEAL_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export { gsap, ScrollTrigger };
