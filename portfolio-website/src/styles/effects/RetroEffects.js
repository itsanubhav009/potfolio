import { css, keyframes } from 'styled-components';

// CRT/Scanline Effect
const scanlines = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 15px;
  }
`;

const flicker = keyframes`
  0% {
    opacity: 0.97;
  }
  5% {
    opacity: 0.9;
  }
  10% {
    opacity: 0.97;
  }
  15% {
    opacity: 0.92;
  }
  20% {
    opacity: 0.9;
  }
  25% {
    opacity: 0.97;
  }
  30% {
    opacity: 0.98;
  }
  35% {
    opacity: 0.94;
  }
  40% {
    opacity: 0.98;
  }
  45% {
    opacity: 0.93;
  }
  50% {
    opacity: 0.99;
  }
  55% {
    opacity: 0.9;
  }
  60% {
    opacity: 0.93;
  }
  65% {
    opacity: 0.97;
  }
  70% {
    opacity: 0.92;
  }
  75% {
    opacity: 0.94;
  }
  80% {
    opacity: 0.92;
  }
  85% {
    opacity: 0.98;
  }
  90% {
    opacity: 0.95;
  }
  95% {
    opacity: 0.93;
  }
  100% {
    opacity: 0.97;
  }
`;

const glitch = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-3px, 3px);
  }
  40% {
    transform: translate(-3px, -3px);
  }
  60% {
    transform: translate(3px, 3px);
  }
  80% {
    transform: translate(3px, -3px);
  }
  100% {
    transform: translate(0);
  }
`;

const textShadowPopIn = keyframes`
  0% {
    text-shadow: 0 0 0 rgba(94, 234, 212, 0), 0 0 0 rgba(167, 139, 250, 0);
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    text-shadow: 0 0 15px rgba(94, 234, 212, 0.5), 0 0 30px rgba(167, 139, 250, 0.3);
    transform: translateY(0);
    opacity: 1;
  }
`;

const neonFlicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 
      0 0 5px #5eead4,
      0 0 10px #5eead4,
      0 0 15px #5eead4,
      0 0 20px #5eead4,
      0 0 30px #5eead4,
      0 0 40px #5eead4;
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
`;

const rainbowText = keyframes`
  0% { color: #ff0000; }
  15% { color: #ff00ff; }
  30% { color: #0000ff; }
  45% { color: #00ffff; }
  60% { color: #00ff00; }
  75% { color: #ffff00; }
  90% { color: #ff0000; }
  100% { color: #ff0000; }
`;

// Retro Grid Background
const retroGrid = css`
  background-image: 
    linear-gradient(rgba(94, 234, 212, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(94, 234, 212, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
`;

// CRT Screen Effect
const crtEffect = css`
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(18, 16, 16, 0) 50%, 
      rgba(0, 0, 0, 0.1) 50%
    );
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 10;
    animation: ${scanlines} 0.5s linear infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(18, 16, 16, 0.05);
    opacity: 0;
    z-index: 9;
    pointer-events: none;
    animation: ${flicker} 0.3s infinite;
  }
`;

// Glitch Effect
const glitchEffect = css`
  position: relative;
  
  &:hover {
    animation: ${glitch} 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
    color: ${({ theme }) => theme.colors.teal};
  }
`;

// Neon Text Effect
const neonText = css`
  color: #fff;
  text-shadow: 
    0 0 5px #5eead4,
    0 0 10px #5eead4,
    0 0 15px #5eead4,
    0 0 20px #5eead4,
    0 0 30px #5eead4,
    0 0 40px #5eead4;
  
  &:hover {
    animation: ${neonFlicker} 2s infinite alternate;
  }
`;

// VHS Tracking Lines
const vhsTrackingLines = css`
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.05),
      rgba(0, 0, 0, 0.05) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    z-index: 1;
  }
`;

// Pixel Border
const pixelBorder = css`
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: transparent;
    border: 3px solid transparent;
    border-image: url("data:image/svg+xml,%3Csvg width='9' height='9' viewBox='0 0 9 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H3V3H0V0Z' fill='%235eead4'/%3E%3Cpath d='M3 0H6V3H3V0Z' fill='%235eead4'/%3E%3Cpath d='M6 0H9V3H6V0Z' fill='%235eead4'/%3E%3Cpath d='M0 3H3V6H0V3Z' fill='%235eead4'/%3E%3Cpath d='M6 3H9V6H6V3Z' fill='%235eead4'/%3E%3Cpath d='M0 6H3V9H0V6Z' fill='%235eead4'/%3E%3Cpath d='M3 6H6V9H3V6Z' fill='%235eead4'/%3E%3Cpath d='M6 6H9V9H6V6Z' fill='%235eead4'/%3E%3C/svg%3E") 3 stretch;
    z-index: 0;
  }
`;

// Text Reveal Animation
const textReveal = css`
  opacity: 0;
  transform: translateY(10px);
  animation: ${textShadowPopIn} 0.5s forwards;
  animation-delay: ${props => props.delay || '0s'};
`;

// Rainbow Text Effect
const rainbowTextEffect = css`
  &:hover {
    animation: ${rainbowText} 2s linear infinite;
  }
`;

export {
  retroGrid,
  crtEffect,
  glitchEffect,
  neonText,
  vhsTrackingLines,
  pixelBorder,
  textReveal,
  rainbowTextEffect,
  scanlines,
  flicker,
  glitch,
  neonFlicker,
  rainbowText,
  textShadowPopIn
};
