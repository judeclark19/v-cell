import { useEffect, useState } from "react";
import {
  Tableau,
  Spot,
  Foundations,
  BoardContainer,
  GameControlButton,
  cardOffsetAmount,
  Hand,
  GameTitle
} from "./Board.styles";
import gameState from "@/logic/GameState";
import CardUI from "../Card/CardUI";
import { observer } from "mobx-react-lite";
import { BoardType } from "@/logic/types";
import DropSpot from "./DropSpot/DropSpot";
import { Luckiest_Guy } from "next/font/google";

const luckyGuy = Luckiest_Guy({ weight: "400", subsets: ["latin"] });

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
      <GameTitle className={luckyGuy.className}>V-Cell</GameTitle>
      <div
        className="buttons"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          padding: "40px"
        }}
      >
        <GameControlButton
          style={{
            backgroundColor: "#0099cc",
            borderColor: "#0099cc"
          }}
          onClick={() => {
            gameState.dealCards();
          }}
        >
          Deal again
        </GameControlButton>
        <GameControlButton
          style={{
            backgroundColor: "#ff9933",
            borderColor: "#ff9933"
          }}
          onClick={() => {
            gameState.undo();
          }}
          disabled={gameState.history.length === 0}
        >
          Undo
        </GameControlButton>

        <GameControlButton
          style={{
            backgroundColor: "#00cc00",
            borderColor: "#00cc00"
          }}
          onClick={() => {
            gameState.autoComplete();
          }}
          disabled={!gameState.canAutoComplete}
        >
          Autocomplete
        </GameControlButton>
      </div>
      <BoardContainer>
        <Foundations>
          {Array.from({ length: 4 }).map((_, i) => {
            const thisFoundation =
              gameState.board[`foundation${i + 1}` as keyof BoardType];
            return (
              <DropSpot
                size="medium"
                key={`foundation${i}`}
                dropId={`foundation${i + 1}` as keyof BoardType}
              >
                <Spot $size="medium">
                  <span>A</span>
                  {thisFoundation.map((card, i) => (
                    <CardUI
                      size="medium"
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

        <div className="scroll">
          <Tableau>
            {columns.map((column) => {
              if (
                gameState.board[`column${column}` as keyof BoardType].length ===
                0
              ) {
                return (
                  <DropSpot
                    size="large"
                    key={`column${column}`}
                    dropId={`column${column}` as keyof BoardType}
                  >
                    <Spot $size="large" />
                  </DropSpot>
                );
              } else
                return (
                  <Spot key={column} $size="large">
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
                              size="large"
                              key={`${card.value}_of_${card.suit}`}
                              dropId={`column${column}` as keyof BoardType}
                            >
                              <CardUI
                                size="large"
                                card={card}
                                zIndex={i + 1}
                                offset={i * cardOffsetAmount}
                                spacer
                              />
                            </DropSpot>
                          );
                        }

                        return (
                          <CardUI
                            size="large"
                            key={`${card.value}_of_${card.suit}`}
                            card={card}
                            zIndex={i + 1}
                            offset={i * cardOffsetAmount}
                          />
                        );
                      }
                    )}
                  </Spot>
                );
            })}
          </Tableau>
        </div>
        <Hand>
          {gameState.hand.map((card, i) => (
            <DropSpot key={`hand${i}`} size="medium" dropId={`hand-${i}`}>
              <Spot $size="medium">
                {card && <CardUI size="medium" card={card} zIndex={1} />}
              </Spot>
            </DropSpot>
          ))}
        </Hand>
      </BoardContainer>
    </>
  );
});

export default Board;
