import { observer } from "mobx-react-lite";
import { GameTitle } from "../Board/Board.styles";
import appState from "@/logic/AppState";
import { useEffect, useState } from "react";
import { ModalStyle, SettingsModalStyle } from "./Modal.styles";
import { luckyGuy, questrial } from "../Board/Board";
import { boardLayout } from "@/logic/types";

const SettingsModal = observer(() => {
  const winHistory = localStorage.getItem("vCellWinHistory")
    ? JSON.parse(localStorage.getItem("vCellWinHistory") as string)
    : [];
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

        {/* I am envisioning the sections becoming accordions later */}
        <div className="settings-section">
          <h2>Game Rules</h2>
          <p>
            <strong>Warning:</strong> changing any of the settings below will
            start a new game!
          </p>
          <div className="dropdowns">
            <div className="undo-select">
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
                  }}
                >
                  <option value="Infinity">Unlimited</option>
                  <option value="1">1</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                </select>
              </label>
            </div>

            <div className="layout-select">
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
          </div>
        </div>

        <button
          className={`reset ${questrial.className}`}
          style={{ color: "white" }}
          disabled={winHistory.length === 0}
          onClick={() => {
            const confirm = window.confirm(
              `You have won ${
                winHistory.length
              } games of V-Cell on this device since ${getFirstWinDate()}.\nAre you sure you want to reset your win count?`
            );
            if (!confirm) return;
            localStorage.removeItem("vCellWinHistory");
          }}
        >
          Reset win count
        </button>
        <button
          className={questrial.className}
          onClick={() => {
            setIsClosing(true);
            // .3 seconds same amount of time as keyframe animation
            setTimeout(() => {
              appState.settingsModal.close();
              setIsClosing(false);
            }, 300);
          }}
        >
          Close settings
        </button>
      </SettingsModalStyle>
    </ModalStyle>
  );
});

export default SettingsModal;
