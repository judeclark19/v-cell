// const { GameState } = require("../logic/GameState");
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
          id: `${value}_of_${suit}`
        });
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
