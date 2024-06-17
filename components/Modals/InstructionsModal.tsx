import { observer } from "mobx-react-lite";
import { InstructionsModalStyle, ModalStyle } from "./Modal.styles";
import appState from "@/logic/AppState";
import { useEffect, useState } from "react";

import { GameControlButtons, GameTitle } from "../Board/Board.styles";
import { alfaSlabOne, luckyGuy, poppins, questrial } from "../Board/Board";

const InstructionsModal = observer(() => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // queryselect .modal-shade
    const modalShade = document.querySelector(".modal-shade");
    modalShade?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        setIsClosing(true);
        // .3 seconds same amount of time as keyframe animation

        setTimeout(() => {
          appState.modals.instructions.close();
          setIsClosing(false);
        }, 300);
      }
    });

    //cleanup
    return () => {
      modalShade?.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <ModalStyle
      $isClosing={isClosing}
      className={`modal-shade ${poppins.className}`}
    >
      <InstructionsModalStyle>
        <span
          onClick={() => {
            setIsClosing(true);
            // .3 seconds same amount of time as keyframe animation

            setTimeout(() => {
              appState.modals.instructions.close();
              setIsClosing(false);
            }, 300);
          }}
          className={`modal-close ${questrial.className}`}
        >
          X
        </span>

        {slideNumber === 0 && (
          <>
            <GameTitle
              className={
                appState.themeName === "poker"
                  ? luckyGuy.className
                  : alfaSlabOne.className
              }
            >
              How To Play
            </GameTitle>
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
            <GameTitle
              className={
                appState.themeName === "poker"
                  ? luckyGuy.className
                  : alfaSlabOne.className
              }
            >
              Foundations
            </GameTitle>
            <div className="slide">
              <p>
                The main objective of the game is to{" "}
                <span className="gold">get all of the cards stacked</span> in
                sequence in the foundations, starting with Aces and continuing
                all the way through Kings.
              </p>
              <p>
                <span className="gold">There are four (4) Foundations</span>,
                one for each suit.
              </p>
            </div>
          </>
        )}
        {slideNumber === 2 && (
          <>
            <GameTitle
              className={
                appState.themeName === "poker"
                  ? luckyGuy.className
                  : alfaSlabOne.className
              }
            >
              Tableau
            </GameTitle>
            <div className="slide">
              <p>
                The Tableau consists of seven (7) columns with seven (7) cards
                each, randomly shuffled at the beginning of each game.
              </p>
              <p>
                <span className="gold">Click and drag cards</span> to rearrange
                them into sequences of decreasing value and alternating suits.
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
            <GameTitle
              className={
                appState.themeName === "poker"
                  ? luckyGuy.className
                  : alfaSlabOne.className
              }
            >
              Free Cells
            </GameTitle>
            <div className="slide">
              <p>
                You have <span className="gold">five (5) free cells</span>,
                three of which are randomly populated when the game starts.
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
            <button
              className={poppins.className}
              onClick={() => {
                setSlideNumber(slideNumber - 1);
              }}
              disabled={slideNumber === 0}
            >
              Back
            </button>
            <button
              className={poppins.className}
              onClick={() => {
                if (slideNumber === 3) {
                  setIsClosing(true);
                  setTimeout(() => {
                    appState.modals.instructions.close();
                    setIsClosing(false);
                  }, 300);
                } else {
                  setSlideNumber(slideNumber + 1);
                }
              }}
            >
              {slideNumber === 3 ? "Close" : "Next"}
            </button>
          </div>
        </GameControlButtons>
      </InstructionsModalStyle>
    </ModalStyle>
  );
});

export default InstructionsModal;
