"use client";
import { RecoilRoot } from "recoil";
import Board, { questrial } from "@/components/Board/Board";
import styled from "styled-components";
import TapAnimation from "@/components/TapAnimation";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { useState } from "react";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;

  .flex-grow {
    flex-grow: 1;
  }
`;

const Footer = styled.footer`
  padding: 40px;
  color: white;
  margin-top: 10px;
  background-color: #1c5f3d;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 720px) {
    font-size: 14px;

    padding: 20px;

    > div {
      text-align: center;
    }
  }
  a {
    color: inherit;
  }

  .top {
    display: flex;
    gap: 40px;
    justify-content: center;

    hr {
      display: none;
    }

    @media (max-width: 720px) {
      flex-direction: column;
      align-items: center;
      gap: 14px;

      hr {
        display: block;
        width: 100px;
      }

      .vertical-line {
        display: none;
      }
    }
  }

  .bottom {
    font-size: 12px;
    text-align: center;
  }
`;

function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}

export default function Home() {
  return (
    <StyledComponentsRegistry>
      <PageWrapper>
        <RecoilRoot>
          <TapAnimation />
          <div className="flex-grow">
            <Board />
          </div>
        </RecoilRoot>

        <Footer className={questrial.className}>
          <div className="top">
            <div>
              A 2023-2024&nbsp;
              <strong>
                <a href="https://github.com/judeclark19">Code Couture</a>
              </strong>
              &nbsp;creation
            </div>
            <div className="vertical-line">|</div>
            <hr />
            <div>
              Built by
              <strong>
                &nbsp;
                <a href="https://github.com/judeclark19/v-cell">Jude Clark</a>
              </strong>
            </div>
          </div>
          <div className="bottom">Last updated June 8, 2024</div>
        </Footer>
      </PageWrapper>
    </StyledComponentsRegistry>
  );
}
