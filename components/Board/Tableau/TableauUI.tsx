import { observer } from "mobx-react-lite";
import React from "react";
import ColumnUI from "./ColumnUI";
import styled from "styled-components";
import appState from "@/logic/AppState";
import { columnKeys } from "@/logic/types";
import { cardSizeType, cardSizes } from "@/components/Card/CardUI.styles";
import { useRecoilValue } from "recoil";
import { cardSizeState } from "@/logic/RecoilAtoms";

export const TableauStyles = styled.div<{
  $cardSize: cardSizeType;
}>`
  background-color: var(--scroll-area-background);
  border-radius: 4px;
  padding: 10px;
  height: ${(props) =>
    `${
      cardSizes[props.$cardSize].height + cardSizes[props.$cardSize].offset * 16
    }px`};
`;

const ScrollableArea = styled.div<{
  $offset: number;
  $cardHeight: number;
  $isWinningBoard: boolean;
}>`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  gap: 4px;
  height: ${(props) => (props.$isWinningBoard ? "calc(100% - 30px)" : "100%")};
  overflow-x: hidden;
  overflow-y: auto;
  transition: height 0.5s;
`;

const TableauUI = observer(() => {
  const tableau = appState.currentBoard.tableau;
  const cardSize = useRecoilValue(cardSizeState);
  return (
    <TableauStyles $cardSize={cardSize}>
      <ScrollableArea
        $offset={cardSizes[cardSize].offset}
        $cardHeight={cardSizes[cardSize].height}
        $isWinningBoard={appState.winningBoard}
      >
        {columnKeys.map((key) => {
          return <ColumnUI key={key} columnData={tableau[key]} />;
        })}
      </ScrollableArea>
    </TableauStyles>
  );
});

export default TableauUI;
