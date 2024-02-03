"use client";
import { RecoilRoot } from "recoil";
import Board, { questrial } from "@/components/Board/Board";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;

  .flex-grow {
    flex-grow: 1;
  }
`;

const Footer = styled.footer`
  display: flex;
  gap: 40px;
  justify-content: center;
  padding: 40px;
  color: white;
  margin-top: 10px;

  background-color: #1c5f3d;
  a {
    color: inherit;
  }

  hr {
    display: none;
  }

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    gap: 14px;
    padding: 20px;

    .vertical-line {
      display: none;
    }

    hr {
      display: block;
      width: 100px;
    }

    > div {
      text-align: center;
    }
  }
`;

export default function Home() {
  return (
    <PageWrapper>
      <div className="flex-grow">
        <RecoilRoot>
          <Board />
        </RecoilRoot>
      </div>

      <Footer className={questrial.className}>
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
            <a href="https://github.com/judeclark19/react-solitaire">
              Jude Clark
            </a>
          </strong>
        </div>
      </Footer>
    </PageWrapper>
  );
}
