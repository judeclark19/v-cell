import { observer } from "mobx-react-lite";
import React from "react";
import { Foundation } from "./FoundationsClass";
import DropSpot from "../DropSpot/DropSpot";
import CardUI from "@/components/Card/CardUI";
import { Spot } from "../Board.styles";
import { useRecoilValue } from "recoil";
import { cardSizeState } from "@/logic/OrientationAndSize";
import { questrial } from "../Board";

const FoundationUI = observer(
  ({ foundationData }: { foundationData: Foundation }) => {
    const cardSize = useRecoilValue(cardSizeState);

    return (
      <DropSpot
        size={cardSize}
        key={foundationData.key}
        dropId={foundationData.key}
      >
        <Spot $size={cardSize}>
          <div className={`label ${questrial.className}`}>A</div>
          {foundationData.arrayOfCards.map((card, i) => (
            <CardUI
              size={cardSize}
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
