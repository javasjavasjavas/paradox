import type { CSSProperties } from "react";

const collectionCards = [
  { src: "/assets/cards/collection-vampire.png", x: "-13.5vw", y: "1.1vh", rotation: "-24deg", scale: 1.08 },
  { src: "/assets/cards/collection-vipers-girl.png", x: "-4.5vw", y: "-4.4vh", rotation: "-8deg", scale: 1.04 },
  { src: "/assets/cards/collection-undersea-nightmare.png", x: "4.5vw", y: "-4.4vh", rotation: "8deg", scale: 1.04 },
  { src: "/assets/cards/collection-aware.png", x: "13.5vw", y: "1.1vh", rotation: "24deg", scale: 1.08 },
];

interface CollectionStackProps {
  active: boolean;
}

export function CollectionStack({ active }: CollectionStackProps) {
  return (
    <div className={`collection-stack ${active ? "is-visible" : ""}`} aria-hidden={!active}>
      {collectionCards.map((card, index) => {
        return (
          <img
            key={`${card.src}-${index}`}
            src={card.src}
            alt=""
            className="stack-card"
            style={
              {
                "--fan-x": card.x,
                "--fan-y": card.y,
                "--fan-rotation": card.rotation,
                "--fan-scale": card.scale,
                "--fan-delay": `${index * 70}ms`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
