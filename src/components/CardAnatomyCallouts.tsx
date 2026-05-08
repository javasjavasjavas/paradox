import { useLayoutEffect, useMemo, useState, type RefObject } from "react";

type Align = "left" | "right";
type Side = "left" | "right";
type CalloutKind = "straight" | "stats";

interface Point {
  x: number;
  y: number;
}

interface CardBox {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

interface AnatomyMetrics {
  width: number;
  height: number;
  card: CardBox;
}

interface CalloutDefinition {
  id: string;
  title: string;
  textLines: string[];
  side: Side;
  kind?: CalloutKind;
  target: (card: CardBox) => Point;
  labelYOffset?: number;
  textOffset?: number;
  lineGap?: number;
}

interface ComputedCallout {
  id: string;
  title: string;
  textLines: string[];
  path: string;
  anchor: Point;
  labelNode: Point;
  label: Point & { align: Align };
  textOffset: number;
  lineGap: number;
}

const DESKTOP_FALLBACK_WIDTH = 1200;
const DESKTOP_FALLBACK_HEIGHT = 900;

const calloutDefinitions: CalloutDefinition[] = [
  {
    id: "rarity",
    title: "1. RARITY",
    textLines: ["Indicates the card's", "rarity level."],
    side: "left",
    target: (card) => ({
      x: card.left + card.width * 0.018,
      y: card.top + card.height * 0.17,
    }),
    labelYOffset: -38,
  },
  {
    id: "identity-strip",
    title: "2. IDENTITY STRIP",
    textLines: ["Japanese translation", "of the Card name."],
    side: "left",
    target: (card) => ({
      x: card.left + card.width * 0.018,
      y: card.top + card.height * 0.42,
    }),
    labelYOffset: -38,
  },
  {
    id: "class",
    title: "3. CLASS",
    textLines: ["Specifies the operative's", "class or faction."],
    side: "left",
    target: (card) => ({
      x: card.left + card.width * 0.018,
      y: card.top + card.height * 0.7,
    }),
    labelYOffset: -35,
  },
  {
    id: "title",
    title: "4. TITLE",
    textLines: ["The operative codename", "that defines their", "identity."],
    side: "right",
    target: (card) => ({
      x: card.right - card.width * 0.018,
      y: card.top + card.height * 0.12,
    }),
    labelYOffset: -10,
    textOffset: 28,
  },
  {
    id: "character-art",
    title: "5. CHARACTER ART",
    textLines: ["Visual identity of the", "operative. Every detail", "is intentional."],
    side: "right",
    target: (card) => ({
      x: card.right - card.width * 0.018,
      y: card.top + card.height * 0.43,
    }),
    labelYOffset: -18,
  },
  {
    id: "stats",
    title: "7. STATS",
    textLines: ["Core attributes that", "define capabilities", "and potential."],
    side: "right",
    kind: "stats",
    target: (card) => ({
      x: card.right - card.width * 0.018,
      y: card.top + card.height * 0.858,
    }),
    labelYOffset: -22,
    textOffset: 28,
    lineGap: 18,
  },
  {
    id: "edition-number",
    title: "6. EDITION NUMBER",
    textLines: ["Unique Edition number", "for each card."],
    side: "right",
    target: (card) => ({
      x: card.right - card.width * 0.018,
      y: card.top + card.height * 0.946,
    }),
    labelYOffset: -18,
  },
  {
    id: "lore-line",
    title: "8. LORE LINE",
    textLines: ["A longer glimpse into role, origin,", "motive, and encoded background."],
    side: "left",
    target: (card) => ({
      x: card.left + card.width * 0.018,
      y: card.top + card.height * 0.925,
    }),
    labelYOffset: -34,
    lineGap: 18,
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getTextAnchor(align: Align) {
  return align === "right" ? "end" : "start";
}

function buildStraightPath(anchor: Point, labelNode: Point) {
  return `M ${anchor.x} ${anchor.y} L ${labelNode.x} ${labelNode.y}`;
}

function buildStatsPath(anchor: Point, labelNode: Point, lineLength: number) {
  const bend = {
    x: anchor.x + lineLength * 0.58,
    y: labelNode.y,
  };

  return `M ${anchor.x} ${anchor.y} L ${bend.x} ${bend.y} L ${labelNode.x} ${labelNode.y}`;
}

function measureLayout(container: HTMLElement, card: HTMLElement): AnatomyMetrics {
  const containerRect = container.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();

  return {
    width: containerRect.width,
    height: containerRect.height,
    card: {
      left: cardRect.left - containerRect.left,
      top: cardRect.top - containerRect.top,
      right: cardRect.right - containerRect.left,
      bottom: cardRect.bottom - containerRect.top,
      width: cardRect.width,
      height: cardRect.height,
    },
  };
}

function metricsKey(metrics: AnatomyMetrics) {
  const { width, height, card } = metrics;

  return [
    width,
    height,
    card.left,
    card.top,
    card.right,
    card.bottom,
    card.width,
    card.height,
  ]
    .map((value) => Math.round(value * 10) / 10)
    .join("|");
}

function createComputedCallouts(metrics: AnatomyMetrics): ComputedCallout[] {
  const { card, width } = metrics;
  const lineLength = clamp(card.width * 0.15, 70, 110);
  const textGap = clamp(card.width * 0.06, 28, 42);
  const leftTextSafeX = clamp(card.left - lineLength - textGap, 190, width - 24);
  const rightTextSafeX = clamp(card.right + lineLength + textGap, 24, width - 215);

  return calloutDefinitions.map((definition) => {
    const anchor = definition.target(card);
    const lineY = definition.kind === "stats" ? anchor.y - clamp(card.height * 0.06, 38, 56) : anchor.y;
    const labelNode =
      definition.side === "left"
        ? {
            x: anchor.x - lineLength,
            y: lineY,
          }
        : {
            x: anchor.x + lineLength,
            y: lineY,
          };
    const label =
      definition.side === "left"
        ? {
            x: leftTextSafeX,
            y: lineY + (definition.labelYOffset ?? -34),
            align: "right" as const,
          }
        : {
            x: rightTextSafeX,
            y: lineY + (definition.labelYOffset ?? -22),
            align: "left" as const,
          };
    const path =
      definition.kind === "stats"
        ? buildStatsPath(anchor, labelNode, lineLength)
        : buildStraightPath(anchor, labelNode);

    return {
      id: definition.id,
      title: definition.title,
      textLines: definition.textLines,
      path,
      anchor,
      labelNode,
      label,
      textOffset: definition.textOffset ?? 28,
      lineGap: definition.lineGap ?? 18,
    };
  });
}

interface CardAnatomyCalloutsProps {
  active: boolean;
  showcaseRef: RefObject<HTMLElement | null>;
  cardRef: RefObject<HTMLElement | null>;
}

export function CardAnatomyCallouts({ active, showcaseRef, cardRef }: CardAnatomyCalloutsProps) {
  const [metrics, setMetrics] = useState<AnatomyMetrics | null>(null);

  useLayoutEffect(() => {
    if (!active) {
      return undefined;
    }

    let frame = 0;
    let lastKey = "";

    const update = () => {
      const container = showcaseRef.current;
      const card = cardRef.current;

      if (container && card) {
        const nextMetrics = measureLayout(container, card);
        const nextKey = metricsKey(nextMetrics);

        if (nextKey !== lastKey) {
          lastKey = nextKey;
          setMetrics(nextMetrics);
        }
      }

      frame = requestAnimationFrame(update);
    };

    const resizeObserver = new ResizeObserver(update);
    if (showcaseRef.current) resizeObserver.observe(showcaseRef.current);
    if (cardRef.current) resizeObserver.observe(cardRef.current);

    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [active, cardRef, showcaseRef]);

  const computedCallouts = useMemo(() => (metrics ? createComputedCallouts(metrics) : []), [metrics]);
  const svgWidth = metrics?.width ?? DESKTOP_FALLBACK_WIDTH;
  const svgHeight = metrics?.height ?? DESKTOP_FALLBACK_HEIGHT;

  return (
    <div className={`anatomy-callouts ${active ? "is-visible" : ""}`} aria-hidden={!active}>
      <div className="anatomy-callouts__desktop">
        <svg
          className="anatomy-callouts__svg"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Mind Reader card anatomy references"
        >
          {computedCallouts.map((callout) => {
            const textAnchor = getTextAnchor(callout.label.align);

            return (
              <g key={callout.id} className={`callout callout--${callout.id}`}>
                <path className="callout__path" d={callout.path} pathLength={1} />
                <circle
                  className="callout__node callout__node--anchor"
                  cx={callout.anchor.x}
                  cy={callout.anchor.y}
                  r={5.8}
                />
                <circle
                  className="callout__node callout__node--label"
                  cx={callout.labelNode.x}
                  cy={callout.labelNode.y}
                  r={5.8}
                />
                <text
                  className="callout__title"
                  x={callout.label.x}
                  y={callout.label.y}
                  textAnchor={textAnchor}
                >
                  {callout.title}
                </text>
                {callout.textLines.map((line, index) => (
                  <text
                    key={`${callout.id}-${index}`}
                    className="callout__text"
                    x={callout.label.x}
                    y={callout.label.y + callout.textOffset + index * callout.lineGap}
                    textAnchor={textAnchor}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="anatomy-callouts__mobile">
        {calloutDefinitions.map((callout) => (
          <article key={callout.id} className="anatomy-mobile-card">
            <span className="anatomy-mobile-card__dot" />
            <div className="anatomy-mobile-card__content">
              <h4>{callout.title}</h4>
              <p>{callout.textLines.join(" ")}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
