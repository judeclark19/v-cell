import { Suit } from "@/logic/types";
import Image from "next/image";

import heart from "@/assets/images/heart.svg";
import spade from "@/assets/images/spade.svg";
import club from "@/assets/images/club.svg";
import diamond from "@/assets/images/diamond.svg";

export default function SuitIcon({ suit, size }: { suit: Suit; size: number }) {
  return (
    <>
      {suit === "hearts" && (
        <Image src={heart} alt="heart" width={size} height={size} />
      )}
      {suit === "spades" && (
        <Image src={spade} alt="heart" width={size} height={size} />
      )}
      {suit === "clubs" && (
        <Image src={club} alt="heart" width={size} height={size} />
      )}
      {suit === "diamonds" && (
        <Image src={diamond} alt="heart" width={size} height={size} />
      )}
    </>
  );
}
