import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import { Spot } from "../Board.styles";
import appState from "@/logic/AppState";
import DropSpot from "../DropSpot/DropSpot";
import CardUI from "@/components/Card/CardUI";
import { handKeys } from "@/logic/types";
import { useRecoilValue } from "recoil";
import { cardSizeState } from "@/logic/OrientationAndSize";

const HandStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 10px;
  justify-content: space-between;

  ${Spot} {
    border: 2px solid #000080;
  }
`;

const HandUI = observer(() => {
  const hand = appState.currentBoard.hand;
  const cardSize = useRecoilValue(cardSizeState);

  return (
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
  );
});

export default HandUI;
