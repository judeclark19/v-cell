import { makeAutoObservable } from "mobx";
import CardClass from "@/components/Card/CardClass";

class Hand {
  handItem1: CardClass | null = null;
  handItem2: CardClass | null = null;
  handItem3: CardClass | null = null;
  handItem4: CardClass | null = null;
  handItem5: CardClass | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  addCard(card: CardClass, spotNumber: number) {
    switch (spotNumber) {
      case 1:
        this.handItem1 = card;
        break;
      case 2:
        this.handItem2 = card;
        break;
      case 3:
        this.handItem3 = card;
        break;
      case 4:
        this.handItem4 = card;
        break;
      case 5:
        this.handItem5 = card;
        break;
      default:
        break;
    }
  }
}

export default Hand;
