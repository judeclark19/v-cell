import { CardStyle, cardSize } from "./CardUI.styles";
import CardClass from "./CardClass";
import gameState from "@/logic/GameState";
import { useState } from "react";
import { observer } from "mobx-react-lite";

const CardUI = observer(
  ({
    size,
    card,
    zIndex,
    offset,
    handleCardClick
  }: {
    size: cardSize;
    card: CardClass;
    zIndex: number;
    offset?: number;
    spacer?: boolean;
    handleCardClick?: (event: React.MouseEvent) => void;
  }) => {
    const [lastTapTimestamp, setLastTapTimestamp] = useState(0);

    let suitIcon = "";

    switch (card.suit) {
      case "hearts":
        suitIcon = "♥️";
        break;
      case "spades":
        suitIcon = "♠️";
        break;
      case "clubs":
        suitIcon = "♣️";
        break;
      case "diamonds":
        suitIcon = "♦️";
        break;
    }

    function createIcons() {
      const icons = [];

      if (size === "small" || size === "tiny") {
        icons.push(suitIcon);
      } else if (card.value === "A") {
        icons.push(suitIcon, "A");
      } else if (card.value === "jack") {
        icons.push("J", suitIcon, "J");
      } else if (card.value === "queen") {
        icons.push("Q", suitIcon, "Q");
      } else if (card.value === "king") {
        icons.push("K", suitIcon, "K");
      } else {
        for (let i = 0; i < parseInt(card.value); i++) {
          icons.push(suitIcon);
        }
      }

      return icons;
    }

    const getCardTitle = () => {
      if (size !== "small" && size !== "tiny") {
        return card.value;
      } else {
        switch (card.value) {
          case "jack":
            return "J";
          case "queen":
            return "Q";
          case "king":
            return "K";
          default:
            return card.value;
        }
      }
    };

    const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
      e.dataTransfer.setData("incomingCard", JSON.stringify(card));
    };

    return (
      <CardStyle
        key={`${card.value}_of_${card.suit}`}
        id={`${card.value}_of_${card.suit}`}
        data-testid={`${card.value}_of_${card.suit}`}
        $size={size}
        $suit={card.suit}
        $value={card.value}
        $zIndex={zIndex}
        $isBeingDragged={
          gameState.cardBeingTouched === card && gameState.isDragging
        }
        $offset={offset}
        $isActive={card.isActive}
        $isFaceUp={card.isFaceUp}
        draggable={card.isActive && card.isFaceUp}
        onDragStart={handleDragStart}
        onPointerDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          gameState.setCardBeingTouched(card);
        }}
        onPointerUp={(e) => {
          e.stopPropagation();

          const timeSinceLastTap = Date.now() - lastTapTimestamp;
          if (timeSinceLastTap <= 300) {
            // double tap or click
            if (!card.isActive) return;
            gameState.evaluateMove(card, "foundations");
          } else {
            // single tap or click
            if (handleCardClick) handleCardClick(e);
          }

          setLastTapTimestamp(Date.now());
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          if (!card.isActive) return;
          gameState.evaluateMove(card, "foundations");
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        className="card"
      >
        <div className="card-front">
          <div className="card-title">
            <h1>{getCardTitle()}</h1> <span>{suitIcon}</span>
          </div>
          <div className="emojis">
            {createIcons().map((icon, i) => (
              <div key={`${icon}${i}`}>
                <span>{icon}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card-back">
          <h2>the back</h2>
        </div>
      </CardStyle>
    );
  }
);

export default CardUI;
