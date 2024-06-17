import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import { Spot } from "../Board.styles";
import appState from "@/logic/AppState";
import DropSpot from "../DropSpot/DropSpot";
import CardUI from "@/components/Card/CardUI";
import { handKeys } from "@/logic/types";
import { useRecoilValue } from "recoil";
import { cardSizeState } from "@/logic/RecoilAtoms";
import { questrial } from "../Board";
import { throwConfetti } from "@/logic/UIFunctions";
import { cardSizeType, cardSizes } from "@/components/Card/CardUI.styles";

const HandAndAutoComplete = styled.div<{
  $cardSize: cardSizeType;
}>`
  position: relative;
  height: ${(props) => `${cardSizes[props.$cardSize].height}px`};
`;

const HandStyles = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  justify-content: space-between;
  background-color: var(--page-background);

  ${Spot} {
    border: 2px solid var(--hand-border-color);
  }
`;

const AutoCompleteDiv = styled.div<{
  $isWinningBoard?: boolean;
}>`
  padding: 0 10px;
  position: absolute;
  padding-top: 10px;
  z-index: 0;
  width: 100%;
  margin-bottom: 1rem;
  background-color: var(--page-background);
  transform: ${(props) =>
    props.$isWinningBoard ? "translateY(-70px)" : "none"};
  transition: transform 0.5s;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`;

const HandUI = observer(() => {
  const hand = appState.currentBoard.hand;
  const cardSize = useRecoilValue(cardSizeState);

  return (
    <HandAndAutoComplete $cardSize={cardSize}>
      <AutoCompleteDiv $isWinningBoard={appState.winningBoard}>
        <button
          style={{
            backgroundColor: "#33d849",
            borderColor: "#33d849",
            width: "100%"
          }}
          className={questrial.className}
          disabled={!appState.canAutoComplete}
          onClick={() => {
            appState.autoComplete();
            throwConfetti(cardSize);
          }}
        >
          Autocomplete
        </button>
      </AutoCompleteDiv>

      <HandStyles>
        {handKeys.map((key) => {
          const card = hand[key];
          return (
            <DropSpot size={cardSize} key={key} dropId={key}>
              <Spot $size={cardSize}>
                {card && <CardUI size={cardSize} card={card} zIndex={1} />}
              </Spot>
            </DropSpot>
          );
        })}
      </HandStyles>
    </HandAndAutoComplete>
  );
});

export default HandUI;
