import styled from "styled-components";
import { cardSizeType, cardSizes } from "../Card/CardUI.styles";
import wood from "@/assets/images/wood.webp";
import { theme } from "@/logic/types";

export const GameTitle = styled.h1`
  width: 100%;
  color: var(--textColor);
  text-align: center;
  margin: 20px auto 0px auto;
  font-size: 60px;

  @media screen and (max-width: 992px) {
    margin-top: 20px;
    margin-bottom: 12px;
    font-size: 40px;
  }
`;

export const HeaderImage = styled.div`
  border-radius: 4px;
  img {
    width: auto;
    max-width: 100%;
    height: 100%;
    max-height: 60px;
  }
`;

export const BoardWrapper = styled.div`
  @media screen and (orientation: landscape) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 2rem;
    gap: 1rem;
  }
`;

export const ControlsBar = styled.div`
  padding: 20px;
  border-bottom: 1px solid var(--header-footer-border-color);
  width: 100%;
  margin-bottom: 1.5rem;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 500px;
    margin: auto;
    gap: 1rem;
    @media screen and (orientation: landscape) {
      flex-direction: column;
    }
  }

  .hs-and-settings {
    display: flex;
    gap: 1rem;

    button {
      height: 40px;
      width: 40px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--control-button-background);
      color: var(--control-button-color);
      border: 2px outset var(--control-button-border);
    }
  }
`;

export const GameControlButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin: 40px auto;

  @media screen and (orientation: landscape) {
    align-items: unset;
    flex-wrap: wrap;
    height: fit-content;
  }

  @media screen and (max-width: 992px) {
    gap: 20px;
    margin: 20px auto;
  }

  > div {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;

export const WoodenBorder = styled.div<{
  $theme: theme;
}>`
  background-image: ${(props) =>
    props.$theme === "poker" ? `url(${wood.src})` : "none"};
  background-size: cover;
  width: fit-content;
  margin: auto;
  box-sizing: border-box;
  padding: var(--board-border-width);
  border-radius: var(--board-border-radius);
  box-shadow: var(--board-box-shadow);
  background-color: var(--board-border-color);
`;

export const BoardContainer = styled.div<{
  $isModalOpen: boolean;
  $cardSize: cardSizeType;
}>`
  user-select: none;
  padding: 20px 10px;
  background-color: var(--page-background);
  box-sizing: border-box;
  width: ${(props) => {
    let buffer;

    switch (props.$cardSize) {
      case "large":
        buffer = 190;
        break;
      case "medium":
        buffer = 170;
        break;
      case "small":
        buffer = 140;
        break;
      case "tiny":
        buffer = 130;
        break;
      default:
        buffer = 170;
    }

    return `${cardSizes[props.$cardSize].width * 7 + buffer}px`;
  }};
  max-width: calc(100vw - 20px);
  height: fit-content;
  min-height: 50vh;
  gap: 30px;
  margin: auto;
  display: flex;
  flex-direction: column;
  border-radius: var(--board-border-radius);
  position: ${(props) => (props.$isModalOpen ? "relative" : "static")};

  @media screen and (max-width: 768px) {
    gap: 10px;
    min-height: fit-content;
  }
`;

export const Spot = styled.div<{
  $size: cardSizeType;
}>`
  border: 2px solid var(--card-spot-border-color);
  border-radius: 5px;
  height: ${(props) =>
    cardSizes[props.$size].height + cardSizes[props.$size].spotPadding}px;
  width: ${(props) =>
    cardSizes[props.$size].width + cardSizes[props.$size].spotPadding}px;
  position: relative;

  .label {
    height: 100%;
    width: 100%;
    line-height: 100%;
    display: grid;
    place-items: center;
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
    color: var(--card-spot-label-color);
  }
`;
