import { useEffect, useState, type CSSProperties } from "react";

const MINT_URL = "https://opensea.io/collection/paradox-lex-machina/overview";

export function Hero() {
  const [fadeProgress, setFadeProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateFade = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const hero = document.getElementById("hero");
        if (!hero) return;

        const rect = hero.getBoundingClientRect();
        const distance = Math.max(1, rect.height * 0.36);
        setFadeProgress(Math.min(1, Math.max(0, -rect.top / distance)));
      });
    };

    updateFade();
    window.addEventListener("scroll", updateFade, { passive: true });
    window.addEventListener("resize", updateFade);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateFade);
      window.removeEventListener("resize", updateFade);
    };
  }, []);

  return (
    <section
      id="hero"
      className="paradox-hero"
      data-scroll-section
      aria-labelledby="hero-title"
      style={{ "--hero-fade": fadeProgress } as CSSProperties}
    >
      <div className="paradox-hero__inner">
        <div className="paradox-hero__copy">
          <p className="paradox-hero__eyebrow">
            <b>01.</b>
            Digital Collectibles + TCG Universe
          </p>

          <h1 id="hero-title" className="paradox-hero__title">
            <img src="/assets/brand/paradox-logo.svg" alt="Paradox" />
          </h1>

          <p className="paradox-hero__kicker">Collect. Trade. Battle on-chain.</p>

          <p className="paradox-hero__body">
            Paradox is a next-generation trading card universe built on the blockchain. Collect rare
            cards, build your deck, compete in battles and climb in the Leaderboard.
          </p>

          <div className="paradox-hero__actions" aria-label="Hero actions">
            <a
              className="paradox-hero__button"
              href="https://opensea.io/collection/paradox-by-javpixel"
              target="_blank"
              rel="noreferrer"
            >
              <span>Explore OG Collection</span>
            </a>
            <a
              className="paradox-hero__button paradox-hero__button--primary"
              href={MINT_URL}
              target="_blank"
              rel="noreferrer"
            >
              <span>Mint</span>
            </a>
          </div>
        </div>

        <div className="paradox-hero__art" aria-hidden="true">
          <img src="/assets/hero/paradox-hero-characters.png" alt="" />
        </div>
      </div>
    </section>
  );
}
