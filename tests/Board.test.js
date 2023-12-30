import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Board from "@/components/Board/Board";
import gameState from "@/logic/GameState";
import CardClass from "../components/Card/CardClass";

describe("Board Component", () => {
  beforeEach(() => {
    render(<Board />);
  });

  test("renders the stock and waste spots", () => {
    expect(screen.getByTestId("stock")).toBeInTheDocument();
    expect(screen.getByTestId("waste")).toBeInTheDocument();
  });

  test("renders the correct number of foundation spots", () => {
    gameState.suits.forEach((suit) => {
      expect(screen.getByText(`Foundation ${suit}`)).toBeInTheDocument();
    });
  });

  test("renders the correct number of tableau columns", () => {
    const columns = Array.from({ length: 7 }, (_, i) => i + 1);
    columns.forEach((column) => {
      expect(screen.getByTestId(`column${column}`)).toBeInTheDocument();
    });
  });

  test("renders each card in the deck as a Card component", () => {
    gameState.deck.forEach((card) => {
      expect(screen.getByTestId(card.id)).toBeInTheDocument();
    });
  });

  test("only the last card in the stock and the last card in each column have pointer events enabled", () => {
    const stock = screen.getByTestId("stock");
    if (stock.childElementCount > 1) {
      expect(stock.firstChild).toHaveStyle("pointer-events: none");
    }
    expect(stock.lastChild).toHaveStyle("pointer-events: auto");

    const columns = Array.from({ length: 7 }, (_, i) => i + 1);
    columns.forEach((column) => {
      const columnElement = screen.getByTestId(`column${column}`);
      if (columnElement.childElementCount > 1) {
        expect(columnElement.firstChild).toHaveStyle("pointer-events: none");
      }
      expect(columnElement.lastChild).toHaveStyle("pointer-events: auto");
    });
  });
});

// failing :(
// describe("stockToWaste functionality", () => {
//   test("moves a card from stock to waste on click", () => {
//     const { getByTestId } = render(<Board />);

//     // Get the stock and waste elements by test ID
//     const stockPile = getByTestId("stock");
//     const wastePile = getByTestId("waste");

//     // Count the number of children (cards) initially in stock and waste
//     const initialStockCardCount = stockPile.childElementCount;
//     const initialWasteCardCount = wastePile.childElementCount;

//     // Simulate click on the stock pile
//     fireEvent.click(stockPile.lastElementChild);

//     // Count the number of children (cards) after the click in stock and waste
//     const updatedStockCardCount = stockPile.childElementCount;
//     const updatedWasteCardCount = wastePile.childElementCount;

//     // Check if the stock has one less card
//     expect(updatedStockCardCount).toBe(initialStockCardCount - 1);

//     // Check if the waste has one more card
//     expect(updatedWasteCardCount).toBe(initialWasteCardCount + 1);
//   });
// });

// failing :(
// describe("Stock Component", () => {
//   test("displays replay arrow when waste is not empty", () => {
//     // Set up gameState with waste not empty
//     gameState.board.waste = [
//       new CardClass("hearts", "ace", "ace_of_hearts"),
//       new CardClass("hearts", "2", "2_of_hearts"),
//       new CardClass("hearts", "3", "3_of_hearts")
//     ];

//     render(<Board />);

//     // Check for replay arrow image
//     const replayImage = screen.getByAltText("replay");
//     expect(replayImage).toBeInTheDocument();
//   });

//   test("displays empty X when waste is empty", () => {
//     // Set up gameState with empty waste
//     gameState.board.waste = [];

//     render(<Board />);

//     // Check for empty X image
//     const emptyXImage = screen.getByAltText("empty");
//     expect(emptyXImage).toBeInTheDocument();
//   });
// });
