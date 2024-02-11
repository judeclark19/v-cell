import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import appState from "./AppState";

// Since GameState.tsx cannot read localStorage from the client directly, the purpose of this component is to mirror the gameState to the localStorage.
const LocalStorageServerHelper = observer(() => {
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
    } else {
      // new game
      appState.dealCards();
    }

    const knowsHowToPlay = localStorage.getItem("vCellKnowsHowToPlay");
    if (!knowsHowToPlay) {
      appState.instructionsModal.open();
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

  return null;
});

export default LocalStorageServerHelper;
