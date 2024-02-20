import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import appState from "./AppState";
import { boardLayout } from "./types";
import { cardSizeState } from "./OrientationAndSize";
import { useRecoilValue } from "recoil";
import { throwConfetti } from "./UIFunctions";

// Since GameState.tsx cannot read localStorage from the client directly, the purpose of this component is to mirror the gameState to the localStorage.
const LocalStorageServerHelper = observer(() => {
  const cardSize = useRecoilValue(cardSizeState);

  useEffect(() => {
    const moveHistoryFromStorage = JSON.parse(
      localStorage.getItem("vCellMoveHistory") || "[]"
    );

    const currentBoardFromStorage = JSON.parse(
      localStorage.getItem("vCellCurrentBoard") || "{}"
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
    appState.moveEvaluator.setUndosUsed(undosUsed);

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
      appState.moveEvaluator.setUndosAllowed(undosAllowed);
      appState.moveEvaluator.setUndosUsed(undosUsed);
    } else {
      // new game
      appState.dealCards();
    }

    const knowsHowToPlay = localStorage.getItem("vCellKnowsHowToPlay");
    if (!knowsHowToPlay) {
      appState.instructionsModal.open();
      appState.winModal.close();
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

  return null;
});

export default LocalStorageServerHelper;
