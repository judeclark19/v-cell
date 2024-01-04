import styled from "styled-components";
import { CardStyle, cardSizes } from "../Card/CardUI.styles";

export const cardOffsetAmount = 32;

export const GameTitle = styled.h1`
  width: 100%;
  text-align: center;
  margin-top: 50px;
  font-size: 100px;
`;

export const GameControlButton = styled.button`
  font-size: 18px;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const BoardContainer = styled.div`
  background-color: #5c5c5c;
  padding: 20px;
  max-width: 1000px;
  height: calc(100vh - 20px);
  gap: 30px !important;
  margin: auto;
  display: flex;
  flex-direction: column;
  border-radius: 4px;

  .scroll {
    background-color: #818181;
    border-radius: 4px;
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
  }
`;

export const Spot = styled.div<{
  $size: "large" | "medium";
}>`
  border: 2px solid #fede4dbf;
  border-radius: 5px;
  height: ${(props) =>
    cardSizes[props.$size].height + cardSizes[props.$size].spotPadding}px;
  width: ${(props) =>
    cardSizes[props.$size].width + cardSizes[props.$size].spotPadding}px;
  position: relative;

  ${CardStyle} {
    position: absolute;
  }
`;
