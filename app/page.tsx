"use client";

import Image from "next/image";
import styles from "./page.module.css";
import gameState from "@/logic/GameState";
import Board from "@/components/Board/Board";

export default function Home() {
  return (
    <div>
      <Board />
    </div>
  );
}
