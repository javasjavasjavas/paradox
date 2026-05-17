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
    order: "02",
    eyebrow: "WELCOME TO PARADOX",
    title: ["A NEW ERA OF", "TRADING CARDS"],
    body: [
      "Enter a dark futuristic universe where power is traded, loyalty is currency, and every card holds a piece of a forgotten world.",
      "Build your collection. Uncover the truth. Command the machine.",
    ],
    actions: [{ label: "Watch Demo Video", tone: "primary", icon: "play" }],
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
    order: "03",
    eyebrow: "CARD ANATOMY",
    title: ["EVERY DETAIL", "TELLS A STORY"],
    body: [
      "Each element of a Paradox: Lex Machina card is more than design - it is data. Rarity, class, stats, identity, lore, and edition number are encoded within every operative.",
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
    order: "04",
    eyebrow: "THE EXPERIENCE",
    title: ["COLLECTIBLES +", "GAMING"],
    body: [
      "Each card was carefully handcrafted. Over 300 characters, each with their own lore, expanding the Paradox universe.",
    ],
    actions: [
      { label: "Watch Interaction", tone: "primary", icon: "play" },
      { label: "Explore Motion", tone: "secondary", icon: "arrow" },
    ],
    features: [
      {
        title: "300 Unique cards",
        text: "A full roster of handcrafted characters with distinct identities, art, and lore.",
        icon: "cards",
      },
      {
        title: "Ultra Rare cards",
        text: "Chase scarce cards created for collectors who want the hardest finds.",
        icon: "spark",
      },
      {
        title: "Balanced Stats",
        text: "Every card is tuned with stats that support collection strategy and play.",
        icon: "scan",
      },
    ],
  },
  {
    id: "legacy",
    order: "05",
    eyebrow: "BUILD YOUR LEGACY",
    title: ["BUILD YOUR", "DECK AND PLAY"],
    body: [
      "Explore the collection, collect your favorites, and build your unbeatable deck! Every card in your wallet will start in your initial deck.",
    ],
    actions: [{ label: "View Collection", tone: "primary" }],
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
