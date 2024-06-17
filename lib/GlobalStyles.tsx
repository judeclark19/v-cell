import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --max-width: 1100px;
    --border-radius: 12px;
    --font-mono: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono",
      "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro",
      "Fira Mono", "Droid Sans Mono", "Courier New", monospace;

  }

body.poker {
   color-scheme: dark;
    /* other red shades: #dc3a3a; #c33f32 */
    --red: #ef3e56;
    --goldAlpha: #fede4dbf;
    --gold: #fede4d;
    --page-background: #35654d;
    --lime: lime;
    --textColor: white;
    --header-footer-border-color: transparent;
    --timer-shadow: 0px 0px 5px var(--goldAlpha);
    --control-button-background: transparent;
    --control-button-color: white;
    --control-button-border: #1b3427;
    --board-border-color: transparent;
    --board-border-width: 4px;
    --board-border-radius: 8px;
    --board-box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
    --scroll-area-background: #487860;
    --card-spot-border-color: var(--goldAlpha);
    --card-spot-label-color: rgba(255, 255, 255, 0.5);
    --modal-background-color:  black;
    --settings-section-background: #222;
    --settings-section-divider: white;
    --footer-background-color: #1c5f3d;
 }

 body.times {
    color-scheme: light;
   --red: #ef3e56;
    --goldAlpha: #b59410bf;
    --gold: #b59410;
    --page-background: white;
    --lime: lime;
     --light-gray: #d3d6da;
    --textColor: black;
     --header-footer-border-color: var(--light-gray);
        --timer-shadow: none;
    --control-button-background: white;
    --control-button-color: black;
    --control-button-border: black;
    --board-border-color: var(--light-gray);
    --board-border-width: 1.5px;
    --board-border-radius: 2px;
    --board-box-shadow: none;
    --scroll-area-background: #fafafa;
    --card-spot-border-color:rgba(0, 0, 0, 0.7);
    --card-spot-label-color: rgba(0, 0, 0, 0.5);
    --modal-background-color:  white;
    --settings-section-background: var(--scroll-area-background);
     --settings-section-divider: black;
    --footer-background-color: white;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    color: var(--textColor);
    background-color: var(--page-background);
  }

  button {
    border-radius: 4px;
    cursor: pointer;
    background-color: #0099cc;
    border-color: #0099cc;
    color: white;
    padding: 0.5rem 1rem;
    font-size: 18px;
  }

  @media screen and (max-width: 992px) {
    button {
      font-size: 14px;
      padding: 5px;
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default GlobalStyles;
