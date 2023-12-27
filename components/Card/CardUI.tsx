import gameState from "@/logic/GameState";
import { CardType } from "@/logic/types";
import React from "react";
import { CardStyle } from "./CardUI.styles";

export default function CardUI({
  card,
  zIndex,
  offset,
  isActive = false
}: {
  card: CardType;
  zIndex: number;
  offset?: number;
  isActive?: boolean;
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

    const maxIndex = gameState.values.indexOf("10") + 1;

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
      $isActive={isActive}
      onClick={() => {
        console.log("clicked on card", card.value, "of", card.suit);
      }}
    >
      <h1>{card.value}</h1>
      <div className="emojis">
        {createIcons().map((icon, i) => (
          <div key={`${icon}${i}`}>
            <span>{icon}</span>
          </div>
        ))}
      </div>
    </CardStyle>
  );
}
