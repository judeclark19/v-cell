import { observer } from "mobx-react-lite";
import { InstructionsModalStyle, ModalStyle } from "./Modal.styles";
import gameState from "@/logic/GameState";
import { useState } from "react";

import {
  GameControlButton,
  GameControlButtons,
  GameTitle
} from "../Board/Board.styles";
import { luckyGuy, poppins } from "@/app/page";

const InstructionsModal = observer(() => {
  const [slideNumber, setSlideNumber] = useState(0);

  return (
    <ModalStyle className={poppins.className}>
      <InstructionsModalStyle>
        <span
          onClick={() => gameState.setIsInstructionsModalOpen(false)}
          className={`modal-close ${luckyGuy.className}`}
        >
          X
        </span>

        {slideNumber === 0 && (
          <>
            <GameTitle className={luckyGuy.className}>How To Play</GameTitle>
            <div className="slide">
              <p>There are three main areas on the board:</p>
              <ol>
                <li>
                  <span>The Foundations</span>
                </li>
                <li>
                  <span>The Tableau</span>
                </li>
                <li>
                  <span>The Free Cells</span>
                </li>
              </ol>
            </div>{" "}
          </>
        )}
        {slideNumber === 1 && (
          <>
            <GameTitle className={luckyGuy.className}>Foundations</GameTitle>
            <div className="slide">
              <p>
                The main objective of the game is to get all of the cards
                stacked in sequence in the foundations, starting with Aces and
                continuing all the way through Kings.
              </p>
              <p>There are four Foundations, one for each suit.</p>
            </div>
          </>
        )}
        {slideNumber === 2 && (
          <>
            <GameTitle className={luckyGuy.className}>Tableau</GameTitle>
            <div className="slide">
              <p>
                The Tableau consists of seven columns with seven cards each,
                randomly shuffled at the beginning of each game.
              </p>
              <p>
                Click and drag cards to rearrange them into sequences of
                drecreasing value and alternating suits.
              </p>
              <p>
                Multiple cards can be moved simultaneously if they are part of a
                correctly stacked sequence.
              </p>
            </div>
          </>
        )}

        {slideNumber === 3 && (
          <>
            <GameTitle className={luckyGuy.className}>Free Cells</GameTitle>
            <div className="slide">
              <p>
                You have five free cells, three of which are randomly populated
                when the game starts.
              </p>
              <p>
                The free cells can contain any where from 0 to 5 cards at any
                given time and are used to strategically store cards from the
                tableau as you build your sequential stacks.
              </p>
            </div>
          </>
        )}

        <GameControlButtons>
          <div>
            <GameControlButton
              onClick={() => {
                setSlideNumber(slideNumber - 1);
              }}
              disabled={slideNumber === 0}
            >
              Back
            </GameControlButton>
            <GameControlButton
              onClick={() => {
                if (slideNumber === 3) {
                  gameState.setIsInstructionsModalOpen(false);
                } else {
                  setSlideNumber(slideNumber + 1);
                }
              }}
            >
              {slideNumber === 3 ? "Close" : "Next"}
            </GameControlButton>
          </div>
        </GameControlButtons>
      </InstructionsModalStyle>
    </ModalStyle>
  );
});

export default InstructionsModal;
