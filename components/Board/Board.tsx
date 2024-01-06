import { useEffect, useRef, useState } from "react";
import { BoardContainer, GameControlButton, GameTitle } from "./Board.styles";
import gameState from "@/logic/GameState";
import { observer } from "mobx-react-lite";
import { Luckiest_Guy } from "next/font/google";
import FoundationsUI from "./Foundations/FoundationsUI";
import TableauUI from "./Tableau/TableauUI";
import HandUI from "./Hand/HandUI";
import { useRecoilState } from "recoil";
import {
  Orientation,
  boardOrientationState,
  windowWidthState
} from "@/logic/BoardOrientation";

const luckyGuy = Luckiest_Guy({ weight: "400", subsets: ["latin"] });

const Board = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [orientation, setBoardOrientation] = useRecoilState(
    boardOrientationState
  );
  const [windowWidth, setWindowWidth] = useRecoilState(windowWidthState);

  let lastKnownOrientation: Orientation = orientation;

  const handleResize = () => {
    setWindowWidth(window.innerWidth);

    let newOrientation: Orientation =
      window.innerWidth <= 980 ? "portrait" : "landscape";

    if (newOrientation !== lastKnownOrientation) {
      console.log(newOrientation);
      setBoardOrientation(newOrientation);
      lastKnownOrientation = newOrientation;
    }
  };

  useEffect(() => {
    gameState.dealCards();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
            backgroundColor: "#dc3a3a",
            borderColor: "#dc3a3a"
          }}
          disabled={gameState.history.length === 0}
          onClick={() => {
            gameState.undo();
          }}
        >
          Undo
        </GameControlButton>
        <GameControlButton
          style={{
            backgroundColor: "#33d849",
            borderColor: "#33d849"
          }}
          disabled={!gameState.canAutoComplete}
          onClick={() => {
            gameState.autoComplete();
          }}
        >
          Autocomplete
        </GameControlButton>
      </div>
      <BoardContainer $orientation={orientation} $windowWidth={windowWidth}>
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
