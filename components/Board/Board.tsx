import { useEffect, useState } from "react";
import {
  TopRow,
  Tableau,
  Spot,
  Foundations,
  BoardContainer,
  IsFlipping,
  Stock
} from "./Board.styles";
import gameState from "@/logic/GameState";
import CardUI from "../Card/CardUI";
import { observer } from "mobx-react-lite";
import { BoardType } from "@/logic/types";
import Image from "next/image";
import replayArrow from "./icons8-replay-90.png";
import emptyX from "./icons8-multiply-100.png";
import DropSpot from "./DropSpot/DropSpot";

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
        <TopRow>
          <div style={{ display: "flex", gap: "50px" }}>
            <Stock
              data-testid="stock"
              onClick={() => {
                if (gameState.cardIsFlipping) return;
                if (gameState.board.stock.length > 0) return;
                if (gameState.board.waste.length > 0) {
                  console.log("reset the stock");
                  gameState.resetStock();
                }
              }}
              $isClickable={gameState.board.waste.length > 0}
            >
              {/* stock */}
              {gameState.board.waste.length > 0 && (
                // <a target="_blank" href="https://icons8.com/icon/91644/replay">Replay</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
                <Image src={replayArrow} alt="replay" width={90} height={90} />
              )}
              {gameState.board.waste.length === 0 && (
                // <a target="_blank" href="https://icons8.com/icon/6483/multiply">Multiply</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
                <Image src={emptyX} alt="empty" width={90} height={90} />
              )}
              {gameState.board.stock.map((card, i) => {
                return (
                  <CardUI
                    key={`${card.value}_of_${card.suit}`}
                    card={card}
                    zIndex={i + 1}
                    handleCardClick={(e) => {
                      e.stopPropagation();
                      if (gameState.cardIsFlipping) return;
                      gameState.startWasteFlip(card);
                    }}
                  />
                );
              })}

              {/* card being flipped */}
              {gameState.cardIsFlipping && (
                <IsFlipping id="card-being-flipped">
                  <CardUI card={gameState.cardIsFlipping} zIndex={100} />
                </IsFlipping>
              )}
            </Stock>
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
            {Array.from({ length: 4 }).map((foundation, i) => {
              const thisFoundation =
                gameState.board[`foundation${i + 1}` as keyof BoardType];
              return (
                <DropSpot
                  key={`foundation${i}`}
                  dropId={`foundation${i + 1}` as keyof BoardType}
                >
                  <Spot>
                    foundation{i + 1}
                    {thisFoundation.map((card, i) => (
                      <CardUI
                        key={`${card.value}_of_${card.suit}`}
                        card={card}
                        zIndex={i + 1}
                      />
                    ))}
                  </Spot>
                </DropSpot>
              );
            })}
          </Foundations>
        </TopRow>
        <Tableau>
          {columns.map((column) => {
            if (
              gameState.board[`column${column}` as keyof BoardType].length === 0
            ) {
              return (
                <DropSpot
                  key={`column${column}`}
                  dropId={`column${column}` as keyof BoardType}
                >
                  <Spot />
                </DropSpot>
              );
            } else
              return (
                <Spot key={column}>
                  {gameState.board[`column${column}` as keyof BoardType].map(
                    (card, i) => {
                      if (
                        i ===
                        gameState.board[`column${column}` as keyof BoardType]
                          .length -
                          1
                      ) {
                        return (
                          <DropSpot
                            key={`${card.value}_of_${card.suit}`}
                            dropId={`column${column}` as keyof BoardType}
                          >
                            <CardUI
                              card={card}
                              zIndex={i + 1}
                              offset={i * 30}
                            />
                          </DropSpot>
                        );
                      }

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
