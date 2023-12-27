import React, { useEffect } from "react";
import {
  TopRow,
  Tableau,
  Spot,
  Foundations,
  BoardContainer
} from "./Board.styles";
import gameState from "@/logic/GameState";
import CardUI from "../Card/CardUI";
import { observer } from "mobx-react-lite";

const Board = observer(() => {
  const columns = Array.from({ length: 7 }, (_, i) => i + 1);

  useEffect(() => {
    gameState.shuffleDeck();
    console.log("the deck has been shuffled", gameState.deck);
  }, []);

  return (
    <>
      <BoardContainer
        style={{ display: "flex", flexDirection: "column", gap: "100px" }}
      >
        <TopRow>
          <div style={{ display: "flex", gap: "50px" }}>
            <Spot>Stock</Spot>
            <Spot style={{ borderStyle: "dashed" }}>Waste</Spot>
          </div>
          <Foundations>
            {gameState.suits.map((i) => (
              <Spot key={i}>Foundation {i}</Spot>
            ))}
          </Foundations>
        </TopRow>
        <Tableau>
          {columns.map((column) => {
            return <Spot key={column}>column {column}</Spot>;
          })}
        </Tableau>
      </BoardContainer>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {gameState.deck.map((card) => (
          <CardUI key={`${card.value}_of_${card.suit}`} card={card} />
        ))}
      </div>
    </>
  );
});

export default Board;
