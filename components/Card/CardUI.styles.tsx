import styled from "styled-components";
import { Suit, Value } from "@/logic/types";

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
  }
};

export const CardStyle = styled.div<{
  $size: "large" | "medium";
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
  /* top: ${(props) =>
    props.$offset
      ? `${props.$offset + 4}px`
      : props.$size === "large"
      ? "4px"
      : "2px"}; */
  top: ${(props) => (props.$offset ? `${props.$offset + 2}px` : "2px")};
  left: ${(props) => (props.$size === "large" ? "4px" : "2px")};

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

    padding: 4px;

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
            default:
              return "32px";
          }
        }};
      }

      span {
        font-size: 20px;
      }
    }

    .emojis {
      pointer-events: none;
      user-select: none;
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
                 grid-auto-rows: ${props.$size === "large" ? "40px" : "26px"};

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
