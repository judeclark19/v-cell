import { observer } from "mobx-react-lite";
import React from "react";
import ColumnUI from "./ColumnUI";
import styled from "styled-components";
import gameState from "@/logic/GameState";
import { columnKeys } from "@/logic/types";
import { getCardOffsetAmount } from "../Board";
import { cardSizes } from "@/components/Card/CardUI.styles";
import { useRecoilValue } from "recoil";
import {
  getCardSize,
  windowHeightState,
  windowWidthState
} from "@/logic/OrientationAndSize";

const TableauStyles = styled.div<{
  $windowWidth: number;
  $windowHeight: number;
}>`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  gap: 4px;
  height: ${(props) => {
    const cardHeight =
      cardSizes[getCardSize(props.$windowWidth, props.$windowHeight)].height;
    const offset = getCardOffsetAmount(
      getCardSize(props.$windowWidth, props.$windowHeight)
    );
    return `${cardHeight + offset * 20}px`;
  }};
`;

const TableauUI = observer(() => {
  const tableau = gameState.currentBoard.tableau;
  const windowWidth = useRecoilValue(windowWidthState);
  const windowHeight = useRecoilValue(windowHeightState);
  return (
    <TableauStyles $windowWidth={windowWidth} $windowHeight={windowHeight}>
      {columnKeys.map((key) => {
        return <ColumnUI key={key} columnData={tableau[key]} />;
      })}
    </TableauStyles>
  );
});

export default TableauUI;
