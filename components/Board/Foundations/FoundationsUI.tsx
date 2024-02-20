import appState from "@/logic/AppState";
import { observer } from "mobx-react-lite";
import React from "react";
import FoundationUI from "./FoundationUI";

import { GameControlButton } from "../Board.styles";
import { foundationKeys } from "@/logic/types";
import { useRecoilValue } from "recoil";
import { cardSizeState } from "@/logic/OrientationAndSize";
import { questrial } from "../Board";
import {
  AutocompleteDiv,
  FoundationFlex,
  FoundationsStyle
} from "./FoundationsUI.styles";
import { throwConfetti } from "@/logic/UIFunctions";

const FoundationsUI = observer(() => {
  const foundations = appState.currentBoard.foundations;
  const cardSize = useRecoilValue(cardSizeState);

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
                throwConfetti(cardSize);
              }}
            >
              Autocomplete
            </GameControlButton>
          )}
          {process.env.NODE_ENV !== "production" && (
            <button
              onClick={() => {
                throwConfetti(cardSize);
              }}
            >
              confetti
            </button>
          )}
        </AutocompleteDiv>

        <FoundationFlex $cardSize={cardSize}>
          {foundationKeys.map((key) => {
            return <FoundationUI key={key} foundationData={foundations[key]} />;
          })}
        </FoundationFlex>
      </FoundationsStyle>
    </>
  );
});

export default FoundationsUI;
