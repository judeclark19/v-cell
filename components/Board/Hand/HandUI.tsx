import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import { Spot } from "../Board.styles";
import gameState from "@/logic/GameState";
import DropSpot from "../DropSpot/DropSpot";
import CardUI from "@/components/Card/CardUI";
import { handKeys } from "@/logic/types";

const HandStyles = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;

  ${Spot} {
    border: 2px solid #000080;
  }
`;

const HandUI = observer(() => {
  const hand = gameState.board.hand;

  return (
    <HandStyles>
      {handKeys.map((key) => {
        const card = hand[key];
        // no
        return (
          <DropSpot size="medium" key={key} dropId={key}>
            <Spot $size="medium">
              {card && <CardUI size="medium" card={card} zIndex={1} />}
              {/*  */}
            </Spot>
          </DropSpot>
        );
      })}
    </HandStyles>
  );
});

export default HandUI;
