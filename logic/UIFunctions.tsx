import { Dispatch, SetStateAction } from "react";
import gameState from "./AppState";

export const handlePointerDown = () => {
  gameState.setIsDragging(false);
};

export const handlePointerMove = (
  event: PointerEvent,
  setDragPosition: Dispatch<SetStateAction<{ left: number; top: number }>>
) => {
  if (!gameState.cardsBeingTouched) return;
  gameState.setIsDragging(true); // Get the scroll positions
  const scrollX = window.scrollX || document.documentElement.scrollLeft;
  const scrollY = window.scrollY || document.documentElement.scrollTop;

  // Add the scroll positions to the clientX and clientY
  setDragPosition({
    left: event.clientX + scrollX,
    top: event.clientY + scrollY
  });
};

export const handlePointerUp = (event: PointerEvent) => {
  if (!gameState.isDragging) {
    // if the card wasn't dragged then the user didn't make a move
    gameState.setCardsBeingTouched(null);
    return;
  }

  const elementUnderPointer = document.elementFromPoint(
    event.clientX,
    event.clientY
  );

  const dropId = elementUnderPointer
    ?.closest("[data-dropid]")
    ?.getAttribute("data-dropid");

  if (!dropId || !gameState.cardsBeingTouched) {
    gameState.setIsDragging(false);
    gameState.setCardsBeingTouched(null);
    return;
  }

  if (dropId === gameState.cardsBeingTouched[0].locationOnBoard) {
    gameState.setIsDragging(false);
    gameState.setCardsBeingTouched(null);
    return;
  }

  gameState.moveEvaluator.evaluateMove(gameState.cardsBeingTouched[0], dropId);
  gameState.setIsDragging(false);
  gameState.setCardsBeingTouched(null);
};
