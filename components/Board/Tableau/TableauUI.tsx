import { observer } from "mobx-react-lite";
import React from "react";
import ColumnUI from "./ColumnUI";
import styled from "styled-components";
import gameState from "@/logic/GameState";
import { columnKeys } from "@/logic/types";

const TableauStyles = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  height: 850px;
`;

const TableauUI = observer(() => {
  const tableau = gameState.board.tableau;
  return (
    <TableauStyles>
      {columnKeys.map((key) => {
        // no
        return <ColumnUI key={key} columnData={tableau[key]} />;
      })}
    </TableauStyles>
  );
});

export default TableauUI;
