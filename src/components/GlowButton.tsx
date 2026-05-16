import { motion } from "framer-motion";
import type { SectionAction } from "../data/sections";

interface GlowButtonProps {
  action: SectionAction;
}

export function GlowButton({ action }: GlowButtonProps) {
  return (
    <motion.button
      className={`glow-button glow-button--${action.tone}`}
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      type="button"
    >
      <span>{action.label}</span>
    </motion.button>
  );
}
