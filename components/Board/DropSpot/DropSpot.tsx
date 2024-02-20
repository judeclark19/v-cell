import React from "react";
import { cardSizeType, cardSizes } from "@/components/Card/CardUI.styles";

export default function DropSpot({
  size,
  dropId,
  children
}: {
  size: cardSizeType;
  dropId: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={dropId}
      data-dropid={dropId}
      style={{
        height: `${cardSizes[size].height + cardSizes[size].spotPadding}px`,
        width: `${cardSizes[size].width + cardSizes[size].spotPadding}px`
      }}
    >
      {children}
    </div>
  );
}
