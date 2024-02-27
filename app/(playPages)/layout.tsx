"use client";

import { luckyGuy, questrial } from "@/components/Board/Board";
import styled from "styled-components";
import Image from "next/image";
import headerImage from "@/assets/images/v-cell_header1.png";
import { useEffect, useState } from "react";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;

  .flex-grow {
    flex-grow: 1;
  }
`;

const HeaderImage = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px auto 0 auto;
  width: calc(100vw - 20px);
  max-width: 1100px;
  border-radius: 4px;
  img {
    width: 100%;
    max-width: 700px;
    height: auto;
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

export default function PlayPagesLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div
        className={luckyGuy.className}
        style={{
          fontSize: "54px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          justifyContent: "center",
          alignItems: "center",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)"
        }}
      >
        <Image
          src={headerImage}
          width={1700}
          height={400}
          alt="V-Cell"
          style={{
            width: "600px",
            maxWidth: "100vw",
            height: "auto"
          }}
        />
        Loading...
      </div>
    );
  }
  return (
    <PageWrapper>
      <HeaderImage>
        <Image
          src={headerImage}
          width={1700}
          height={400}
          alt="V-Cell header image"
          priority
        />
      </HeaderImage>

      {children}
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
        <div className="bottom">Last updated Feb 24, 2024</div>
      </Footer>
    </PageWrapper>
  );
}
