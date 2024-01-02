import { makeAutoObservable } from "mobx";
import CardClass from "@/components/Card/CardClass";
import { HandItemKey } from "@/logic/types";

class Hand {
  handItem1: CardClass | null = null;
  handItem2: CardClass | null = null;
  handItem3: CardClass | null = null;
  handItem4: CardClass | null = null;
  handItem5: CardClass | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setItemNull(key: HandItemKey) {
    this[key] = null;
  }

  addCard(card: CardClass, key: HandItemKey) {
    console.log("incoming card", card);
    // update incoming card location
    card.setLocationOnBoard(key);
    this[key] = card;
  }
}

export default Hand;
