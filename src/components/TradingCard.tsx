import { useState } from "react";

const CARD_SRC = "/assets/cards/mind-reader-card.png";

function PlaceholderCard() {
  return (
    <div className="placeholder-card" role="img" aria-label="Generated Mind Reader trading card">
      <div className="placeholder-title">MIND READER</div>
      <div className="placeholder-layout">
        <aside>
          <div className="rarity-box">
            <span>RARITY</span>
            <strong>RA</strong>
          </div>
          <div className="identity-strip">新世界秩序のセールスマン</div>
          <div className="class-strip">HUMAN</div>
        </aside>
        <div className="placeholder-art">
          <img src="/assets/generated/placeholder-character.svg" alt="" />
        </div>
      </div>
      <div className="placeholder-stats">
        {[
          ["ATTACK", "87"],
          ["DEFENSE", "73"],
          ["WISDOM", "91"],
          ["CHARISMA", "79"],
        ].map(([label, value]) => (
          <span key={label}>
            <small>{label}</small>
            <strong>{value}</strong>
          </span>
        ))}
      </div>
      <p>HE SELLS ORDER IN A COLLAPSING WORLD, CARRYING CONTRACTS SIGNED IN FEAR, POWER, AND FORGOTTEN BLOOD.</p>
      <b>037/777</b>
    </div>
  );
}

export function TradingCard() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="trading-card-shell">
      <div className="card-rim" />
      <div className="card-reflection" />
      <div className="card-glass" />
      {imageFailed ? (
        <PlaceholderCard />
      ) : (
        <img
          className="trading-card-image"
          src={CARD_SRC}
          alt="Mind Reader premium trading card"
          draggable={false}
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  );
}
