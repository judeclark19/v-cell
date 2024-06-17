import styled from "styled-components";
import { Spot } from "../Board.styles";
import { cardSizeType, cardSizes } from "@/components/Card/CardUI.styles";

export const FoundationsStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  position: relative;

  ${Spot} {
    display: grid;
    place-items: center;
  }
`;

export const TimerPosition = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const Filler = styled.div<{
  $cardSize: cardSizeType;
}>`
  height: ${(props) =>
    `${
      cardSizes[props.$cardSize].height + cardSizes[props.$cardSize].spotPadding
    }px`};
  width: ${(props) =>
    `${
      cardSizes[props.$cardSize].width + cardSizes[props.$cardSize].spotPadding
    }px`};
  pointer-events: none;
`;
