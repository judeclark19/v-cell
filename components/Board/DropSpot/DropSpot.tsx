import React from "react";
import gameState from "@/logic/GameState";
import { BoardType } from "@/logic/types";
import { toJS } from "mobx";
import { cardSizes } from "@/components/Card/CardUI.styles";

export default function DropSpot({
  size,
  dropId,
  children
}: {
  size: "large" | "medium";
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
    const card = JSON.parse(e.dataTransfer.getData("incomingCard"));

    if (gameState.evaluateMove(card, dropId)) {
      let indexOfDraggedCard: number;

      if (
        card.locationOnBoard === "hand-0" ||
        card.locationOnBoard === "hand-1" ||
        card.locationOnBoard === "hand-2" ||
        card.locationOnBoard === "hand-3" ||
        card.locationOnBoard === "hand-4"
      ) {
        indexOfDraggedCard = 0;
      } else {
        const from = toJS(
          gameState.board[card.locationOnBoard as keyof BoardType]
        );

        indexOfDraggedCard = from.findIndex((c) => c.id === card.id);
      }

      gameState.executeMove(indexOfDraggedCard, card.locationOnBoard, dropId);
    }
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
