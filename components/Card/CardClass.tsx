import { Suit, Value } from "@/logic/types";
import { makeAutoObservable } from "mobx";

class CardClass {
  value: Value;
  suit: Suit;
  id: string;
  isActive: boolean;
  isFaceUp: boolean;

  constructor(value: Value, suit: Suit) {
    makeAutoObservable(this); // This makes all properties observable
    this.value = value;
    this.suit = suit;
    this.id = `${value}_of_${suit}`;
    this.isActive = false;
    this.isFaceUp = false;
  }

  setIsActive(isActive: boolean) {
    this.isActive = isActive;
  }

  setIsFaceUp(isFaceUp: boolean) {
    this.isFaceUp = isFaceUp;
  }
}

export default CardClass;
