import gameState from "@/logic/GameState";
import { observer } from "mobx-react-lite";
import React from "react";
import FoundationUI from "./FoundationUI";
import styled from "styled-components";
import { Spot } from "../Board.styles";
import { foundationKeys } from "@/logic/types";

export const FoundationsStyle = styled.div`
  display: flex;
  gap: 50px;
  width: 100%;
  justify-content: end;

  ${Spot} {
    display: grid;
    place-items: center;
    > span {
      height: fit-content !important;
      font-size: 90px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

const FoundationsUI = observer(() => {
  const foundations = gameState.board.foundations;

  return (
    <FoundationsStyle>
      {foundationKeys.map((key) => {
        return <FoundationUI key={key} foundationData={foundations[key]} />;
      })}
    </FoundationsStyle>
  );
});

export default FoundationsUI;
