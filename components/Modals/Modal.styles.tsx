import styled, { css, keyframes } from "styled-components";
import { GameControlButtons, GameTitle } from "../Board/Board.styles";

const growIn = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const shrinkOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0);
    opacity: 0;
  }
`;

export const ModalStyle = styled.div<{
  $isClosing: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: grid;
  place-items: center;

  ${GameTitle} {
    @media screen and (max-width: 480px) {
      font-size: 30px;
    }
  }

  > div {
    background-color: black;
    border-radius: 12px;
    animation: ${(props) =>
      props.$isClosing
        ? css`
            ${shrinkOut} 0.3s ease-out forwards
          `
        : css`
            ${growIn} 0.3s ease-out forwards
          `};
    transform-origin: center;
    padding: 40px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.2);
    position: relative;
    margin: 10px;

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
    margin-bottom: 0;
  }
`;

export const WinModalStyle = styled.div`
  .win-count {
    font-size: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 12px;

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
  }
`;

export const InstructionsModalStyle = styled.div`
  .slide {
    box-sizing: border-box;
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;

    @media screen and (max-width: 992px) {
      width: 345px;
    }

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

    span.gold {
      color: var(--gold);
    }
  }
`;

export const SettingsModalStyle = styled.div`
  max-width: calc(100vw - 20px);

  .settings-section {
    background-color: #222;
    padding: 1rem;
    border-radius: 8px;

    h2 {
      padding-bottom: 0.5rem;
      border-bottom: 3px solid white;
    }

    .dropdowns {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      @media screen and (max-width: 480px) {
        gap: 0.5rem;
      }
    }

    p {
      color: var(--red);
      width: 300px;
      max-width: 100%;
      text-align: center;
      margin: 1rem auto;
    }

    .undo-select,
    .layout-select {
      display: flex;

      label {
        display: flex;
        gap: 30px;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        #undo-select,
        #layout-select {
          padding: 4px;
          font-size: 16px;
        }
      }
    }
  }

  .reset {
    margin: 30px auto 10px auto;
    background-color: var(--red);
    border-color: var(--red);
    width: 100%;
  }
`;
