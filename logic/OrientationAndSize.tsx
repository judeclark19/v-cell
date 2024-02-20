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

export const windowHeightState = atom<number>({
  key: "windowHeight",
  default: 0
});

export const getCardSize = (windowWidth: number, windowHeight: number) => {
  if (windowHeight < 700 || windowWidth < 1000) return "tiny";
  else if (windowHeight < 900) return "small";
  else if (windowHeight < 1200) return "medium";
  else return "large";
};
