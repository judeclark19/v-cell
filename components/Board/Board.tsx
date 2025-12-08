import { useEffect, useState } from "react";
import {
  BoardContainer,
  BoardWrapper,
  ControlsBar,
  GameControlButtons,
  HeaderImage,
  WoodenBorder
} from "./Board.styles";
import headerImage from "@/assets/images/v-cell_header_trim.png";
import Image from "next/image";
import appState from "@/logic/AppState";
import { observer } from "mobx-react-lite";
import FoundationsUI from "./Foundations/FoundationsUI";
import TableauUI from "./Tableau/TableauUI";
import HandUI from "./Hand/HandUI";
import { calculateCardSize } from "@/logic/UIFunctions";
import CardsBeingDragged from "../CardsBeingDragged";
import {
  HighScoresModal,
  InstructionsModal,
  PauseModal,
  SettingsModal,
  WinModal
} from "../Modals";
import { FaCog, FaTrophy, FaQuestionCircle } from "react-icons/fa";
import {
  Luckiest_Guy,
  Questrial,
  Poppins,
  Alfa_Slab_One
} from "next/font/google";
import {
  handlePointerDown,
  handlePointerMove,
  handlePointerUp
} from "@/logic/UIFunctions";
import LocalStorageServerHelper from "@/logic/LocalStorageServerHelper";
import { ModalName } from "@/logic/types";
import Loader from "../Loader";
// import { cardSizeType } from "../Card/CardUI.styles";

export const luckyGuy = Luckiest_Guy({ weight: "400", subsets: ["latin"] });
export const alfaSlabOne = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"]
});
export const questrial = Questrial({ weight: "400", subsets: ["latin"] });
export const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"]
});

const Board = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [dragPosition, setDragPosition] = useState({ left: 0, top: 0 });

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
      appState.setCardSize(
        calculateCardSize(window.innerWidth, window.innerHeight)
      );
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
        <div
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <HeaderImage>
            <Image
              src={headerImage}
              width={1700}
              height={400}
              alt="V-Cell header image"
              priority
            />
          </HeaderImage>
        </div>
        <Loader />
      </>
    );
  }

  return (
    <BoardWrapper>
      {/* <GameTitle className={
              appState.themeName === "poker"
                ? luckyGuy.className
                : alfaSlabOne.className
            }>V-Cell</GameTitle>
       */}
      <LocalStorageServerHelper />

      <ControlsBar>
        <div>
          <HeaderImage>
            <Image
              src={headerImage}
              width={1700}
              height={400}
              alt="V-Cell header image"
              priority
            />
          </HeaderImage>
          <div className="hs-and-settings">
            <button
              aria-label="How to play"
              onClick={() => {
                for (let modal in appState.modals) {
                  if (modal === "instructions") {
                    appState.modals[modal as ModalName].open();
                  } else appState.modals[modal as ModalName].close();
                }
              }}
            >
              <FaQuestionCircle className="info-icon" />
            </button>
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
        </div>
      </ControlsBar>
      <WoodenBorder $theme={appState.themeName}>
        <BoardContainer
          $isModalOpen={
            // some modal is open
            appState.anyModalIsOpen()
          }
          $cardSize={appState.cardSize}
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
          <TableauUI />
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
          New deal
        </button>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          <button
            style={{
              backgroundColor: "var(--red)",
              borderColor: "var(--red)"
            }}
            className={questrial.className}
            disabled={appState.history.length === 0 || appState.winningBoard}
            onClick={() => {
              appState.reset();
            }}
          >
            Restart&nbsp;this&nbsp;deal
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
        </div>

        {process.env.NODE_ENV !== "production" && (
          <>
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
            <button
              onClick={() => {
                appState.setIsWinningBoard(!appState.winningBoard);
              }}
            >
              toggle autocomplete
            </button>
          </>
        )}
      </GameControlButtons>
    </BoardWrapper>
  );
});

export default Board;
