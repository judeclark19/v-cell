class CardClass {
  value: string;
  suit: string;
  id: string;

  constructor(value: string, suit: string) {
    this.value = value;
    this.suit = suit;
    this.id = `${value}_of_${suit}`;
  }
}

export default CardClass;
