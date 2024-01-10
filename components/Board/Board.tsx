import { useEffect, useState } from "react";
import {
  BoardContainer,
  GameControlButton,
  GameControlButtons,
  GameTitle,
  Spot
} from "./Board.styles";
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
import DropSpot from "./DropSpot/DropSpot";
import CardUI from "../Card/CardUI";
import CardClass from "../Card/CardClass";
import { cardSize } from "../Card/CardUI.styles";

const luckyGuy = Luckiest_Guy({ weight: "400", subsets: ["latin"] });

const testMode = false;

export const getCardSize = (windowWidth: number) => {
  // above 1180 medium, btw 675 and 1180 small, below 675 xSmall
  if (windowWidth >= 1180) {
    return "large";
  } else if (windowWidth >= 675) {
    return "medium";
  } else if (windowWidth >= 500) {
    return "small";
  } else return "tiny";
};

export const getCardOffsetAmount = (size: cardSize) => {
  switch (size) {
    case "large":
      return 32;
    case "medium":
      return 25;
    case "small":
      return 20;
    case "tiny":
      return 14;
  }
};

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

  if (testMode)
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Spot $size="large">
          <DropSpot size="large" dropId="testdrop1">
            <CardUI
              size="large"
              card={new CardClass("queen", "spades")}
              zIndex={1}
            />
          </DropSpot>
        </Spot>

        <Spot $size="medium">
          <DropSpot size="medium" dropId="testdrop2">
            <CardUI
              size="medium"
              card={new CardClass("queen", "spades")}
              zIndex={1}
            />
          </DropSpot>
        </Spot>

        <Spot $size="small">
          <DropSpot size="small" dropId="testdrop3">
            <CardUI
              size="small"
              card={new CardClass("queen", "spades")}
              zIndex={1}
            />
          </DropSpot>
        </Spot>

        <Spot $size="tiny">
          <DropSpot size="tiny" dropId="testdrop4">
            <CardUI
              size="tiny"
              card={new CardClass("queen", "spades")}
              zIndex={1}
            />
          </DropSpot>
        </Spot>
      </div>
    );

  return (
    <>
      <GameTitle className={luckyGuy.className} $windowWidth={windowWidth}>
        V-Cell
      </GameTitle>
      <GameControlButtons $windowWidth={windowWidth}>
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
      </GameControlButtons>
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
