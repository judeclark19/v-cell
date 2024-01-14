import _ from "lodash";
import CardClass from "@/components/Card/CardClass";
import {
  BoardType,
  handItemKey,
  Suit,
  columnKey,
  columnKeys,
  contrastingSuits,
  foundationKey,
  foundationKeys,
  handKeys,
  suitsArray,
  valuesArray
} from "./types";
import { makeAutoObservable } from "mobx";
import Foundations from "../components/Board/Foundations/FoundationsClass";
import Tableau from "@/components/Board/Tableau/TableauClass";
import Hand from "@/components/Board/Hand/HandClass";

// TODO: put this as a prop
const initialFaceDownCards = [0, 1, 2, 3, 2, 1, 0];
export class GameState {
  deck: CardClass[] = [];

  board: BoardType = {
    foundations: new Foundations(),
    tableau: new Tableau(),
    hand: new Hand()
  };

  history: BoardType[] = [];
  cardsBeingTouched: CardClass[] | null = null;
  isDragging = false;
  canAutoComplete = false;

  constructor() {
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

  clearBoard() {
    this.board = {
      foundations: new Foundations(),
      tableau: new Tableau(),
      hand: new Hand()
    };
  }

  dealCards() {
    this.clearBoard();
    this.history = [];
    this.createDeck();
    this.canAutoComplete = false;

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

      this.board.tableau[`column${i + 1}` as columnKey].updateColumnState();
    }

    // remaining cards go to hand
    this.deck.forEach((card, i) => {
      card.setIsActive(true);
      card.setLocationOnBoard(`handItem${i + 1}`);
      this.board.hand.addCard(card, `handItem${i + 1}` as handItemKey);
    });
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
      this.board.tableau[card.locationOnBoard as columnKey].arrayOfCards;

    const cardIndex = entireColumn.findIndex((c) => c.id === card.id);

    const cardsToMove = entireColumn.slice(cardIndex);
    this.cardsBeingTouched = cardsToMove;
  }

  setIsDragging(isDragging: boolean) {
    this.isDragging = isDragging;
  }

  evaluateMove(card: CardClass, dropId: string) {
    // from foundation
    if (foundationKeys.includes(card.locationOnBoard as foundationKey)) {
      // to foundation
      if (
        foundationKeys.includes(dropId as foundationKey) ||
        dropId === "foundations"
      ) {
        this.moveFoundationToFoundation(card, dropId);
      }
      // to column
      else if (columnKeys.includes(dropId as columnKey)) {
        this.moveFoundationToColumn(card, dropId as columnKey);
      }
      // to hand
      else if (handKeys.includes(dropId as handItemKey)) {
        this.moveFoundationToHand(card, dropId as handItemKey);
      }
    }

    // from column
    else if (columnKeys.includes(card.locationOnBoard as columnKey)) {
      // to foundation
      if (
        foundationKeys.includes(dropId as foundationKey) ||
        dropId === "foundations"
      ) {
        this.moveColumnToFoundation(card, dropId);
      }
      // to column
      else if (columnKeys.includes(dropId as columnKey)) {
        this.moveColumnToColumn(card, dropId as columnKey);
      }
      // to hand
      else if (handKeys.includes(dropId as handItemKey)) {
        this.moveColumnToHand(card, dropId as handItemKey);
      }
    }
    // from hand
    else if (handKeys.includes(card.locationOnBoard as handItemKey)) {
      // to foundation
      if (
        foundationKeys.includes(dropId as foundationKey) ||
        dropId === "foundations"
      ) {
        this.moveHandToFoundation(card, dropId);
      }
      // to column
      else if (columnKeys.includes(dropId as columnKey)) {
        this.moveHandToColumn(card, dropId as columnKey);
      }
      // to hand
      else if (handKeys.includes(dropId as handItemKey)) {
        this.moveHandToHand(card, dropId as handItemKey);
      }
    }
  }

