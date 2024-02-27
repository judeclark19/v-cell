"use client";
import { RecoilRoot } from "recoil";
import Board, { questrial } from "@/components/Board/Board";
import styled from "styled-components";
import TapAnimation from "@/components/TapAnimation";

export default function PlayPage() {
  return (
    <div className="flex-grow">
      <TapAnimation />
      <RecoilRoot>
        <Board />
      </RecoilRoot>
    </div>
  );
}
