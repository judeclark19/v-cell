import { Suit, Value } from "@/logic/types";

class CardClass {
  value: Value;
  suit: Suit;
  id: string;

  constructor(value: Value, suit: Suit) {
    this.value = value;
    this.suit = suit;
    this.id = `${value}_of_${suit}`;
  }
}

export default CardClass;
