import { Dispatch, SetStateAction } from "react";
import appState from "./AppState";
import JSConfetti from "js-confetti";
import { cardSizeType, cardSizes } from "@/components/Card/CardUI.styles";
import { boardLayout } from "./types";

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

  appState.moveEvaluator.setExecute(true);
  appState.moveEvaluator.evaluateMove(appState.cardsBeingTouched[0], dropId);
  appState.setIsDragging(false);
  appState.setCardsBeingTouched(null);
};

export function throwConfetti(cardSize: cardSizeType) {
  const confetti = new JSConfetti();
  // custom confetti
  confetti.addConfetti({
    emojis: ["🎰", "🃏", "❤️", "♠️", "♣️", "♦️"],
    emojiSize: cardSizes[cardSize].confettiSize,
    confettiNumber: 200
  });

  // plus standard confetti
  confetti.addConfetti({
    confettiNumber: 200
  });
}

export function formatTime(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return formattedTime;
}

export function getBoardLayoutDisplayName(layout: boardLayout) {
  switch (layout) {
    case "classic":
      return "Classic";
    case "faceUp":
      return "Face Up";
    case "doubleV":
      return "Double V";
    case "tripleV":
      return "Triple V";
  }
}
