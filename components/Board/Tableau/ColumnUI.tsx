import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Column } from "./TableauClass";
import DropSpot from "../DropSpot/DropSpot";
import { Spot, cardOffsetAmount } from "../Board.styles";
import CardUI from "@/components/Card/CardUI";
import { cardSize } from "@/components/Card/CardUI.styles";

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
      <DropSpot size="medium" key={columnData.key} dropId={columnData.key}>
        <Spot $size="medium" />
      </DropSpot>
    );
  }

  return (
    <Spot key={columnData.key} $size={windowWidth < 1180 ? "small" : "medium"}>
      <span>K</span>
      {columnData.arrayOfCards.map((card, i) => {
        // final card will have a drop spot
        if (i === columnData.arrayOfCards.length - 1) {
          return (
            <DropSpot
              size={windowWidth < 1180 ? "small" : "medium"}
              key={`${card.value}_of_${card.suit}`}
              dropId={columnData.key}
            >
              <CardUI
                size={windowWidth < 1180 ? "small" : "medium"}
                card={card}
                zIndex={i + 1}
                offset={i * cardOffsetAmount}
                spacer
              />
            </DropSpot>
          );
        } else
          return (
            <CardUI
              size={windowWidth < 1180 ? "small" : "medium"}
              key={`${card.value}_of_${card.suit}`}
              card={card}
              zIndex={i + 1}
              offset={i * cardOffsetAmount}
            />
          );
      })}
    </Spot>
  );
});

export default ColumnUI;
