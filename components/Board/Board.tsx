import { useEffect, useState } from "react";
import {
  BoardContainer,
  GameControlButton,
  GameControlButtons,
  HeaderImage,
  HowToPlay
} from "./Board.styles";
import headerImage from "@/assets/images/v-cell_header1.jpg";
import Image from "next/image";
import gameState from "@/logic/GameState";
import { observer } from "mobx-react-lite";
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
import WinModal from "../Modals/WinModal";
import { winHistoryState } from "@/logic/WinHistory";
import InstructionsModal from "../Modals/InstructionsModal";
import { FaInfoCircle } from "react-icons/fa";
// import { poppins } from "@/app/page";
import { Luckiest_Guy, Poppins } from "next/font/google";

export const luckyGuy = Luckiest_Guy({ weight: "400", subsets: ["latin"] });
export const poppins = Poppins({ weight: "400", subsets: ["latin"] });

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
  const setWinHistory = useSetRecoilState(winHistoryState);
  const setWindowWidth = useSetRecoilState(windowWidthState);
  const setWindowHeight = useSetRecoilState(windowHeightState);
  const [dragPosition, setDragPosition] = useState({ left: 0, top: 0 });

  let lastKnownOrientation: Orientation = orientation;

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
    const winHistoryFromStorage = JSON.parse(
      localStorage.getItem("vCellWinHistory") || "[]"
    );
    setWinHistory(winHistoryFromStorage);
    setIsLoading(false);

    const knowsHowToPlay = localStorage.getItem("vCellKnowsHowToPlay");
    if (!knowsHowToPlay) {
      gameState.setIsInstructionsModalOpen(true);
      localStorage.setItem("vCellKnowsHowToPlay", "true");
    }
  }, []);

  useEffect(() => {
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
  }, [setWinHistory]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <GameTitle className={luckyGuy.className}>V-Cell</GameTitle>
       */}
      <HeaderImage>
        <Image
          src={headerImage}
          width={1700}
          height={400}
          alt="Picture of the author"
        />
      </HeaderImage>
      <HowToPlay
        className={poppins.className}
        onClick={() => {
          if (!gameState.isInstructionsModalOpen) {
            gameState.setIsInstructionsModalOpen(true);
          }
        }}
        $isInstructionsModalOpen={gameState.isInstructionsModalOpen}
      >
        <span>How to play</span> <FaInfoCircle className="info-icon" />
      </HowToPlay>

      <BoardContainer
        $isModalOpen={
          gameState.isWinModalOpen || gameState.isInstructionsModalOpen
        }
        onPointerLeave={(e) => {
          handlePointerUp(e as unknown as PointerEvent);
        }}
      >
        {gameState.isWinModalOpen && <WinModal />}
        {gameState.isInstructionsModalOpen && <InstructionsModal />}

        {gameState.cardsBeingTouched && gameState.isDragging && (
          <CardsBeingDragged dragPosition={dragPosition} />
        )}

        <FoundationsUI />
        <div className="scroll">
          <TableauUI />
        </div>
        <HandUI />
      </BoardContainer>

      <GameControlButtons className={poppins.className}>
        <div>
          <GameControlButton
            className={`deal-again ${poppins.className}`}
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
          <GameControlButton
            style={{
              backgroundColor: "var(--red)",
              borderColor: "var(--red)"
            }}
            className={poppins.className}
            disabled={gameState.history.length === 0 || gameState.winningBoard}
            onClick={() => {
              gameState.undo();
            }}
          >
            Undo
          </GameControlButton>
        </div>

        {gameState.canAutoComplete && (
          <div>
            <GameControlButton
              style={{
                backgroundColor: "#33d849",
                borderColor: "#33d849"
              }}
              className={poppins.className}
              disabled={!gameState.canAutoComplete}
              onClick={() => {
                gameState.autoComplete();
              }}
            >
              Autocomplete
            </GameControlButton>
          </div>
        )}

        <button
          onClick={() => {
            gameState.setIsWinningBoard(true);
          }}
        >
          win
        </button>
      </GameControlButtons>
    </>
  );
});

export default Board;
