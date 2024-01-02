import { observer } from "mobx-react-lite";
import React from "react";
import { Foundation } from "./FoundationsClass";
import DropSpot from "../DropSpot/DropSpot";
import CardUI from "@/components/Card/CardUI";
import { Spot } from "../Board.styles";

const FoundationUI = observer(
  ({ foundationData }: { foundationData: Foundation }) => {
    return (
      <DropSpot
        size="medium"
        key={foundationData.key}
        dropId={foundationData.key}
      >
        <Spot $size="medium">
          <span>A</span>
          {foundationData.arrayOfCards.map((card, i) => (
            <CardUI
              size="medium"
              key={`${card.value}_of_${card.suit}`}
              card={card}
              zIndex={i + 1}
            />
          ))}
        </Spot>
      </DropSpot>
    );
  }
);

export default FoundationUI;
