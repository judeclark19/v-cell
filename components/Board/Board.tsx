import { useEffect, useState } from "react";
import { BoardContainer, GameControlButton, GameTitle } from "./Board.styles";
import gameState from "@/logic/GameState";
import { observer } from "mobx-react-lite";
import { Luckiest_Guy } from "next/font/google";
import FoundationsUI from "./Foundations/FoundationsUI";
import TableauUI from "./Tableau/TableauUI";
import HandUI from "./Hand/HandUI";

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
      </div>
      <BoardContainer>
        <FoundationsUI />
        <div className="scroll">
          <TableauUI />
        </div>
        <HandUI />
      </BoardContainer>
    </>
  );
});

export default Board;
