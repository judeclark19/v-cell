import { useEffect, useState } from "react";
import {
  BoardContainer,
  ControlsBar,
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
import { cardSizeState, calculateCardSize } from "@/logic/RecoilAtoms";
import CardsBeingDragged from "../CardsBeingDragged";
import {
  HighScoresModal,
  InstructionsModal,
  PauseModal,
  SettingsModal,
  WinModal
} from "../Modals";
import { FaCog, FaInfoCircle, FaTrophy } from "react-icons/fa";
import { Luckiest_Guy, Questrial, Poppins } from "next/font/google";
import {
  handlePointerDown,
  handlePointerMove,
  handlePointerUp
} from "@/logic/UIFunctions";
import LocalStorageServerHelper from "@/logic/LocalStorageServerHelper";
import TimerUI from "./TimerUI";
import { ModalName } from "@/logic/types";
import Loader from "../Loader";

export const luckyGuy = Luckiest_Guy({ weight: "400", subsets: ["latin"] });
export const questrial = Questrial({ weight: "400", subsets: ["latin"] });
export const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"]
});

const Board = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [dragPosition, setDragPosition] = useState({ left: 0, top: 0 });
  const [cardSize, setCardSize] = useRecoilState(cardSizeState);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const winHistory = localStorage.getItem("vCellWinHistory")
      ? JSON.parse(localStorage.getItem("vCellWinHistory") as string)
      : [];
    if (appState.winCount > 0) {
      const newWinObject = {
        date: new Date(),
        layout: appState.layoutName,
        timeElapsed: appState.timer.timeElapsed
      };

      localStorage.setItem(
        "vCellWinHistory",
        JSON.stringify([...winHistory, newWinObject])
      );
    }
  }, [appState.winCount]);

  useEffect(() => {
    const handleResize = () => {
      setCardSize(calculateCardSize(window.innerWidth, window.innerHeight));
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
    return (
      <>
        <HeaderImage>
          <Image
            src={headerImage}
            width={1700}
            height={400}
            alt="V-Cell header image"
            priority
          />
        </HeaderImage>
        <Loader />
      </>
    );
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
        <HowToPlay
          className={questrial.className}
          onClick={() => {
            for (let modal in appState.modals) {
              if (modal === "instructions") {
                appState.modals[modal as ModalName].open();
              } else appState.modals[modal as ModalName].close();
            }
          }}
          $isInstructionsModalOpen={appState.modals.instructions.isOpen}
        >
          <span>How to play</span> <FaInfoCircle className="info-icon" />
        </HowToPlay>
        <div className="hs-and-settings">
          <button
            aria-label="High Scores"
            onClick={() => {
              for (let modal in appState.modals) {
                if (modal === "highScores") {
                  appState.modals[modal as ModalName].open();
                } else appState.modals[modal as ModalName].close();
              }
            }}
          >
            <FaTrophy />
          </button>
          <button
            aria-label="Settings"
            onClick={() => {
              for (let modal in appState.modals) {
                if (modal === "settings") {
                  appState.modals[modal as ModalName].open();
                } else appState.modals[modal as ModalName].close();
              }
            }}
          >
            <FaCog />
          </button>
        </div>
      </ControlsBar>
      <WoodenBorder>
        <TimerUI />

        <BoardContainer
          $isModalOpen={
            // some modal is open
            appState.anyModalIsOpen()
          }
          $cardSize={cardSize}
          onPointerLeave={(e) => {
            handlePointerUp(e as unknown as PointerEvent);
          }}
        >
          {appState.modals.win.isOpen && <WinModal />}
          {appState.modals.settings.isOpen && <SettingsModal />}
          {appState.modals.instructions.isOpen && <InstructionsModal />}
          {appState.modals.pause.isOpen && <PauseModal />}
          {appState.modals.highScores.isOpen && <HighScoresModal />}
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
        <button
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
        </button>
        <button
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
        </button>

        {process.env.NODE_ENV !== "production" && (
          <button
            onClick={() => {
              appState.setIsWinningBoard(true);
              for (let modal in appState.modals) {
                if (modal === "win") {
                  appState.modals[modal as ModalName].open();
                } else appState.modals[modal as ModalName].close();
              }
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
