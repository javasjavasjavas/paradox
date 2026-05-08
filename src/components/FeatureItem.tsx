import {
  BookOpen,
  Box,
  PanelsTopLeft,
  Crosshair,
  Layers3,
  Orbit,
  ScanLine,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { FeatureItemData, FeatureIcon } from "../data/sections";

const icons: Record<FeatureIcon, LucideIcon> = {
  cards: PanelsTopLeft,
  crosshair: Crosshair,
  spark: Sparkles,
  layers: Layers3,
  book: BookOpen,
  shield: Shield,
  cube: Box,
  scan: ScanLine,
  orbit: Orbit,
};

interface FeatureItemProps {
  item: FeatureItemData;
}

export function FeatureItem({ item }: FeatureItemProps) {
  const Icon = icons[item.icon];

  return (
    <article className="feature-item section-reveal">
      <div className="feature-icon" aria-hidden="true">
        <Icon size={30} strokeWidth={1.35} />
      </div>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </article>
  );
}
