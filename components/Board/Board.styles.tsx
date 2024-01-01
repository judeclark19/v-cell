import styled from "styled-components";
import { CardStyle, cardSizes } from "../Card/CardUI.styles";

export const cardOffsetAmount = 42;

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
  padding: 30px;
  max-width: 1380px;
  height: 1500px;
  gap: 50px !important;
  margin: auto;
`;

export const Spot = styled.div`
  border: 2px solid #fede4dbf;
  border-radius: 5px;
  height: ${cardSizes.large.height + 12}px;
  width: ${cardSizes.large.width + 12}px;
  padding: 4px;
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
