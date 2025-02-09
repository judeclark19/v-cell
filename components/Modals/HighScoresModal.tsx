import { observer } from "mobx-react-lite";
import appState from "@/logic/AppState";
import { useEffect, useState } from "react";
import {
  HighScoresModalStyle,
  ModalStyle,
  SettingSelect
} from "./Modal.styles";
import { luckyGuy, poppins, questrial, alfaSlabOne } from "../Board/Board";
import { GameTitle } from "../Board/Board.styles";
import { formatTime, getBoardLayoutDisplayName } from "@/logic/UIFunctions";
import { boardLayout } from "@/logic/types";

const HighScoresModal = observer(() => {
  const [isClosing, setIsClosing] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [layout, setLayout] = useState<boardLayout | "all">("all");

  function getWins() {
    // fetch history
    const winHistory = localStorage.getItem("vCellWinHistory")
      ? JSON.parse(localStorage.getItem("vCellWinHistory") as string)
      : [];

    const sortedWinHistory = winHistory
      // .filter((win: any) => {
      //   return win.date;
      // })
      .filter((win: any) => {
        if (layout === "all") return true;
        else return win.layout === layout;
      })
      .sort((a: any, b: any) => {
        // Check if timeElapsed property exists on both objects
        const aHasTime = a.timeElapsed;
        const bHasTime = b.timeElapsed;

        // Move items without timeElapsed to the end
        if (!aHasTime && bHasTime) return 1; // a should come after b
        if (aHasTime && !bHasTime) return -1; // a should come before b

        // If both items have timeElapsed or both do not have it, sort by timeElapsed if they have it
        if (aHasTime && bHasTime) return a.timeElapsed - b.timeElapsed;

        // If neither item has timeElapsed, maintain their order
        return 0;
      });

    return sortedWinHistory;
  }

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

  useEffect(() => {
    const modalShade = document.querySelector(".modal-shade");
    modalShade?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        setIsClosing(true);
        // .3 seconds same amount of time as keyframe animation

        setTimeout(() => {
          appState.modals.highScores.close();
          setIsClosing(false);
        }, 300);
      }
    });

    setHistory(getWins());

    //cleanup
    return () => {
      modalShade?.removeEventListener("click", () => {});
    };
  }, []);

  useEffect(() => {
    setHistory(getWins());
  }, [layout]);

  return (
    <ModalStyle className="modal-shade" $isClosing={isClosing}>
      <HighScoresModalStyle>
        <span
          onClick={() => {
            setIsClosing(true);
            // .3 seconds same amount of time as keyframe animation

            setTimeout(() => {
              appState.modals.highScores.close();
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
          Win Stats
        </GameTitle>

        <div
          className={poppins.className}
          style={{ fontSize: "16px", textAlign: "center" }}
        >
          Your ratio of games won to games started is {""}
          <span>
            <strong
              style={{
                color: "var(--gold)"
              }}
            >
              {getWinRatio()}
            </strong>
          </span>
        </div>

        {/* dropdown select layout */}
        <SettingSelect style={{ margin: "0.8rem auto" }}>
          <label htmlFor="layout-select" style={{ justifyContent: "center" }}>
            <span className={questrial.className}>
              Choose layout to see fastest games:
            </span>
            <select
              id="
              -select"
              className={questrial.className}
              value={layout}
              onChange={(e) => {
                setLayout(e.target.value as boardLayout);
              }}
            >
              <option value="all">All Layouts</option>
              <option value="classic">Classic</option>
              <option value="faceUp">Face Up</option>
              <option value="doubleV">Double V</option>
              <option value="tripleV">Triple V</option>
            </select>
          </label>
        </SettingSelect>

        {history.length === 0 && (
          <div
            className={questrial.className}
            style={{
              textAlign: "center"
            }}
          >
            No {getBoardLayoutDisplayName(layout)} games won yet
          </div>
        )}
        {history.length > 0 && (
          <>
            <div
              className={poppins.className}
              style={{
                marginBottom: "1rem",
                fontSize: "18px",
                textAlign: "center"
              }}
            >
              Total {getBoardLayoutDisplayName(layout)} games won:{" "}
              <span>
                <strong
                  style={{
                    color: "var(--gold)"
                  }}
                >
                  {history.length}
                </strong>
              </span>
            </div>
            <table className={poppins.className}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Time</th>
                  <th>Layout</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {history.slice(0, 10).map((win, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{formatTime(win.timeElapsed)}</td>
                      <td>{getBoardLayoutDisplayName(win.layout)}</td>
                      <td>{new Date(win.date).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </HighScoresModalStyle>
    </ModalStyle>
  );
});

export default HighScoresModal;
