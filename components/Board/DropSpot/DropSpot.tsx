import React from "react";
import gameState from "@/logic/GameState";
import { cardSize, cardSizes } from "@/components/Card/CardUI.styles";
import CardClass from "@/components/Card/CardClass";

export default function DropSpot({
  size,
  dropId,
  children
}: {
  size: cardSize;
  dropId: string;
  children: React.ReactNode;
}) {
  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    (e.target as HTMLDivElement).style.height = "100%";
    (e.target as HTMLDivElement).style.boxShadow = "0 0 14px aqua";
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    (e.target as HTMLDivElement).style.boxShadow = "";
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    (e.target as HTMLDivElement).style.boxShadow = "";
    const cardData = JSON.parse(e.dataTransfer.getData("incomingCard"));

    const card = new CardClass(cardData.value, cardData.suit);
    card.setLocationOnBoard(cardData.locationOnBoard);

    gameState.evaluateMove(card, dropId);
  }

  return (
    <div>
      <div
        id={dropId}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          height: `${cardSizes[size].height + cardSizes[size].spotPadding}px`,
          width: `${cardSizes[size].width + cardSizes[size].spotPadding}px`
        }}
      >
        {children}
      </div>
    </div>
  );
}
