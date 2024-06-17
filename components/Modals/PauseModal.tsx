import { observer } from "mobx-react-lite";
import appState from "@/logic/AppState";
import { useEffect, useState } from "react";
import { ModalStyle, PauseModalStyle } from "./Modal.styles";
import { alfaSlabOne, luckyGuy, questrial } from "../Board/Board";
import { GameTitle } from "../Board/Board.styles";

const PauseModal = observer(() => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const modalShade = document.querySelector(".modal-shade");
    modalShade?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        setIsClosing(true);
        // .3 seconds same amount of time as keyframe animation

        setTimeout(() => {
          appState.modals.pause.close();
          setIsClosing(false);
        }, 300);
      }
    });

    //cleanup
    return () => {
      modalShade?.removeEventListener("click", () => {});
    };
  }, []);

  function getBestTime() {
    const winHistory = localStorage.getItem("vCellWinHistory")
      ? JSON.parse(localStorage.getItem("vCellWinHistory") as string)
      : [];

    const sortedWinHistory = winHistory
      .filter(
        (win: any) => win.timeElapsed && win.layout === appState.layoutName
      )
      .sort((a: any, b: any) => a.timeElapsed - b.timeElapsed);
    return sortedWinHistory[0];
  }

  getBestTime();

  return (
    <ModalStyle className="modal-shade" $isClosing={isClosing}>
      <PauseModalStyle>
        <span
          onClick={() => {
            setIsClosing(true);
            // .3 seconds same amount of time as keyframe animation

            setTimeout(() => {
              appState.modals.pause.close();
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
          Paused
        </GameTitle>

        <button
          className={questrial.className}
          onClick={() => {
            setIsClosing(true);
            // .3 seconds same amount of time as keyframe animation

            setTimeout(() => {
              appState.modals.pause.close();
              setIsClosing(false);
            }, 300);
          }}
        >
          Resume
        </button>
      </PauseModalStyle>
    </ModalStyle>
  );
});

export default PauseModal;
