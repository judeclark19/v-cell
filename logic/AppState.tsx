import _ from "lodash";
import CardClass from "@/components/Card/CardClass";
import {
  BoardType,
  handItemKey,
  Suit,
  columnKey,
  columnKeys,
  foundationKey,
  foundationKeys,
  handKeys,
  suitsArray,
  valuesArray,
  boardLayouts,
  boardLayout
} from "./types";
import { makeAutoObservable } from "mobx";
import Foundations from "../components/Board/Foundations/FoundationsClass";
import Tableau from "@/components/Board/Tableau/TableauClass";
import Hand from "@/components/Board/Hand/HandClass";
import Modal from "./Modals";
import MoveEvaluator from "./MoveEvaluator";

export class AppState {
  deck: CardClass[] = [];
  layoutName: boardLayout;
  currentBoard: BoardType = {
    foundations: new Foundations(),
    tableau: new Tableau(),
    hand: new Hand()
  };

  history: BoardType[] = [];
  cardsBeingTouched: CardClass[] | null = null;
  isDragging = false;
  winningBoard = false;
  canAutoComplete = false;
  winCount = 0;
  winModal = new Modal();
  instructionsModal = new Modal();
  settingsModal = new Modal();
  moveEvaluator = new MoveEvaluator(this);

  constructor(layoutName: boardLayout = "classic") {
    this.layoutName = layoutName;
    makeAutoObservable(this);
  }

  createDeck() {
    this.deck = [];

    for (let suit in suitsArray) {
      for (let index in valuesArray) {
        const card = new CardClass(
          valuesArray[index],
          suitsArray[suit] as Suit
        );
        this.deck.push(card);
      }
    }

    this.shuffleDeck();
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

  setLayout(layoutName: boardLayout) {
    this.layoutName = layoutName;
    this.dealCards();
  }

  clearBoard() {
    this.currentBoard = {
      foundations: new Foundations(),
      tableau: new Tableau(),
      hand: new Hand()
    };
  }

  dealCards() {
    this.clearBoard();
    this.history = [];
    this.createDeck();
    this.setIsWinningBoard(false);
    this.instructionsModal.close();
    this.canAutoComplete = false;
    this.winModal.close();

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const card = this.deck.pop();
        const columnIndex = `column${i + 1}` as columnKey;

        // set correct card flipped V
        if (
          card &&
          (boardLayouts[this.layoutName][i] as number[]).includes(j)
        ) {
          card.setIsFaceUp(false);
        }

        if (card) {
          card.setLocationOnBoard(columnIndex);
          this.currentBoard.tableau[columnIndex].addCards([card]);
        }
      }

      this.currentBoard.tableau[
        `column${i + 1}` as columnKey
      ].updateColumnState();
    }

    // remaining cards go to hand
    this.deck.forEach((card, i) => {
      card.setIsActive(true);
      card.setLocationOnBoard(`handItem${i + 1}`);
      this.currentBoard.hand.addCard(card, `handItem${i + 1}` as handItemKey);
    });

    // const card1 = this.deck.pop();
    // const card2 = this.deck.pop();

    // if (card1 && card2) {
    //   card1.setIsActive(true);
    //   card1.setIsFaceUp(true);
    //   card1.setLocationOnBoard("column1");
    //   this.board.tableau.column1.addCards([card1]);

