import CardClass from "@/components/Card/CardClass";

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

export type Column = `column${number}`;

export type HandType = [
  CardClass | null,
  CardClass | null,
  CardClass | null,
  CardClass | null,
  CardClass | null
];

export interface BoardType {
  foundation1: CardClass[];
  foundation2: CardClass[];
  foundation3: CardClass[];
  foundation4: CardClass[];
  column1: CardClass[];
  column2: CardClass[];
  column3: CardClass[];
  column4: CardClass[];
  column5: CardClass[];
  column6: CardClass[];
  column7: CardClass[];
}

export interface HistoryType {
  hand: HandType;
  board: BoardType;
}
