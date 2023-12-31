import { Suit, Value } from "@/logic/types";
import { makeAutoObservable } from "mobx";

class CardClass {
  value: Value;
  suit: Suit;
  id: string;
  isActive: boolean;
  isFaceUp: boolean;
  isFlipping: boolean;
  locationOnBoard: string | null;

  constructor(value: Value, suit: Suit) {
    makeAutoObservable(this); // This makes all properties observable
    this.value = value;
    this.suit = suit;
    this.id = `${value}_of_${suit}`;
    this.isActive = false;
    this.isFaceUp = false;
    this.isFlipping = false;
    this.locationOnBoard = null;
  }

  setIsActive(isActive: boolean) {
    this.isActive = isActive;
  }

  setIsFaceUp(isFaceUp: boolean) {
    this.isFaceUp = isFaceUp;
  }

  setIsFlipping(isFlipping: boolean) {
    this.isFlipping = isFlipping;
  }

  setLocationOnBoard(location: string | null) {
    this.locationOnBoard = location;
  }
}

export default CardClass;
