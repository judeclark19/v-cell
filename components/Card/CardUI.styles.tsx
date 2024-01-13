import styled from "styled-components";
import { Suit, Value } from "@/logic/types";

export type cardSize = "large" | "medium" | "small" | "tiny";

export const cardSizes = {
  large: {
    height: 140,
    width: 100,
    spotPadding: 8,
    top: 2
  },
  medium: {
    height: 100,
    width: 75,
    spotPadding: 6,
    top: 1.5
  },
  small: {
    height: 60,
    width: 50,
    spotPadding: 4,
    top: 0
  },
  tiny: {
    height: 40,
    width: 30,
    spotPadding: 2,
    top: 0
  }
};

export const CardStyle = styled.div<{
  $size: cardSize;
  $suit: Suit;
  $value: Value;
  $zIndex: number;
  $isBeingDragged: boolean;
  $offset?: number;
  $isActive?: boolean;
  $isFaceUp?: boolean;
}>`
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
  background-color: white;
  color: black;
  border: 1px solid gray;
  border-radius: 5px;
  height: ${(props) => cardSizes[props.$size].height}px;
  width: ${(props) => cardSizes[props.$size].width}px;
  color: ${(props) =>
    props.$suit === "hearts" || props.$suit === "diamonds" ? "red" : "black"};

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

  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5));

  ${(props) =>
    props.$isActive &&
    `
    &:hover {
        filter: drop-shadow(5px 5px 5px rgba(255, 215, 0, 0.8));
        border: 1px solid gold;
    }
`}

  .card-front {
    display: ${(props) => (props.$isFaceUp ? "block" : "none")};

    padding: ${({ $size }) => {
      switch ($size) {
        case "large":
          return "4px";
        case "medium":
          return "2px";
        case "small":
          return "1px";
        case "tiny":
          return "0px";
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

      h1 {
        font-size: ${(props) => {
          switch (props.$size) {
            case "large":
              return "24px";
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
      margin-top: ${(props) => {
        switch (props.$size) {
          case "medium":
            return "4px";
          case "small":
            return "-10px";
          default:
            return "0px";
        }
      }};

      flex-grow: 1;
      font-weight: ${(props) => (props.$size === "tiny" ? "bold" : "normal")};
      font-size: ${(props) => {
        if (props.$size === "large") {
          switch (props.$value) {
            case "A":
              return "42px";
            case "jack":
            case "queen":
            case "king":
              return "28px";
            default:
              return "26px";
          }
        } else if (props.$size === "medium") {
          switch (props.$value) {
            case "A":
              return "28px";
            case "jack":
            case "queen":
            case "king":
              return "18px";
            default:
              return "18px";
          }
        } else if (props.$size === "small") {
          return "40px";
        }
      }};

      display: ${(props) => {
        if (props.$size == "large" || props.$size == "medium") {
          switch (props.$value) {
            case "A":
            case "jack":
            case "queen":
            case "king":
              return "flex";
            default:
              return "grid";
          }
        } else {
          return "grid";
        }
      }};

      ${(props) => {
        if (props.$size == "large" || props.$size == "medium") {
          switch (props.$value) {
            case "A":
            case "jack":
            case "queen":
            case "king":
              return `
                    flex-direction: column;
                    align-items: center;
                    `;
            default:
              return `
                 grid-template-columns: repeat(3, 1fr);
             grid-auto-rows: ${
               props.$size === "large"
                 ? "26px"
                 : props.$size === "medium"
                 ? "16px"
                 : "14px"
             };

                    div {
                        display: grid;

                     span {
                        justify-self: center;
                        margin-top: -8px;
                        }
                    }
            `;
          }
        } else {
          return `place-items: center;`;
        }
      }}
    }
  }

  .card-back {
    display: ${(props) => (props.$isFaceUp ? "none" : "block")};
    height: 100%;
    border-radius: 2px;
    /* padding: ${({ $size }) => ($size === "small" ? "2px" : "4px")}; */
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
    h2 {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      height: 100%;
      background-color: #c33f34;
      border-radius: ${({ $size }) => ($size === "tiny" ? "2px" : "0")};
      color: white;
      user-select: none;
      font-size: ${({ $size }) => {
        switch ($size) {
          case "large":
            return "24px";
          case "medium":
            return "16px";
          case "small":
            return "12px";
          case "tiny":
            return "8px";
          default:
            return "42px";
        }
      }};
    }
  }
`;
