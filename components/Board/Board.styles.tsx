import styled from "styled-components";
import { cardSizeType, cardSizes } from "../Card/CardUI.styles";
import wood from "@/assets/images/wood.webp";

export const GameTitle = styled.h1`
  width: 100%;
  color: white;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 70px;

  @media screen and (max-width: 992px) {
    margin-top: 20px;
    margin-bottom: 12px;
    font-size: 40px;
  }
`;

export const HeaderImage = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px auto 0 auto;
  width: calc(100vw - 20px);
  max-width: 1100px;
  border-radius: 4px;
  img {
    width: 100%;
    max-width: 700px;
    height: auto;
  }
`;

export const ControlsBar = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  max-width: 600px;
  margin: 0 auto 30px auto;

  .hs-and-settings {
    display: flex;
    gap: 1rem;

    button {
      padding: 8px 8px 6px 8px;
      background-color: transparent;
      border: 2px outset #1b3427;
    }
  }
`;

export const HowToPlay = styled.div<{
  $isInstructionsModalOpen: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${(props) => (props.$isInstructionsModalOpen ? "0.5" : "1")};
  ${(props) => (props.$isInstructionsModalOpen ? "pointer-events: none;" : "")}

  &:hover {
    cursor: pointer;
    span {
      text-decoration: underline;
      color: var(--gold);
    }

    .info-icon {
      color: var(--gold);
    }
  }
`;

export const GameControlButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin: 40px auto;

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

export const WoodenBorder = styled.div`
  background-image: url(${wood.src});
  background-size: cover;
  width: fit-content;
  margin: auto;
  box-sizing: border-box;
  padding: 4px;
  border-radius: 8px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
`;

export const BoardContainer = styled.div<{
  $isModalOpen: boolean;
  $cardSize: cardSizeType;
}>`
  user-select: none;
  padding: 20px;
  background-color: var(--pokerGreen);
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
  border-radius: 4px;
  position: ${(props) => (props.$isModalOpen ? "relative" : "static")};

  @media screen and (max-width: 768px) {
    gap: 10px;
    min-height: fit-content;
  }

  .scroll {
    background-color: #487860;
    border-radius: 4px;
    overflow-y: auto;
    padding: 10px;
  }
`;

export const Spot = styled.div<{
  $size: cardSizeType;
}>`
  border: 2px solid var(--goldAlpha);
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
    color: rgba(255, 255, 255, 0.5);
  }
`;
