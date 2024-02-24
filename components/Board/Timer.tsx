import styled from "styled-components";
import { questrial } from "./Board";
import { useRecoilState } from "recoil";
import { timeElapsedState, timerIsRunningState } from "@/logic/RecoilAtoms";
import appState from "@/logic/AppState";
import { useEffect } from "react";
import { formatTime } from "@/logic/UIFunctions";

const TimerStyle = styled.div<{
  $timerIsRunning: boolean;
}>`
  border: 2px solid white;
  display: flex;
  gap: 10px;
  justify-content: end;
  align-items: center;
  font-size: 18px;
  padding: 4px 12px;
  opacity: ${(props) => (props.$timerIsRunning ? "1" : "0.5")};
  text-shadow: ${(props) =>
    props.$timerIsRunning ? "0 0 5px var(--goldAlpha)" : "none"};
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
      {formatTime(timeElapsed)}
      <button>pause</button>
    </TimerStyle>
  );
}
