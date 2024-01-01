import styled, { keyframes } from "styled-components";
import { CardStyle, cardSizes } from "../Card/CardUI.styles";
import Image from "next/image";

export const BoardContainer = styled.div`
  background-color: #5c5c5c;
  padding: 30px;
  max-width: 1380px;
  height: 1000px;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 100px;
`;

export const Tableau = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
`;

export const Spot = styled.div`
  border: 2px solid #fede4dbf;
  border-radius: 5px;
  height: ${cardSizes.large.height + 12}px;
  width: ${cardSizes.large.width + 12}px;
  padding: 4px;
  position: relative;

  ${CardStyle} {
    position: absolute;
  }
`;
export const Foundations = styled.div`
  display: flex;
  gap: 50px;

  ${Spot} {
    display: grid;
    place-items: center;
    > span {
      height: fit-content !important;
      font-size: 90px;
      color: rgba(255, 255, 255, 0.5);
    }
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
