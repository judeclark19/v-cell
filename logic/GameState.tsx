import CardClass from "@/components/Card/CardClass";
import { BoardType, Suit, SuitsArray, ValuesArray } from "./types";
import { makeAutoObservable } from "mobx";

export class GameState {
  deck: CardClass[] = [];
  suits: SuitsArray = ["hearts", "spades", "clubs", "diamonds"];
  values: ValuesArray = [
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
  board: BoardType = {
    stock: [],
    waste: [],
    foundation1: [],
    foundation2: [],
    foundation3: [],
    foundation4: [],
    column1: [],
    column2: [],
    column3: [],
    column4: [],
    column5: [],
    column6: [],
    column7: []
  };
  cardIsFlipping: CardClass | null = null;

  constructor() {
    makeAutoObservable(this);
    this.createDeck();
  }

  createDeck(shuffle = false) {
    this.deck = [];

    for (let suit in this.suits) {
      for (let value in this.values) {
        const card = new CardClass(this.values[value], this.suits[suit]);
        this.deck.push(card);
      }
    }

    if (shuffle) {
      this.shuffleDeck();
    }
  }

  shuffleDeck() {
    let m = this.deck.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = this.deck[m];
      this.deck[m] = this.deck[i];
      this.deck[i] = t;
    }
  }

  clearBoard() {
    this.board = {
      stock: [],
      waste: [],
      foundation1: [],
      foundation2: [],
      foundation3: [],
      foundation4: [],
      column1: [],
      column2: [],
      column3: [],
      column4: [],
      column5: [],
      column6: [],
      column7: []
    };
  }

  dealCards() {
    this.clearBoard();
    this.createDeck(true);

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < i + 1; j++) {
        const card = this.deck.pop();
        const columnIndex = `column${i + 1}` as keyof BoardType;
        if (j === i) {
          card?.setIsActive(true);
          card?.setIsFaceUp(true);
        }
        if (card) {
          card.setLocationOnBoard(columnIndex);
          this.board[columnIndex].push(card);
        }
      }
    }

    this.board.stock = this.deck;
    this.board.stock.forEach((card) => {
      card.setLocationOnBoard("stock");
    });
    this.board.stock[this.board.stock.length - 1].setIsActive(true);
  }

  startWasteFlip(card: CardClass) {
    // pop card from the stock
    this.board.stock.pop();
    this.cardIsFlipping = card;
    card.setIsFlipping(true);

    setTimeout(() => {
      this.finishWasteFlip(card);
    }, 200);
  }

  finishWasteFlip(card: CardClass) {
    card.setIsFaceUp(true);
    card.setLocationOnBoard("waste");
    // push card to the waste
    this.board.waste.push(card);

    // set the last card in the stock to active
    if (this.board.stock.length > 0) {
      this.board.stock[this.board.stock.length - 1].setIsActive(true);
    }

    card.setIsFlipping(false);
    this.cardIsFlipping = null;
  }

  resetStock() {
    const cardsToReset = this.board.waste.splice(0, this.board.waste.length);
    cardsToReset.forEach((card) => {
      card.setIsFaceUp(false);
      card.setIsActive(false);
    });
    this.board.stock = cardsToReset.reverse();
    this.board.stock[this.board.stock.length - 1].setIsActive(true);
    this.board.waste = [];
  }

  evaluateMove(card: CardClass, to: keyof BoardType) {
    // adding to foundation
    if (
      to === "foundation1" ||
      to === "foundation2" ||
      to === "foundation3" ||
      to === "foundation4"
    ) {
      const allowedValue = this.values[this.board[to].length];
      if (card.value === allowedValue && allowedValue === "ace") {
        return true;
      }
      if (card.value !== allowedValue && allowedValue === "ace") {
        return false;
      }
      const allowedSuit = this.board[to][0].suit;
      if (card.suit === allowedSuit && card.value === allowedValue) {
        return true;
      }
    }

    // adding to column
    if (
      to === "column1" ||
      to === "column2" ||
      to === "column3" ||
      to === "column4" ||
      to === "column5" ||
      to === "column6" ||
      to === "column7"
    ) {
      // if the column is empty, only allow kings
      if (this.board[to].length === 0 && card.value === "king") {
        return true;
      }
      if (this.board[to].length === 0 && card.value !== "king") {
        return false;
      }
      // if the column is not empty, only allow alternating colors and descending values
      const lastCard = this.board[to][this.board[to].length - 1];
      const allowedValue = this.values[this.values.indexOf(lastCard.value) - 1];
      const allowedSuits: Suit[] = [];

      switch (lastCard.suit) {
        case "hearts":
        case "diamonds":
          allowedSuits.push("spades", "clubs");
          break;
        case "spades":
        case "clubs":
          allowedSuits.push("hearts", "diamonds");
          break;
      }

      if (allowedSuits.includes(card.suit) && allowedValue === card.value) {
        return true;
      }
    }

    return false;
  }

  executeMove(index: number, from: keyof BoardType, to: keyof BoardType) {
    const cardsToMove = this.board[from].splice(
      index,
      this.board[from].length - index
    );

    cardsToMove.forEach((card) => {
      card.setLocationOnBoard(to);
    });

    this.board[to] = this.board[to].concat(cardsToMove);

    if (this.board[from].length > 0) {
      this.board[from][this.board[from].length - 1].setIsFaceUp(true);
      this.board[from][this.board[from].length - 1].setIsActive(true);
    }
  }
}

const gameState = new GameState();
export default gameState;
