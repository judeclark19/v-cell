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
  boardLayout,
  ModalName,
  theme
} from "./types";
import { makeAutoObservable } from "mobx";
import Foundations from "../components/Board/Foundations/FoundationsClass";
import Tableau from "@/components/Board/Tableau/TableauClass";
import Hand from "@/components/Board/Hand/HandClass";
import Modal from "./Modals";
import MoveEvaluator from "./MoveEvaluator";
import Timer from "./Timer";

export class AppState {
  deck: CardClass[] = [];
  layoutName: boardLayout;
  themeName: theme;
  timer = new Timer();
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
  manualWins = 0;
  modals = {
    win: new Modal(),
    instructions: new Modal(),
    settings: new Modal(),
    pause: new Modal(),
    highScores: new Modal()
  };
  moveEvaluator = new MoveEvaluator(this);

  constructor(
    layoutName: boardLayout = "classic",
    themeName: theme = "classic"
  ) {
    this.layoutName = layoutName;
    this.themeName = themeName;
    makeAutoObservable(this);
  }

  anyModalIsOpen() {
    let answer = false;

    for (let modal in this.modals) {
      if (this.modals[modal as ModalName].isOpen) {
        answer = true;
      }
    }

    return answer;
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

  setTheme(theme: theme) {
    this.themeName = theme;
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
    this.timer.setTimeElapsed(0);
    this.timer.clearInterval();
    this.canAutoComplete = false;
    this.moveEvaluator.setUndosUsed(0);
    for (let modal in this.modals) {
      if (modal !== "settings") {
        this.modals[modal as ModalName].close();
      }
    }

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

    if (isWinningBoard) {
      this.timer.clearInterval();
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
    const prevLength = this.history.length;
    const boardCopy = _.cloneDeep(this.currentBoard);
    this.history.push(boardCopy);
    const newLength = this.history.length;

    if (prevLength === 0 && newLength === 1) {
      // first move
      this.timer.startInterval();
    }
  }

  setHistory(history: BoardType[]) {
    this.history = history;
  }

  undo() {
    if (this.history.length <= 0) return;
    if (
      this.moveEvaluator.undosAllowed !== Infinity &&
      this.moveEvaluator.undosAllowed - this.moveEvaluator.undosUsed <= 0
    )
      return;
    const stateToRestore = this.history.pop();
    if (!stateToRestore) return;

    if (this.moveEvaluator.undosAllowed !== Infinity) {
      this.moveEvaluator.setUndosUsed(this.moveEvaluator.undosUsed + 1);
    }
    this.restoreGameState(stateToRestore);
  }

  restoreGameState(stateToRestore: BoardType) {
    // foundation
    foundationKeys.forEach((key) => {
      // empty the foundation
      this.currentBoard.foundations[key].arrayOfCards = [];

      // set foundation suit
      this.currentBoard.foundations[key].suit =
        stateToRestore.foundations[key].suit;

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

  checkForManualComplete() {
    if (
      this.canAutoComplete &&
      this.currentBoard.foundations.foundation1.arrayOfCards.length === 13 &&
      this.currentBoard.foundations.foundation2.arrayOfCards.length === 13 &&
      this.currentBoard.foundations.foundation3.arrayOfCards.length === 13 &&
      this.currentBoard.foundations.foundation4.arrayOfCards.length === 13
    ) {
      this.manualWins++;
      for (let modal in this.modals) {
        if (modal === "win") {
          this.modals[modal as ModalName].open();
        } else this.modals[modal as ModalName].close();
      }
      this.setCanAutoComplete(false);
    }
  }

  setCanAutoComplete(canAutoComplete: boolean) {
    this.canAutoComplete = canAutoComplete;
  }

  autoComplete() {
    this.moveEvaluator.setExecute(true);

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
    for (let modal in this.modals) {
      if (modal === "win") {
        this.modals[modal as ModalName].open();
      } else this.modals[modal as ModalName].close();
    }
  }
}

const appState = new AppState();
export default appState;
