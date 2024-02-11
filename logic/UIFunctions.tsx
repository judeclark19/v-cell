import { Dispatch, SetStateAction } from "react";
import appState from "./AppState";

export const handlePointerDown = () => {
  appState.setIsDragging(false);
};

export const handlePointerMove = (
  event: PointerEvent,
  setDragPosition: Dispatch<SetStateAction<{ left: number; top: number }>>
) => {
  if (!appState.cardsBeingTouched) return;
  appState.setIsDragging(true); // Get the scroll positions
  const scrollX = window.scrollX || document.documentElement.scrollLeft;
  const scrollY = window.scrollY || document.documentElement.scrollTop;

  // Add the scroll positions to the clientX and clientY
  setDragPosition({
    left: event.clientX + scrollX,
    top: event.clientY + scrollY
  });
};

export const handlePointerUp = (event: PointerEvent) => {
  if (!appState.isDragging) {
    // if the card wasn't dragged then the user didn't make a move
    appState.setCardsBeingTouched(null);
    return;
  }

  const elementUnderPointer = document.elementFromPoint(
    event.clientX,
    event.clientY
  );

  const dropId = elementUnderPointer
    ?.closest("[data-dropid]")
    ?.getAttribute("data-dropid");

  if (!dropId || !appState.cardsBeingTouched) {
    appState.setIsDragging(false);
    appState.setCardsBeingTouched(null);
    return;
  }

  if (dropId === appState.cardsBeingTouched[0].locationOnBoard) {
    appState.setIsDragging(false);
    appState.setCardsBeingTouched(null);
    return;
  }

  appState.moveEvaluator.evaluateMove(appState.cardsBeingTouched[0], dropId);
  appState.setIsDragging(false);
  appState.setCardsBeingTouched(null);
};
