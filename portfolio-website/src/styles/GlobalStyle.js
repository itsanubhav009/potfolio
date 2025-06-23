import { createGlobalStyle } from 'styled-components';
import theme from './theme';
const { colors, fontSizes, fonts } = theme;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: ${colors.navy};
    color: ${colors.slate};
    line-height: 1.3;
    font-family: ${fonts.main};
    font-size: ${fontSizes.lg};
    cursor: none; /* Hide default cursor when using custom cursor */

    &.hidden {
      overflow: hidden;
    }

    &.blur {
      overflow: hidden;
      #root > * {
        filter: blur(5px) brightness(0.7);
        transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
        pointer-events: none;
        user-select: none;
      }
    }
  }

  ::selection {
    background-color: ${colors.teal};
    color: ${colors.navy};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 10px 0;
    font-weight: 600;
    color: ${colors.lightestSlate};
    line-height: 1.1;
  }

  p {
    margin: 0 0 15px 0;
    line-height: 1.6;
  }

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    cursor: none !important; /* Important for custom cursor */

    &:hover,
    &:focus {
      color: ${colors.teal};
    }
  }

  button {
    cursor: none !important; /* Important for custom cursor */
    border: 0;
    border-radius: 0;

    &:focus,
    &:active {
      outline-color: ${colors.teal};
    }
  }

  ul, ol {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  /* Retro horizontal scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${colors.navy};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${colors.lightNavy};
    background: linear-gradient(180deg, ${colors.teal}, ${colors.purple});
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, ${colors.teal}, ${colors.pink});
  }

  .section-heading {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 40px;
    width: 100%;
    font-size: clamp(26px, 5vw, ${fontSizes.h3});
    white-space: nowrap;

    &:after {
      content: '';
      display: block;
      position: relative;
      top: -5px;
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background: linear-gradient(90deg, ${colors.teal}, ${colors.lightestNavy}BB);

      @media (max-width: 768px) {
        width: 200px;
      }
      @media (max-width: 600px) {
        width: 100%;
      }
    }

    &:before {
      position: relative;
      bottom: 4px;
      counter-increment: section;
      content: '0' counter(section) '.';
      margin-right: 10px;
      color: ${colors.teal};
      font-family: ${fonts.mono};
      font-size: clamp(${fontSizes.md}, 3vw, ${fontSizes.lg});
      font-weight: 400;

      @media (max-width: 480px) {
        margin-bottom: -3px;
        margin-right: 5px;
      }
    }
  }
  
  /* Hide default cursor */
  * {
    cursor: none !important;
  }
  
  /* Accessibility: Only hide cursor when not using keyboard navigation */
  body:not(.using-keyboard) * {
    cursor: none !important;
  }
  
  /* When keyboard is detected, restore default cursor behavior */
  body.using-keyboard * {
    cursor: auto !important;
  }
  
  /* For screen readers */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  /* Detect keyboard users and add class to body */
  body:not(.using-keyboard) *:focus {
    outline: none !important;
  }
`;

export default GlobalStyle;
