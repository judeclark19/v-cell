import styled from "styled-components";
import { CardStyle, cardSize, cardSizes } from "../Card/CardUI.styles";
import { Orientation } from "@/logic/OrientationAndSize";

export const GameTitle = styled.h1<{ $windowWidth: number }>`
  width: 100%;
  text-align: center;
  margin-top: 50px;
  margin-bottom: ${({ $windowWidth }) => $windowWidth < 675 && "25px"};
  font-size: ${({ $windowWidth }) => ($windowWidth >= 675 ? "100px" : "50px")};
`;

export const GameControlButtons = styled.div<{ $windowWidth: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $windowWidth }) => ($windowWidth >= 675 ? "40px" : "20px")};
  margin: ${({ $windowWidth }) =>
    $windowWidth >= 675 ? "40px auto" : "20px auto"};

  button {
    font-size: ${({ $windowWidth }) => ($windowWidth >= 675 ? "18px" : "14px")};
    padding: ${({ $windowWidth }) => ($windowWidth >= 675 ? "10px" : "5px")};
  }

  > div {
    display: flex;
    align-items: center;
    gap: 20px;
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
  width: ${({ $windowWidth }) =>
    $windowWidth >= 768 ? "calc(100vw - 40px)" : "calc(100vw - 20px)"};
  max-width: 1100px;
  height: ${({ $windowWidth }) => {
    if ($windowWidth >= 1180) {
      return "fit-content";
    } else if ($windowWidth < 1180 && $windowWidth >= 500) {
      return "650px";
    } else if ($windowWidth < 500) {
      return "450px";
    }
  }};
  min-height: calc(100vh - 20px);
  max-height: calc(100vh - 100px);
  gap: 30px !important;
  margin: auto;
  display: flex;
  flex-direction: column;
  border-radius: 4px;

  @media screen and (max-width: 768px) {
    padding: 20px 10px;
    max-width: calc(100vw - 10px);
  }

  .scroll {
    background-color: #487860;
    border-radius: 4px;
    overflow-y: auto;
    padding: 10px;
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
  display: grid;
  place-items: center;

  .label {
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
