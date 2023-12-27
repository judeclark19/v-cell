import React from "react";
import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
import Board from "@/components/Board/Board";
import gameState from "@/logic/GameState";

describe("Board Component", () => {
  beforeEach(() => {
    render(<Board />);
  });

  test("renders the stock and waste spots", () => {
    expect(screen.getByText("Stock")).toBeInTheDocument();
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
      expect(screen.getByText(`column ${column}`)).toBeInTheDocument();
    });
  });

  test("renders each card in the deck as a Card component", () => {
    gameState.deck.forEach((card) => {
      expect(screen.getByTestId(card.id)).toBeInTheDocument();
    });
  });
});
