import _ from "lodash";
import CardClass from "@/components/Card/CardClass";
import {
  BoardType,
  HandItemKey,
  SuitsArray,
  columnKey,
  columnKeys,
  contrastingSuits,
  foundationKey,
  foundationKeys,
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
    console.log("DEAL CARDS");
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
          this.board.tableau[columnIndex].addCards([card]);
        }
      }
      // this.board.tableau[
      //   `column${i + 1}` as columnKey
      // ].faceDownCardHasBeenUncovered = false;

      this.board.tableau[`column${i + 1}` as columnKey].updateColumnState();
    }

    // remaining cards go to hand
    this.deck.forEach((card, i) => {
      card.setIsActive(true);
      card.setLocationOnBoard(`handItem${i + 1}`);
      this.board.hand.addCard(card, `handItem${i + 1}` as HandItemKey);
    });
  }

  evaluateMove(card: CardClass, dropId: string) {
    console.log(
      `move ${card.value} of ${card.suit} from ${card.locationOnBoard} to ${dropId}`,
      card instanceof CardClass
    );

    if (
      handKeys.includes(card.locationOnBoard as HandItemKey) &&
      columnKeys.includes(dropId as columnKey)
    ) {
      // Move type 1: move a card from your hand to a column
      console.log("Move type 1: move a card from your hand to a column");
      this.evaluateMoveType1(card, dropId as columnKey);
    } else if (
      columnKeys.includes(card.locationOnBoard as columnKey) &&
      dropId === "foundations"
    ) {
      // Move type 2: double click a card to move from tableau to foundation
      console.log(
        "Move type 2: double click a card to move from tableau to foundation"
      );
      this.evaluateMoveType2(card, dropId as foundationKey);
    } else if (
      columnKeys.includes(card.locationOnBoard as columnKey) &&
      columnKeys.includes(dropId as columnKey) &&
      card.locationOnBoard !== dropId
    ) {
      // Move type 3: drag card from column to column
      console.log("Move type 3: drag card from column to column");
      this.evaluateMoveType3(card, dropId as columnKey);
    } else if (
      columnKeys.includes(card.locationOnBoard as columnKey) &&
      handKeys.includes(dropId as HandItemKey)
    ) {
      // Move type 4: drag card from column to hand
      console.log("Move type 4: drag card from column to hand");
      this.evaluateMoveType4(card, dropId as HandItemKey);
    } else if (
      handKeys.includes(card.locationOnBoard as HandItemKey) &&
      dropId === "foundations"
    ) {
      // Move type 5: double click card from hand to foundation
      console.log("Move type 5: double click card from hand to foundation");
      this.evaluateMoveType5(card, dropId as foundationKey);
    }
  }

  evaluateMoveType1(card: CardClass, dropId: columnKey) {
    // Move type 1: move a card from your hand to a column

    // special case: king to empty column
    if (
      card.value === "king" &&
      this.board.tableau[dropId].arrayOfCards.length === 0
    ) {
      this.executeMoveType1(card, dropId);
      return;
    }

    const cardToStackOn =
      this.board.tableau[dropId].arrayOfCards[
        this.board.tableau[dropId].arrayOfCards.length - 1
      ];

    const isContrastingSuit = this.cardsAreContrastingSuits(
      card,
      cardToStackOn
    );
    const isSequentialValue = this.cardsAreSequentialValues(
      card,
      cardToStackOn
    );

    if (isContrastingSuit && isSequentialValue) {
      this.executeMoveType1(card, dropId);
    } else {
      console.log("move type 1: invalid move");
    }
  }

  executeMoveType1(card: CardClass, dropId: columnKey) {
    // Move type 1: move a card from your hand to a column

    // remove card from hand
    this.board.hand.removeCard(card.locationOnBoard as HandItemKey);
    // add card to column
    this.board.tableau[dropId].addCards([card]);
    this.board.tableau[dropId].updateColumnState();
  }

  evaluateMoveType2(card: CardClass, dropId: foundationKey) {
    // Move type 2: double click a card to move from tableau to foundation

    // confirm that card is on top of column
    const cardIsOnTop = this.cardIsOnTop(card);
    if (!cardIsOnTop) {
      console.log("invalid move, card is not on top");
      return;
    }

    let foundationKey;
    if (card.value === "A") {
      // find first empty foundation
      foundationKey = foundationKeys.find((key) => {
        return this.board.foundations[key].arrayOfCards.length === 0;
      });
    } else {
      // find the foundation with the same suit as the card
      foundationKey = foundationKeys.find((key) => {
        return this.board.foundations[key].suit === card.suit;
      });
    }

    if (!foundationKey) {
      console.log("invalid move, no foundation with this suit");
      return;
    }

    if (card.value === "A") {
      this.executeMoveType2(card, foundationKey);
      return;
    }

    const targetFoundation = this.board.foundations[foundationKey];
    console.log(targetFoundation);
    if (targetFoundation.arrayOfCards.length === 0) {
      console.log("invalid move, foundation is empty");
      return;
    }

    const lastCardInFoundation =
      targetFoundation.arrayOfCards[targetFoundation.arrayOfCards.length - 1];
    const cardsAreSequential = this.cardsAreSequentialValues(
      lastCardInFoundation,
      card
    );

    if (cardsAreSequential) {
      this.executeMoveType2(card, foundationKey);
    } else {
      console.log("invalid move, cards are not sequential");
    }
  }

  executeMoveType2(card: CardClass, dropId: foundationKey) {
    // Move type 2: double click a card to move from tableau to foundation
    const sourceColumn = this.board.tableau[card.locationOnBoard as columnKey];
    // remove card from column
    sourceColumn.removeLastCard();
    sourceColumn.updateColumnState();
    // add card to foundation
    this.board.foundations[dropId].addCard(card);
  }

  evaluateMoveType3(card: CardClass, dropId: columnKey) {
    // Move type 3: drag card from column to column

    // special case: king to empty column
    if (
      card.value === "king" &&
      this.board.tableau[dropId].arrayOfCards.length === 0
    ) {
      this.executeMoveType3(card, dropId);
      return;
    }

    const cardToStackOn =
      this.board.tableau[dropId].arrayOfCards[
        this.board.tableau[dropId].arrayOfCards.length - 1
      ];

    const isContrastingSuit = this.cardsAreContrastingSuits(
      card,
      cardToStackOn
    );
    const isSequentialValue = this.cardsAreSequentialValues(
      card,
      cardToStackOn
    );

    if (isContrastingSuit && isSequentialValue) {
      this.executeMoveType3(card, dropId);
    } else {
      console.log(
        "move type 3: invalid move",
        `contrastingSuit: ${isContrastingSuit}, sequentialValue: ${isSequentialValue}`
      );
    }
  }

  executeMoveType3(card: CardClass, dropId: columnKey) {
    // Move type 3: drag card from column to column
    const sourceColumn = this.board.tableau[card.locationOnBoard as columnKey];
    const destinationColumn = this.board.tableau[dropId];
    // find index of card in source column
    const cardIndex = sourceColumn.arrayOfCards.findIndex(
      (c) => c.value === card.value && c.suit === card.suit
    );

    const removedCards = sourceColumn.removeCards(cardIndex);
    destinationColumn.addCards(removedCards);

    sourceColumn.updateColumnState();
    destinationColumn.updateColumnState();
  }

  evaluateMoveType4(card: CardClass, dropId: HandItemKey) {
    // Move type 4: drag card from column to hand
    const cardIsOnTop = this.cardIsOnTop(card);
    if (!cardIsOnTop) {
      console.log("invalid move, card is not on top");
      return;
    }

    const destinationHandItem = this.board.hand[dropId];
    if (destinationHandItem) {
      console.log("invalid move, space is already occupied");
      return;
    }

    this.executeMoveType4(card, dropId);
  }

  executeMoveType4(card: CardClass, dropId: HandItemKey) {
    // Move type 4: drag card from column to hand
    const sourceColumn = this.board.tableau[card.locationOnBoard as columnKey];

    // remove card from column
    sourceColumn.removeLastCard();

    // add card to hand
    this.board.hand.addCard(card, dropId);
    sourceColumn.updateColumnState();
  }

  evaluateMoveType5(card: CardClass, dropId: foundationKey) {
    // Move type 5: double click card from hand to foundation
    let targetFoundation;
    console.log("line 324");
    if (card.value === "A") {
      // find first empty foundation
      targetFoundation = foundationKeys.find((key) => {
        return this.board.foundations[key].arrayOfCards.length === 0;
      });
      console.log("line 330", targetFoundation);
      this.executeMoveType5(card, targetFoundation as foundationKey);
    } else {
      // find the foundation with the same suit as the card
      targetFoundation = foundationKeys.find((key) => {
        return this.board.foundations[key].suit === card.suit;
      });

      console.log("line 337", targetFoundation);

      if (!targetFoundation) {
        console.log("invalid move, no foundation with this suit");
        return;
      }
      console.log("line 343", targetFoundation);
      const cardsAreSequential = this.cardsAreSequentialValues(
        this.board.foundations[targetFoundation].arrayOfCards[
          this.board.foundations[targetFoundation].arrayOfCards.length - 1
        ],
        card
      );

      console.log("line 351", cardsAreSequential);
      if (!cardsAreSequential) {
        console.log("invalid move, cards are not sequential");
        return;
      }
      console.log("line 356", targetFoundation);
      this.executeMoveType5(card, targetFoundation);
    }
  }

  executeMoveType5(card: CardClass, dropId: foundationKey) {
    // Move type 5: double click card from hand to foundation
    console.log("execute move type 5", card, dropId);
    // remove card from hand
    this.board.hand.removeCard(card.locationOnBoard as HandItemKey);
    // add card to foundation
    this.board.foundations[dropId].addCard(card);
  }

  cardsAreSameSuit(card1: CardClass, card2: CardClass) {}

  cardsAreContrastingSuits(card1: CardClass, card2: CardClass) {
    return contrastingSuits[card1.suit].includes(card2.suit);
  }

  cardsAreSequentialValues(lowerCard: CardClass, higherCard: CardClass) {
    return (
      valuesArray.indexOf(lowerCard.value) + 1 ===
      valuesArray.indexOf(higherCard.value)
    );
  }

  cardIsOnTop(card: CardClass) {
    const column = this.board.tableau[card.locationOnBoard as columnKey];
    const cardIndex = column.arrayOfCards.findIndex(
      (c) => c.value === card.value && c.suit === card.suit
    );
    return cardIndex === column.arrayOfCards.length - 1;
  }

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
