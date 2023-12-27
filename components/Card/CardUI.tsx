import gameState from "@/logic/GameState";
import { CardType } from "@/logic/types";
import React from "react";
import styled from "styled-components";

const CardStyle = styled.div`
  background-color: white;
  color: black;
  border: 2px solid transparent;
  border-radius: 5px;
  height: 210px;
  width: 150px;
`;

export default function Card({ card }: { card: CardType }) {
  return (
    <CardStyle
      id={`${card.value}_of_${card.suit}`}
      data-testid={`${card.value}_of_${card.suit}`}
    >
      {card.value} of {card.suit}
    </CardStyle>
  );
}
