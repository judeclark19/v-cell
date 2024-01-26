import { observer } from "mobx-react-lite";
import { Column } from "./TableauClass";
import DropSpot from "../DropSpot/DropSpot";
import { Spot } from "../Board.styles";
import CardUI from "@/components/Card/CardUI";
import { getCardOffsetAmount, poppins } from "../Board";
import { useRecoilValue } from "recoil";
import {
  getCardSize,
  windowHeightState,
  windowWidthState
} from "@/logic/OrientationAndSize";

const ColumnUI = observer(({ columnData }: { columnData: Column }) => {
  const windowWidth = useRecoilValue(windowWidthState);
  const windowHeight = useRecoilValue(windowHeightState);

  if (columnData.arrayOfCards.length === 0) {
    return (
      <DropSpot
        size={getCardSize(windowWidth, windowHeight)}
        dropId={columnData.key}
      >
        <Spot $size={getCardSize(windowWidth, windowHeight)}>
          <div className={`label ${poppins.className}`}>K</div>
        </Spot>
      </DropSpot>
    );
  }

  return (
    <Spot key={columnData.key} $size={getCardSize(windowWidth, windowHeight)}>
      <div className="label">K</div>
      {columnData.arrayOfCards.map((card, i) => {
        // final card will have a drop spot
        if (i === columnData.arrayOfCards.length - 1) {
          return (
            <DropSpot
              size={getCardSize(windowWidth, windowHeight)}
              key={`${card.value}_of_${card.suit}`}
              dropId={columnData.key}
            >
              <CardUI
                size={getCardSize(windowWidth, windowHeight)}
                card={card}
                zIndex={i + 1}
                offset={
                  i *
                  getCardOffsetAmount(getCardSize(windowWidth, windowHeight))
                }
                spacer
              />
            </DropSpot>
          );
        } else
          return (
            <CardUI
              size={getCardSize(windowWidth, windowHeight)}
              key={`${card.value}_of_${card.suit}`}
              card={card}
              zIndex={i + 1}
              offset={
                i * getCardOffsetAmount(getCardSize(windowWidth, windowHeight))
              }
            />
          );
      })}
    </Spot>
  );
});

export default ColumnUI;
