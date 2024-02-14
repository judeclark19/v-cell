import styled from "styled-components";
import { Spot } from "../Board.styles";

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
  $windowWidth: number;
}>`
  display: flex;
  gap: ${(props) => {
    if (props.$windowWidth >= 1000) {
      return "50px";
    } else return "10px";
  }};
`;
