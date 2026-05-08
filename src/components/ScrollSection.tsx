import { useLayoutEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SectionData } from "../data/sections";
import { FeatureItem } from "./FeatureItem";
import { GlowButton } from "./GlowButton";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionProps {
  section: SectionData;
  index: number;
  active: boolean;
  reducedMotion: boolean;
}

export function ScrollSection({ section, index, active, reducedMotion }: ScrollSectionProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const isAnatomyFocus = index === 1;
  const showActions = index !== 1 && index !== 2;
  const showFeatures = !isAnatomyFocus && index !== 0 && index !== 3;
  const titleId = `${section.id}-title`;

  useLayoutEffect(() => {
    if (!rootRef.current || reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".section-reveal",
        { y: 38, opacity: 0, filter: "blur(12px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      className={`scroll-section ${isAnatomyFocus ? "scroll-section--anatomy-focus" : ""} ${active ? "is-active" : ""}`}
      data-scroll-section
      id={section.id}
      aria-labelledby={isAnatomyFocus ? undefined : titleId}
      aria-label={isAnatomyFocus ? `${section.order} - ${section.eyebrow}` : undefined}
      style={{ "--section-index": index } as CSSProperties}
    >
      {isAnatomyFocus ? <span className="visually-hidden">{section.title.join(" ")}</span> : null}
      {!isAnatomyFocus ? (
        <>
          <div className="section-hud section-reveal">
            <span className="hud-diamond" />
            <span>{section.order}</span>
            <span>{section.eyebrow}</span>
          </div>
          <h1 id={titleId} className="section-title section-reveal">
            {section.title.map((line, lineIndex) => (
              <span key={line} className={lineIndex === section.title.length - 1 ? "title-blue" : ""}>
                {line}
              </span>
            ))}
          </h1>
          <div className="section-copy section-reveal">
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {showActions ? (
            <div className="section-actions section-reveal">
              {section.actions.map((action) => (
                <GlowButton key={action.label} action={action} />
              ))}
            </div>
          ) : null}
          {showFeatures ? (
            <div className={`feature-grid feature-grid--${section.features.length}`}>
              {section.features.map((feature) => (
                <FeatureItem key={feature.title} item={feature} />
              ))}
            </div>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
