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
    --hand-border-color: #000080;
    --modal-background-color:  black;
    --highscore-table-even-row: #1b1b1b;
    --settings-section-background: #222;
    --settings-section-divider: white;
    --footer-background-color: #1c5f3d;
 }

 body.times-light {
    color-scheme: light;
    --red: #ef3e56;
    --goldAlpha: #b59410bf;
    --gold: #b59410;
    --page-background: white;
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
    --scroll-area-background: #f8f8f8;
    --card-spot-border-color:rgba(0, 0, 0, 0.7);
    --card-spot-label-color: rgba(0, 0, 0, 0.5);
    --hand-border-color: #000080;
    --modal-background-color:  white;
    --highscore-table-even-row: var(--scroll-area-background);
    --settings-section-background: var(--scroll-area-background);
    --settings-section-divider: black;
    --footer-background-color: white;
  }

  body.times-dark {
  color-scheme: dark;
  --red: #ef3e56;
  --goldAlpha: #d7b428bf;
  --gold: #d7b428;
  --pearl: #f8f8f8;
  --page-background: #121214;
  --light-gray: #3a3a3c; 
  --textColor: white;
  --header-footer-border-color: var(--light-gray);
  --timer-shadow: none;
  --control-button-background: black;
  --control-button-color: white;
  --control-button-border: white;
  --board-border-color: var(--light-gray);
  --board-border-width: 1.5px;
  --board-border-radius: 2px;
  --board-box-shadow: none;
  --scroll-area-background: #1a1a1a;
  --card-spot-border-color: var(--pearl);
  --card-spot-label-color: var(--pearl);
  --hand-border-color: #e8e8ff;
  --modal-background-color:  black;
  --highscore-table-even-row: #1b1b1b;
  --settings-section-background: var(--scroll-area-background);
  --settings-section-divider: black;
  --footer-background-color: var(--page-background);
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