  moveFoundationToFoundation(card: CardClass, dropId: string) {
    // only possible with aces

    if (dropId === "foundations") {
      // unnecessary move
      return;
    }
    const sourceFoundation =
      this.board.foundations[card.locationOnBoard as foundationKey];
    const targetFoundation = this.board.foundations[dropId as foundationKey];

    if (card.value !== "A") {
      // only aces can be moved to empty foundations
      return;
    }

    if (targetFoundation.arrayOfCards.length > 0) {
      // only aces can be moved to empty foundations
      return;
    }

    // execute the move
    this.takeSnapshot();
    // remove card from foundation
    sourceFoundation.removeLastCard();
    // add card to foundation
    targetFoundation.addCards([card]);

    this.checkForWin();
  }

  moveFoundationToColumn(card: CardClass, dropId: columnKey) {
    const sourceFoundation =
      this.board.foundations[card.locationOnBoard as foundationKey];
    const destinationColumn = this.board.tableau[dropId];

    if (card.value === "king" && destinationColumn.arrayOfCards.length > 0) {
      // kings can only be moved to empty columns
      return;
    }

    if (card.value !== "king" && destinationColumn.arrayOfCards.length === 0) {
      // non-kings can only be moved to non-empty columns
      return;
    }

    if (
      card.value !== "king" &&
      !this.cardsAreContrastingSuits(
        destinationColumn.arrayOfCards[
          destinationColumn.arrayOfCards.length - 1
        ],
        card
      )
    ) {
      // cards must be contrasting suits
      return;
    }

    if (
      card.value !== "king" &&
      !this.cardsAreSequentialValues(
        card,
        destinationColumn.arrayOfCards[
          destinationColumn.arrayOfCards.length - 1
        ]
      )
    ) {
      // cards must be sequential
      return;
    }

    // execute the move
    this.takeSnapshot();
    // remove card from foundation
    sourceFoundation.removeLastCard();
    // add card to column
    destinationColumn.addCards([card]);
    destinationColumn.updateColumnState();

    this.checkForWin();
  }

  moveFoundationToHand(card: CardClass, dropId: handItemKey) {
    // handItem must be empty
    if (this.board.hand[dropId]) return;

    // execute the move
    this.takeSnapshot();
    // remove card from foundation
    const sourceFoundation =
      this.board.foundations[card.locationOnBoard as foundationKey];
    sourceFoundation.removeLastCard();
    // add card to hand
    this.board.hand.addCard(card, dropId);

    // this.checkForWin();
  }

  moveColumnToFoundation(card: CardClass, dropId: string) {
    // card must not be buried
    if (!this.cardIsOnTop(card)) return;

    // if card was double clicked, we will need to calculate the target foundation
    let foundationKey;

    if (dropId === "foundations") {
      foundationKey = this.findTargetFoundation(card);
    } else {
      foundationKey = dropId as foundationKey;
    }

    if (!foundationKey) return;

    const targetFoundation = this.board.foundations[foundationKey];

    if (card.value !== "A" && targetFoundation.arrayOfCards.length === 0) {
      // only aces can be moved to empty foundations
      return;
    }

    // cards must be sequential
    if (
      card.value !== "A" &&
      !this.cardsAreSequentialValues(
        targetFoundation.arrayOfCards[targetFoundation.arrayOfCards.length - 1],
        card
      )
    )
      return;

    // execute the move
    this.takeSnapshot();
    // remove card from column
    const sourceColumn = this.board.tableau[card.locationOnBoard as columnKey];
    sourceColumn.removeLastCard();
    sourceColumn.updateColumnState();

    // add card to foundation
    targetFoundation.addCards([card]);

    this.checkForWin();
  }

  moveColumnToColumn(card: CardClass, dropId: columnKey) {
    const targetColumn = this.board.tableau[dropId];
    const sourceColumn = this.board.tableau[card.locationOnBoard as columnKey];

    if (card.value !== "king" && targetColumn.arrayOfCards.length === 0) {
      // non-kings can only go in non-empty columns
      return;
    }

    if (card.value === "king" && targetColumn.arrayOfCards.length > 0) {
      // kings can only go in empty columns
      return;
    }

    // cards must be contrasting suits
    if (
      card.value !== "king" &&
      !this.cardsAreContrastingSuits(
        targetColumn.arrayOfCards[targetColumn.arrayOfCards.length - 1],
        card
      )
    )
      return;

    // cards must be sequential
    if (
      card.value !== "king" &&
      !this.cardsAreSequentialValues(
        card,
        targetColumn.arrayOfCards[targetColumn.arrayOfCards.length - 1]
      )
    )
      return;

    // execute move
    this.takeSnapshot();
    // remove cards from source column
    const cardIndex = sourceColumn.arrayOfCards.findIndex(
      (c) => c.value === card.value && c.suit === card.suit
    );
    const removedCards = sourceColumn.removeCards(cardIndex);
    sourceColumn.updateColumnState();
    // add cards to target column
    targetColumn.addCards(removedCards);
    targetColumn.updateColumnState();

    this.checkForWin();
  }

