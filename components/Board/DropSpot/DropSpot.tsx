import React from "react";
import gameState from "@/logic/GameState";
import { BoardType } from "@/logic/types";

export default function DropSpot({
  dropId,
  children
}: {
  dropId: keyof BoardType;
  children: React.ReactNode;
}) {
  function handleDragOver(e) {
    e.preventDefault();
    e.target.style.boxShadow = "0 0 10px gold";
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.target.style.boxShadow = "";
  }

  function handleDrop(e) {
    e.preventDefault();
    e.target.style.boxShadow = "";
    const card = JSON.parse(e.dataTransfer.getData("incomingCard"));

    if (gameState.evaluateMove(card, dropId))
      gameState.executeMove(card, card.locationOnBoard, dropId);
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
