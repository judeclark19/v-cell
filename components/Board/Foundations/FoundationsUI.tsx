import appState from "@/logic/AppState";
import { observer } from "mobx-react-lite";
import React from "react";
import FoundationUI from "./FoundationUI";

import { GameControlButton } from "../Board.styles";
import { foundationKeys } from "@/logic/types";
import { useRecoilValue } from "recoil";
import { getCardSize, windowWidthState } from "@/logic/OrientationAndSize";
import { questrial } from "../Board";
import {
  AutocompleteDiv,
  FoundationFlex,
  FoundationsStyle
} from "./FoundationsUI.styles";
import JSConfetti from "js-confetti";
import { cardSizes } from "@/components/Card/CardUI.styles";

const FoundationsUI = observer(() => {
  const foundations = appState.currentBoard.foundations;
  const windowWidth = useRecoilValue(windowWidthState);
  const windowHeight = useRecoilValue(windowWidthState);
  const confetti = new JSConfetti();

  function throwConfetti() {
    // custom confetti
    confetti.addConfetti({
      emojis: ["🎰", "🃏", "❤️", "♠️", "♣️", "♦️"],

      emojiSize: cardSizes[getCardSize(windowWidth, windowHeight)].confettiSize,

      confettiNumber: 200
    });

    // plus standard confetti
    confetti.addConfetti({
      confettiNumber: 200
    });
  }

  return (
    <>
      <FoundationsStyle>
        <AutocompleteDiv>
          {appState.winningBoard && (
            <GameControlButton
              style={{
                backgroundColor: "#33d849",
                borderColor: "#33d849"
              }}
              className={questrial.className}
              disabled={!appState.canAutoComplete}
              onClick={() => {
                appState.autoComplete();
                throwConfetti();
              }}
            >
              Autocomplete
            </GameControlButton>
          )}
          {process.env.NODE_ENV !== "production" && (
            <button
              onClick={() => {
                throwConfetti();
              }}
            >
              confetti
            </button>
          )}
        </AutocompleteDiv>

        <FoundationFlex $windowWidth={windowWidth}>
          {foundationKeys.map((key) => {
            return <FoundationUI key={key} foundationData={foundations[key]} />;
          })}
        </FoundationFlex>
      </FoundationsStyle>
    </>
  );
});

export default FoundationsUI;
