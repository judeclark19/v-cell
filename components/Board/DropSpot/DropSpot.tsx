import React from "react";
import { cardSize, cardSizes } from "@/components/Card/CardUI.styles";

export default function DropSpot({
  size,
  dropId,
  children
}: {
  size: cardSize;
  dropId: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={dropId}
      data-dropid={dropId}
      style={{
        height: `${cardSizes[size].height + cardSizes[size].spotPadding / 2}px`,
        width: `${cardSizes[size].width + cardSizes[size].spotPadding / 2}px`
      }}
    >
      {children}
    </div>
  );
}
