import styled from "styled-components";
import { questrial } from "./Board";
import appState from "@/logic/AppState";
import { formatTime } from "@/logic/UIFunctions";
import { ModalName } from "@/logic/types";
import { observer } from "mobx-react-lite";

const TimerStyle = styled.div<{
  $timerIsVisible: boolean;
  $timerIsRunning: boolean;
}>`
  flex: 1;
  display: ${(props) => (props.$timerIsVisible ? "flex" : "none")};
  gap: 10px;
  align-items: center;
  font-size: 18px;

  span {
    opacity: ${(props) => (props.$timerIsRunning ? "1" : "0.5")};
  }

  button {
    display: flex;
    align-items: center;
  }
`;

const FlashSpan = styled.span`
  &.flash {
    animation: flash 1s ease-in-out;
  }

  @keyframes flash {
    0%,
    50%,
    100% {
      text-shadow: none;
    }

    25%,
    75% {
      text-shadow: 0 0 10px var(--gold);
    }
  }
`;

const TimerUI = observer(() => {
  return (
    <TimerStyle
      $timerIsVisible={appState.timer.isVisible}
      $timerIsRunning={appState.timer.isRunning}
      className={questrial.className}
    >
      <FlashSpan className={appState.winningBoard ? "flash" : ""}>
        {formatTime(appState.timer.timeElapsed)}
      </FlashSpan>

      <button
        className={questrial.className}
        disabled={!appState.timer.isRunning}
        onClick={() => {
          for (let modal in appState.modals) {
            if (modal === "pause") {
              appState.modals[modal as ModalName].open();
            } else appState.modals[modal as ModalName].close();
          }
        }}
      >
        Pause
      </button>
    </TimerStyle>
  );
});

export default TimerUI;
