import { observer } from "mobx-react-lite";
import { cardSize, cardSizes } from "./Card/CardUI.styles";
import { getCardOffsetAmount } from "./Board/Board";
import { useRecoilValue } from "recoil";
import {
  getCardSize,
  windowHeightState,
  windowWidthState
} from "@/logic/OrientationAndSize";
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
  height: ${(props) => cardSizes[props.$size].height}px;
  width: ${(props) => cardSizes[props.$size].width}px;
`;

const CardsBeingDragged = observer(
  ({ dragPosition }: { dragPosition: { left: number; top: number } }) => {
    const windowWidth = useRecoilValue(windowWidthState);
    const windowHeight = useRecoilValue(windowHeightState);

    return (
      <CardsBeingDraggedStyle
        $size={getCardSize(windowWidth, windowHeight)}
        $left={
          dragPosition.left -
          getCardOffsetAmount(getCardSize(windowWidth, windowHeight))
        }
        $top={
          dragPosition.top -
          getCardOffsetAmount(getCardSize(windowWidth, windowHeight))
        }
      >
        {gameState.cardsBeingTouched &&
          gameState.cardsBeingTouched.map((card, index) => {
            const cardClass = new CardClass(card.value, card.suit);
            cardClass.setLocationOnBoard("dragging");

            return (
              <CardUI
                key={card.id}
                size={getCardSize(windowWidth, windowHeight)}
                card={cardClass}
                zIndex={100 + index}
                offset={
                  index *
                  getCardOffsetAmount(getCardSize(windowWidth, windowHeight))
                }
              />
            );
          })}
      </CardsBeingDraggedStyle>
    );
  }
);

export default CardsBeingDragged;
