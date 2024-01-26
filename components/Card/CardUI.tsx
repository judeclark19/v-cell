import { CardStyle, cardSize } from "./CardUI.styles";
import CardClass from "./CardClass";
import gameState from "@/logic/GameState";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { poppins } from "@/app/page";

const CardUI = observer(
  ({
    size,
    card,
    zIndex,
    offset
  }: {
    size: cardSize;
    card: CardClass;
    zIndex: number;
    offset?: number;
    spacer?: boolean;
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
          gameState.isDragging &&
          gameState.cardsBeingTouched?.findIndex((c) => c.id === card.id) !==
            -1 &&
          card.locationOnBoard !== "dragging"
        }
        $offset={offset}
        $isActive={card.isActive}
        $isFaceUp={card.isFaceUp}
        $locationOnBoard={card.locationOnBoard}
        onPointerDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          gameState.setCardsBeingTouched(
            card.isActive && card.isFaceUp ? card : null
          );
        }}
        onPointerUp={(e) => {
          // this function listens for a double click which is interpreted as an attempt to send a card up to the foundations
          e.stopPropagation();
          const timeSinceLastTap = Date.now() - lastTapTimestamp;
          if (timeSinceLastTap <= 300) {
            if (!card.isActive) return;
            gameState.evaluateMove(card, "foundations");
            gameState.setIsDragging(false);
            gameState.setCardsBeingTouched(null);
          }

          setLastTapTimestamp(Date.now());
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        className={`card ${poppins.className}`}
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
