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

  addCard(card: CardClass) {
    card.setLocationOnBoard(this.key);
    if (this.suit === "") {
      this.suit = card.suit;
    }
    this.arrayOfCards.push(card);
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
