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
  else if (windowHeight < 1100 || windowWidth < 1100) return "small";
  else if (windowHeight < 1400 || windowWidth < 1400) return "medium";
  else return "large";
};
