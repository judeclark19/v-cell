import styled from "styled-components";
import { CardStyle } from "../Card/CardUI.styles";

export const BoardContainer = styled.div`
  background-color: #5c5c5c;
  padding: 30px;
  max-width: 1380px;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 100px;
`;

export const Foundations = styled.div`
  display: flex;
  gap: 50px;
`;

export const Tableau = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
`;

export const Spot = styled.div`
  border: 2px solid gold;
  border-radius: 5px;
  height: 210px;
  width: 150px;
  position: relative;

  ${CardStyle} {
    position: absolute;
  }
`;

export const IsFlipping = styled.div`
  color: red;
  position: absolute;
  top: 0px;
  font-size: 30px;
`;
