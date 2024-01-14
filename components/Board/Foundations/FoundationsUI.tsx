import gameState from "@/logic/GameState";
import { observer } from "mobx-react-lite";
import React from "react";
import FoundationUI from "./FoundationUI";
import styled from "styled-components";
import { Spot } from "../Board.styles";
import { foundationKeys } from "@/logic/types";
import { useRecoilValue } from "recoil";
import {
  Orientation,
  boardOrientationState,
  windowWidthState
} from "@/logic/OrientationAndSize";

export const FoundationsStyle = styled.div<{
  $orientation: Orientation;
  $windowWidth: number;
}>`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => {
    if (props.$orientation === "landscape") {
      return "20px";
    } else if (props.$windowWidth >= 720) {
      return "50px";
    } else return "10px";
  }};
  width: ${({ $orientation }) =>
    $orientation === "portrait" ? "100%" : "fit-content"};
  justify-content: ${({ $orientation }) =>
    $orientation === "landscape" ? "start" : "end"};
  flex-direction: ${({ $orientation }) =>
    $orientation === "landscape" ? "column" : "row"};

  ${Spot} {
    display: grid;
    place-items: center;
  }
`;

const FoundationsUI = observer(() => {
  const foundations = gameState.board.foundations;
  const orientation = useRecoilValue(boardOrientationState);
  const windowWidth = useRecoilValue(windowWidthState);

  return (
    <FoundationsStyle $orientation={orientation} $windowWidth={windowWidth}>
      {foundationKeys.map((key) => {
        return <FoundationUI key={key} foundationData={foundations[key]} />;
      })}
    </FoundationsStyle>
  );
});

export default FoundationsUI;
