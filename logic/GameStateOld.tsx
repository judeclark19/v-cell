import _ from "lodash";
import CardClass from "@/components/Card/CardClass";
import {
  BoardType,
  HandType,
  HistoryType,
  Suit,
  SuitsArray,
  ValuesArray
} from "./types";
import { makeAutoObservable, toJS } from "mobx";

const contrastingSuits = {
  hearts: ["spades", "clubs"],
  spades: ["hearts", "diamonds"],
  clubs: ["hearts", "diamonds"],
  diamonds: ["spades", "clubs"]
};

const initialFaceDownCards = [0, 1, 2, 3, 2, 1, 0];
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

  hand: HandType = [null, null, null, null, null];

  board: BoardType = {
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
  history: HistoryType[] = [];
  tallestColumn: number = 0;
  canAutoComplete = false;

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
    this.hand = [null, null, null, null, null];
    this.board = {
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
    this.history = [];
    this.createDeck(true);

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const card = this.deck.pop();
        const columnIndex = `column${i + 1}` as keyof BoardType;
        // set correct card flipped V
        if (card && j === initialFaceDownCards[i]) {
          card.setIsFaceUp(false);
        }

        if (card) {
          card.setLocationOnBoard(columnIndex);
          this.board[columnIndex].push(card);
        }
      }
    }

    this.deck.forEach((card, i) => {
      card.setLocationOnBoard(`hand-${i}`);
      this.hand[i] = card;
    });

    this.setCardsActiveState();
  }

  setCardsActiveState() {
    // foundations - set last card active
    Array.from(Array(4).keys()).forEach((i) => {
      const foundation = `foundation${i + 1}` as keyof BoardType;
      if (this.board[foundation].length > 0) {
        this.board[foundation][this.board[foundation].length - 1].setIsActive(
          true
        );
      }
    });

    // hand - set all cards active
    this.hand.forEach((card) => {
      if (card) {
        card.setIsActive(true);
      }
    });

    // columns
    Array.from(Array(7).keys()).forEach((i) => {
      const column = `column${i + 1}` as keyof BoardType;
      // set all cards inactive
      this.board[column].forEach((card) => {
        card.setIsActive(false);
      });

      // loop backwards through column
      for (let j = this.board[column].length - 1; j >= 0; j--) {
        // last card in column is active
        if (j === this.board[column].length - 1) {
          this.board[column][j].setIsActive(true);
          this.board[column][j].setIsFaceUp(true);
        } else {
          // check if current card is stackable with j+1
          const currentCard = this.board[column][j];
          const nextCard = this.board[column][j + 1];
          if (
            currentCard.isFaceUp &&
            contrastingSuits[currentCard.suit].includes(nextCard.suit) &&
            this.values.indexOf(currentCard.value) - 1 ===
              this.values.indexOf(nextCard.value)
          ) {
            currentCard.setIsActive(true);
          } else {
            break;
          }
        }
      }
    });
  }

  evaluateMove(card: CardClass, to: string) {
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

    // adding to hand
    if (
      to === "hand-0" ||
      to === "hand-1" ||
      to === "hand-2" ||
      to === "hand-3" ||
      to === "hand-4"
    ) {
      // if the card is not the last in its column, return false
      const from = card.locationOnBoard as keyof BoardType;
      const index = this.board[from].findIndex((c) => c.id === card.id);
      if (index === this.board[from].length - 1) {
        return true;
      } else return false;
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

  executeMove(index: number, from: string, to: string) {
    this.takeSnapshot();

    let cardsToMove = [];

    if (
      from === "hand-0" ||
      from === "hand-1" ||
      from === "hand-2" ||
      from === "hand-3" ||
      from === "hand-4"
    ) {
      cardsToMove.push(this.hand[parseInt(from[from.length - 1])]);
      this.hand[parseInt(from[from.length - 1])] = null;
    } else {
      cardsToMove = this.board[from as keyof BoardType].splice(
        index,
        this.board[from as keyof BoardType].length - index
      );
    }

    cardsToMove.forEach((card) => {
      if (card) card.setLocationOnBoard(to);
    });

    if (
      to === "hand-0" ||
      to === "hand-1" ||
      to === "hand-2" ||
      to === "hand-3" ||
      to === "hand-4"
    ) {
      this.hand[parseInt(to[to.length - 1])] = cardsToMove[0];
    } else {
      this.board[to as keyof BoardType] = this.board[
        to as keyof BoardType
      ].concat(cardsToMove as CardClass[]);
    }

    if (
      from !== "hand-0" &&
      from !== "hand-1" &&
      from !== "hand-2" &&
      from !== "hand-3" &&
      from !== "hand-4" &&
      this.board[from as keyof BoardType].length > 0
    ) {
      this.board[from as keyof BoardType][
        this.board[from as keyof BoardType].length - 1
      ].setIsFaceUp(true);
      this.board[from as keyof BoardType][
        this.board[from as keyof BoardType].length - 1
      ].setIsActive(true);
    }

    this.setCardsActiveState();

    if (!this.canAutoComplete) {
      this.checkForWin();
    }
  }

  cardToFoundation(card: CardClass) {
    const from = card.locationOnBoard;

    if (card.value === "ace") {
      this.takeSnapshot();
      // remove the card from its current location
      if (
        from === "hand-0" ||
        from === "hand-1" ||
        from === "hand-2" ||
        from === "hand-3" ||
        from === "hand-4"
      ) {
        this.hand[parseInt(from[from.length - 1])] = null;
      } else {
        this.board[card.locationOnBoard as keyof BoardType].pop();
      }

      // find the first empty foundation
      if (this.board.foundation1.length === 0) {
        card.setLocationOnBoard("foundation1");
        this.board.foundation1.push(card);
      } else if (this.board.foundation2.length === 0) {
        card.setLocationOnBoard("foundation2");
        this.board.foundation2.push(card);
      } else if (this.board.foundation3.length === 0) {
        card.setLocationOnBoard("foundation3");
        this.board.foundation3.push(card);
      } else if (this.board.foundation4.length === 0) {
        card.setLocationOnBoard("foundation4");
        this.board.foundation4.push(card);
      }

      this.setCardsActiveState();
    } else {
      let foundationOfMatchingSuit;

      // find which foundation has the same suit as the card
      if (
        this.board.foundation1.length > 0 &&
        this.board.foundation1[0].suit === card.suit
      ) {
        foundationOfMatchingSuit = "foundation1";
      } else if (
        this.board.foundation2.length > 0 &&
        this.board.foundation2[0].suit === card.suit
      ) {
        foundationOfMatchingSuit = "foundation2";
      } else if (
        this.board.foundation3.length > 0 &&
        this.board.foundation3[0].suit === card.suit
      ) {
        foundationOfMatchingSuit = "foundation3";
      } else if (
        this.board.foundation4.length > 0 &&
        this.board.foundation4[0].suit === card.suit
      ) {
        foundationOfMatchingSuit = "foundation4";
      } else {
        return;
      }

      const destinationFoundation = foundationOfMatchingSuit as keyof BoardType;

      // check if the card is the next value in the foundation
      const allowedValue =
        this.values[this.board[destinationFoundation].length];
      if (card.value === allowedValue) {
        this.takeSnapshot();

        // remove the card from its current location
        if (
          card.locationOnBoard === "hand-0" ||
          card.locationOnBoard === "hand-1" ||
          card.locationOnBoard === "hand-2" ||
          card.locationOnBoard === "hand-3" ||
          card.locationOnBoard === "hand-4"
        ) {
          this.hand[
            parseInt(card.locationOnBoard[card.locationOnBoard.length - 1])
          ] = null;
        } else {
          this.board[card.locationOnBoard as keyof BoardType].pop();
        }

        // set the card's location to the foundation
        card.setLocationOnBoard(destinationFoundation);

        // push the card to the foundation
        this.board[destinationFoundation].push(card);

        this.setCardsActiveState();
      }
    }
  }

  takeSnapshot() {
    const handCopy = _.cloneDeep(this.hand);
    const boardCopy = _.cloneDeep(this.board);
    this.history.push({ hand: handCopy, board: boardCopy });
  }

  undo() {
    if (this.history.length > 0) {
      const stateToRestore = this.history.pop();
      const boardToRestore = (stateToRestore as HistoryType).board;
      const handToRestore = (stateToRestore as HistoryType).hand;
      Object.keys(boardToRestore).forEach((key) => {
        // empty the key
        this.board[key as keyof BoardType] = [];
        // loop through key from stateToRestore
        boardToRestore[key as keyof BoardType].forEach((card) => {
          // create a new card
          const newCard = new CardClass(card.value, card.suit);
          // set the properties on the new card
          newCard.setIsActive(card.isActive);
          newCard.setIsFaceUp(card.isFaceUp);
          newCard.setLocationOnBoard(card.locationOnBoard);
          // push the new card to the board
          this.board[key as keyof BoardType].push(newCard);
        });
      });

      handToRestore.forEach((card, i) => {
        if (card) {
          const newCard = new CardClass(card.value, card.suit);
          newCard.setIsActive(card.isActive);
          newCard.setIsFaceUp(card.isFaceUp);
          newCard.setLocationOnBoard(card.locationOnBoard);
          this.hand[i] = newCard;
        } else {
          this.hand[i] = null;
        }
      });
    }

    this.checkForWin();
  }

  checkForWin() {
    // if all cards are active in the columns, you win
    let allCardsActive = true;
    for (let i = 1; i <= 7; i++) {
      this.board[`column${i}` as keyof BoardType].forEach((card) => {
        if (!card.isActive) {
          allCardsActive = false;
        }
      });
    }

    if (allCardsActive) {
      this.canAutoComplete = true;
    }
  }

  autoComplete() {
    if (!this.canAutoComplete) {
      return;
    }

    while (
      this.board.foundation1.length < 13 ||
      this.board.foundation2.length < 13 ||
      this.board.foundation3.length < 13 ||
      this.board.foundation4.length < 13
    ) {
      if (this.board.column1.length > 0) {
        this.cardToFoundation(
          this.board.column1[this.board.column1.length - 1]
        );
      }
      if (this.board.column2.length > 0) {
        this.cardToFoundation(
          this.board.column2[this.board.column2.length - 1]
        );
      }
      if (this.board.column3.length > 0) {
        this.cardToFoundation(
          this.board.column3[this.board.column3.length - 1]
        );
      }
      if (this.board.column4.length > 0) {
        this.cardToFoundation(
          this.board.column4[this.board.column4.length - 1]
        );
      }
      if (this.board.column5.length > 0) {
        this.cardToFoundation(
          this.board.column5[this.board.column5.length - 1]
        );
      }
      if (this.board.column6.length > 0) {
        this.cardToFoundation(
          this.board.column6[this.board.column6.length - 1]
        );
      }
      if (this.board.column7.length > 0) {
        this.cardToFoundation(
          this.board.column7[this.board.column7.length - 1]
        );
      }
    }
  }
}

const gameState = new GameState();
export default gameState;
