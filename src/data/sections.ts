export type FeatureIcon =
  | "cards"
  | "crosshair"
  | "spark"
  | "layers"
  | "book"
  | "shield"
  | "cube"
  | "scan"
  | "orbit";

export interface SectionAction {
  label: string;
  tone: "primary" | "secondary";
  icon?: "arrow" | "play";
}

export interface FeatureItemData {
  title: string;
  text: string;
  icon: FeatureIcon;
}

export interface SectionData {
  id: string;
  order: string;
  eyebrow: string;
  title: string[];
  body: string[];
  actions: SectionAction[];
  features: FeatureItemData[];
}

export const sections: SectionData[] = [
  {
    id: "welcome",
    order: "01",
    eyebrow: "WELCOME TO PARADOX",
    title: ["A NEW ERA", "OF TRADING CARDS"],
    body: [
      "Enter a dark futuristic universe where power is traded, loyalty is currency, and every card holds a piece of a forgotten world.",
      "Build your collection. Uncover the truth. Command the machine.",
    ],
    actions: [
      { label: "Explore Collection", tone: "primary", icon: "arrow" },
    ],
    features: [
      {
        title: "Curated Collections",
        text: "Rare cards. Iconic characters. Endless possibilities.",
        icon: "cards",
      },
      {
        title: "Immersive Lore",
        text: "Every card has a story. Every story has a purpose.",
        icon: "crosshair",
      },
      {
        title: "Built for Collectors",
        text: "Premium design. Limited editions. True ownership.",
        icon: "spark",
      },
    ],
  },
  {
    id: "anatomy",
    order: "02",
    eyebrow: "CARD ANATOMY",
    title: ["EVERY DETAIL", "TELLS A STORY"],
    body: [
      "Each element of a Paradox: Lex Machina card is more than design — it is data. Rarity, class, stats, identity, lore, and edition number are encoded within every operative.",
      "Knowledge is power. Learn to read everything.",
    ],
    actions: [
      { label: "See Card Anatomy", tone: "primary", icon: "arrow" },
      { label: "Learn The Lore", tone: "secondary", icon: "arrow" },
    ],
    features: [
      {
        title: "Every Element",
        text: "Purpose-built design. Every detail has meaning.",
        icon: "cards",
      },
      {
        title: "Information Layers",
        text: "Multiple data layers work together to tell the full story.",
        icon: "crosshair",
      },
      {
        title: "Lore Integrated",
        text: "Lore is woven into the card to reveal history and motive.",
        icon: "book",
      },
      {
        title: "Built For Experts",
        text: "Engineered for collectors and strategists who seek the edge.",
        icon: "shield",
      },
    ],
  },
  {
    id: "experience",
    order: "03",
    eyebrow: "THE EXPERIENCE",
    title: ["THE CARD", "COMES ALIVE"],
    body: [
      "Scroll to activate. The Mind Reader card rotates in 3D, zooms in to reveal intricate details, and responds like a living artifact.",
      "Texture, light, and depth shift in real time — every movement reveals something new.",
    ],
    actions: [
      { label: "Watch Interaction", tone: "primary", icon: "play" },
      { label: "Explore Motion", tone: "secondary", icon: "arrow" },
    ],
    features: [
      {
        title: "3D Rotation",
        text: "Smooth, dimensional rotation on scroll.",
        icon: "cube",
      },
      {
        title: "Texture Reveal",
        text: "Microscopic detail emerges as you explore closer.",
        icon: "crosshair",
      },
      {
        title: "Living Interaction",
        text: "Light, glow, and depth react to your movement.",
        icon: "layers",
      },
    ],
  },
  {
    id: "legacy",
    order: "04",
    eyebrow: "BUILD YOUR LEGACY",
    title: ["EXPLORE.", "COLLECT.", "PLAY."],
    body: [
      "Discover rare cards. Uncover hidden lore. Each addition to your collection expands the universe — and your place within it.",
      "The paradox grows with every choice. What will you find next?",
    ],
    actions: [
      { label: "View Collection", tone: "primary" },
    ],
    features: [
      {
        title: "Rare & Powerful",
        text: "Hunt down ultra-rare cards with legendary abilities.",
        icon: "shield",
      },
      {
        title: "Hidden Lore",
        text: "Unlock story fragments and secrets scattered across the universe.",
        icon: "crosshair",
      },
      {
        title: "Limitless Growth",
        text: "Expand your collection. Ascend the ranks. Leave your mark.",
        icon: "orbit",
      },
    ],
  },
];
