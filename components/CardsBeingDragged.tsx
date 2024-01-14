import { observer } from "mobx-react-lite";
import { cardSize, cardSizes } from "./Card/CardUI.styles";
import { getCardOffsetAmount, getCardSize } from "./Board/Board";
import { useRecoilValue } from "recoil";
import { windowWidthState } from "@/logic/BoardOrientation";
import styled from "styled-components";
import CardUI from "./Card/CardUI";
import CardClass from "./Card/CardClass";
import gameState from "@/logic/GameState";

interface CardsBeingDraggedProps {
  $size: cardSize;
  $left: number;
  $top: number;
}

export const CardsBeingDraggedStyle = styled.div.attrs<CardsBeingDraggedProps>(
  (props) => ({
    style: {
      left: `${props.$left}px`,
      top: `${props.$top}px`
    }
  })
)<CardsBeingDraggedProps>`
  position: absolute;
  border: 1px solid gray;
  border-radius: 5px;
  background-color: aqua;
  height: ${(props) => cardSizes[props.$size].height}px;
  width: ${(props) => cardSizes[props.$size].width}px;
`;

const CardsBeingDragged = observer(
  ({ dragPosition }: { dragPosition: { left: number; top: number } }) => {
    const windowWidth = useRecoilValue(windowWidthState);
    const cardsToRender = gameState.cardsBeingTouched;

    return (
      <CardsBeingDraggedStyle
        $size={getCardSize(windowWidth)}
        $left={
          dragPosition.left - getCardOffsetAmount(getCardSize(windowWidth))
        }
        $top={dragPosition.top - getCardOffsetAmount(getCardSize(windowWidth))}
      >
        {cardsToRender &&
          cardsToRender.map((card, index) => {
            const cardClass = new CardClass(card.value, card.suit);
            cardClass.setLocationOnBoard("dragging");

            return (
              <CardUI
                key={card.id}
                size={getCardSize(windowWidth)}
                card={cardClass}
                zIndex={100 + index}
                offset={index * getCardOffsetAmount(getCardSize(windowWidth))}
              />
            );
          })}
      </CardsBeingDraggedStyle>
    );
  }
);

export default CardsBeingDragged;
