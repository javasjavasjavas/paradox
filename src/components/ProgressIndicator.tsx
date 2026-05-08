import type { MouseEvent } from "react";

interface ProgressIndicatorProps {
  activeIndex: number;
  total: number;
  globalProgress: number;
  sections: Array<{
    id: string;
    eyebrow: string;
  }>;
}

export function ProgressIndicator({ activeIndex, total, globalProgress, sections }: ProgressIndicatorProps) {
  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ block: "start", behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="progress-indicator" aria-label={`Section ${activeIndex + 1} of ${total}`}>
      <strong>
        {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </strong>
      <div className="progress-track">
        <span style={{ transform: `scaleX(${globalProgress})` }} />
      </div>
      <div className="progress-diamonds" aria-label="Jump to section">
        {sections.map((section, index) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={index === activeIndex ? "is-active" : undefined}
            aria-label={`Go to section ${String(index + 1).padStart(2, "0")}: ${section.eyebrow}`}
            aria-current={index === activeIndex ? "step" : undefined}
            onClick={(event) => handleSectionClick(event, section.id)}
          />
        ))}
      </div>
    </div>
  );
}
