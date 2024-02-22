import { makeAutoObservable } from "mobx";
import { Suit, foundationKey } from "../../../logic/types";
import CardClass from "@/components/Card/CardClass";

export class Foundation {
  key: foundationKey;
  suit: Suit | "" = "";
  arrayOfCards: CardClass[] = [];
  constructor(key: foundationKey) {
    makeAutoObservable(this);
    this.key = key;
  }

  addCards(cards: CardClass[]) {
    if (this.suit === "") {
      this.suit = cards[0].suit;
    }
    cards.forEach((card) => {
      card.setLocationOnBoard(this.key);
      card.setIsActive(true);
      this.arrayOfCards.push(card);
    });
  }

  removeLastCard() {
    const removedCard = this.arrayOfCards.pop();
    if (this.arrayOfCards.length === 0) {
      this.suit = "";
    }
    return removedCard;
  }
}

class Foundations {
  foundation1: Foundation = new Foundation("foundation1");
  foundation2: Foundation = new Foundation("foundation2");
  foundation3: Foundation = new Foundation("foundation3");
  foundation4: Foundation = new Foundation("foundation4");

  constructor() {
    makeAutoObservable(this);
  }
}

export default Foundations;
