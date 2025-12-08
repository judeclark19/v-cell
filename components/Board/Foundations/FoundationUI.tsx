import { observer } from "mobx-react-lite";
import { Foundation } from "./FoundationsClass";
import DropSpot from "../DropSpot/DropSpot";
import CardUI from "@/components/Card/CardUI";
import { Spot } from "../Board.styles";
import { questrial } from "../Board";
import appState from "@/logic/AppState";

const FoundationUI = observer(
  ({ foundationData }: { foundationData: Foundation }) => {
    const cardSize = appState.cardSize;

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
