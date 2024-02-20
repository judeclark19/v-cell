import { useEffect, useState } from "react";
import {
  BoardContainer,
  ControlsBar,
  GameControlButton,
  GameControlButtons,
  HeaderImage,
  HowToPlay,
  WoodenBorder
} from "./Board.styles";
import headerImage from "@/assets/images/v-cell_header1.png";
import Image from "next/image";
import appState from "@/logic/AppState";
import { observer } from "mobx-react-lite";
import FoundationsUI from "./Foundations/FoundationsUI";
import TableauUI from "./Tableau/TableauUI";
import HandUI from "./Hand/HandUI";
import { useRecoilState } from "recoil";
import {
  Orientation,
  boardOrientationState,
  cardSizeState,
  calculateCardSize
} from "@/logic/OrientationAndSize";
import CardsBeingDragged from "../CardsBeingDragged";
import WinModal from "../Modals/WinModal";
import InstructionsModal from "../Modals/InstructionsModal";
import { FaCog, FaInfoCircle } from "react-icons/fa";
import { Luckiest_Guy, Questrial } from "next/font/google";
import {
  handlePointerDown,
  handlePointerMove,
  handlePointerUp
} from "@/logic/UIFunctions";
import LocalStorageServerHelper from "@/logic/LocalStorageServerHelper";
import SettingsModal from "../Modals/SettingsModal";

export const luckyGuy = Luckiest_Guy({ weight: "400", subsets: ["latin"] });
export const questrial = Questrial({ weight: "400", subsets: ["latin"] });

const Board = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [orientation, setBoardOrientation] = useRecoilState(
    boardOrientationState
  );
  const [cardSize, setCardSize] = useRecoilState(cardSizeState);
  const [dragPosition, setDragPosition] = useState({ left: 0, top: 0 });

  let lastKnownOrientation: Orientation = orientation;

  useEffect(() => {}, []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const winHistory = localStorage.getItem("vCellWinHistory")
      ? JSON.parse(localStorage.getItem("vCellWinHistory") as string)
      : [];
    if (appState.winCount > 0) {
      localStorage.setItem(
        "vCellWinHistory",
        JSON.stringify([...winHistory, new Date()])
      );
    }
  }, [appState.winCount]);

  useEffect(() => {
    const handleResize = () => {
      setCardSize(calculateCardSize(window.innerWidth, window.innerHeight));

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
  }, []);

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

      <ControlsBar>
        <div>{/* left empty for grid */}</div>
        <HowToPlay
          className={questrial.className}
          onClick={() => {
            if (!appState.instructionsModal.isOpen) {
              appState.instructionsModal.open();
              appState.winModal.close();
            }
          }}
          $isInstructionsModalOpen={appState.instructionsModal.isOpen}
        >
          <span>How to play</span> <FaInfoCircle className="info-icon" />
        </HowToPlay>
        <div className="settings-button">
          <button
            aria-label="Settings"
            onClick={() => {
              appState.settingsModal.open();
              appState.instructionsModal.close();
              appState.winModal.close();
            }}
          >
            <FaCog />
          </button>
        </div>
      </ControlsBar>
      <WoodenBorder>
        <BoardContainer
          $isModalOpen={
            appState.winModal.isOpen || appState.instructionsModal.isOpen
          }
          $cardSize={cardSize}
          onPointerLeave={(e) => {
            handlePointerUp(e as unknown as PointerEvent);
          }}
        >
          {appState.winModal.isOpen && <WinModal />}
          {appState.settingsModal.isOpen && <SettingsModal />}
          {appState.instructionsModal.isOpen && <InstructionsModal />}
          {appState.cardsBeingTouched && appState.isDragging && (
            <CardsBeingDragged dragPosition={dragPosition} />
          )}
          <FoundationsUI />
          <div className="scroll">
            <TableauUI />
          </div>
          <HandUI />
        </BoardContainer>
      </WoodenBorder>
      <GameControlButtons className={questrial.className}>
        <GameControlButton
          className={questrial.className}
          style={{
            backgroundColor: "#0099cc",
            borderColor: "#0099cc"
          }}
          onClick={() => {
            appState.dealCards();
          }}
          disabled={appState.winningBoard && appState.canAutoComplete}
        >
          Deal again
        </GameControlButton>
        <GameControlButton
          style={{
            backgroundColor: "var(--red)",
            borderColor: "var(--red)"
          }}
          className={questrial.className}
          disabled={appState.moveEvaluator.getIsUndoButtonDisabled()}
          onClick={() => {
            appState.undo();
          }}
        >
          Undo{" "}
          {appState.moveEvaluator.undosAllowed > 0 &&
          appState.moveEvaluator.undosAllowed !== Infinity
            ? `(${
                appState.moveEvaluator.undosAllowed -
                appState.moveEvaluator.undosUsed
              })`
            : ""}
        </GameControlButton>

        {process.env.NODE_ENV !== "production" && (
          <button
            onClick={() => {
              appState.setIsWinningBoard(true);
              appState.winModal.open();
              appState.instructionsModal.close();
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
