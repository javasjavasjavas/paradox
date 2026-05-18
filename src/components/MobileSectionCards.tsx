import { CollectionStack } from "./CollectionStack";
import { TradingCard } from "./TradingCard";

interface MobileSectionCardsProps {
  sectionId: string;
}

export function MobileSectionCards({ sectionId }: MobileSectionCardsProps) {
  if (sectionId === "anatomy" || sectionId === "experience") return null;

  const isCollection = sectionId === "legacy";

  return (
    <div
      className={`mobile-section-cards ${
        isCollection ? "mobile-section-cards--collection" : "mobile-section-cards--single"
      }`}
      aria-hidden="true"
    >
      {isCollection ? <CollectionStack active /> : null}
      <div className="mobile-section-card-stage">
        <TradingCard />
      </div>
    </div>
  );
}
