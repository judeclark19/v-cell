"use client";
import { RecoilRoot, atom } from "recoil";
import Board from "@/components/Board/Board";

export default function Home() {
  return (
    <div>
      <RecoilRoot>
        <Board />
      </RecoilRoot>
      <footer
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px"
        }}
      >
        A 2023-2024&nbsp;
        <strong>
          <a href="https://github.com/judeclark19">Code Couture</a>
        </strong>
        &nbsp;creation | Built by{" "}
        <strong>
          &nbsp;
          <a href="https://github.com/judeclark19/react-solitaire">
            Jude Clark
          </a>
        </strong>
      </footer>
    </div>
  );
}
