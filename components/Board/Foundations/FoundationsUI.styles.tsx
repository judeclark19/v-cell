import styled from "styled-components";
import { Spot } from "../Board.styles";
import { cardSizeType } from "@/components/Card/CardUI.styles";

export const FoundationsStyle = styled.div`
  display: flex;

  ${Spot} {
    display: grid;
    place-items: center;
  }
`;

export const AutocompleteDiv = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const FoundationFlex = styled.div<{
  $cardSize: cardSizeType;
}>`
  display: flex;
  gap: ${(props) => {
    if (props.$cardSize === "large" || props.$cardSize === "medium") {
      return "50px";
    } else return "10px";
  }};
`;
