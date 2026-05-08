# Paradox: Lex Machina Card Universe

A premium cinematic landing page for a futuristic trading card collection. The experience is built as a React + TypeScript Vite app with a sticky evolving card showcase, GSAP scroll choreography, Lenis smooth scrolling, React Three Fiber scene effects, Framer Motion micro-interactions, and local procedural assets.

## Run Locally

```bash
npm install
npm run dev
```

Vite starts the app locally, usually at `http://localhost:5173`.

## Build

```bash
npm run build
```

## Regenerate Procedural Assets

```bash
npm run generate:assets
```

Generated files are written to `public/assets/generated/`. The main supplied card image is stored at `public/assets/cards/mind-reader-card.png`.

## Structure

- `src/data/sections.ts` contains the four cinematic section definitions.
- `src/components/StickyCardShowcase.tsx` owns the sticky card states and collection CTA panel.
- `src/components/MotionCardScene.tsx` renders the lazy-loaded Three.js depth, halo, and particle scene.
- `src/components/TradingCard.tsx` uses the local Mind Reader card image and includes a code-generated fallback card.
- `scripts/generate-assets.mjs` creates local textures, grids, holographic layers, card backs, icons, and fallback art.
