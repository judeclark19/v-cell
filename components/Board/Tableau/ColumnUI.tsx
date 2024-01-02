import { observer } from "mobx-react-lite";
import React from "react";
import { Column } from "./TableauClass";
import DropSpot from "../DropSpot/DropSpot";
import { Spot, cardOffsetAmount } from "../Board.styles";
import CardUI from "@/components/Card/CardUI";

const ColumnUI = observer(({ columnData }: { columnData: Column }) => {
  if (columnData.arrayOfCards.length === 0) {
    return (
      <DropSpot size="large" key={columnData.key} dropId={columnData.key}>
        <Spot $size="large" />
      </DropSpot>
    );
  }

  return (
    <Spot key={columnData.key} $size="large">
      {columnData.arrayOfCards.map((card, i) => {
        // final card will have a drop spot
        if (i === columnData.arrayOfCards.length - 1) {
          return (
            <DropSpot
              size="large"
              key={`${card.value}_of_${card.suit}`}
              dropId={columnData.key}
            >
              <CardUI
                size="large"
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
              size="large"
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
