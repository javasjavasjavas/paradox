import { ParticleField } from "./ParticleField";

interface BackgroundFXProps {
  activeIndex: number;
  reducedMotion: boolean;
}

export function BackgroundFX({ activeIndex, reducedMotion }: BackgroundFXProps) {
  return (
    <div className={`background-fx scene-${activeIndex + 1}`} aria-hidden="true">
      <div className="bg-noise" />
      <div className="bg-grid" />
      <div className="bg-radial" />
      <div className="bg-ornament" />
      <div className="bg-fog bg-fog-a" />
      <div className="bg-fog bg-fog-b" />
      <ParticleField activeIndex={activeIndex} reducedMotion={reducedMotion} />
    </div>
  );
}
