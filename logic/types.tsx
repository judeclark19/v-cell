import Foundations from "../components/Board/Foundations/FoundationsClass";
import Tableau from "@/components/Board/Tableau/TableauClass";
import Hand from "@/components/Board/Hand/HandClass";

export type Suit = "hearts" | "spades" | "clubs" | "diamonds";
export const suitsArray: Suit[] = ["hearts", "spades", "clubs", "diamonds"];

export const contrastingSuits = {
  hearts: ["spades", "clubs"],
  spades: ["hearts", "diamonds"],
  clubs: ["hearts", "diamonds"],
  diamonds: ["spades", "clubs"]
};

export type Value =
  | "A"
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

export const valuesArray: Value[] = [
  "A",
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

export type foundationKey =
  | "foundation1"
  | "foundation2"
  | "foundation3"
  | "foundation4";

export const foundationKeys: foundationKey[] = [
  "foundation1",
  "foundation2",
  "foundation3",
  "foundation4"
];

export type columnKey =
  | "column1"
  | "column2"
  | "column3"
  | "column4"
  | "column5"
  | "column6"
  | "column7";

export const columnKeys: columnKey[] = [
  "column1",
  "column2",
  "column3",
  "column4",
  "column5",
  "column6",
  "column7"
];

export type HandItemKey =
  | "handItem1"
  | "handItem2"
  | "handItem3"
  | "handItem4"
  | "handItem5";

export const handKeys: HandItemKey[] = [
  "handItem1",
  "handItem2",
  "handItem3",
  "handItem4",
  "handItem5"
];

export interface BoardType {
  foundations: Foundations;
  tableau: Tableau;
  hand: Hand;
}
