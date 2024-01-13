import styled from "styled-components";
import { CardStyle, cardSize, cardSizes } from "../Card/CardUI.styles";
import { Orientation } from "@/logic/BoardOrientation";

export const GameTitle = styled.h1<{ $windowWidth: number }>`
  width: 100%;
  text-align: center;
  margin-top: 50px;
  margin-bottom: ${({ $windowWidth }) => $windowWidth < 675 && "25px"};
  font-size: ${({ $windowWidth }) => ($windowWidth >= 675 ? "100px" : "50px")};
`;

export const GameControlButtons = styled.div<{ $windowWidth: number }>`
  display: flex;
  justify-content: center;
  gap: ${({ $windowWidth }) => ($windowWidth >= 675 ? "40px" : "20px")};
  margin-bottom: ${({ $windowWidth }) =>
    $windowWidth >= 675 ? "40px" : "20px"};

  button {
    font-size: ${({ $windowWidth }) => ($windowWidth >= 675 ? "18px" : "14px")};
    padding: ${({ $windowWidth }) => ($windowWidth >= 675 ? "10px" : "5px")};
  }
`;

export const GameControlButton = styled.button`
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
  height: ${({ $windowWidth }) => {
    if ($windowWidth >= 1180) {
      return "fit-content";
    } else if ($windowWidth < 1180 && $windowWidth >= 500) {
      return "650px";
    } else if ($windowWidth < 500) {
      return "450px";
    }
  }};
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
  }
`;

interface CardBeingDraggedProps {
  $size: cardSize;
  $left: number;
  $top: number;
}

export const CardBeingDragged = styled.div.attrs<CardBeingDraggedProps>(
  (props) => ({
    style: {
      left: `${props.$left}px`,
      top: `${props.$top}px`
    }
  })
)<CardBeingDraggedProps>`
  position: absolute;
  border: 1px solid gray;
  /* z-index: 30; */
  border-radius: 5px;
  /* background-color: aqua; */
  height: ${(props) => cardSizes[props.$size].height}px;
  width: ${(props) => cardSizes[props.$size].width}px;
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
  display: grid;
  place-items: center;

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
        case "tiny":
          return "30px";
        default:
          return "28px";
      }
    }};
    color: rgba(255, 255, 255, 0.5);
  }

  ${CardStyle} {
    position: absolute;
  }
`;
