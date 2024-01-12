import { atom } from "recoil";

export type Orientation = "landscape" | "portrait";

export const boardOrientationState = atom<Orientation>({
  key: "boardOrientation",
  default: "landscape"
});

export const windowWidthState = atom<number>({
  key: "windowWidth",
  default: 0
});