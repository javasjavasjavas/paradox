import { lazy, Suspense, useMemo, useRef, type CSSProperties } from "react";
import { useMouseTilt } from "../hooks/useMouseTilt";
import { CardAnatomyCallouts } from "./CardAnatomyCallouts";
import { CollectionStack } from "./CollectionStack";
import { TradingCard } from "./TradingCard";

const MotionCardScene = lazy(() =>
  import("./MotionCardScene").then((module) => ({ default: module.MotionCardScene })),
);

interface StickyCardShowcaseProps {
  activeIndex: number;
  localProgress: number;
  globalProgress: number;
  sectionProgresses: number[];
  footerTransitionProgress: number;
  reducedMotion: boolean;
}

export function StickyCardShowcase({
  activeIndex,
  localProgress,
  globalProgress,
  sectionProgresses,
  footerTransitionProgress,
  reducedMotion,
}: StickyCardShowcaseProps) {
  const { tilt, onPointerMove, onPointerLeave } = useMouseTilt(reducedMotion);
  const showcaseRef = useRef<HTMLElement | null>(null);
  const cardStageRef = useRef<HTMLDivElement | null>(null);

  const cardStyle = useMemo(() => {
    const smooth = (value: number) => value * value * (3 - 2 * value);
    const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;
    const clampProgress = (value: number) => Math.min(1, Math.max(0, value));
    const experienceRawProgress =
      activeIndex === 2 ? clampProgress(sectionProgresses[2] ?? localProgress) : activeIndex > 2 ? 1 : 0;
    const experienceProgress = smooth(experienceRawProgress);
    const collectionRawProgress = clampProgress(sectionProgresses[3] ?? localProgress);
    const collectionProgress =
      activeIndex === 3 ? smooth(clampProgress((collectionRawProgress - 0.04) / 0.38)) : 0;
    const interactive = activeIndex === 2 && !reducedMotion;
    const heroInteractive = activeIndex === 0 && !reducedMotion;
    const sectionTwo = activeIndex === 1;
    const collection = activeIndex === 3;
    const anatomyScale = 1.07;
    const endRotateY = lerp(0, -16, experienceProgress);
    const endRotateX = lerp(0, -7, experienceProgress);
    const endRotateZ = lerp(0, -3.5, experienceProgress);
    const endScale = lerp(anatomyScale, 1.2, experienceProgress);
    const experienceX = lerp(0, -2.1, experienceProgress);
    const experienceY = lerp(0, -1, experienceProgress);
    const tiltY = tilt.x * (heroInteractive ? 5.2 : interactive ? 7 : 0);
    const tiltX = -tilt.y * (heroInteractive ? 3.4 : interactive ? 4 : 0);
    const rotateY = collection
      ? lerp(endRotateY, 0, collectionProgress)
      : interactive
        ? endRotateY + tiltY
        : heroInteractive
          ? tiltY
          : 0;
    const rotateX = collection
      ? lerp(endRotateX, 0, collectionProgress)
      : interactive
        ? endRotateX + tiltX
        : heroInteractive
          ? tiltX
          : 0;
    const rotateZ = collection ? lerp(endRotateZ, 0, collectionProgress) : interactive ? endRotateZ : 0;
    const scale = sectionTwo
      ? anatomyScale
      : collection
        ? lerp(endScale, 0.91, collectionProgress)
        : interactive
          ? endScale
          : 1;
    const glow = sectionTwo ? 1.18 : interactive ? 1.18 + experienceProgress * 0.42 : collection ? 1.42 : 1;
    const cardX = collection ? lerp(experienceX, -2.8, collectionProgress) : activeIndex === 2 ? experienceX : 0;
    const cardY = sectionTwo
      ? -1.4
      : collection
        ? lerp(experienceY, 0.4, collectionProgress)
        : activeIndex === 2
          ? experienceY
          : 0;

    return {
      "--card-rotate-x": `${rotateX}deg`,
      "--card-rotate-y": `${rotateY}deg`,
      "--card-rotate-z": `${rotateZ}deg`,
      "--card-scale": scale,
      "--card-glow": glow,
      "--card-x": `${cardX}vw`,
      "--card-y": `${cardY}vh`,
      "--mouse-x": tilt.x,
      "--mouse-y": tilt.y,
    } as CSSProperties;
  }, [activeIndex, localProgress, reducedMotion, sectionProgresses, tilt.x, tilt.y]);

  const showcaseStyle = {
    "--showcase-opacity": reducedMotion ? 1 : 1 - footerTransitionProgress,
    "--showcase-scale": 1,
    "--showcase-y": "0vh",
    "--showcase-blur": reducedMotion ? "0px" : `${2.2 * footerTransitionProgress}px`,
  } as CSSProperties;

  return (
    <aside
      ref={showcaseRef}
      className={`sticky-card-showcase state-${activeIndex + 1}`}
      style={showcaseStyle}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-label="Interactive Mind Reader card showcase"
    >
      <Suspense fallback={<div className="motion-scene-fallback" />}>
        <MotionCardScene activeIndex={activeIndex} globalProgress={globalProgress} reducedMotion={reducedMotion} />
      </Suspense>
      <div className="showcase-floor" />
      <CollectionStack active={activeIndex === 3} />
      <div ref={cardStageRef} className="showcase-card-stage" style={cardStyle}>
        <div className="ghost-trails" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <TradingCard />
      </div>
      <CardAnatomyCallouts active={activeIndex === 1} showcaseRef={showcaseRef} cardRef={cardStageRef} />
    </aside>
  );
}
