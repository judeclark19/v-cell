import { observer } from "mobx-react-lite";
import React from "react";
import ColumnUI from "./ColumnUI";
import styled from "styled-components";
import gameState from "@/logic/GameState";
import { columnKeys } from "@/logic/types";
import { getCardOffsetAmount, getCardSize } from "../Board";
import { cardSizes } from "@/components/Card/CardUI.styles";

const TableauStyles = styled.div<{
  $windowWidth: number;
}>`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  height: ${(props) => {
    const cardHeight = cardSizes[getCardSize(props.$windowWidth)].height;
    const offset = getCardOffsetAmount(getCardSize(props.$windowWidth));
    return `${cardHeight + offset * 20}px`;
  }};
`;

const TableauUI = observer(() => {
  const tableau = gameState.board.tableau;
  const windowWidth = window.innerWidth;
  return (
    <TableauStyles $windowWidth={windowWidth}>
      {columnKeys.map((key) => {
        return <ColumnUI key={key} columnData={tableau[key]} />;
      })}
    </TableauStyles>
  );
});

export default TableauUI;
