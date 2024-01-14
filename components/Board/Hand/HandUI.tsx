import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import { Spot } from "../Board.styles";
import gameState from "@/logic/GameState";
import DropSpot from "../DropSpot/DropSpot";
import CardUI from "@/components/Card/CardUI";
import { handKeys } from "@/logic/types";
import { useRecoilValue } from "recoil";
import {
  Orientation,
  boardOrientationState,
  windowHeightState,
  windowWidthState
} from "@/logic/BoardOrientation";
import { getCardSize } from "../Board";

const HandStyles = styled.div<{
  $orientation: Orientation;
  $windowWidth: number;
}>`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => {
    if (props.$orientation === "landscape") {
      return "start";
    } else if (props.$windowWidth >= 720) {
      return "center";
    } else return "space-between";
  }};
  gap: ${(props) => {
    if (props.$orientation === "landscape") {
      return "20px";
    } else if (props.$windowWidth >= 720) {
      return "50px";
    } else return "10px";
  }};
  flex-direction: ${({ $orientation }) =>
    $orientation === "landscape" ? "column" : "row"};

  width: ${({ $windowWidth }) => $windowWidth >= 1180 && "fit-content"};

  ${Spot} {
    border: 2px solid #000080;
  }
`;

const HandUI = observer(() => {
  const hand = gameState.board.hand;
  const orientation = useRecoilValue(boardOrientationState);
  const windowWidth = useRecoilValue(windowWidthState);
  const windowHeight = useRecoilValue(windowHeightState);

  return (
    <HandStyles $orientation={orientation} $windowWidth={windowWidth}>
      {handKeys.map((key) => {
        const card = hand[key];
        return (
          <DropSpot
            size={getCardSize(windowWidth, windowHeight)}
            key={key}
            dropId={key}
          >
            <Spot $size={getCardSize(windowWidth, windowHeight)}>
              {card && (
                <CardUI
                  size={getCardSize(windowWidth, windowHeight)}
                  card={card}
                  zIndex={1}
                />
              )}
            </Spot>
          </DropSpot>
        );
      })}
    </HandStyles>
  );
});

export default HandUI;