    //   card2.setIsActive(true);
    //   card2.setIsFaceUp(true);
    //   card2.setLocationOnBoard("column2");
    //   this.board.tableau.column2.addCards([card2]);
    // }
  }

  setIsWinningBoard(isWinningBoard: boolean, fromStorage?: boolean) {
    if (
      this.winningBoard === false &&
      isWinningBoard === true &&
      !fromStorage
    ) {
      this.winCount++;
    }
    this.winningBoard = isWinningBoard;
  }

  setCardsBeingTouched(card: CardClass | null) {
    if (!card) {
      this.cardsBeingTouched = null;
      return;
    }

    if (
      foundationKeys.includes(card?.locationOnBoard as foundationKey) ||
      handKeys.includes(card?.locationOnBoard as handItemKey)
    ) {
      this.cardsBeingTouched = [card];
      return;
    }

    // card is in a column
    const entireColumn =
      this.currentBoard.tableau[card.locationOnBoard as columnKey].arrayOfCards;

    const cardIndex = entireColumn.findIndex((c) => c.id === card.id);

    const cardsToMove = entireColumn.slice(cardIndex);
    this.cardsBeingTouched = cardsToMove;
  }

  setIsDragging(isDragging: boolean) {
    this.isDragging = isDragging;
  }

  takeSnapshot() {
    const boardCopy = _.cloneDeep(this.currentBoard);
    this.history.push(boardCopy);
  }

  setHistory(history: BoardType[]) {
    this.history = history;
  }

  undo() {
    if (this.history.length <= 0) return;
    const stateToRestore = this.history.pop();
    if (!stateToRestore) return;
    this.restoreGameState(stateToRestore);
  }

  restoreGameState(stateToRestore: BoardType) {
    // foundation
    foundationKeys.forEach((key) => {
      // empty the foundation
      this.currentBoard.foundations[key].arrayOfCards = [];

      // create new cards from state
      const cards = stateToRestore.foundations[key].arrayOfCards.map((card) => {
        const newCard = new CardClass(card.value, card.suit);
        newCard.setIsActive(card.isActive);
        newCard.setIsFaceUp(card.isFaceUp);
        newCard.setLocationOnBoard(card.locationOnBoard);
        return newCard;
      });

      // add cards to foundation
      if (cards.length > 0) {
        this.currentBoard.foundations[key].addCards(cards);
      }
    });

    // tableau
    columnKeys.forEach((key) => {
      // empty the column
      this.currentBoard.tableau[key].arrayOfCards = [];

      // create new cards from state
      const cards = stateToRestore.tableau[key].arrayOfCards.map((card) => {
        const newCard = new CardClass(card.value, card.suit);
        newCard.setIsActive(card.isActive);
        newCard.setIsFaceUp(card.isFaceUp);
        newCard.setLocationOnBoard(card.locationOnBoard);
        return newCard;
      });

      // add cards to column
      this.currentBoard.tableau[key].addCards(cards);
      this.currentBoard.tableau[key].updateColumnState();
    });

    // hand
    handKeys.forEach((key) => {
      // empty the hand
      this.currentBoard.hand[key] = null;

      // create new cards from state
      const card = stateToRestore.hand[key];
      if (card) {
        const newCard = new CardClass(card.value, card.suit);
        newCard.setIsActive(card.isActive);
        newCard.setIsFaceUp(card.isFaceUp);
        newCard.setLocationOnBoard(card.locationOnBoard);
        this.currentBoard.hand[key] = newCard;
      }
    });
  }

  checkForWin() {
    // if all cards are active in the columns, you win
    let allCardsActive = true;

    columnKeys.forEach((key) => {
      this.currentBoard.tableau[key].arrayOfCards.forEach((card) => {
        if (!card.isActive) {
          allCardsActive = false;
        }
      });
    });

    if (allCardsActive) {
      this.setIsWinningBoard(true);
      this.setCanAutoComplete(true);
    }
  }

  setCanAutoComplete(canAutoComplete: boolean) {
    this.canAutoComplete = canAutoComplete;
  }

  autoComplete() {
    while (
      foundationKeys.some(
        (key) => this.currentBoard.foundations[key].arrayOfCards.length < 13
      )
    ) {
      columnKeys.forEach((key) => {
        const column = this.currentBoard.tableau[key];
        const topCard = column.arrayOfCards[column.arrayOfCards.length - 1];
        if (!topCard) return;
        const foundationKey = this.moveEvaluator.findTargetFoundation(topCard);
        if (foundationKey) {
          this.moveEvaluator.moveColumnToFoundation(topCard, foundationKey);
        }
      });
      handKeys.forEach((key) => {
        const cardInHand = this.currentBoard.hand[key];
        if (!cardInHand) return;
        const foundationKey =
          this.moveEvaluator.findTargetFoundation(cardInHand);
        if (foundationKey) {
          this.moveEvaluator.moveHandToFoundation(cardInHand, foundationKey);
        }
      });
    }

    this.setCanAutoComplete(false);
    this.winModal.open();
    this.instructionsModal.close();
  }
}

const appState = new AppState();
export default appState;
