import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import gameState from "./GameState";

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
    gameState.setIsWinningBoard(winningBoardFromStorage);

    const canAutoCompleteFromStorage = JSON.parse(
      localStorage.getItem("vCellAutoComplete") || "false"
    );
    gameState.setCanAutoComplete(canAutoCompleteFromStorage);

    if (
      moveHistoryFromStorage.length > 0 &&
      "foundations" in currentBoardFromStorage &&
      "tableau" in currentBoardFromStorage &&
      "hand" in currentBoardFromStorage &&
      !winningBoardFromStorage
    ) {
      // restore state
      gameState.restoreGameState(currentBoardFromStorage);
      gameState.setHistory(moveHistoryFromStorage);
    } else {
      // new game
      gameState.dealCards();
    }

    const knowsHowToPlay = localStorage.getItem("vCellKnowsHowToPlay");
    console.log(knowsHowToPlay);
    if (!knowsHowToPlay) {
      gameState.setIsInstructionsModalOpen(true);
      localStorage.setItem("vCellKnowsHowToPlay", "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("vCellMoveHistory", JSON.stringify(gameState.history));
    localStorage.setItem(
      "vCellCurrentBoard",
      JSON.stringify(gameState.currentBoard)
    );
  }, [gameState.history.length]);

  useEffect(() => {
    localStorage.setItem(
      "vCellWinningBoard",
      JSON.stringify(gameState.winningBoard)
    );
  }, [gameState.winningBoard]);

  useEffect(() => {
    localStorage.setItem(
      "vCellAutoComplete",
      JSON.stringify(gameState.canAutoComplete)
    );
  }, [gameState.canAutoComplete]);

  return null;
});

export default LocalStorageServerHelper;
