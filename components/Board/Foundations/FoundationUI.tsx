import { observer } from "mobx-react-lite";
import React from "react";
import { Foundation } from "./FoundationsClass";
import DropSpot from "../DropSpot/DropSpot";
import CardUI from "@/components/Card/CardUI";
import { Spot } from "../Board.styles";
import { useRecoilValue } from "recoil";
import {
  getCardSize,
  windowHeightState,
  windowWidthState
} from "@/logic/OrientationAndSize";
import { poppins } from "@/app/page";

const FoundationUI = observer(
  ({ foundationData }: { foundationData: Foundation }) => {
    const windowWidth = useRecoilValue(windowWidthState);
    const windowHeight = useRecoilValue(windowHeightState);

    return (
      <DropSpot
        size={getCardSize(windowWidth, windowHeight)}
        key={foundationData.key}
        dropId={foundationData.key}
      >
        <Spot $size={getCardSize(windowWidth, windowHeight)}>
          <div className={`label ${poppins.className}`}>A</div>
          {foundationData.arrayOfCards.map((card, i) => (
            <CardUI
              size={getCardSize(windowWidth, windowHeight)}
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