  moveColumnToHand(card: CardClass, dropId: handItemKey) {
    // card must not be buried
    if (!this.cardIsOnTop(card)) return;

    // hand item must be empty
    if (this.board.hand[dropId]) return;

    // execute move
    this.takeSnapshot();
    // remove card from column
    const sourceColumn = this.board.tableau[card.locationOnBoard as columnKey];
    sourceColumn.removeLastCard();
    sourceColumn.updateColumnState();
    // add card to hand
    this.board.hand.addCard(card, dropId);

    this.checkForWin();
  }

  moveHandToFoundation(card: CardClass, dropId: string) {
    // if card was double clicked, we will need to calculate the target foundation
    let foundationKey;

    if (dropId === "foundations") {
      foundationKey = this.findTargetFoundation(card);
    } else {
      foundationKey = dropId as foundationKey;
    }

    if (!foundationKey) return;
    const targetFoundation = this.board.foundations[foundationKey];

    if (card.value !== "A" && targetFoundation.arrayOfCards.length === 0) {
      // only aces can be moved to empty foundations
      return;
    }

    // cards must be sequential
    if (
      card.value !== "A" &&
      !this.cardsAreSequentialValues(
        targetFoundation.arrayOfCards[targetFoundation.arrayOfCards.length - 1],
        card
      )
    )
      return;

    // execute the move
    this.takeSnapshot();

    // remove card from hand
    this.board.hand.removeCard(card.locationOnBoard as handItemKey);
    // add card to foundation
    targetFoundation.addCards([card]);

    this.checkForWin();
  }

  moveHandToColumn(card: CardClass, dropId: columnKey) {
    const destinationColumn = this.board.tableau[dropId];

    if (card.value === "king" && destinationColumn.arrayOfCards.length > 0) {
      // kings can only go in empty columns
      return;
    } else if (
      card.value !== "king" &&
      destinationColumn.arrayOfCards.length === 0
    ) {
      // non-kings can only go in non-empty columns
      return;
    } else if (
      card.value !== "king" &&
      destinationColumn.arrayOfCards.length > 0
    ) {
      // cards must be sequential
      if (
        !this.cardsAreSequentialValues(
          card,
          destinationColumn.arrayOfCards[
            destinationColumn.arrayOfCards.length - 1
          ]
        )
      )
        return;
      // cards must be contrasting suits
      if (
        !this.cardsAreContrastingSuits(
          destinationColumn.arrayOfCards[
            destinationColumn.arrayOfCards.length - 1
          ],
          card
        )
      )
        return;
    }

    // execute the move
    this.takeSnapshot();

    // remove card from hand
    this.board.hand.removeCard(card.locationOnBoard as handItemKey);

    // add card to column
    destinationColumn.addCards([card]);
    destinationColumn.updateColumnState();

    this.checkForWin();
  }

  moveHandToHand(card: CardClass, dropId: handItemKey) {
    // destination hand item must be empty
    if (this.board.hand[dropId]) return;

    // execute the move
    this.takeSnapshot();

    // remove card from hand
    this.board.hand.removeCard(card.locationOnBoard as handItemKey);
    // add card to hand
    this.board.hand.addCard(card, dropId);
  }

  findTargetFoundation(card: CardClass): foundationKey | undefined {
    let foundationKey;

    if (card.value === "A") {
      // find first empty foundation
      foundationKey = foundationKeys.find(
        (key) => this.board.foundations[key].arrayOfCards.length === 0
      );
    } else {
      // find foundation with matching suit
      foundationKey = foundationKeys.find(
        (key) =>
          this.board.foundations[key].arrayOfCards.length > 0 &&
          this.board.foundations[key].suit === card.suit
      );
    }

    return foundationKey;
  }

