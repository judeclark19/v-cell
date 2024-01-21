import { observer } from "mobx-react-lite";
import styled from "styled-components";
import {
  GameControlButton,
  GameControlButtons,
  GameTitle
} from "../Board.styles";
import { Luckiest_Guy } from "next/font/google";
import gameState from "@/logic/GameState";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { winHistoryState } from "@/logic/WinHistory";

const luckyGuy = Luckiest_Guy({ weight: "400", subsets: ["latin"] });

export const WinModalStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: grid;
  place-items: center;

  > div {
    background-color: black;
    border-radius: 12px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.2);

    @media screen and (max-width: 768px) {
      padding: 20px;
    }
    @media screen and (max-width: 480px) {
      padding: 10px;
    }

    ${GameTitle} {
      @media screen and (max-width: 480px) {
        font-size: 30px;
      }
    }

    .win-count {
      font-size: 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 6px;

      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
      @media screen and (max-width: 480px) {
        font-size: 12px;
      }

      .win-count-number {
        font-size: 40px;
        font-weight: bold;
        color: var(--gold);

        @media screen and (max-width: 768px) {
          font-size: 30px;
        }
        @media screen and (max-width: 480px) {
          font-size: 20px;
        }
      }

      .since {
        font-size: 14px;
        color: gray;
        font-style: italic;

        span {
          color: var(--gold);
        }

        @media screen and (max-width: 768px) {
          font-size: 12px;
        }
        @media screen and (max-width: 480px) {
          font-size: 10px;
        }
      }
    }
    .reset {
      margin: 10px auto;
      background-color: var(--red);
      padding: 8px;
      width: fit-content;
    }
  }
`;

const WinModal = observer(() => {
  const [winHistory, setWinHistory] = useRecoilState(winHistoryState);

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
    <WinModalStyle>
      <div>
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
            className="reset"
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
            className="deal-again"
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
          <GameControlButton
            style={{
              backgroundColor: "#33d849",
              borderColor: "#33d849"
            }}
            disabled={!gameState.canAutoComplete}
            onClick={() => {
              gameState.autoComplete();
            }}
          >
            Autocomplete
          </GameControlButton>
        </GameControlButtons>
      </div>
    </WinModalStyle>
  );
});

export default WinModal;
