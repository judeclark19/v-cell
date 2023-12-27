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
