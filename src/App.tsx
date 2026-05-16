import { BackgroundFX } from "./components/BackgroundFX";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProgressIndicator } from "./components/ProgressIndicator";
import { ScrollSection } from "./components/ScrollSection";
import { StickyCardShowcase } from "./components/StickyCardShowcase";
import { sections } from "./data/sections";
import { useCinematicScroll } from "./hooks/useCinematicScroll";

export default function App() {
  const { activeIndex, localProgress, globalProgress, sectionProgresses, prefersReducedMotion } =
    useCinematicScroll(sections.length + 1);
  const experienceIndex = Math.max(0, activeIndex - 1);
  const progressSections = [{ id: "hero", eyebrow: "Paradox" }, ...sections.map(({ id, eyebrow }) => ({ id, eyebrow }))];

  return (
    <div className={`paradox-app ${activeIndex === 0 ? "is-hero-active" : "is-experience-active"}`}>
      <BackgroundFX activeIndex={experienceIndex} reducedMotion={prefersReducedMotion} />
      <Header />
      <Hero />
      <ProgressIndicator
        activeIndex={activeIndex}
        total={progressSections.length}
        globalProgress={globalProgress}
        sections={progressSections}
      />
      <main id="paradox-experience" className="experience-shell">
        <div className="section-column" aria-label="Paradox: Lex Machina collection story">
          {sections.map((section, index) => (
            <ScrollSection
              key={section.id}
              section={section}
              index={index}
              active={index + 1 === activeIndex}
              reducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
        <StickyCardShowcase
          activeIndex={experienceIndex}
          localProgress={activeIndex === 0 ? 0 : localProgress}
          globalProgress={globalProgress}
          sectionProgresses={sectionProgresses.slice(1)}
          reducedMotion={prefersReducedMotion}
        />
      </main>
    </div>
  );
}
