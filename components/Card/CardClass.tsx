import { Suit, Value } from "@/logic/types";
import { makeAutoObservable } from "mobx";

class CardClass {
  value: Value;
  suit: Suit;
  id: string;
  isActive: boolean;
  isFaceUp: boolean | null;
  locationOnBoard: string | null;

  constructor(value: Value, suit: Suit) {
    makeAutoObservable(this); // This makes all properties observable
    this.value = value;
    this.suit = suit;
    this.id = `${value}_of_${suit}`;
    this.isActive = false;
    this.isFaceUp = true;
    this.locationOnBoard = null;
  }

  setIsActive(isActive: boolean) {
    this.isActive = isActive;
  }

  setIsFaceUp(isFaceUp: boolean | null) {
    this.isFaceUp = isFaceUp;
  }

  setLocationOnBoard(location: string | null) {
    this.locationOnBoard = location;
  }
}

export default CardClass;
