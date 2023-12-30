import React, { useEffect, useState } from "react";
import {
  TopRow,
  Tableau,
  Spot,
  Foundations,
  BoardContainer,
  IsFlipping
} from "./Board.styles";
import gameState from "@/logic/GameState";
import CardUI from "../Card/CardUI";
import { observer } from "mobx-react-lite";
import { BoardType } from "@/logic/types";

const Board = observer(() => {
  const columns = Array.from({ length: 7 }, (_, i) => i + 1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    gameState.dealCards();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BoardContainer
        style={{ display: "flex", flexDirection: "column", gap: "100px" }}
      >
        {gameState.cardIsFlipping && <IsFlipping>Card is flipping</IsFlipping>}
        <TopRow>
          <div style={{ display: "flex", gap: "50px" }}>
            <Spot
              data-testid="stock"
              onClick={() => {
                console.log("the stock is empty");
              }}
            >
              {/* stock */}
              {gameState.board.stock.map((card, i) => {
                return (
                  <CardUI
                    key={`${card.value}_of_${card.suit}`}
                    card={card}
                    zIndex={i + 1}
                    handleCardClick={(e) => {
                      e.stopPropagation();
                      gameState.startWasteFlip(card);
                    }}
                  />
                );
              })}
            </Spot>
            <Spot style={{ borderStyle: "dashed" }} data-testid="waste">
              {/* waste */}
              {gameState.board.waste.map((card, i) => (
                <CardUI
                  key={`${card.value}_of_${card.suit}`}
                  card={card}
                  zIndex={i + 1}
                />
              ))}
            </Spot>
          </div>
          <Foundations>
            {gameState.suits.map((i) => (
              <Spot key={i}>Foundation {i}</Spot>
            ))}
          </Foundations>
        </TopRow>
        <Tableau>
          {columns.map((column) => {
            return (
              <Spot key={column} data-testid={`column${column}`}>
                {gameState.board[`column${column}` as keyof BoardType].map(
                  (card, i) => {
                    return (
                      <CardUI
                        key={`${card.value}_of_${card.suit}`}
                        card={card}
                        zIndex={i + 1}
                        offset={i * 30}
                      />
                    );
                  }
                )}
              </Spot>
            );
          })}
        </Tableau>
      </BoardContainer>
    </>
  );
});

export default Board;
