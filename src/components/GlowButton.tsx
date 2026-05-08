import { ArrowUpRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import type { SectionAction } from "../data/sections";

interface GlowButtonProps {
  action: SectionAction;
}

export function GlowButton({ action }: GlowButtonProps) {
  const Icon = action.icon ? (action.icon === "play" ? Play : ArrowUpRight) : null;

  return (
    <motion.button
      className={`glow-button glow-button--${action.tone}`}
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      type="button"
    >
      <span>{action.label}</span>
      {Icon ? <Icon size={17} strokeWidth={1.8} aria-hidden="true" /> : null}
    </motion.button>
  );
}
