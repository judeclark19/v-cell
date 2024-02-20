import { observer } from "mobx-react-lite";
import React from "react";
import ColumnUI from "./ColumnUI";
import styled from "styled-components";
import appState from "@/logic/AppState";
import { columnKeys } from "@/logic/types";
import { cardSizes } from "@/components/Card/CardUI.styles";
import { useRecoilValue } from "recoil";
import { cardSizeState } from "@/logic/OrientationAndSize";

const TableauStyles = styled.div<{
  $offset: number;
  $cardHeight: number;
}>`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  gap: 4px;
  height: ${(props) => `${props.$cardHeight + props.$offset * 20}px`};
`;

const TableauUI = observer(() => {
  const tableau = appState.currentBoard.tableau;
  const cardSize = useRecoilValue(cardSizeState);
  return (
    <TableauStyles
      $offset={cardSizes[cardSize].offset}
      $cardHeight={cardSizes[cardSize].height}
    >
      {columnKeys.map((key) => {
        return <ColumnUI key={key} columnData={tableau[key]} />;
      })}
    </TableauStyles>
  );
});

export default TableauUI;
