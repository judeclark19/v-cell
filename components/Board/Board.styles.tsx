import styled from "styled-components";
import { cardSize, cardSizes } from "../Card/CardUI.styles";

export const GameTitle = styled.h1`
  width: 100%;
  color: white;
  text-align: center;
  margin-top: 50px;
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
  margin: 30px auto;
  width: calc(100vw - 20px);
  max-width: 1100px;
  background-color: #ef3e56;
  border-radius: 4px;
  img {
    width: 100%;
    max-width: 700px;
    height: auto;
  }
`;

export const HowToPlay = styled.div<{
  $isInstructionsModalOpen: boolean;
}>`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const GameControlButton = styled.button`
  cursor: pointer;
  color: white;

  font-size: 18px;
  padding: 10px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media screen and (max-width: 992px) {
    font-size: 14px;
    padding: 5px;
  }
`;

export const BoardContainer = styled.div<{
  $isModalOpen: boolean;
}>`
  background-color: #35654d;
  padding: 20px;
  width: calc(100vw - 20px);
  max-width: 1100px;
  height: fit-content;
  min-height: 50vh;
  max-height: 80vh;
  gap: 30px;
  margin: auto;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  position: ${(props) => (props.$isModalOpen ? "relative" : "static")};

  @media screen and (max-width: 768px) {
    padding: 10px;
    gap: 10px;
    min-height: fit-content;
    width: calc(100vw - 20px);
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
