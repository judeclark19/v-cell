import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import appState from "./AppState";
import { ModalName, boardLayout } from "./types";
import { cardSizeState } from "./RecoilAtoms";
import { useRecoilValue } from "recoil";
import { throwConfetti } from "./UIFunctions";

// Since GameState.tsx cannot read localStorage from the client directly, the purpose of this component is to mirror the gameState to the localStorage.
const LocalStorageServerHelper = observer(() => {
  const cardSize = useRecoilValue(cardSizeState);

  useEffect(() => {
    // upon application load, get saved game state from localStorage

    const timeElapsedFromStorage = JSON.parse(
      localStorage.getItem("vCellTimeElapsed") || "0"
    );

    const timerIsVisibleFromStorage = JSON.parse(
      localStorage.getItem("vCellIsTimerVisible") || "true"
    );

    const moveHistoryFromStorage = JSON.parse(
      localStorage.getItem("vCellMoveHistory") || "[]"
    );

    const winningBoardFromStorage = JSON.parse(
      localStorage.getItem("vCellWinningBoard") || "false"
    );
    appState.setIsWinningBoard(winningBoardFromStorage, true);

    const canAutoCompleteFromStorage = JSON.parse(
      localStorage.getItem("vCellAutoComplete") || "false"
    );
    appState.setCanAutoComplete(canAutoCompleteFromStorage);

    const layoutFromStorage = localStorage.getItem("vCellLayout");
    if (layoutFromStorage) {
      appState.setLayout(layoutFromStorage as boardLayout);
    }

    const undosAllowedFromStorage =
      localStorage.getItem("vCellUndosAllowed") || "Infinity";
    const undosAllowed =
      undosAllowedFromStorage === "Infinity"
        ? Infinity
        : parseFloat(undosAllowedFromStorage);

    const undosUsedFromStorage = localStorage.getItem("vCellUndosUsed") || "0";
    const undosUsed = parseInt(undosUsedFromStorage);
    appState.moveEvaluator.setUndosAllowed(undosAllowed);

    const currentBoardFromStorage = JSON.parse(
      localStorage.getItem("vCellCurrentBoard") || "{}"
    );

    // Restore state or start new game
    if (
      moveHistoryFromStorage.length > 0 &&
      "foundations" in currentBoardFromStorage &&
      "tableau" in currentBoardFromStorage &&
      "hand" in currentBoardFromStorage &&
      !winningBoardFromStorage
    ) {
      // restore state

      appState.restoreGameState(currentBoardFromStorage);
      appState.setHistory(moveHistoryFromStorage);
      appState.moveEvaluator.setUndosUsed(undosUsed);
      appState.timer.setTimeElapsed(timeElapsedFromStorage);
      appState.timer.setIsVisible(timerIsVisibleFromStorage);
    } else {
      // new game
      appState.dealCards();
      localStorage.setItem("vCellTimeElapsed", "0");
    }

    const knowsHowToPlay = localStorage.getItem("vCellKnowsHowToPlay");
    if (!knowsHowToPlay) {
      for (let modal in appState.modals) {
        if (modal === "instructions") {
          appState.modals[modal].open();
        } else {
          appState.modals[modal as ModalName].close();
        }
      }
      localStorage.setItem("vCellKnowsHowToPlay", "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("vCellMoveHistory", JSON.stringify(appState.history));
    localStorage.setItem(
      "vCellCurrentBoard",
      JSON.stringify(appState.currentBoard)
    );
  }, [appState.history.length]);

  useEffect(() => {
    localStorage.setItem(
      "vCellWinningBoard",
      JSON.stringify(appState.winningBoard)
    );
  }, [appState.winningBoard]);

  useEffect(() => {
    localStorage.setItem(
      "vCellAutoComplete",
      JSON.stringify(appState.canAutoComplete)
    );
  }, [appState.canAutoComplete]);

  useEffect(() => {
    localStorage.setItem("vCellLayout", appState.layoutName);
  }, [appState.layoutName]);

  useEffect(() => {
    localStorage.setItem(
      "vCellUndosAllowed",
      appState.moveEvaluator.undosAllowed.toString()
    );
  }, [appState.moveEvaluator.undosAllowed]);

  useEffect(() => {
    localStorage.setItem(
      "vCellUndosUsed",
      appState.moveEvaluator.undosUsed.toString()
    );
  }, [appState.moveEvaluator.undosUsed]);

  useEffect(() => {
    if (appState.manualWins > 0) {
      throwConfetti(cardSize);
    }
  }, [appState.manualWins]);

  useEffect(() => {
    localStorage.setItem(
      "vCellTimeElapsed",
      appState.timer.timeElapsed.toString()
    );
  }, [appState.timer.timeElapsed]);

  useEffect(() => {
    localStorage.setItem(
      "vCellIsTimerVisible",
      appState.timer.isVisible.toString()
    );
  }, [appState.timer.isVisible]);

  // pause timer when modals are open
  useEffect(() => {
    if (appState.anyModalIsOpen()) {
      appState.timer.clearInterval();
    } else if (
      !appState.anyModalIsOpen() &&
      appState.history.length > 0 &&
      !appState.winningBoard
    ) {
      appState.timer.startInterval();
    }
  }, [
    appState.modals.win.isOpen,
    appState.modals.pause.isOpen,
    appState.modals.instructions.isOpen,
    appState.modals.settings.isOpen,
    appState.modals.highScores.isOpen
  ]);

  return null;
});

export default LocalStorageServerHelper;
