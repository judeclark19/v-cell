import { observer } from "mobx-react-lite";
import { GameTitle } from "../Board/Board.styles";
import appState from "@/logic/AppState";
import { useEffect, useState } from "react";
import { ModalStyle, SettingsModalStyle } from "./Modal.styles";
import { luckyGuy, questrial } from "../Board/Board";
import { boardLayout } from "@/logic/types";

const SettingsModal = observer(() => {
  const [isClosing, setIsClosing] = useState(false);
  useEffect(() => {
    // queryselect .modal-shade
    const modalShade = document.querySelector(".modal-shade");
    modalShade?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        setIsClosing(true);
        // .3 seconds same amount of time as keyframe animation

        setTimeout(() => {
          appState.settingsModal.close();
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
      <SettingsModalStyle className={questrial.className}>
        <span
          onClick={() => {
            setIsClosing(true);
            // .3 seconds same amount of time as keyframe animation

            setTimeout(() => {
              appState.settingsModal.close();
              setIsClosing(false);
            }, 300);
          }}
          className={`modal-close ${luckyGuy.className}`}
        >
          X
        </span>
        <div>
          <GameTitle className={luckyGuy.className}>Settings</GameTitle>
        </div>

        <p>
          <strong>Warning:</strong> changing any of these settings will start a
          new game!
        </p>

        <div className={`layout-select ${questrial.className}`}>
          {/* TODO: generate from types list? */}
          <label htmlFor="layout-select">
            <span className="label-text">Layout</span>
            <select
              id="layout-select"
              className={questrial.className}
              value={appState.layoutName}
              onChange={(e) => {
                appState.setLayout(e.target.value as boardLayout);
              }}
            >
              <option value="classic">Classic</option>
              <option value="faceUp">Face Up</option>
              <option value="doubleV">Double V</option>
              <option value="tripleV">Triple V</option>
            </select>
          </label>
        </div>
      </SettingsModalStyle>
    </ModalStyle>
  );
});

export default SettingsModal;
