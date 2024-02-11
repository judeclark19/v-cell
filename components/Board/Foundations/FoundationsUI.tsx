import appState from "@/logic/AppState";
import { observer } from "mobx-react-lite";
import React from "react";
import FoundationUI from "./FoundationUI";

import { GameControlButton, Spot } from "../Board.styles";
import { foundationKeys } from "@/logic/types";
import { useRecoilValue } from "recoil";
import { windowWidthState } from "@/logic/OrientationAndSize";
import { questrial } from "../Board";
import {
  AutocompleteDiv,
  FoundationFlex,
  FoundationsStyle
} from "./FoundationsUI.styles";
import JSConfetti from "js-confetti";

const FoundationsUI = observer(() => {
  const foundations = appState.currentBoard.foundations;
  const windowWidth = useRecoilValue(windowWidthState);
  const confetti = new JSConfetti();

  return (
    <>
      <FoundationsStyle>
        <AutocompleteDiv>
          {appState.canAutoComplete && (
            <GameControlButton
              style={{
                backgroundColor: "#33d849",
                borderColor: "#33d849"
              }}
              className={questrial.className}
              disabled={!appState.canAutoComplete}
              onClick={() => {
                appState.autoComplete();
                confetti.addConfetti();
              }}
            >
              Autocomplete
            </GameControlButton>
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
