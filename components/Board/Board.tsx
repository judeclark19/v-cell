import { useEffect, useState } from "react";
import {
  BoardContainer,
  GameControlButton,
  GameControlButtons,
  GameTitle
} from "./Board.styles";
import gameState from "@/logic/GameState";
import { observer } from "mobx-react-lite";
import { Luckiest_Guy } from "next/font/google";
import FoundationsUI from "./Foundations/FoundationsUI";
import TableauUI from "./Tableau/TableauUI";
import HandUI from "./Hand/HandUI";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  Orientation,
  boardOrientationState,
  windowHeightState,
  windowWidthState
} from "@/logic/OrientationAndSize";
import { cardSize } from "../Card/CardUI.styles";
import CardsBeingDragged from "../CardsBeingDragged";

const luckyGuy = Luckiest_Guy({ weight: "400", subsets: ["latin"] });

export const getCardOffsetAmount = (size: cardSize) => {
  switch (size) {
    case "large":
      return 32;
    case "medium":
      return 25;
    case "small":
      return 20;
    case "tiny":
      return 14;
  }
};

const Board = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [orientation, setBoardOrientation] = useRecoilState(
    boardOrientationState
  );
  const [windowWidth, setWindowWidth] = useRecoilState(windowWidthState);
  const setWindowHeight = useSetRecoilState(windowHeightState);
  const [dragPosition, setDragPosition] = useState({ left: 0, top: 0 });

  let lastKnownOrientation: Orientation = orientation;

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    let newOrientation: Orientation =
      window.innerWidth <= 980 ? "portrait" : "landscape";

    if (newOrientation !== lastKnownOrientation) {
      setBoardOrientation(newOrientation);
      lastKnownOrientation = newOrientation;
    }
  };

  const handlePointerDown = () => {
    gameState.setIsDragging(false);
  };

  const handlePointerMove = (event: PointerEvent) => {
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

  const handlePointerUp = (event: PointerEvent) => {
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

    gameState.evaluateMove(gameState.cardsBeingTouched[0], dropId);
    gameState.setIsDragging(false);
    gameState.setCardsBeingTouched(null);
  };

  useEffect(() => {
    gameState.dealCards();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [handleResize]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GameTitle className={luckyGuy.className} $windowWidth={windowWidth}>
        V-Cell
      </GameTitle>
      <GameControlButtons $windowWidth={windowWidth}>
        <div>
          <GameControlButton
            className="deal-again"
            style={{
              backgroundColor: "#0099cc",
              borderColor: "#0099cc"
            }}
            onClick={() => {
              gameState.dealCards();
            }}
          >
            Deal again
          </GameControlButton>
        </div>
        <div>
          <GameControlButton
            style={{
              backgroundColor: "#dc3a3a",
              borderColor: "#dc3a3a"
            }}
            disabled={gameState.history.length === 0}
            onClick={() => {
              gameState.undo();
            }}
          >
            Undo
          </GameControlButton>
          <GameControlButton
            style={{
              backgroundColor: "#33d849",
              borderColor: "#33d849"
            }}
            disabled={!gameState.canAutoComplete}
            onClick={() => {
              gameState.autoComplete();
            }}
          >
            Autocomplete
          </GameControlButton>
        </div>
      </GameControlButtons>
      <BoardContainer
        onPointerLeave={(e) => {
          handlePointerUp(e as unknown as PointerEvent);
        }}
        $orientation={orientation}
        $windowWidth={windowWidth}
      >
        {gameState.cardsBeingTouched && gameState.isDragging && (
          <CardsBeingDragged dragPosition={dragPosition} />
        )}

        <FoundationsUI />
        <div className="scroll">
          <TableauUI />
        </div>
        <HandUI />
      </BoardContainer>
    </>
  );
});

export default Board;
