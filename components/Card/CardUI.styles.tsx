import styled from "styled-components";
import { Suit, Value } from "@/logic/types";

export type cardSize = "large" | "medium" | "small";

export const cardSizes = {
  large: {
    height: 210,
    width: 150,
    spotPadding: 12
  },
  medium: {
    height: 140,
    width: 100,
    spotPadding: 8
  },
  small: {
    height: 100,
    width: 75,
    spotPadding: 4
  }
};

export const CardStyle = styled.div<{
  $size: cardSize;
  $suit: Suit;
  $value: Value;
  $zIndex: number;
  $offset?: number;
  $isActive?: boolean;
  $isFaceUp?: boolean;
}>`
  cursor: ${(props) => (props.$isActive ? "pointer" : "default")};
  pointer-events: ${(props) => (props.$isActive ? "auto" : "none")};
  position: absolute;
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
  top: ${(props) =>
    props.$offset
      ? `${props.$offset + 2}px`
      : props.$size === "small"
      ? "0px"
      : "2px"};
  left: ${(props) => {
    switch (props.$size) {
      case "large":
        return "4px";
      case "medium":
        return "2px";
      case "small":
        return "0px";
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

    padding: ${(props) => (props.$size === "small" ? "2px" : "4px")};

    .card-title {
      pointer-events: none;
      user-select: none;
      display: flex;
      justify-content: space-between;

      h1 {
        font-size: ${(props) => {
          switch (props.$size) {
            case "large":
              return "32px";
            case "medium":
              return "24px";
            case "small":
              return "18px";
            default:
              return "24px";
          }
        }};
      }

      span {
        font-size: ${(props) => {
          switch (props.$size) {
            case "large":
              return "20px";
            case "medium":
              return "18px";
            case "small":
              return "14px";
            default:
              return "18px";
          }
        }};
      }
    }

    .emojis {
      pointer-events: none;
      user-select: none;
      margin-top: ${(props) => props.$size === "small" && "4px"};
      flex-grow: 1;
      font-size: ${(props) => {
        if (props.$size === "large") {
          switch (props.$value) {
            case "A":
              return "70px";
            case "jack":
            case "queen":
            case "king":
              return "42px";
            default:
              return "40px";
          }
        } else if (props.$size === "medium") {
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
        } else if (props.$size === "small") {
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
        }
      }};

      display: ${(props) => {
        switch (props.$value) {
          case "A":
          case "jack":
          case "queen":
          case "king":
            return "flex";
          default:
            return "grid";
        }
      }};

      ${(props) => {
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
                 ? "40px"
                 : props.$size === "medium"
                 ? "26px"
                 : "16px"
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
      }}
    }
  }

  .card-back {
    display: ${(props) => (props.$isFaceUp ? "none" : "block")};
    height: 100%;
    padding: 4px;
    h2 {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      background-color: #c33f34;
      color: white;
      user-select: none;
    }
  }
`;
