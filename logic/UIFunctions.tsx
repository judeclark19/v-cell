import { Dispatch, SetStateAction } from "react";
import appState from "./AppState";
import confetti, { Shape } from "canvas-confetti";
import { cardSizeType } from "@/components/Card/CardUI.styles";

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
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const scalar = 3;
  const slotMachine = confetti.shapeFromText({ text: "🎰", scalar });
  const joker = confetti.shapeFromText({ text: "🃏", scalar });
  const hearts = confetti.shapeFromText({ text: "❤️", scalar });
  const spades = confetti.shapeFromText({ text: "♠️", scalar });
  const clubs = confetti.shapeFromText({ text: "♣️", scalar });
  const diamonds = confetti.shapeFromText({ text: "♦️", scalar });

  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 200,
    shapes: [
      "circle" as Shape,
      "square" as Shape,
      "triangle" as Shape,
      "star" as Shape,
      slotMachine,
      joker,
      hearts,
      spades,
      clubs,
      diamonds
    ]
  };
  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  let interval: number;

  interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    });
    confetti({
      ...defaults,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    });
  }, 250) as unknown as number;
}

export function formatTime(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return formattedTime;
}
