import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import appState from "./AppState";
import { boardLayout } from "./types";
import JSConfetti from "js-confetti";
import { cardSizes } from "@/components/Card/CardUI.styles";
import {
  getCardSize,
  windowHeightState,
  windowWidthState
} from "./OrientationAndSize";
import { useRecoilValue } from "recoil";

// Since GameState.tsx cannot read localStorage from the client directly, the purpose of this component is to mirror the gameState to the localStorage.
const LocalStorageServerHelper = observer(() => {
  const windowWidth = useRecoilValue(windowWidthState);
  const windowHeight = useRecoilValue(windowHeightState);
  const confetti = new JSConfetti();

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
    console.log("manual wins", appState.manualWins);
    if (appState.manualWins > 0) {
      // custom confetti
      confetti.addConfetti({
        emojis: ["🎰", "🃏", "❤️", "♠️", "♣️", "♦️"],

        emojiSize:
          cardSizes[getCardSize(windowWidth, windowHeight)].confettiSize,

        confettiNumber: 200
      });

      // plus standard confetti
      confetti.addConfetti({
        confettiNumber: 200
      });
    }
  }, [appState.manualWins]);

  return null;
});

export default LocalStorageServerHelper;
