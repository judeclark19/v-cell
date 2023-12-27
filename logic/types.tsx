export type Suit = "hearts" | "spades" | "clubs" | "diamonds";
export type SuitsArray = ["hearts", "spades", "clubs", "diamonds"];

export type Value =
  | "ace"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "jack"
  | "queen"
  | "king";
export type ValuesArray = [
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

export interface CardType {
  value: Value;
  suit: Suit;
}

export type Column = `column${number}`;

export interface BoardType {
  stock: CardType[];
  waste: CardType[];
  foundation1: CardType[];
  foundation2: CardType[];
  foundation3: CardType[];
  foundation4: CardType[];
  column1: CardType[];
  column2: CardType[];
  column3: CardType[];
  column4: CardType[];
  column5: CardType[];
  column6: CardType[];
  column7: CardType[];
}
