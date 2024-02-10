import { atom } from "recoil";

export const winHistoryState = atom<Date[]>({
  key: "winHistory",
  default: []
});
