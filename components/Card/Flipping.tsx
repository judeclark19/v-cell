"use client";

import { observer } from "mobx-react-lite";
import CardClass from "./CardClass";
import Image from "next/image";
import { useEffect, useState } from "react";
import cardBackImage from "@/assets/images/V.png";

import styled from "styled-components";
import { cardSizeType, cardSizes } from "./CardUI.styles";
import SuitIcon from "./SuitIcon";

interface CardInnerProps {
  $isFaceUp: boolean;
  $size: cardSizeType;
}

export const CardInner = styled.div<CardInnerProps>`
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 5px;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ $isFaceUp }) =>
    $isFaceUp ? "rotateY(0deg)" : "rotateY(180deg)"};
`;

export const CardFace = styled.div<{
  $size: cardSizeType;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  box-shadow: ${(props) =>
    `${cardSizes[props.$size].shadowSize}px ${
      cardSizes[props.$size].shadowSize
    }px 5px rgba(0, 0, 0, 0.5)`};

  border: 1px solid gray;
`;

export const CardFront = styled(CardFace)`
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: ${({ $size }) => {
    switch ($size) {
      case "large":
        return "4px";
      case "medium":
        return "3px";
      case "small":
        return "2px";
      case "tiny":
        return "1px";
      default:
        return "4px";
    }
  }};

  .card-title {
    pointer-events: none;
    user-select: none;
    display: flex;
    justify-content: ${(props) =>
      props.$size === "tiny" ? "space-evenly" : "space-between"};
    align-items: center;

    ${(props) => {
      if (props.$size === "large") {
        return `
              position: absolute;
              top: 4px;
              left: 4px;
`;
      } else if (props.$size === "medium") {
        return `
              position: absolute;
              top: 4px;
              left: 4px;`;
      }
    }}

    h1 {
      font-size: ${(props) => {
        switch (props.$size) {
          case "large":
            return "26px";
          case "medium":
          case "small":
            return "18px";
          case "tiny":
            return "12px";
          default:
            return "24px";
        }
      }};
    }

    span {
      font-size: ${(props) => {
        switch (props.$size) {
          case "large":
            return "18px";
          case "medium":
          case "small":
            return "14px";
          case "tiny":
            return "10px";
          default:
            return "18px";
        }
      }};
    }
  }

  .emojis {
    pointer-events: none;
    user-select: none;
    font-weight: 700;
    font-size: ${(props) => {
      if (props.$size === "large") {
        return "24px";
      } else if (props.$size === "medium") {
        return "22px";
      } else if (props.$size === "small") {
        return "30px";
      } else if (props.$size === "tiny") {
        return "18px";
      }
    }};

    height: 100%;
    display: grid;
    place-items: center;

    span {
      display: flex;
      align-items: center;

      &:nth-of-type(1) {
        margin-top: ${(props) => {
          if (props.$size === "large") {
            return "-8px";
          } else if (props.$size === "medium") {
            return "-4px";
          } else return "0px";
        }};
      }

      &:nth-of-type(3) {
        margin-bottom: ${(props) => {
          if (props.$size === "large") {
            return "-8px";
          } else if (props.$size === "medium") {
            return "-4px";
          } else return "0px";
        }};
      }
    }
  }
`;

export const CardBack = styled(CardFace)`
  transform: rotateY(180deg);

  display: grid;
  place-items: center;
  background-color: white;
  border-radius: 2px;

  padding: ${({ $size }) => {
    switch ($size) {
      case "small":
        return "2px";
      case "tiny":
        return "1px";
      default:
        return "4px";
    }
  }};

  height: 100%;

  .card-back-interior {
    background-color: var(--red);
    border-radius: 2px;
    height: 100%;
    display: grid;
    place-items: center;
    img {
      height: auto;
      width: 100%;
      object-fit: cover;
    }
  }
`;

const Flipping: React.FC<{
  card: CardClass;
  size: cardSizeType;
}> = observer(({ card, size }) => {
  const [isFaceUp, setIsFaceUp] = useState<boolean>(false);

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

  useEffect(() => {
    setTimeout(() => {
      setIsFaceUp(true);
    }, 10);
  }, []);
  return (
    <CardInner $isFaceUp={isFaceUp} $size={size}>
      <CardFront $size={size}>
        <div className="card-title">
          <h1>{getCardTitle()}</h1>{" "}
          {(size === "tiny" || size === "small") && (
            <SuitIcon suit={card.suit} size={cardSizes[size].titleSuitSize} />
          )}
        </div>
        <div className="emojis">
          {createIcons().map((icon, i) => (
            <span key={`${icon}${i}`}>{icon}</span>
          ))}
        </div>
      </CardFront>
      <CardBack $size={size}>
        <div className="card-back-interior">
          <Image
            src={cardBackImage}
            width={240}
            height={245}
            alt="V-Cell logo"
            priority
          />
        </div>
      </CardBack>
    </CardInner>
  );
});

export default Flipping;
