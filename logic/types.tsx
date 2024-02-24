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

export function undoTypes(value: number) {
  switch (value) {
    case 0:
      return true;
    case 1:
      return true;
    case 3:
      return true;
    case 5:
      return true;
    case Infinity:
      return true;
    default:
      return false;
  }
}

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

export type handItemKey =
  | "handItem1"
  | "handItem2"
  | "handItem3"
  | "handItem4"
  | "handItem5";

export const handKeys: handItemKey[] = [
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

export type boardLayout = "classic" | "faceUp" | "doubleV" | "tripleV";

export const boardLayouts = {
  classic: [[0], [1], [2], [3], [2], [1], [0]],
  faceUp: [[], [], [], [], [], [], []],
  doubleV: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [2, 3],
    [1, 2],
    [0, 1]
  ],
  tripleV: [
    [0, 1, 2],
    [1, 2, 3],
    [2, 3, 4],
    [3, 4, 5],
    [2, 3, 4],
    [1, 2, 3],
    [0, 1, 2]
  ]
};

export type ModalName = "win" | "instructions" | "settings" | "pause";
