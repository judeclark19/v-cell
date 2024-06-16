import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --max-width: 1100px;
    --border-radius: 12px;
    --font-mono: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono",
      "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro",
      "Fira Mono", "Droid Sans Mono", "Courier New", monospace;

  }

 body.classic {
    /* other red shades: #dc3a3a; #c33f32 */
    --red: #ef3e56;
    --goldAlpha: #fede4dbf;
    --gold: #fede4d;
    --page-background: #35654d;
    --lime: lime;
    --textColor: white;
 }

 body.times {
   --red: #ef3e56;
    --goldAlpha: #fede4dbf;
    --gold: #fede4d;
    --page-background: white;
    --lime: lime;
    --textColor: black;
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
