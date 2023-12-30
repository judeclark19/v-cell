import gameState from "@/logic/GameState";
import React from "react";
import { CardStyle } from "./CardUI.styles";
import CardClass from "./CardClass";

export default function CardUI({
  card,
  zIndex,
  offset,
  handleCardClick
}: {
  card: CardClass;
  zIndex: number;
  offset?: number;
  handleCardClick?: (event: React.MouseEvent) => void;
}) {
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

    if (card.value === "ace") {
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

  return (
    <CardStyle
      key={`${card.value}_of_${card.suit}`}
      id={`${card.value}_of_${card.suit}`}
      data-testid={`${card.value}_of_${card.suit}`}
      $suit={card.suit}
      $value={card.value}
      $zIndex={zIndex}
      $offset={offset}
      $isActive={card.isActive}
      $isFaceUp={card.isFaceUp}
      onClick={(e) => {
        if (handleCardClick) handleCardClick(e);
        else
          console.log("no funciton for card", `${card.value}_of_${card.suit}`);
      }}
    >
      <div className="card-front">
        <h1>{card.value}</h1>
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
