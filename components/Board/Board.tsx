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
import { BoardType } from "@/logic/types";

const Board = observer(() => {
  const columns = Array.from({ length: 7 }, (_, i) => i + 1);

  useEffect(() => {
    gameState.dealCards();
  }, []);

  return (
    <>
      <BoardContainer
        style={{ display: "flex", flexDirection: "column", gap: "100px" }}
      >
        <TopRow>
          <div style={{ display: "flex", gap: "50px" }}>
            <Spot data-testid="stock">
              {/* stock */}
              {gameState.board.stock.map((card, i) => {
                return (
                  <CardUI
                    key={`${card.value}_of_${card.suit}`}
                    card={card}
                    zIndex={i + 1}
                    isActive={i === gameState.board.stock.length - 1}
                  />
                );
              })}
            </Spot>
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
                        isActive={
                          i ===
                          gameState.board[`column${column}` as keyof BoardType]
                            .length -
                            1
                        }
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
