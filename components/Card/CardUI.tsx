import { CardStyle, cardSizeType, cardSizes } from "./CardUI.styles";
import CardClass from "./CardClass";
import appState from "@/logic/AppState";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { questrial } from "../Board/Board";
import Image from "next/image";
import cardBackImage from "@/assets/images/V.png";
import SuitIcon from "./SuitIcon";
import Flipping from "./Flipping";

const CardUI = observer(
  ({
    size,
    card,
    zIndex,
    offset
  }: {
    size: cardSizeType;
    card: CardClass;
    zIndex: number;
    offset?: number;
    spacer?: boolean;
  }) => {
    const [lastTapTimestamp, setLastTapTimestamp] = useState(0);
    const [hoverColor, setHoverColor] = useState("goldAlpha");
    const [thisCardIsFaceUp, setThisCardIsFaceUp] = useState<boolean | null>(
      card.isFaceUp
    );

    useEffect(() => {
      if (card.isFaceUp === null) {
        setTimeout(() => {
          setThisCardIsFaceUp(true);
        }, 600);
      }
    }, [card.isFaceUp]);

    function createIcons() {
      const icons = [];

      if (size === "small" || size === "tiny") {
        icons.push(
          <SuitIcon suit={card.suit} size={cardSizes[size].bodySuitSize} />
        );
      } else {
        icons.push(
          <SuitIcon suit={card.suit} size={cardSizes[size].bodySuitSize} />,
          card.value,
          <SuitIcon suit={card.suit} size={cardSizes[size].bodySuitSize} />
        );
      }

      return icons;
    }

    const getCardTitle = () => {
      switch (card.value) {
        case "jack":
          return "J";
        case "queen":
          return "Q";
        case "king":
          return "K";
        default:
          return card.value;
      }
    };

    return (
      <CardStyle
        key={`${card.value}_of_${card.suit}`}
        id={`${card.value}_of_${card.suit}`}
        data-testid={`${card.value}_of_${card.suit}`}
        $size={size}
        $suit={card.suit}
        $value={card.value}
        $zIndex={zIndex}
        $hoverColor={hoverColor}
        $isBeingDragged={
          appState.isDragging &&
          appState.cardsBeingTouched?.findIndex((c) => c.id === card.id) !==
            -1 &&
          card.locationOnBoard !== "dragging"
        }
        $offset={offset}
        $isActive={card.isActive}
        $isFaceUp={card.isFaceUp}
        $locationOnBoard={card.locationOnBoard}
        onPointerDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          appState.setCardsBeingTouched(
            card.isActive && card.isFaceUp ? card : null
          );
        }}
        onPointerUp={(e) => {
          // this function listens for a double click which is interpreted as an attempt to send a card up to the foundations
          e.stopPropagation();
          const timeSinceLastTap = Date.now() - lastTapTimestamp;
          if (timeSinceLastTap <= 300) {
            if (!card.isActive) return;
            appState.moveEvaluator.evaluateMove(card, "foundations");
            appState.setIsDragging(false);
            appState.setCardsBeingTouched(null);
          }

          setLastTapTimestamp(Date.now());
        }}
        onPointerEnter={() => {
          appState.moveEvaluator.setExecute(false);

          if (
            appState.isDragging &&
            appState.cardsBeingTouched &&
            appState.cardsBeingTouched[0].locationOnBoard !==
              card.locationOnBoard
          ) {
            const isValidMove = appState.moveEvaluator.evaluateMove(
              appState.cardsBeingTouched[0],
              card.locationOnBoard as string
            );

            if (isValidMove) {
              setHoverColor("lime");
            } else {
              setHoverColor("red");
            }
          }
        }}
        onPointerLeave={() => {
          setHoverColor("goldAlpha");
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        className={`card ${questrial.className}`}
      >
        {thisCardIsFaceUp === null && (
          <>
            <Flipping card={card} size={size} />
          </>
        )}
        {thisCardIsFaceUp !== null && (
          <>
            <div className="card-front">
              <div className="card-title">
                <h1>{getCardTitle()}</h1>{" "}
                {(size === "tiny" || size === "small") && (
                  <SuitIcon
                    suit={card.suit}
                    size={cardSizes[size].titleSuitSize}
                  />
                )}
              </div>
              <div className="emojis">
                {createIcons().map((icon, i) => (
                  <span key={`${icon}${i}`}>{icon}</span>
                ))}
              </div>
            </div>
            <div className="card-back">
              <div className="card-back-interior">
                <Image
                  src={cardBackImage}
                  width={240}
                  height={245}
                  alt="V-Cell logo"
                  priority
                />
              </div>
            </div>
          </>
        )}
      </CardStyle>
    );
  }
);

export default CardUI;