  cardsAreContrastingSuits(card1: CardClass, card2: CardClass) {
    return contrastingSuits[card1.suit].includes(card2.suit);
  }

  cardsAreSequentialValues(lowerCard: CardClass, higherCard: CardClass) {
    return (
      valuesArray.indexOf(lowerCard.value) + 1 ===
      valuesArray.indexOf(higherCard.value)
    );
  }

  cardsCanStackInColumn(card1: CardClass, card2: CardClass) {
    // card 2 is the one to be stacked upon

    const isContrastingSuit = this.cardsAreContrastingSuits(card1, card2);
    const isSequentialValue = this.cardsAreSequentialValues(card1, card2);

    if (isContrastingSuit && isSequentialValue) {
      return true;
    } else return false;
  }

  cardIsOnTop(card: CardClass) {
    const column = this.board.tableau[card.locationOnBoard as columnKey];
    const cardIndex = column.arrayOfCards.findIndex(
      (c) => c.value === card.value && c.suit === card.suit
    );
    return cardIndex === column.arrayOfCards.length - 1;
  }

  takeSnapshot() {
    const boardCopy = _.cloneDeep(this.board);
    this.history.push(boardCopy);
  }

  undo() {
    if (this.history.length > 0) {
      const stateToRestore = this.history.pop();
      if (!stateToRestore) return;

      // foundation
      foundationKeys.forEach((key) => {
        // empty the foundation
        this.board.foundations[key].arrayOfCards = [];

        // create new cards from state
        const cards = stateToRestore.foundations[key].arrayOfCards.map(
          (card) => {
            const newCard = new CardClass(card.value, card.suit);
            newCard.setIsActive(card.isActive);
            newCard.setIsFaceUp(card.isFaceUp);
            newCard.setLocationOnBoard(card.locationOnBoard);
            return newCard;
          }
        );

        // add cards to foundation
        if (cards.length > 0) {
          this.board.foundations[key].addCards(cards);
        }
      });

      // tableau
      columnKeys.forEach((key) => {
        // empty the column
        this.board.tableau[key].arrayOfCards = [];

        // create new cards from state
        const cards = stateToRestore.tableau[key].arrayOfCards.map((card) => {
          const newCard = new CardClass(card.value, card.suit);
          newCard.setIsActive(card.isActive);
          newCard.setIsFaceUp(card.isFaceUp);
          newCard.setLocationOnBoard(card.locationOnBoard);
          return newCard;
        });

        // add cards to column
        this.board.tableau[key].addCards(cards);
        this.board.tableau[key].updateColumnState();
      });

      // hand
      handKeys.forEach((key) => {
        // empty the hand
        this.board.hand[key] = null;

        // create new cards from state
        const card = stateToRestore.hand[key];
        if (card) {
          const newCard = new CardClass(card.value, card.suit);
          newCard.setIsActive(card.isActive);
          newCard.setIsFaceUp(card.isFaceUp);
          newCard.setLocationOnBoard(card.locationOnBoard);
          this.board.hand[key] = newCard;
        }
      });
    }
  }

  checkForWin() {
    // if all cards are active in the columns, you win
    let allCardsActive = true;

    columnKeys.forEach((key) => {
      this.board.tableau[key].arrayOfCards.forEach((card) => {
        if (!card.isActive) {
          allCardsActive = false;
        }
      });
    });

    if (allCardsActive) {
      this.canAutoComplete = true;
    }
  }

  autoComplete() {
    while (
      foundationKeys.some(
        (key) => this.board.foundations[key].arrayOfCards.length < 13
      )
    ) {
      columnKeys.forEach((key) => {
        const column = this.board.tableau[key];
        const topCard = column.arrayOfCards[column.arrayOfCards.length - 1];
        if (!topCard) return;
        const foundationKey = this.findTargetFoundation(topCard);
        if (foundationKey) {
          this.moveColumnToFoundation(topCard, foundationKey);
        }
      });
      handKeys.forEach((key) => {
        const cardInHand = this.board.hand[key];
        if (!cardInHand) return;
        const foundationKey = this.findTargetFoundation(cardInHand);
        if (foundationKey) {
          this.moveHandToFoundation(cardInHand, foundationKey);
        }
      });
    }
  }
}

const gameState = new GameState();
export default gameState;
