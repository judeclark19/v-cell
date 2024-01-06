import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Column } from "./TableauClass";
import DropSpot from "../DropSpot/DropSpot";
import { Spot } from "../Board.styles";
import CardUI from "@/components/Card/CardUI";
import { getCardOffsetAmount, getCardSize } from "../Board";
import { get } from "lodash";

const ColumnUI = observer(({ columnData }: { columnData: Column }) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // on window resize, update windowWidth
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (columnData.arrayOfCards.length === 0) {
    return (
      <DropSpot
        size={getCardSize(windowWidth)}
        key={columnData.key}
        dropId={columnData.key}
      >
        <Spot $size={getCardSize(windowWidth)} />
      </DropSpot>
    );
  }

  return (
    <Spot key={columnData.key} $size={getCardSize(windowWidth)}>
      <span>K</span>
      {columnData.arrayOfCards.map((card, i) => {
        // final card will have a drop spot
        if (i === columnData.arrayOfCards.length - 1) {
          return (
            <DropSpot
              size={getCardSize(windowWidth)}
              key={`${card.value}_of_${card.suit}`}
              dropId={columnData.key}
            >
              <CardUI
                size={getCardSize(windowWidth)}
                card={card}
                zIndex={i + 1}
                offset={i * getCardOffsetAmount(getCardSize(windowWidth))}
                spacer
              />
            </DropSpot>
          );
        } else
          return (
            <CardUI
              size={getCardSize(windowWidth)}
              key={`${card.value}_of_${card.suit}`}
              card={card}
              zIndex={i + 1}
              offset={i * getCardOffsetAmount(getCardSize(windowWidth))}
            />
          );
      })}
    </Spot>
  );
});

export default ColumnUI;
