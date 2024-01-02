import _ from "lodash";
import CardClass from "@/components/Card/CardClass";
import {
  BoardType,
  HandItemKey,
  SuitsArray,
  columnKey,
  columnKeys,
  handKeys,
  valuesArray
} from "./types";
import { makeAutoObservable, toJS } from "mobx";
import Foundations from "../components/Board/Foundations/FoundationsClass";
import Tableau from "@/components/Board/Tableau/TableauClass";
import Hand from "@/components/Board/Hand/HandClass";

const initialFaceDownCards = [0, 1, 2, 3, 2, 1, 0];
export class GameState {
  deck: CardClass[] = [];
  suits: SuitsArray = ["hearts", "spades", "clubs", "diamonds"];

  board: BoardType = {
    foundations: new Foundations(),
    tableau: new Tableau(),
    hand: new Hand()
  };
  canAutoComplete = false;

  constructor() {
    makeAutoObservable(this);
    this.createDeck();
  }

  createDeck(shuffle = false) {
    this.deck = [];

    for (let suit in this.suits) {
      for (let index in valuesArray) {
        const card = new CardClass(valuesArray[index], this.suits[suit]);
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
      foundations: new Foundations(),
      tableau: new Tableau(),
      hand: new Hand()
    };
  }

  dealCards() {
    this.clearBoard();
    // TODO: clear history
    this.createDeck(true);

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const card = this.deck.pop();
        const columnIndex = `column${i + 1}` as columnKey;
        // set correct card flipped V
        if (card && j === initialFaceDownCards[i]) {
          card.setIsFaceUp(false);
        }

        if (card) {
          card.setLocationOnBoard(columnIndex);
          this.board.tableau[columnIndex].addCard(card);
        }
      }

      this.board.tableau[`column${i + 1}` as columnKey].updateColumnState();
    }

    // remaining cards go to hand
    this.deck.forEach((card, i) => {
      card.setIsActive(true);
      card.setLocationOnBoard(`handItem${i + 1}`);
      this.board.hand.addCard(card, i + 1);
    });
  }

  evaluateMove(card: CardClass, dropId: string) {
    console.log(
      `move ${card.value} of ${card.suit} from ${card.locationOnBoard} to ${dropId}`
    );

    if (
      handKeys.includes(card.locationOnBoard as HandItemKey) &&
      columnKeys.includes(dropId as columnKey)
    ) {
      // move a card from your hand to a column
      console.log("move type: card from hand to column");
    } else if (
      columnKeys.includes(card.locationOnBoard as columnKey) &&
      dropId === "foundation"
    ) {
      // double click a card from the tableau to send to foundation
      console.log(
        "move type: double click send card from column to foundation"
      );
    }
  }

  cardsAreSameSuit(card1: CardClass, card2: CardClass) {}

  cardsAreContrastingSuits(card1: CardClass, card2: CardClass) {}

  cardsAreSequentialValues(lowerCard: CardClass, higherCard: CardClass) {}

  cardIsOnTop(card: CardClass) {}

  executeMove() {}

  takeSnapshot() {
    // const handCopy = _.cloneDeep(this.hand);
    // const boardCopy = _.cloneDeep(this.board);
    // this.history.push({ hand: handCopy, board: boardCopy });
  }

  undo() {}

  checkForWin() {
    // if all cards are active in the columns, you win
    // let allCardsActive = true;
    // for (let i = 1; i <= 7; i++) {
    //   this.board[`column${i}` as keyof BoardType].forEach((card) => {
    //     if (!card.isActive) {
    //       allCardsActive = false;
    //     }
    //   });
    // }
    // if (allCardsActive) {
    //   this.canAutoComplete = true;
    // }
  }

  autoComplete() {}
}

const gameState = new GameState();
export default gameState;
