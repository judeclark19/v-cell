import styled from "styled-components";
import { questrial } from "./Board";
import { useRecoilState } from "recoil";
import { timeElapsedState, timerIsRunningState } from "@/logic/RecoilAtoms";
import appState from "@/logic/AppState";
import { useEffect } from "react";
import { formatTime } from "@/logic/UIFunctions";
import { FaPause } from "react-icons/fa";
import { ModalName } from "@/logic/types";

const TimerStyle = styled.div<{
  $timerIsRunning: boolean;
}>`
  display: flex;
  gap: 10px;
  justify-content: end;
  align-items: center;
  font-size: 18px;
  padding: 4px 12px;
  text-shadow: ${(props) =>
    props.$timerIsRunning ? "0 0 5px var(--goldAlpha)" : "none"};

  span {
    opacity: ${(props) => (props.$timerIsRunning ? "1" : "0.5")};
  }

  button {
    display: flex;
    align-items: center;
  }
`;

export default function Timer({
  timerIntervalRef,
  resetTimer
}: {
  timerIntervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
  resetTimer: () => void;
}) {
  const [timerIsRunning, setTimerIsRunning] =
    useRecoilState(timerIsRunningState);
  const [timeElapsed, setTimeElapsed] = useRecoilState(timeElapsedState);

  useEffect(() => {
    const historyFromStorage = JSON.parse(
      localStorage.getItem("vCellMoveHistory") || "[]"
    );

    // CONTROLLING THE TIMER
    if (
      appState.history.length > 0 &&
      !appState.winningBoard &&
      !timerIsRunning
    ) {
      // continue game
      setTimerIsRunning(true);
      timerIntervalRef.current = setInterval(() => {
        setTimeElapsed((prev) => {
          const newTimeElapsed = prev + 10;
          localStorage.setItem("vCellTimeElapsed", newTimeElapsed.toString());
          return newTimeElapsed;
        });
      }, 10);
    } else if (
      appState.history.length === 0 &&
      historyFromStorage.length === 0
    ) {
      // new game
      resetTimer();
      localStorage.setItem("vCellTimeElapsed", "0");
    }
  }, [appState.history.length]);

  return (
    <TimerStyle
      className={questrial.className}
      $timerIsRunning={timerIsRunning}
    >
      <span>{formatTime(timeElapsed)}</span>

      <button
        disabled={!timerIsRunning}
        onClick={() => {
          for (let modal in appState.modals) {
            if (modal === "pause") {
              appState.modals[modal as ModalName].open();
            } else appState.modals[modal as ModalName].close();
          }
        }}
      >
        <FaPause />
      </button>
    </TimerStyle>
  );
}
