import { useLayoutEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface CinematicScrollState {
  activeIndex: number;
  localProgress: number;
  globalProgress: number;
  sectionProgresses: number[];
  prefersReducedMotion: boolean;
}

export function useCinematicScroll(sectionCount: number): CinematicScrollState {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [localProgress, setLocalProgress] = useState(0);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [sectionProgresses, setSectionProgresses] = useState(() => Array.from({ length: sectionCount }, () => 0));

  useLayoutEffect(() => {
    const sectionTriggers: ScrollTrigger[] = [];
    const sections = gsap.utils.toArray<HTMLElement>("[data-scroll-section]");

    sections.forEach((section, index) => {
      sectionTriggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: index === sections.length - 1 ? "bottom bottom" : "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
          onUpdate: (self) => {
            setSectionProgresses((current) => {
              const next = [...current];
              next[index] = Number(self.progress.toFixed(3));
              return next;
            });
            if (self.isActive) {
              setActiveIndex(index);
              setLocalProgress(Number(self.progress.toFixed(3)));
            }
          },
        }),
      );
    });

    const globalTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setGlobalProgress(Number(self.progress.toFixed(3))),
    });

    let lenis: Lenis | undefined;
    let tick: ((time: number) => void) | undefined;

    if (!reducedMotion) {
      lenis = new Lenis({
        duration: 1.18,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    ScrollTrigger.refresh();

    return () => {
      sectionTriggers.forEach((trigger) => trigger.kill());
      globalTrigger.kill();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, [reducedMotion, sectionCount]);

  return {
    activeIndex,
    localProgress,
    globalProgress,
    sectionProgresses,
    prefersReducedMotion: Boolean(reducedMotion),
  };
}
