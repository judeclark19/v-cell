import React from "react";
import gameState from "@/logic/GameState";
import { BoardType } from "@/logic/types";
import { toJS } from "mobx";

export default function DropSpot({
  dropId,
  children
}: {
  dropId: keyof BoardType;
  children: React.ReactNode;
}) {
  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    (e.target as HTMLDivElement).style.height = "100%";
    (e.target as HTMLDivElement).style.boxShadow = "0 0 10px aqua";
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
      const from = toJS(
        gameState.board[card.locationOnBoard as keyof BoardType]
      );
      const indexOfDraggedCard = from.findIndex((c) => c.id === card.id);

      gameState.executeMove(indexOfDraggedCard, card.locationOnBoard, dropId);
    }
  }

  return (
    <div
      id={dropId}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
}
