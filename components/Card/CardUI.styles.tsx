import styled from "styled-components";
import { Suit, Value } from "@/logic/types";

export type cardSizeType = "large" | "medium" | "small" | "tiny";

export const cardSizes = {
  large: {
    height: 140,
    width: 100,
    spotPadding: 8,
    top: 2,
    offset: 40,
    shadowSize: 5,
    confettiSize: 70,
    titleSuitSize: 20,
    bodySuitSize: 22
  },
  medium: {
    height: 100,
    width: 75,
    spotPadding: 6,
    top: 1,
    offset: 33,
    shadowSize: 4,
    confettiSize: 60,
    titleSuitSize: 14,
    bodySuitSize: 18
  },
  small: {
    height: 60,
    width: 50,
    spotPadding: 4,
    top: 0,
    offset: 28,
    shadowSize: 3,
    confettiSize: 30,
    titleSuitSize: 12,
    bodySuitSize: 20
  },
  tiny: {
    height: 40,
    width: 30,
    spotPadding: 2,
    top: 0,
    offset: 20,
    shadowSize: 2,
    confettiSize: 65,
    titleSuitSize: 12,
    bodySuitSize: 14
  }
};

export const CardStyle = styled.div<{
  $size: cardSizeType;
  $suit: Suit;
  $value: Value;
  $zIndex: number;
  $hoverColor: string;
  $isBeingDragged: boolean;
  $offset?: number;
  $isActive?: boolean;
  $isFaceUp?: boolean | null;
  $locationOnBoard?: string | null;
}>`
  overflow: hidden;
  cursor: ${(props) => (props.$isActive ? "pointer" : "default")};
  pointer-events: ${(props) => (props.$isActive ? "auto" : "none")};
  touch-action: none;
  position: absolute;
  opacity: ${(props) => {
    if (props.$isBeingDragged) {
      return "0";
    } else {
      return "1";
    }
  }};
  background-color: transparent;
  color: black;
  border: 1px solid
    ${(props) => (props.$isFaceUp === null ? "transparent" : "gray")};
  border-radius: 5px;
  height: ${(props) => cardSizes[props.$size].height}px;
  width: ${(props) => cardSizes[props.$size].width}px;
  color: ${(props) =>
    props.$suit === "hearts" || props.$suit === "diamonds"
      ? "var(--red)"
      : "black"};

  display: flex;
  flex-direction: column;
  z-index: ${(props) => props.$zIndex};
  top: ${(props) => {
    if (props.$offset) {
      return `${props.$offset + cardSizes[props.$size].top}px`;
    } else if (props.$size === "tiny") {
      return "-1px";
    } else return `${cardSizes[props.$size].top}px`;
  }};
  left: ${(props) => {
    switch (props.$size) {
      case "large":
        return "2px";
      case "medium":
        return "1px";
      case "small":
        return "0px";
      case "tiny":
        return "-1px";
      default:
        return "0px";
    }
  }};

  transition: left 0.2s ease-in-out;

  ${(props) =>
    props.$isFaceUp !== null &&
    `
    box-shadow: ${cardSizes[props.$size].shadowSize}px ${
      cardSizes[props.$size].shadowSize
    }px 5px rgba(0, 0, 0, 0.5);
  `}

  ${(props) =>
    props.$isActive &&
    `
    &:hover {
    box-shadow: ${cardSizes[props.$size].shadowSize}px ${
      cardSizes[props.$size].shadowSize
    }px 5px var(--${props.$hoverColor});
    border: 1px solid var(--${props.$hoverColor});
}
`}

  .card-front {
    display: ${(props) => (props.$isFaceUp === true ? "flex" : "none")};
    flex-direction: column;
    height: 100%;
    position: relative;
    background-color: ${(props) =>
      props.$isActive || props.$locationOnBoard === "dragging"
        ? "white"
        : "#e0e0e0"};

    padding: ${({ $size }) => {
      switch ($size) {
        case "large":
          return "4px";
        case "medium":
          return "3px";
        case "small":
          return "2px";
        case "tiny":
          return "1px";
        default:
          return "4px";
      }
    }};

    .card-title {
      pointer-events: none;
      user-select: none;
      display: flex;
      justify-content: ${(props) =>
        props.$size === "tiny" ? "space-evenly" : "space-between"};
      align-items: center;

      ${(props) => {
        if (props.$size === "large") {
          return `
              position: absolute;
              top: 4px;
              left: 4px;
`;
        } else if (props.$size === "medium") {
          return `
              position: absolute;
              top: 4px;
              left: 4px;`;
        }
      }}

      h1 {
        font-size: ${(props) => {
          switch (props.$size) {
            case "large":
              return "26px";
            case "medium":
            case "small":
              return "18px";
            case "tiny":
              return "12px";
            default:
              return "24px";
          }
        }};
      }

      span {
        font-size: ${(props) => {
          switch (props.$size) {
            case "large":
              return "18px";
            case "medium":
            case "small":
              return "14px";
            case "tiny":
              return "10px";
            default:
              return "18px";
          }
        }};
      }
    }

    .emojis {
      pointer-events: none;
      user-select: none;
      font-weight: 700;
      font-size: ${(props) => {
        if (props.$size === "large") {
          return "24px";
        } else if (props.$size === "medium") {
          return "22px";
        } else if (props.$size === "small") {
          return "30px";
        } else if (props.$size === "tiny") {
          return "18px";
        }
      }};

      height: 100%;
      display: grid;
      place-items: center;

      span {
        display: flex;
        align-items: center;

        &:nth-of-type(1) {
          margin-top: ${(props) => {
            if (props.$size === "large") {
              return "-8px";
            } else if (props.$size === "medium") {
              return "-4px";
            } else return "0px";
          }};
        }

        &:nth-of-type(3) {
          margin-bottom: ${(props) => {
            if (props.$size === "large") {
              return "-8px";
            } else if (props.$size === "medium") {
              return "-4px";
            } else return "0px";
          }};
        }
      }
    }
  }

  .card-back {
    display: ${(props) => (props.$isFaceUp === false ? "grid" : "none")};
    place-items: center;
    background-color: white;
    border-radius: 2px;
    padding: ${({ $size }) => {
      switch ($size) {
        case "small":
          return "2px";
        case "tiny":
          return "1px";
        default:
          return "4px";
      }
    }};

    height: 100%;

    .card-back-interior {
      background-color: var(--red);
      border-radius: 2px;
      height: 100%;
      display: grid;
      place-items: center;
      img {
        height: auto;
        width: 100%;
        object-fit: cover;
      }
    }
  }
`;
