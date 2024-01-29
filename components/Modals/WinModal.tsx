import { observer } from "mobx-react-lite";
import {
  GameControlButton,
  GameControlButtons,
  GameTitle
} from "../Board/Board.styles";
import gameState from "@/logic/GameState";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { winHistoryState } from "@/logic/WinHistory";
import { ModalStyle, WinModalStyle } from "./Modal.styles";
import { luckyGuy, questrial } from "../Board/Board";

const WinModal = observer(() => {
  const [winHistory, setWinHistory] = useRecoilState(winHistoryState);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (gameState.winCount > 0) {
      localStorage.setItem(
        "vCellWinHistory",
        JSON.stringify([...winHistory, new Date()])
      );
      setWinHistory([...winHistory, new Date()]);
    }
  }, [gameState.winCount]);

  function getFirstWinDate() {
    const date = new Date(winHistory[0]);

    const optionsDate: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    };
    const formattedDate = date.toLocaleDateString("en-US", optionsDate);
    const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

    const combinedDateTime = `${formattedDate} at ${formattedTime}`;
    return combinedDateTime;
  }

  return (
    <ModalStyle $isClosing={isClosing}>
      <WinModalStyle className={questrial.className}>
        <span
          onClick={() => {
            setIsClosing(true);
            // .3 seconds same amount of time as keyframe animation

            setTimeout(() => {
              gameState.setIsWinModalOpen(false);
              setIsClosing(false);
            }, 300);
          }}
          className={`modal-close ${luckyGuy.className}`}
        >
          X
        </span>
        <GameTitle className={luckyGuy.className}>You Win!</GameTitle>

        <div className="win-count">
          <p>You have won</p>
          <p className="win-count-number">{winHistory.length}</p>
          <p>
            <span>
              {winHistory.length === 1 ? "game" : "games"} of V-Cell on&nbsp;
            </span>
            <span>this device</span>
          </p>
          {winHistory.length > 0 && (
            <p className="since">
              since <span>{getFirstWinDate()}</span>
            </p>
          )}
        </div>

        {winHistory.length > 0 && (
          <button
            className={`reset ${questrial.className}`}
            onClick={() => {
              const confirm = window.confirm(
                "Are you sure you want to reset your win count?"
              );
              if (!confirm) return;
              localStorage.removeItem("vCellWinHistory");
              setWinHistory([]);
            }}
          >
            Reset win count
          </button>
        )}
        <GameControlButtons>
          <GameControlButton
            className={`deal-again ${questrial.className}`}
            style={{
              backgroundColor: "#0099cc",
              borderColor: "#0099cc"
            }}
            onClick={() => {
              gameState.dealCards();
            }}
          >
            Deal again
          </GameControlButton>
        </GameControlButtons>
      </WinModalStyle>
    </ModalStyle>
  );
});

export default WinModal;
