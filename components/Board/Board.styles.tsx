import styled from "styled-components";
import { CardStyle, cardSize, cardSizes } from "../Card/CardUI.styles";
import { Orientation } from "@/logic/BoardOrientation";

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

export const BoardContainer = styled.div<{
  $orientation: Orientation;
  $windowWidth: number;
}>`
  background-color: #35654d;
  padding: 20px;
  width: ${(props) => props.$orientation === "landscape" && "1400px"};
  max-width: calc(100vw - 20px);
  /* height: calc(100vh - 20px); */
  height: ${(props) =>
    props.$windowWidth < 1180 ? "650px" : "calc(100vh - 20px)"};
  gap: 30px !important;
  margin: auto;
  display: flex;
  flex-direction: ${(props) =>
    props.$orientation === "landscape" ? "row" : "column"};
  border-radius: 4px;

  .scroll {
    background-color: #487860;
    border-radius: 4px;
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;

    // if orientation === portrait, set width to 100%
    /* width: ${(props) => props.$orientation === "landscape" && "100%"}; */
  }
`;

export const Spot = styled.div<{
  $size: cardSize;
}>`
  border: 2px solid #fede4dbf;
  border-radius: 5px;
  height: ${(props) =>
    cardSizes[props.$size].height + cardSizes[props.$size].spotPadding}px;
  width: ${(props) =>
    cardSizes[props.$size].width + cardSizes[props.$size].spotPadding}px;
  position: relative;

  > span {
    height: fit-content !important;
    font-size: ${(props) => {
      switch (props.$size) {
        case "large":
          return "90px";
        case "medium":
          return "60px";
        case "small":
          return "40px";
        default:
          return "40px";
      }
    }};
    color: rgba(255, 255, 255, 0.5);
  }

  ${CardStyle} {
    position: absolute;
  }
`;
