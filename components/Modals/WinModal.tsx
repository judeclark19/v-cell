import { observer } from "mobx-react-lite";
import { GameControlButtons, GameTitle } from "../Board/Board.styles";
import appState from "@/logic/AppState";
import { useEffect, useState } from "react";
import { ModalStyle, WinModalStyle } from "./Modal.styles";
import { alfaSlabOne, luckyGuy, poppins, questrial } from "../Board/Board";
import { formatTime } from "@/logic/UIFunctions";

const WinModal = observer(() => {
  const winHistory = localStorage.getItem("vCellWinHistory")
    ? JSON.parse(localStorage.getItem("vCellWinHistory") as string)
    : [];
  const [isClosing, setIsClosing] = useState(false);

  function getWinRatio() {
    const winRatioFromStorage = JSON.parse(
      localStorage.getItem("vCellWinRatio")!
    );

    return winRatioFromStorage.totalGames === 0
      ? "0%"
      : `${Math.round(
          (winRatioFromStorage.wins / winRatioFromStorage.totalGames) * 100
        )}%`;
  }

  function getTotalGames() {
    const winRatioFromStorage = JSON.parse(
      localStorage.getItem("vCellWinRatio")!
    );
    return winRatioFromStorage ? winRatioFromStorage.totalGames : 0;
  }

  useEffect(() => {
    const modalShade = document.querySelector(".modal-shade");
    modalShade?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        setIsClosing(true);
        // .3 seconds same amount of time as keyframe animation

        setTimeout(() => {
          appState.modals.win.close();
          setIsClosing(false);
        }, 300);
      }
    });

    //cleanup
    return () => {
      modalShade?.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <ModalStyle className="modal-shade" $isClosing={isClosing}>
      <WinModalStyle className={questrial.className}>
        <span
          onClick={() => {
            setIsClosing(true);
            // .3 seconds same amount of time as keyframe animation

            setTimeout(() => {
              appState.modals.win.close();
              setIsClosing(false);
            }, 300);
          }}
          className={`modal-close ${questrial.className}`}
        >
          X
        </span>
        <GameTitle
          className={
            appState.themeName === "poker"
              ? luckyGuy.className
              : alfaSlabOne.className
          }
        >
          You Win!
        </GameTitle>
        <p className="time-elapsed">
          Time elapsed: {formatTime(appState.timer.timeElapsed)}
        </p>

        <div className="win-count">
          <p className="gold">You have won</p>
          <p className="win-count-number">{winHistory.length}</p>
          <p>
            <span>
              {winHistory.length === 1 ? "game" : "games"} of V-Cell&nbsp;
            </span>
            <span>on this device.</span>
          </p>
          <p>
            In the last {getTotalGames()} games, your ratio of games won to
            games started is {""}
            <span>
              <strong
                style={{
                  color: "var(--gold)"
                }}
              >
                {getWinRatio()}
              </strong>
            </span>
          </p>
        </div>
        <GameControlButtons>
          <button
            className={questrial.className}
            style={{
              backgroundColor: "#0099cc",
              borderColor: "#0099cc"
            }}
            onClick={() => {
              appState.modals.win.close();
              appState.dealCards();
            }}
          >
            Deal again
          </button>
        </GameControlButtons>
      </WinModalStyle>
    </ModalStyle>
  );
});

export default WinModal;
