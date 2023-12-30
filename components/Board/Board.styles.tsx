import styled, { keyframes } from "styled-components";
import { CardStyle, cardSizes } from "../Card/CardUI.styles";
import Image from "next/image";

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
  height: ${cardSizes.large.height + 4}px;
  width: ${cardSizes.large.width + 4}px;
  position: relative;

  ${CardStyle} {
    position: absolute;
  }
`;

export const Stock = styled(Spot)<{
  $isClickable: boolean;
}>`
  display: grid;
  place-items: center;
  cursor: ${({ $isClickable }) => ($isClickable ? "pointer" : "default")};

  img {
    user-select: none;
    pointer-events: none;
  }
`;

const moveRight = keyframes`
 0% {
   transform: translateX(0);
 }
 100% {
   transform: translateX(200px);
 }
`;

export const IsFlipping = styled(Spot)`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 100;
  animation: ${moveRight} 200ms ease-in-out;
`;
