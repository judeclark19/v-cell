import { cardSizeType } from "@/components/Card/CardUI.styles";
import { atom } from "recoil";

export const cardSizeState = atom<cardSizeType>({
  key: "cardSize",
  default: "tiny"
});

export const calculateCardSize = (
  windowWidth: number,
  windowHeight: number
) => {
  if (windowHeight < 700 || windowWidth < 700) return "tiny";
  else if (windowHeight < 900 || windowWidth < 900) return "small";
  else if (windowHeight < 1200 || windowWidth < 1200) return "medium";
  else return "large";
};

export const timeElapsedState = atom<number>({
  key: "timeElapsed",
  default: 0
});

export const timerIsRunningState = atom<boolean>({
  key: "timerIsRunning",
  default: false
});
