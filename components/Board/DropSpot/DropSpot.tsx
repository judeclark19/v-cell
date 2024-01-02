import React from "react";
import gameState from "@/logic/GameState";
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
