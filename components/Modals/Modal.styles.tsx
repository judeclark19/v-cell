import styled from "styled-components";
import { GameControlButtons, GameTitle } from "../Board/Board.styles";

export const ModalStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: grid;
  place-items: center;

  > div {
    background-color: black;
    border-radius: 12px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.2);
    position: relative;

    @media screen and (max-width: 768px) {
      padding: 20px;
    }
    @media screen and (max-width: 480px) {
      padding: 10px;
    }
  }

  .modal-close {
    cursor: pointer;
    position: absolute;
    right: 18px;
    top: 18px;
    font-size: 28px;
    opacity: 0.7;
    transition: all 150ms ease-in-out;

    &:hover {
      opacity: 1;
      scale: 1.1;
    }

    @media screen and (max-width: 768px) {
      right: 10px;
      top: 10px;
      font-size: 20px;
    }
  }

  ${GameControlButtons} {
    margin-top: 12px;
    margin-bottom: 0;
  }
`;

export const WinModalStyle = styled.div`
  ${GameTitle} {
    @media screen and (max-width: 480px) {
      font-size: 30px;
    }
  }

  .win-count {
    font-size: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 6px;

    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
    @media screen and (max-width: 480px) {
      font-size: 12px;
    }

    .win-count-number {
      font-size: 40px;
      font-weight: bold;
      color: var(--gold);

      @media screen and (max-width: 768px) {
        font-size: 30px;
      }
      @media screen and (max-width: 480px) {
        font-size: 20px;
      }
    }

    .since {
      font-size: 14px;
      color: gray;
      font-style: italic;

      span {
        color: var(--gold);
      }

      @media screen and (max-width: 768px) {
        font-size: 12px;
      }
      @media screen and (max-width: 480px) {
        font-size: 10px;
      }
    }
  }
  .reset {
    margin: 10px auto;
    background-color: var(--red);
    padding: 8px;
    width: fit-content;
  }
`;

export const InstructionsModalStyle = styled.div`
  .slide {
    box-sizing: border-box;
    width: 345px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;

    @media screen and (max-width: 480px) {
      width: 250px;
      max-width: 100%;
      font-size: 14px;
    }

    ol {
      list-style-position: inside;

      li span {
        color: var(--gold);
      }
    }
  }
`;
