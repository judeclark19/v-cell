import appState from "@/logic/AppState";
import { observer } from "mobx-react-lite";
import React from "react";
import FoundationUI from "./FoundationUI";

import { foundationKeys } from "@/logic/types";
import { useRecoilValue } from "recoil";
import { cardSizeState } from "@/logic/RecoilAtoms";
import {
  Filler,
  FoundationsStyle,
  TimerPosition
} from "./FoundationsUI.styles";
import TimerUI from "../TimerUI";

const FoundationsUI = observer(() => {
  const foundations = appState.currentBoard.foundations;
  const cardSize = useRecoilValue(cardSizeState);

  return (
    <>
      <FoundationsStyle>
        <Filler $cardSize={cardSize} />
        <Filler $cardSize={cardSize} />
        <Filler $cardSize={cardSize} />
        <TimerPosition>
          <TimerUI />
        </TimerPosition>
        {foundationKeys.map((key) => {
          return <FoundationUI key={key} foundationData={foundations[key]} />;
        })}
      </FoundationsStyle>
    </>
  );
});

export default FoundationsUI;
