import { BackgroundFX } from "./components/BackgroundFX";
import { Header } from "./components/Header";
import { ProgressIndicator } from "./components/ProgressIndicator";
import { ScrollSection } from "./components/ScrollSection";
import { StickyCardShowcase } from "./components/StickyCardShowcase";
import { sections } from "./data/sections";
import { useCinematicScroll } from "./hooks/useCinematicScroll";

export default function App() {
  const { activeIndex, localProgress, globalProgress, sectionProgresses, prefersReducedMotion } =
    useCinematicScroll(sections.length);

  return (
    <div className="paradox-app">
      <BackgroundFX activeIndex={activeIndex} reducedMotion={prefersReducedMotion} />
      <Header />
      <ProgressIndicator
        activeIndex={activeIndex}
        total={sections.length}
        globalProgress={globalProgress}
        sections={sections.map(({ id, eyebrow }) => ({ id, eyebrow }))}
      />
      <main id="paradox-experience" className="experience-shell">
        <div className="section-column" aria-label="Paradox: Lex Machina collection story">
          {sections.map((section, index) => (
            <ScrollSection
              key={section.id}
              section={section}
              index={index}
              active={index === activeIndex}
              reducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
        <StickyCardShowcase
          activeIndex={activeIndex}
          localProgress={localProgress}
          globalProgress={globalProgress}
          sectionProgresses={sectionProgresses}
          reducedMotion={prefersReducedMotion}
        />
      </main>
    </div>
  );
}
