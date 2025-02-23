import { observer } from "mobx-react-lite";
import { GameTitle } from "../Board/Board.styles";
import appState from "@/logic/AppState";
import { useEffect, useState } from "react";
import { ModalStyle, SettingSelect, SettingsModalStyle } from "./Modal.styles";
import { luckyGuy, poppins, questrial, alfaSlabOne } from "../Board/Board";
import { boardLayout, theme } from "@/logic/types";

const SettingsModal = observer(() => {
  const winHistory = localStorage.getItem("vCellWinHistory")
    ? JSON.parse(localStorage.getItem("vCellWinHistory") as string)
    : [];
  const [isClosing, setIsClosing] = useState(false);

  function closeModal() {
    setIsClosing(true);
    // .3 seconds same amount of time as keyframe animation
    setTimeout(() => {
      appState.modals.settings.close();
      setIsClosing(false);
    }, 300);
  }

  useEffect(() => {
    // queryselect .modal-shade
    const modalShade = document.querySelector(".modal-shade");
    modalShade?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        closeModal();
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
          onClick={closeModal}
          className={`modal-close ${questrial.className}`}
        >
          X
        </span>
        <div>
          <GameTitle
            className={
              appState.themeName === "poker"
                ? luckyGuy.className
                : alfaSlabOne.className
            }
          >
            Settings
          </GameTitle>
        </div>

        {/* I am envisioning the sections becoming accordions later */}
        <div className="settings-section">
          <h2>Game Rules</h2>
          <p
            className={poppins.className}
            style={{
              lineHeight: "20px"
            }}
          >
            <strong>Warning:</strong> changing any of the settings in this
            section will start a new game!
          </p>
          <div className="dropdowns">
            <SettingSelect>
              {/* TODO: g1qenerate from types list? */}
              <label htmlFor="layout-select">
                <span className="label-text">Layout</span>
                <select
                  id="layout-select"
                  className={questrial.className}
                  value={appState.layoutName}
                  onChange={(e) => {
                    appState.setLayout(e.target.value as boardLayout);
                    closeModal();
                  }}
                >
                  <option value="classic">Classic</option>
                  <option value="doubleV">Double V</option>
                  <option value="tripleV">Triple V</option>
                  <option value="faceUp">Face Up</option>
                </select>
              </label>
            </SettingSelect>
            <SettingSelect>
              {/* undo settings */}
              <label htmlFor="undo-select">
                <span className="label-text">
                  Number of undos allowed
                  <br />
                  (per game)
                </span>
                <select
                  id="undo-select"
                  className={questrial.className}
                  value={appState.moveEvaluator.undosAllowed}
                  onChange={(e) => {
                    appState.moveEvaluator.setUndosAllowed(
                      parseFloat(e.target.value)
                    );
                    appState.dealCards();
                    closeModal();
                  }}
                >
                  <option value="Infinity">Unlimited</option>
                  <option value="1">1</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                </select>
              </label>
            </SettingSelect>
          </div>
        </div>
        <br />
        <div className="settings-section">
          <h2
            style={{
              marginBottom: "1rem"
            }}
          >
            Appearance
          </h2>
          <div className="dropdowns">
            <div className="timer-toggle">
              <span className="label-text">Timer</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                Hide
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      appState.timer.setIsVisible(e.target.checked);
                    }}
                    checked={appState.timer.isVisible}
                  />
                  <span className="slider round"></span>
                </label>
                Show
              </div>
            </div>
            <SettingSelect>
              <label htmlFor="theme-select">
                <span className="label-text">Theme</span>
                <select
                  id="theme-select"
                  className={questrial.className}
                  value={appState.themeName}
                  onChange={(e) => {
                    appState.setTheme(e.target.value as theme);
                    document.body.className = e.target.value;
                  }}
                >
                  <option value="poker">Poker</option>
                  <option value="times-light">Times Light</option>
                  <option value="times-dark">Times Dark</option>
                </select>
              </label>
            </SettingSelect>
          </div>
        </div>
      </SettingsModalStyle>
    </ModalStyle>
  );
});

export default SettingsModal;
