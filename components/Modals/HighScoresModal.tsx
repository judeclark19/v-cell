import { observer } from "mobx-react-lite";
import appState from "@/logic/AppState";
import { useEffect, useState } from "react";
import { HighScoresModalStyle, ModalStyle } from "./Modal.styles";
import { luckyGuy, poppins } from "../Board/Board";
import { GameTitle } from "../Board/Board.styles";
import { formatTime, getBoardLayoutDisplayName } from "@/logic/UIFunctions";

const HighScoresModal = observer(() => {
  const [isClosing, setIsClosing] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

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

    // fetch history
    const winHistory = localStorage.getItem("vCellWinHistory")
      ? JSON.parse(localStorage.getItem("vCellWinHistory") as string)
      : [];

    const sortedWinHistory = winHistory
      .filter((win: any) => {
        return win.date;
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

        // If neither item has timeElapsed, maintain their order (you can adjust this if needed)
        return 0;
      });

    console.log(sortedWinHistory);
    setHistory(sortedWinHistory);

    //cleanup
    return () => {
      modalShade?.removeEventListener("click", () => {});
    };
  }, []);

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
          className={`modal-close ${luckyGuy.className}`}
        >
          X
        </span>
        <GameTitle className={luckyGuy.className}>High Scores</GameTitle>

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
            {history.map((win, index) => {
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
      </HighScoresModalStyle>
    </ModalStyle>
  );
});

export default HighScoresModal;
