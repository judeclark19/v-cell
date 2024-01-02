import { makeAutoObservable } from "mobx";
import { Suit } from "../../../logic/types";
import CardClass from "@/components/Card/CardClass";

export type foundationKey =
  | "foundation1"
  | "foundation2"
  | "foundation3"
  | "foundation4";

export class Foundation {
  key: foundationKey;
  suit: Suit | "" = "";
  arrayOfCards: CardClass[] = [];
  constructor(key: foundationKey) {
    makeAutoObservable(this);
    this.key = key;
  }
}

class Foundations {
  foundation1: Foundation = new Foundation("foundation1");
  foundation2: Foundation = new Foundation("foundation2");
  foundation3: Foundation = new Foundation("foundation3");
  foundation4: Foundation = new Foundation("foundation4");

  constructor() {
    makeAutoObservable(this);
  }
}

export default Foundations;
