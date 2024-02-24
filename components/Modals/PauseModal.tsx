import { observer } from "mobx-react-lite";
import appState from "@/logic/AppState";
import { useEffect, useState } from "react";
import { ModalStyle } from "./Modal.styles";
import { luckyGuy, questrial } from "../Board/Board";
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

  return (
    <ModalStyle className="modal-shade" $isClosing={isClosing}>
      <div>
        <span
          onClick={() => {
            setIsClosing(true);
            // .3 seconds same amount of time as keyframe animation

            setTimeout(() => {
              appState.modals.pause.close();
              setIsClosing(false);
            }, 300);
          }}
          className={`modal-close ${luckyGuy.className}`}
        >
          X
        </span>
        <GameTitle className={luckyGuy.className}>Paused</GameTitle>
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
      </div>
    </ModalStyle>
  );
});

export default PauseModal;
