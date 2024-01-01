import styled from "styled-components";
import { CardStyle, cardSizes } from "../Card/CardUI.styles";

export const cardOffsetAmount = 40;

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

  // disabled
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const BoardContainer = styled.div`
  background-color: #5c5c5c;
  padding: 20px;
  max-width: 1380px;
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

export const Hand = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;

  ${Spot} {
    border: 2px solid #000080;
  }
`;

export const Tableau = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  height: 850px;
`;

export const Foundations = styled.div`
  display: flex;
  gap: 50px;
  width: 100%;
  justify-content: end;

  ${Spot} {
    display: grid;
    place-items: center;
    > span {
      height: fit-content !important;
      font-size: 90px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;
