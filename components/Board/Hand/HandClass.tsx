import { makeAutoObservable } from "mobx";
import CardClass from "@/components/Card/CardClass";
import { handItemKey } from "@/logic/types";

class Hand {
  handItem1: CardClass | null = null;
  handItem2: CardClass | null = null;
  handItem3: CardClass | null = null;
  handItem4: CardClass | null = null;
  handItem5: CardClass | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setItemNull(key: handItemKey) {
    this[key] = null;
  }

  addCard(card: CardClass, key: handItemKey) {
    // update incoming card location
    card.setLocationOnBoard(key);
    card.setIsActive(true);
    this[key] = card;
  }

  removeCard(key: handItemKey) {
    this[key] = null;
  }
}

export default Hand;
