import { observer } from "mobx-react-lite";
import { GameTitle } from "../Board/Board.styles";
import appState from "@/logic/AppState";
import { useState } from "react";
import { ModalStyle, SettingsModalStyle } from "./Modal.styles";
import { luckyGuy, questrial } from "../Board/Board";
import { boardLayout } from "@/logic/types";

const SettingsModal = observer(() => {
  const [isClosing, setIsClosing] = useState(false);

  return (
    <ModalStyle $isClosing={isClosing}>
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

        <div className={`layout-select ${questrial.className}`}>
          {/* TODO: generate from tyeps list? */}
          <label htmlFor="layout-select">
            <span className="label-text">Layout</span>
            <select
              id="layout-select"
              className={questrial.className}
              onChange={(e) => {
                appState.setLayout(e.target.value as boardLayout);
              }}
            >
              <option
                selected={appState.layoutName === "classic"}
                value="classic"
              >
                Classic
              </option>
              <option
                selected={appState.layoutName === "faceUp"}
                value="faceUp"
              >
                Face Up
              </option>
              <option
                selected={appState.layoutName === "doubleV"}
                value="doubleV"
              >
                Double V
              </option>
              <option
                selected={appState.layoutName === "tripleV"}
                value="tripleV"
              >
                Triple V
              </option>
            </select>
          </label>
        </div>
      </SettingsModalStyle>
    </ModalStyle>
  );
});

export default SettingsModal;
