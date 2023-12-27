import styled from "styled-components";
import { Suit, Value } from "@/logic/types";

export const CardStyle = styled.div<{ $suit: Suit; $value: Value }>`
  background-color: white;
  color: black;
  border: 2px solid transparent;
  border-radius: 5px;
  height: 210px;
  width: 150px;
  color: ${(props) =>
    props.$suit === "hearts" || props.$suit === "diamonds" ? "red" : "black"};

  display: flex;
  flex-direction: column;

  .emojis {
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
