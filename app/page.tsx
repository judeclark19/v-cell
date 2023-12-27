"use client";

import Image from "next/image";
import styles from "./page.module.css";
import gameState from "@/logic/GameState";

export default function Home() {
  return (
    <div>
      <button
        onClick={() => {
          gameState.shuffleDeck();
          gameState.printDeck();
        }}
      >
        Print deck
      </button>
    </div>
  );
}
