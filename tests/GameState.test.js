import { GameState } from "../logic/GameState";

describe("GameState Class", () => {
  let gameState;

  beforeEach(() => {
    gameState = new GameState();
  });

  test("deck is created with 52 cards", () => {
    expect(gameState.deck.length).toBe(52);
  });

  test("deck contains all suits and values", () => {
    gameState.suits.forEach((suit) => {
      gameState.values.forEach((value) => {
        expect(gameState.deck).toContainEqual({
          suit,
          value,
          id: `${value}_of_${suit}`,
          isActive: false,
          isFaceUp: false
        });
      });
    });
  });

  test("shuffling the deck changes the order of the cards", () => {
    const originalDeck = [...gameState.deck];
    gameState.shuffleDeck();
    expect(gameState.deck.length).toBe(originalDeck.length);
    expect(gameState.deck).not.toEqual(originalDeck);
  });

  test("clearBoard should empty all board areas", () => {
    gameState.clearBoard();
    const boardAreas = Object.values(gameState.board);
    boardAreas.forEach((area) => expect(area).toEqual([]));
  });

  test("dealCards should deal the correct number of cards to each column", () => {
    gameState.dealCards();
    for (let i = 1; i <= 7; i++) {
      const columnIndex = `column${i}`;
      expect(gameState.board[columnIndex].length).toBe(i);
    }
  });

  test("dealCards should leave the remaining cards in stock", () => {
    gameState.dealCards();
    expect(gameState.board.stock.length).toBe(24);
  });
});
