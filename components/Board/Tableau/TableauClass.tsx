import { makeAutoObservable } from "mobx";
import { columnKey, contrastingSuits, valuesArray } from "../../../logic/types";
import CardClass from "@/components/Card/CardClass";

export class Column {
  key: columnKey;
  arrayOfCards: CardClass[] = [];
  constructor(key: columnKey) {
    makeAutoObservable(this);
    this.key = key;
  }

  addCards(cardStack: CardClass[]) {
    cardStack.forEach((card) => {
      card.setLocationOnBoard(this.key);
    });
    this.arrayOfCards = this.arrayOfCards.concat(cardStack);
  }

  removeLastCard() {
    const removedCard = this.arrayOfCards.pop();
    return removedCard;
  }

  removeCards(cardIndex: number) {
    const removedCards = this.arrayOfCards.splice(cardIndex);
    return removedCards;
  }

  updateColumnState() {
    // set all cards inactive
    this.arrayOfCards.forEach((card) => {
      card.setIsActive(false);
    });

    // loop backwards through column
    for (let i = this.arrayOfCards.length - 1; i >= 0; i--) {
      // last card in column is active
      if (i === this.arrayOfCards.length - 1) {
        const currentCard = this.arrayOfCards[i];
        currentCard.setIsActive(true);
        if (currentCard.isFaceUp === false) {
          currentCard.setIsFaceUp(null);
          setTimeout(() => {
            currentCard.setIsFaceUp(true);
          }, 600);
        }
      } else {
        // check if current card is stackable with i+1
        const currentCard = this.arrayOfCards[i];
        const nextCard = this.arrayOfCards[i + 1];
        if (
          currentCard.isFaceUp &&
          contrastingSuits[currentCard.suit].includes(nextCard.suit) &&
          valuesArray.indexOf(currentCard.value) - 1 ===
            valuesArray.indexOf(nextCard.value)
        ) {
          currentCard.setIsActive(true);
        } else {
          break;
        }
      }
    }
  }
}

class Tableau {
  column1: Column = new Column("column1");
  column2: Column = new Column("column2");
  column3: Column = new Column("column3");
  column4: Column = new Column("column4");
  column5: Column = new Column("column5");
  column6: Column = new Column("column6");
  column7: Column = new Column("column7");

  constructor() {
    makeAutoObservable(this);
  }

  getColumn(key: columnKey): Column {
    return this[key];
  }
}

export default Tableau;
