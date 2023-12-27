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
    const suits = ["hearts", "spades", "clubs", "diamonds"];
    const values = [
      "ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "jack",
      "queen",
      "king"
    ];

    suits.forEach((suit) => {
      values.forEach((value) => {
        expect(gameState.deck).toContain(`${value} of ${suit}`);
      });
    });
  });

  test("shuffling the deck changes the order of the cards", () => {
    const originalDeck = [...gameState.deck];
    gameState.shuffleDeck();
    expect(gameState.deck).not.toEqual(originalDeck);
  });

  // Additional tests for other methods and behaviors can be added here
});
