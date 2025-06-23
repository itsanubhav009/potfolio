import { css } from 'styled-components';

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  flexStart: css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
  `,

  flexEnd: css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: ${({ theme }) => theme.transition};
    cursor: pointer;
    &:hover,
    &:active,
    &:focus {
      color: ${({ theme }) => theme.colors.teal};
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    position: relative;
    transition: ${({ theme }) => theme.transition};
    cursor: pointer;
    color: ${({ theme }) => theme.colors.teal};
    &:hover,
    &:focus,
    &:active {
      color: ${({ theme }) => theme.colors.purple};
      outline: 0;
      &:after {
        width: 100%;
      }
    }
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      bottom: 0.1em;
      background-color: ${({ theme }) => theme.colors.purple};
      transition: ${({ theme }) => theme.transition};
      opacity: 0.7;
    }
  `,

  // Enhanced button with more effects
  button: css`
    color: ${({ theme }) => theme.colors.teal};
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.teal};
    border-radius: ${({ theme }) => theme.borderRadius};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-family: ${({ theme }) => theme.fonts.mono};
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: ${({ theme }) => theme.transition};
    padding: 18px 28px; // Increased padding
    position: relative;
    overflow: hidden;
    z-index: 1;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${({ theme }) => theme.colors.transTeal};
      transform: scaleX(0);
      transform-origin: 0 50%;
      transition: transform 0.5s ease-out;
      z-index: -1;
    }
    
    &:hover,
    &:focus,
    &:active {
      color: ${({ theme }) => theme.colors.navy};
      outline: none;
      box-shadow: 4px 4px 0px ${({ theme }) => theme.colors.teal}; 
      transform: translate(-2px, -2px);
      
      &:before {
        transform: scaleX(1);
        background: ${({ theme }) => theme.colors.teal};
      }
    }
    
    &:active {
      transform: translate(0px, 0px);
      box-shadow: 0px 0px 0px ${({ theme }) => theme.colors.teal};
    }
    
    &:after {
      display: none !important;
    }
  `,

  boxShadow: css`
    box-shadow: 0 10px 30px -15px ${({ theme }) => theme.colors.shadowNavy};
    transition: ${({ theme }) => theme.transition};
    
    &:hover,
    &:focus {
      box-shadow: 0 20px 30px -15px ${({ theme }) => theme.colors.shadowNavy};
      transform: translateY(-5px);
    }
  `,
  
  // New mixin for card hover effects
  cardHover: css`
    transition: ${({ theme }) => theme.transition};
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 30px -15px ${({ theme }) => theme.colors.shadowNavy};
      
      &:after {
        transform: scaleX(1);
      }
    }
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, ${({ theme }) => theme.colors.teal}, ${({ theme }) => theme.colors.purple});
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.4s ease;
    }
  `,
  
  // Gradient text effect
  gradientText: css`
    background: linear-gradient(120deg, ${({ theme }) => theme.colors.teal}, ${({ theme }) => theme.colors.purple});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  `,
};

export default mixins;