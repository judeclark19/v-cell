import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import appState from "./AppState";
import { ModalName, boardLayout } from "./types";
import {
  cardSizeState,
  timeElapsedState,
  timerIsRunningState
} from "./RecoilAtoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { throwConfetti } from "./UIFunctions";

// Since GameState.tsx cannot read localStorage from the client directly, the purpose of this component is to mirror the gameState to the localStorage.
const LocalStorageServerHelper = observer(
  ({
    timerIntervalRef
  }: {
    timerIntervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
  }) => {
    const cardSize = useRecoilValue(cardSizeState);
    const setTimerIsRunning = useSetRecoilState(timerIsRunningState);
    const setTimeElapsed = useSetRecoilState(timeElapsedState);

    useEffect(() => {
      // upon application load, get saved game state from localStorage
      if (localStorage.getItem("vCellTimeElapsed")) {
        setTimeElapsed(
          parseInt(localStorage.getItem("vCellTimeElapsed") as string)
        );
      }

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

      const undosUsedFromStorage =
        localStorage.getItem("vCellUndosUsed") || "0";
      const undosUsed = parseInt(undosUsedFromStorage);

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
        appState.moveEvaluator.setUndosAllowed(undosAllowed);
        appState.moveEvaluator.setUndosUsed(undosUsed);
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
        for (let modal in appState.modals) {
          if (modal === "instructions") {
            appState.modals[modal].open();
          } else {
            appState.modals[modal as ModalName].close();
          }
        }
        localStorage.setItem("vCellKnowsHowToPlay", "true");
      }

      return () => {
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
      };
    }, []);

    useEffect(() => {
      localStorage.setItem(
        "vCellMoveHistory",
        JSON.stringify(appState.history)
      );
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
      if (appState.winningBoard && timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
        setTimerIsRunning(false);
      }
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
      // Stop timer when a modal is open
      const freshlyFetchedLocalStorage = JSON.parse(
        localStorage.getItem("vCellMoveHistory") || "[]"
      );

      if (appState.anyModalIsOpen() && timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
        setTimerIsRunning(false);
      } else if (
        !appState.anyModalIsOpen() &&
        !appState.winningBoard &&
        freshlyFetchedLocalStorage.length > 0
      ) {
        setTimerIsRunning(true);
        timerIntervalRef.current = setInterval(() => {
          setTimeElapsed((prev) => {
            const newTimeElapsed = prev + 10;
            localStorage.setItem("vCellTimeElapsed", newTimeElapsed.toString());
            return newTimeElapsed;
          });
        }, 10);
      }
    }, [
      appState.modals.win.isOpen,
      appState.modals.instructions.isOpen,
      appState.modals.settings.isOpen
    ]);

    return null;
  }
);

export default LocalStorageServerHelper;
