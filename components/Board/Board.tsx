import { useEffect, useState } from "react";
import {
  BoardContainer,
  GameControlButton,
  GameControlButtons,
  HeaderImage,
  HowToPlay
} from "./Board.styles";
import headerImage from "@/assets/images/v-cell_header1.png";
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
  getCardSize,
  windowHeightState,
  windowWidthState
} from "@/logic/OrientationAndSize";
import { cardSize } from "../Card/CardUI.styles";
import CardsBeingDragged from "../CardsBeingDragged";
import WinModal from "../Modals/WinModal";
import { winHistoryState } from "@/logic/LocalStorageAtoms";
import InstructionsModal from "../Modals/InstructionsModal";
import { FaInfoCircle } from "react-icons/fa";
import { Luckiest_Guy, Questrial } from "next/font/google";
import {
  handlePointerDown,
  handlePointerMove,
  handlePointerUp
} from "@/logic/UIFunctions";
import LocalStorageServerHelper from "@/logic/LocalStorageServerHelper";

export const luckyGuy = Luckiest_Guy({ weight: "400", subsets: ["latin"] });
export const questrial = Questrial({ weight: "400", subsets: ["latin"] });

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
  const [windowWidth, setWindowWidth] = useRecoilState(windowWidthState);
  const [windowHeight, setWindowHeight] = useRecoilState(windowHeightState);
  const [dragPosition, setDragPosition] = useState({ left: 0, top: 0 });

  let lastKnownOrientation: Orientation = orientation;

  useEffect(() => {
    const winHistoryFromStorage = JSON.parse(
      localStorage.getItem("vCellWinHistory") || "[]"
    );
    setWinHistory(winHistoryFromStorage);
    setIsLoading(false);
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

    document.addEventListener("pointermove", (e) => {
      handlePointerMove(e, setDragPosition);
    });
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointermove", (e) => {
        handlePointerMove(e, setDragPosition);
      });
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
      <LocalStorageServerHelper />
      <HeaderImage>
        <Image
          src={headerImage}
          width={1700}
          height={400}
          alt="V-Cell header image"
          priority
        />
      </HeaderImage>

      <HowToPlay
        className={questrial.className}
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
        $cardSize={getCardSize(windowWidth, windowHeight)}
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

      <GameControlButtons className={questrial.className}>
        <GameControlButton
          className={`deal-again ${questrial.className}`}
          style={{
            backgroundColor: "#0099cc",
            borderColor: "#0099cc"
          }}
          onClick={() => {
            gameState.dealCards();
          }}
          disabled={gameState.winningBoard && gameState.canAutoComplete}
        >
          Deal again
        </GameControlButton>
        <GameControlButton
          style={{
            backgroundColor: "var(--red)",
            borderColor: "var(--red)"
          }}
          className={questrial.className}
          disabled={gameState.history.length === 0 || gameState.winningBoard}
          onClick={() => {
            gameState.undo();
          }}
        >
          Undo
        </GameControlButton>

        {process.env.NODE_ENV !== "production" && (
          <button
            onClick={() => {
              gameState.setIsWinningBoard(true);
              gameState.setIsWinModalOpen(true);
            }}
          >
            win
          </button>
        )}
      </GameControlButtons>
    </>
  );
});

export default Board;
