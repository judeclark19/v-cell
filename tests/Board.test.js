import React from "react";
import { render, screen } from "@testing-library/react";
import Board from "@/components/Board/Board";
import gameState from "@/logic/GameState";

describe("Board Component", () => {
  beforeEach(() => {
    render(<Board />);
  });

  test("renders the stock and waste spots", () => {
    expect(screen.getByTestId("stock")).toBeInTheDocument();
    expect(screen.getByText("Waste")).toBeInTheDocument();
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
