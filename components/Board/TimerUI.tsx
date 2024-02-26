import styled from "styled-components";
import { questrial } from "./Board";
import appState from "@/logic/AppState";
import { formatTime } from "@/logic/UIFunctions";
import { FaPause } from "react-icons/fa";
import { ModalName } from "@/logic/types";
import { observer } from "mobx-react-lite";

const TimerStyle = styled.div<{
  $timerIsVisible: boolean;
  $timerIsRunning: boolean;
}>`
  display: ${(props) => (props.$timerIsVisible ? "flex" : "none")};
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

const TimerUI = observer(() => {
  return (
    <TimerStyle
      $timerIsVisible={appState.timer.isVisible}
      $timerIsRunning={appState.timer.isRunning}
      className={questrial.className}
    >
      <span>{formatTime(appState.timer.timeElapsed)}</span>

      <button
        disabled={!appState.timer.isRunning}
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
});

export default TimerUI;
