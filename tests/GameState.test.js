import { GameState } from "../logic/GameState";
import CardClass from "../components/Card/CardClass";

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
          isFaceUp: false,
          isFlipping: false
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

  // test that cards are dealt face up or face down correctly
  test("dealCards should deal the first card in each column face up", () => {
    gameState.dealCards();
    for (let i = 1; i <= 7; i++) {
      const columnIndex = `column${i}`;
      expect(gameState.board[columnIndex][i - 1].isFaceUp).toBe(true);
    }
  });
});

describe("GameState class methods", () => {
  let gameState;
  let mockCard1;
  let mockCard2;

  beforeEach(() => {
    gameState = new GameState();
    mockCard1 = new CardClass("ace", "hearts");
    mockCard2 = new CardClass("king", "spades");
    gameState.board.stock = [mockCard1, mockCard2]; // Assuming there are two cards in stock
  });

  test("startWasteFlip + finishWasteFlip", () => {
    jest.spyOn(global, "setTimeout");

    gameState.startWasteFlip(mockCard2);
    expect(gameState.board.stock).not.toContain(mockCard2);
    expect(mockCard2.isFlipping).toBeTruthy();

    // Check if setTimeout was called
    expect(jest.isMockFunction(setTimeout)).toBeTruthy();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);

    gameState.finishWasteFlip(mockCard2);
    expect(gameState.board.waste).toContain(mockCard2);
    expect(gameState.board.stock.length).toBe(1); // One card should be left in stock
    expect(gameState.board.stock[0].isActive).toBeTruthy();
    expect(mockCard2.isFaceUp).toBeTruthy();
    expect(mockCard2.isFlipping).toBeFalsy();
  });
});
