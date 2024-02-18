import CardClass from "@/components/Card/CardClass";
import { makeAutoObservable } from "mobx";
import {
  columnKey,
  columnKeys,
  contrastingSuits,
  foundationKey,
  foundationKeys,
  handItemKey,
  handKeys,
  undoTypes,
  valuesArray
} from "./types";
import { AppState } from "./AppState";
class MoveEvaluator {
  appState: AppState;
  execute: boolean;
  undosAllowed: number;
  undosUsed: number;

  constructor(appState: AppState) {
    this.appState = appState;
    this.execute = false;
    this.undosAllowed = Infinity;
    this.undosUsed = 0;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setExecute(value: boolean) {
    this.execute = value;
  }

  setUndosAllowed(value: number) {
    if (undoTypes(value)) this.undosAllowed = value;
  }

  setUndosUsed(value: number) {
    this.undosUsed = value;
  }

  getIsUndoButtonDisabled() {
    if (this.appState.history.length === 0) return true;

    if (this.appState.winningBoard) return true;

    if (this.undosAllowed === Infinity) return false;

    if (this.undosUsed >= this.undosAllowed) return true;
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
    const column = this.appState.currentBoard.tableau.getColumn(
      card.locationOnBoard as columnKey
    );
    const cardIndex = column.arrayOfCards.findIndex(
      (c) => c.value === card.value && c.suit === card.suit
    );
    return cardIndex === column.arrayOfCards.length - 1;
  }

  evaluateMove(card: CardClass, dropId: string) {
    // from foundation
    if (foundationKeys.includes(card.locationOnBoard as foundationKey)) {
      // to foundation
      if (
        foundationKeys.includes(dropId as foundationKey) ||
        dropId === "foundations"
      ) {
        return this.moveFoundationToFoundation(card, dropId);
      }
      // to column
      else if (columnKeys.includes(dropId as columnKey)) {
        return this.moveFoundationToColumn(card, dropId as columnKey);
      }
      // to hand
      else if (handKeys.includes(dropId as handItemKey)) {
        return this.moveFoundationToHand(card, dropId as handItemKey);
      }
    }

    // from column
    else if (columnKeys.includes(card.locationOnBoard as columnKey)) {
      // to foundation
      if (
        foundationKeys.includes(dropId as foundationKey) ||
        dropId === "foundations"
      ) {
        return this.moveColumnToFoundation(card, dropId);
      }
      // to column
      else if (columnKeys.includes(dropId as columnKey)) {
        return this.moveColumnToColumn(card, dropId as columnKey);
      }
      // to hand
      else if (handKeys.includes(dropId as handItemKey)) {
        return this.moveColumnToHand(card, dropId as handItemKey);
      }
    }
    // from hand
    else if (handKeys.includes(card.locationOnBoard as handItemKey)) {
      // to foundation
      if (
        foundationKeys.includes(dropId as foundationKey) ||
        dropId === "foundations"
      ) {
        return this.moveHandToFoundation(card, dropId);
      }
      // to column
      else if (columnKeys.includes(dropId as columnKey)) {
        return this.moveHandToColumn(card, dropId as columnKey);
      }
      // to hand
      else if (handKeys.includes(dropId as handItemKey)) {
        return this.moveHandToHand(card, dropId as handItemKey);
      }
    }
  }

  moveFoundationToFoundation(card: CardClass, dropId: string) {
    // only possible with aces
    if (dropId === "foundations") {
      // unnecessary move
      return false;
    }
    const sourceFoundation =
      this.appState.currentBoard.foundations[
        card.locationOnBoard as foundationKey
      ];
    const targetFoundation =
      this.appState.currentBoard.foundations[dropId as foundationKey];

    if (card.value !== "A") {
      // only aces can be moved to empty foundations
      return false;
    }

    if (targetFoundation.arrayOfCards.length > 0) {
      // only aces can be moved to empty foundations
      return false;
    }

    if (this.execute) {
      // execute the move
      this.appState.takeSnapshot();
      // remove card from foundation
      sourceFoundation.removeLastCard();
      // add card to foundation
      targetFoundation.addCards([card]);

      this.appState.checkForWin();
    }
    return true;
  }

  moveFoundationToColumn(card: CardClass, dropId: columnKey) {
    const sourceFoundation =
      this.appState.currentBoard.foundations[
        card.locationOnBoard as foundationKey
      ];
    const destinationColumn = this.appState.currentBoard.tableau[dropId];

    if (card.value === "king" && destinationColumn.arrayOfCards.length > 0) {
      // kings can only be moved to empty columns
      return false;
    }

    if (card.value !== "king" && destinationColumn.arrayOfCards.length === 0) {
      // non-kings can only be moved to non-empty columns
      return false;
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
      return false;
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
      return false;
    }

    if (this.execute) {
      // execute the move
      this.appState.takeSnapshot();
      // remove card from foundation
      sourceFoundation.removeLastCard();
      // add card to column
      destinationColumn.addCards([card]);
      destinationColumn.updateColumnState();

      this.appState.checkForWin();
    }
    return true;
  }

  moveFoundationToHand(card: CardClass, dropId: handItemKey) {
    // handItem must be empty
    if (this.appState.currentBoard.hand[dropId]) return;

    if (this.execute) {
      // execute the move
      this.appState.takeSnapshot();
      // remove card from foundation
      const sourceFoundation =
        this.appState.currentBoard.foundations[
          card.locationOnBoard as foundationKey
        ];
      sourceFoundation.removeLastCard();
      // add card to hand
      this.appState.currentBoard.hand.addCard(card, dropId);
    }
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

    if (!foundationKey) return false;

    const targetFoundation =
      this.appState.currentBoard.foundations[foundationKey];

    if (card.value !== "A" && targetFoundation.arrayOfCards.length === 0) {
      // only aces can be moved to empty foundations
      return false;
    }

    // cards must be sequential
    if (
      card.value !== "A" &&
      !this.cardsAreSequentialValues(
        targetFoundation.arrayOfCards[targetFoundation.arrayOfCards.length - 1],
        card
      )
    )
      return false;

    if (this.execute || dropId === "foundations") {
      // execute the move
      this.appState.takeSnapshot();
      // remove card from column
      const sourceColumn =
        this.appState.currentBoard.tableau[card.locationOnBoard as columnKey];
      sourceColumn.removeLastCard();
      sourceColumn.updateColumnState();

      // add card to foundation
      targetFoundation.addCards([card]);

      this.appState.checkForWin();
      this.appState.checkForManualComplete();
    }
    return true;
  }

  moveColumnToColumn(card: CardClass, dropId: columnKey) {
    const targetColumn = this.appState.currentBoard.tableau[dropId];
    const sourceColumn =
      this.appState.currentBoard.tableau[card.locationOnBoard as columnKey];

    if (card.value !== "king" && targetColumn.arrayOfCards.length === 0) {
      // non-kings can only go in non-empty columns
      return false;
    }

    if (card.value === "king" && targetColumn.arrayOfCards.length > 0) {
      // kings can only go in empty columns
      return false;
    }

    // cards must be contrasting suits
    if (
      card.value !== "king" &&
      !this.cardsAreContrastingSuits(
        targetColumn.arrayOfCards[targetColumn.arrayOfCards.length - 1],
        card
      )
    ) {
      return false;
    }

    // cards must be sequential
    if (
      card.value !== "king" &&
      !this.cardsAreSequentialValues(
        card,
        targetColumn.arrayOfCards[targetColumn.arrayOfCards.length - 1]
      )
    ) {
      return false;
    }

    if (this.execute) {
      // execute move
      this.appState.takeSnapshot();
      // remove cards from source column
      const cardIndex = sourceColumn.arrayOfCards.findIndex(
        (c) => c.value === card.value && c.suit === card.suit
      );
      const removedCards = sourceColumn.removeCards(cardIndex);
      sourceColumn.updateColumnState();
      // add cards to target column
      targetColumn.addCards(removedCards);
      targetColumn.updateColumnState();

      this.appState.checkForWin();
    }
    return true;
  }

  moveColumnToHand(card: CardClass, dropId: handItemKey) {
    // card must not be buried
    if (!this.cardIsOnTop(card)) return false;

    // hand item must be empty
    if (this.appState.currentBoard.hand[dropId]) return false;

    if (this.execute) {
      // execute move
      this.appState.takeSnapshot();
      // remove card from column
      const sourceColumn =
        this.appState.currentBoard.tableau[card.locationOnBoard as columnKey];
      sourceColumn.removeLastCard();
      sourceColumn.updateColumnState();
      // add card to hand
      this.appState.currentBoard.hand.addCard(card, dropId);

      this.appState.checkForWin();
    }

    return true;
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
    const targetFoundation =
      this.appState.currentBoard.foundations[foundationKey];

    if (card.value !== "A" && targetFoundation.arrayOfCards.length === 0) {
      // only aces can be moved to empty foundations
      return false;
    }

    // cards must be sequential
    if (
      card.value !== "A" &&
      !this.cardsAreSequentialValues(
        targetFoundation.arrayOfCards[targetFoundation.arrayOfCards.length - 1],
        card
      )
    )
      return false;

    if (this.execute || dropId === "foundations") {
      // execute the move
      this.appState.takeSnapshot();

      // remove card from hand
      this.appState.currentBoard.hand.removeCard(
        card.locationOnBoard as handItemKey
      );
      // add card to foundation
      targetFoundation.addCards([card]);

      this.appState.checkForWin();
      this.appState.checkForManualComplete();
    }
    return true;
  }

  moveHandToColumn(card: CardClass, dropId: columnKey) {
    const destinationColumn = this.appState.currentBoard.tableau[dropId];

    if (card.value === "king" && destinationColumn.arrayOfCards.length > 0) {
      // kings can only go in empty columns
      return false;
    } else if (
      card.value !== "king" &&
      destinationColumn.arrayOfCards.length === 0
    ) {
      // non-kings can only go in non-empty columns
      return false;
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
        return false;
      // cards must be contrasting suits
      if (
        !this.cardsAreContrastingSuits(
          destinationColumn.arrayOfCards[
            destinationColumn.arrayOfCards.length - 1
          ],
          card
        )
      )
        return false;
    }

    if (this.execute) {
      // execute the move
      this.appState.takeSnapshot();

      // remove card from hand
      this.appState.currentBoard.hand.removeCard(
        card.locationOnBoard as handItemKey
      );

      // add card to column
      destinationColumn.addCards([card]);
      destinationColumn.updateColumnState();

      this.appState.checkForWin();
    }
    return true;
  }

  moveHandToHand(card: CardClass, dropId: handItemKey) {
    // destination hand item must be empty
    if (this.appState.currentBoard.hand[dropId]) return;

    if (this.execute) {
      // execute the move
      this.appState.takeSnapshot();

      // remove card from hand
      this.appState.currentBoard.hand.removeCard(
        card.locationOnBoard as handItemKey
      );
      // add card to hand
      this.appState.currentBoard.hand.addCard(card, dropId);
    }
    return true;
  }

  findTargetFoundation(card: CardClass): foundationKey | undefined {
    let foundationKey;

    if (card.value === "A") {
      // find first empty foundation
      foundationKey = foundationKeys.find(
        (key) =>
          this.appState.currentBoard.foundations[key].arrayOfCards.length === 0
      );
    } else {
      // find foundation with matching suit
      foundationKey = foundationKeys.find(
        (key) =>
          this.appState.currentBoard.foundations[key].arrayOfCards.length > 0 &&
          this.appState.currentBoard.foundations[key].suit === card.suit
      );
    }

    return foundationKey;
  }
}

export default MoveEvaluator;
