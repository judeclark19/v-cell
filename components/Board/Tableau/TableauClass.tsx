import { makeAutoObservable } from "mobx";
import { columnKey, contrastingSuits, valuesArray } from "../../../logic/types";
import CardClass from "@/components/Card/CardClass";

export class Column {
  key: columnKey;
  arrayOfCards: CardClass[] = [];
  faceDownCardIndex: number;
  constructor(key: columnKey, faceDownCardIndex: number) {
    makeAutoObservable(this);
    this.key = key;
    this.faceDownCardIndex = faceDownCardIndex;
  }

  addCard(card: CardClass) {
    console.log("incoming card", card, card instanceof CardClass);
    // update incoming card location
    (card as CardClass).setLocationOnBoard(this.key);
    this.arrayOfCards.push(card);
    this.updateColumnState();
  }

  removeCard() {
    const removedCard = this.arrayOfCards.pop();
    this.updateColumnState();
    return removedCard;
  }

  addCardStack(cardStack: CardClass[]) {
    // update incoming cards location
    cardStack.forEach((card) => {
      card.setLocationOnBoard(this.key);
    });
    this.arrayOfCards = this.arrayOfCards.concat(cardStack);
    this.updateColumnState();
  }

  removeCardStack(cardIndex: number) {
    // splice off and remove cards
    const removedCards = this.arrayOfCards.splice(cardIndex);
    console.log("cards to remove", removedCards);
    this.updateColumnState();
    return removedCards;
  }

  updateColumnState() {
    // set all cards inactive
    this.arrayOfCards.forEach((card) => {
      card.setIsActive(false);
    });

    // loop backwards through column
    for (let i = this.arrayOfCards.length - 1; i >= 0; i--) {
      // apply face down card index
      if (i === this.faceDownCardIndex) {
        this.arrayOfCards[i].setIsFaceUp(false);
      }

      // last card in column is active
      if (i === this.arrayOfCards.length - 1) {
        this.arrayOfCards[i].setIsActive(true);
        this.arrayOfCards[i].setIsFaceUp(true);
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
  column1: Column = new Column("column1", 0);
  column2: Column = new Column("column2", 1);
  column3: Column = new Column("column3", 2);
  column4: Column = new Column("column4", 3);
  column5: Column = new Column("column5", 2);
  column6: Column = new Column("column6", 1);
  column7: Column = new Column("column7", 0);

  constructor() {
    makeAutoObservable(this);
  }
}

export default Tableau;
