import styled from "styled-components";
import { Suit, Value } from "@/logic/types";

export const CardStyle = styled.div<{
  $suit: Suit;
  $value: Value;
  $zIndex: number;
  $offset?: number;
  $isActive?: boolean;
}>`
  cursor: ${(props) => (props.$isActive ? "pointer" : "default")};
  pointer-events: ${(props) => (props.$isActive ? "auto" : "none")};
  position: absolute;
  background-color: white;
  color: black;
  border: 1px solid gray;
  border-radius: 5px;
  height: 210px;
  width: 150px;
  color: ${(props) =>
    props.$suit === "hearts" || props.$suit === "diamonds" ? "red" : "black"};

  display: flex;
  flex-direction: column;
  z-index: ${(props) => props.$zIndex};
  top: ${(props) => (props.$offset ? `${props.$offset}px` : "0")};
  transition: all 0.2s ease-in-out;

  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5));

  ${(props) =>
    props.$isActive &&
    `
    &:hover {
        filter: drop-shadow(5px 5px 5px rgba(255, 215, 0, 0.8));
        border: 1px solid gold;
    }
`}

  h3 {
    pointer-events: none;
    user-select: none;
  }

  .emojis {
    pointer-events: none;
    user-select: none;
    flex-grow: 1;
    font-size: ${(props) => {
      switch (props.$value) {
        case "ace":
          return "70px";
        case "jack":
        case "queen":
        case "king":
          return "42px";
        default:
          return "40px";
      }
    }};
    display: ${(props) => {
      switch (props.$value) {
        case "ace":
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
        case "ace":
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
          grid-auto-rows: 40px;

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
`;
