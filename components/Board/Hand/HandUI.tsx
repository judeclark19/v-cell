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
  getCardSize,
  windowHeightState,
  windowWidthState
} from "@/logic/OrientationAndSize";

const HandStyles = styled.div<{
  $orientation: Orientation;
  $windowWidth: number;
}>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 10px;
  justify-content: space-between;
  gap: ${(props) => {
    if (props.$windowWidth >= 720) {
      return "50px";
    } else return "10px";
  }};

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
