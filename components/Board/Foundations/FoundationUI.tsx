import { observer } from "mobx-react-lite";
import React from "react";
import { Foundation } from "./FoundationsClass";
import DropSpot from "../DropSpot/DropSpot";
import CardUI from "@/components/Card/CardUI";
import { Spot } from "../Board.styles";
import { useRecoilValue } from "recoil";
import { windowWidthState } from "@/logic/BoardOrientation";

const FoundationUI = observer(
  ({ foundationData }: { foundationData: Foundation }) => {
    const windowWidth = useRecoilValue(windowWidthState);

    return (
      <DropSpot
        size={windowWidth < 1180 ? "small" : "medium"}
        key={foundationData.key}
        dropId={foundationData.key}
      >
        <Spot $size={windowWidth < 1180 ? "small" : "medium"}>
          <span>A</span>
          {foundationData.arrayOfCards.map((card, i) => (
            <CardUI
              size={windowWidth < 1180 ? "small" : "medium"}
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
