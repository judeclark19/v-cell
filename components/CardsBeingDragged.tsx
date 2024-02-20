import { observer } from "mobx-react-lite";
import { cardSizeType, cardSizes } from "./Card/CardUI.styles";
import { useRecoilValue } from "recoil";
import { cardSizeState } from "@/logic/OrientationAndSize";
import styled from "styled-components";
import CardUI from "./Card/CardUI";
import CardClass from "./Card/CardClass";
import appState from "@/logic/AppState";

interface CardsBeingDraggedProps {
  $size: cardSizeType;
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
  height: ${(props) => cardSizes[props.$size].height}px;
  width: ${(props) => cardSizes[props.$size].width}px;
`;

const CardsBeingDragged = observer(
  ({ dragPosition }: { dragPosition: { left: number; top: number } }) => {
    const cardSize = useRecoilValue(cardSizeState);

    return (
      <CardsBeingDraggedStyle
        $size={cardSize}
        $left={dragPosition.left - cardSizes[cardSize].offset}
        $top={dragPosition.top - cardSizes[cardSize].offset}
      >
        {appState.cardsBeingTouched &&
          appState.cardsBeingTouched.map((card, index) => {
            const cardClass = new CardClass(card.value, card.suit);
            cardClass.setLocationOnBoard("dragging");

            return (
              <CardUI
                key={card.id}
                size={cardSize}
                card={cardClass}
                zIndex={100 + index}
                offset={index * cardSizes[cardSize].offset}
              />
            );
          })}
      </CardsBeingDraggedStyle>
    );
  }
);

export default CardsBeingDragged;
