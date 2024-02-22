import { observer } from "mobx-react-lite";
import { Column } from "./TableauClass";
import DropSpot from "../DropSpot/DropSpot";
import { Spot } from "../Board.styles";
import CardUI from "@/components/Card/CardUI";
import { questrial } from "../Board";
import { useRecoilValue } from "recoil";
import { cardSizeState } from "@/logic/RecoilAtoms";
import { cardSizes } from "@/components/Card/CardUI.styles";

const ColumnUI = observer(({ columnData }: { columnData: Column }) => {
  const cardSize = useRecoilValue(cardSizeState);

  if (columnData.arrayOfCards.length === 0) {
    return (
      <DropSpot size={cardSize} dropId={columnData.key}>
        <Spot $size={cardSize}>
          <div className={`label ${questrial.className}`}>K</div>
        </Spot>
      </DropSpot>
    );
  }

  return (
    <Spot key={columnData.key} $size={cardSize}>
      <div className={`label ${questrial.className}`}>K</div>
      {columnData.arrayOfCards.map((card, i) => {
        // final card will have a drop spot
        if (i === columnData.arrayOfCards.length - 1) {
          return (
            <DropSpot
              size={cardSize}
              key={`${card.value}_of_${card.suit}`}
              dropId={columnData.key}
            >
              <CardUI
                size={cardSize}
                card={card}
                zIndex={i + 1}
                offset={i * cardSizes[cardSize].offset}
                spacer
              />
            </DropSpot>
          );
        } else
          return (
            <CardUI
              size={cardSize}
              key={`${card.value}_of_${card.suit}`}
              card={card}
              zIndex={i + 1}
              offset={i * cardSizes[cardSize].offset}
            />
          );
      })}
    </Spot>
  );
});

export default ColumnUI;
