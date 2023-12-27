export class GameState {
  deck: string[];

  constructor() {
    this.deck = [];
    this.createDeck();
  }

  createDeck() {
    this.deck = [];
    const suits = ["hearts", "spades", "clubs", "diamonds"];
    const values = [
      "ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "jack",
      "queen",
      "king"
    ];
    for (let suit in suits) {
      for (let value in values) {
        this.deck.push(`${values[value]} of ${suits[suit]}`);
      }
    }
  }

  printDeck() {
    console.log(this.deck);
  }

  shuffleDeck() {
    let m = this.deck.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = this.deck[m];
      this.deck[m] = this.deck[i];
      this.deck[i] = t;
    }
  }
}

const gameState = new GameState();
export default gameState;
