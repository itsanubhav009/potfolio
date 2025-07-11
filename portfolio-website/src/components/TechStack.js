import React, { useEffect, useState, useCallback, memo } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Tech Logos (Base64 or import paths)
const techLogos = {
  JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  HTML: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  CSS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  Node: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  MongoDB: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  GraphQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  Docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  AWS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
  Redux: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  Next: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  Git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  Sass: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
  Express: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  Jest: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
  Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  PostgreSQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  Firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  Figma: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  Default: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg'
};

// Animation keyframes
const starTwinkle = keyframes`
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
`;

const glitch = keyframes`
  0% {
    transform: translate(0);
    text-shadow: -2px 0 #ff00c1, 2px 0 #00ff9f;
  }
  2% {
    transform: translate(-2px, 2px);
    text-shadow: 2px -2px #ff00c1, -2px 2px #00ff9f;
  }
  4% {
    transform: translate(-1px, -1px);
    text-shadow: 1px 1px #ff00c1, -1px -1px #00ff9f;
  }
  6% {
    transform: translate(1px, -2px);
    text-shadow: -1px 0 #ff00c1, 1px 0 #00ff9f;
  }
  8% {
    transform: translate(0);
    text-shadow: -2px 0 #ff00c1, 2px 0 #00ff9f;
  }
  10% {
    transform: translate(-2px, 2px);
    text-shadow: 2px -2px #ff00c1, -2px 2px #00ff9f;
  }
  12% {
    transform: translate(0);
    text-shadow: none;
  }
  100% {
    transform: translate(0);
    text-shadow: none;
  }
`;

const scanline = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

const flicker = keyframes`
  0%, 100% { opacity: 1; }
  8%, 10% { opacity: 0.8; }
  20%, 25% { opacity: 0.95; }
  28%, 33% { opacity: 0.85; }
  40%, 45% { opacity: 0.9; }
  48%, 50% { opacity: 0.7; }
  53%, 55% { opacity: 0.85; }
`;

const neonPulse = keyframes`
  0%, 100% {
    text-shadow: 
      0 0 5px rgba(0, 180, 180, 0.8),
      0 0 10px rgba(0, 180, 180, 0.5),
      0 0 15px rgba(0, 180, 180, 0.3),
      0 0 20px rgba(0, 180, 180, 0.2);
  }
  50% {
    text-shadow: 
      0 0 5px rgba(0, 180, 180, 0.5),
      0 0 10px rgba(0, 180, 180, 0.3),
      0 0 15px rgba(0, 180, 180, 0.2),
      0 0 20px rgba(0, 180, 180, 0.1);
  }
`;

const pixelShake = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(1px, 1px) rotate(0.5deg); }
  50% { transform: translate(-1px, -1px) rotate(-0.5deg); }
  75% { transform: translate(1px, -1px) rotate(0.5deg); }
`;

const glitchAnim = keyframes`
  0% {
    clip-path: inset(80% 0 0 0);
    transform: translate(-2px, -2px);
  }
  10% {
    clip-path: inset(10% 0 85% 0);
    transform: translate(2px, 2px);
  }
  20% {
    clip-path: inset(80% 0 0 0);
    transform: translate(-2px, 2px);
  }
  30% {
    clip-path: inset(10% 0 85% 0);
    transform: translate(2px, -2px);
  }
  40% {
    clip-path: inset(50% 0 30% 0);
    transform: translate(-2px, -2px);
  }
  50% {
    clip-path: inset(10% 0 85% 0);
    transform: translate(2px, 2px);
  }
  60% {
    clip-path: inset(80% 0 0 0);
    transform: translate(-2px, 2px);
  }
  70% {
    clip-path: inset(10% 0 85% 0);
    transform: translate(2px, -2px);
  }
  80% {
    clip-path: inset(50% 0 30% 0);
    transform: translate(-2px, -2px);
  }
  90% {
    clip-path: inset(10% 0 85% 0);
    transform: translate(2px, 2px);
  }
  100% {
    clip-path: inset(80% 0 0 0);
    transform: translate(0);
  }
`;

const crtOnOff = keyframes`
  0% {
    transform: scale(1, 0.8) translate(0, 0);
    filter: brightness(30);
    opacity: 0;
  }
  3% {
    transform: scale(1, 0.8) translate(0, 0);
    filter: brightness(30);
    opacity: 1;
  }
  8% {
    transform: scale(1, 1.2) translate(0, -10px);
    filter: brightness(10);
  }
  13% {
    transform: scale(1, 1) translate(0, 0);
    filter: contrast(1) brightness(1.5);
  }
  100% {
    transform: scale(1) translate(0, 0);
    filter: contrast(1) brightness(1);
  }
`;

const retroFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.9);
    filter: brightness(1.2) blur(2px);
  }
  10% {
    opacity: 0.3;
    filter: brightness(1.5) blur(1px);
  }
  30% {
    opacity: 0.5;
    filter: brightness(1.3) blur(0.5px);
  }
  50% {
    filter: brightness(1.1) blur(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: brightness(1) blur(0);
  }
`;

const scanInterlace = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100%;
  }
`;

const borderGlow = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 5px rgba(0, 180, 180, 0.3),
      0 0 10px rgba(0, 180, 180, 0.2),
      inset 0 0 5px rgba(0, 180, 180, 0.2);
  }
  50% {
    box-shadow: 
      0 0 8px rgba(0, 180, 180, 0.5),
      0 0 15px rgba(0, 180, 180, 0.3),
      inset 0 0 8px rgba(0, 180, 180, 0.3);
  }
`;

// Space background container with CRT effect - DARKER
const CRTContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #030810 0%, #050f20 50%, #030810 100%);
  padding: 40px 20px;
  animation: ${crtOnOff} 2s ease-in-out;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.15) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    z-index: 20;
    opacity: 0.7;
    animation: ${scanInterlace} 10s linear infinite;
  }

  /* CRT edge effect */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      ellipse at center,
      transparent 70%,
      rgba(0, 0, 0, 0.8) 150%
    );
    pointer-events: none;
    z-index: 21;
  }
`;

// Star field background
const StarField = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  
  /* Small Stars */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(1px 1px at 5% 10%, white 1px, transparent 0),
      radial-gradient(1px 1px at 10% 20%, white 1px, transparent 0),
      radial-gradient(1px 1px at 15% 30%, white 1px, transparent 0),
      radial-gradient(1px 1px at 20% 40%, white 1px, transparent 0),
      radial-gradient(1px 1px at 25% 50%, white 1px, transparent 0),
      radial-gradient(1px 1px at 30% 60%, white 1px, transparent 0),
      radial-gradient(1px 1px at 35% 70%, white 1px, transparent 0),
      radial-gradient(1px 1px at 40% 80%, white 1px, transparent 0),
      radial-gradient(1px 1px at 45% 90%, white 1px, transparent 0),
      radial-gradient(1px 1px at 50% 15%, white 1px, transparent 0),
      radial-gradient(1px 1px at 55% 25%, white 1px, transparent 0),
      radial-gradient(1px 1px at 60% 35%, white 1px, transparent 0),
      radial-gradient(1px 1px at 65% 45%, white 1px, transparent 0),
      radial-gradient(1px 1px at 70% 55%, white 1px, transparent 0),
      radial-gradient(1px 1px at 75% 65%, white 1px, transparent 0),
      radial-gradient(1px 1px at 80% 75%, white 1px, transparent 0),
      radial-gradient(1px 1px at 85% 85%, white 1px, transparent 0),
      radial-gradient(1px 1px at 90% 95%, white 1px, transparent 0),
      radial-gradient(1px 1px at 95% 5%, white 1px, transparent 0),
      radial-gradient(1px 1px at 7% 65%, white 1px, transparent 0),
      radial-gradient(1px 1px at 12% 28%, white 1px, transparent 0),
      radial-gradient(1px 1px at 18% 44%, white 1px, transparent 0),
      radial-gradient(1px 1px at 27% 78%, white 1px, transparent 0),
      radial-gradient(1px 1px at 33% 34%, white 1px, transparent 0),
      radial-gradient(1px 1px at 38% 52%, white 1px, transparent 0),
      radial-gradient(1px 1px at 43% 23%, white 1px, transparent 0),
      radial-gradient(1px 1px at 57% 88%, white 1px, transparent 0),
      radial-gradient(1px 1px at 62% 73%, white 1px, transparent 0),
      radial-gradient(1px 1px at 72% 48%, white 1px, transparent 0),
      radial-gradient(1px 1px at 88% 82%, white 1px, transparent 0),
      radial-gradient(1px 1px at 93% 16%, white 1px, transparent 0);
    animation: ${starTwinkle} 3s ease-in-out infinite alternate;
  }
  
  /* Medium Stars */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(1.5px 1.5px at 22% 35%, white 1px, transparent 0),
      radial-gradient(1.5px 1.5px at 45% 65%, white 1px, transparent 0),
      radial-gradient(1.5px 1.5px at 68% 22%, white 1px, transparent 0),
      radial-gradient(1.5px 1.5px at 78% 58%, white 1px, transparent 0),
      radial-gradient(1.5px 1.5px at 15% 85%, white 1px, transparent 0),
      radial-gradient(1.5px 1.5px at 36% 48%, white 1px, transparent 0),
      radial-gradient(1.5px 1.5px at 52% 32%, white 1px, transparent 0),
      radial-gradient(1.5px 1.5px at 85% 75%, white 1px, transparent 0),
      
      /* Larger stars with glow */
      radial-gradient(2px 2px at 35% 75%, rgba(200, 255, 255, 1) 1px, transparent 0),
      radial-gradient(2px 2px at 65% 42%, rgba(200, 255, 255, 1) 1px, transparent 0),
      radial-gradient(2px 2px at 25% 25%, rgba(200, 255, 255, 1) 1px, transparent 0),
      radial-gradient(2px 2px at 75% 95%, rgba(200, 255, 255, 1) 1px, transparent 0);
    filter: drop-shadow(0 0 2px rgba(100, 200, 255, 0.4));
    animation: ${starTwinkle} 5s ease-in-out infinite;
  }
`;

// Nebula background with retro colors - DARKER
const RetroNebula = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background: 
    radial-gradient(
      ellipse at 20% 30%,
      rgba(80, 0, 120, 0.08) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse at 80% 40%,
      rgba(0, 100, 150, 0.07) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse at 50% 60%,
      rgba(120, 0, 120, 0.04) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse at 30% 70%,
      rgba(0, 100, 80, 0.05) 0%,
      transparent 60%
    );
  pointer-events: none;
  opacity: 0.5;
  animation: ${flicker} 5s infinite;
`;

// Content container 
const ContentContainer = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 30px;
`;

// Retro Terminal Dashboard - DARKER
const RetroTerminal = styled.div`
  position: relative;
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 25px;
  background: rgba(5, 10, 20, 0.75);
  border-radius: 8px;
  border: 2px solid rgba(0, 150, 150, 0.4);
  box-shadow: 0 0 15px rgba(0, 150, 150, 0.2), inset 0 0 10px rgba(0, 0, 0, 0.7);
  animation: ${borderGlow} 3s infinite, ${retroFadeIn} 1s ease-out;
  overflow: hidden;
  backdrop-filter: blur(5px);
  
  /* Scanline animation */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: rgba(0, 180, 180, 0.3);
    box-shadow: 0 0 10px rgba(0, 180, 180, 0.3);
    animation: ${scanline} 4s linear infinite;
    z-index: 2;
    opacity: 0.5;
  }
`;

// Retro Header with glitch effect
const RetroHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(0, 150, 150, 0.2);
  position: relative;
  
  /* Glitch effect container */
  .header-title-container {
    position: relative;
  }
  
  /* Main text */
  .header-title {
    font-family: 'VT323', 'Courier New', monospace;
    font-size: 38px;
    font-weight: 600;
    color: rgba(0, 180, 180, 0.9);
    letter-spacing: 2px;
    text-transform: uppercase;
    position: relative;
    animation: ${pixelShake} 3s infinite, ${neonPulse} 2s infinite;
    
    &::before {
      content: "TECH SKILLS DATABASE";
      position: absolute;
      left: 0;
      top: 0;
      color: rgba(180, 0, 180, 0.5);
      width: 100%;
      height: 100%;
      overflow: hidden;
      animation: ${glitchAnim} 4s infinite;
      z-index: 1;
      text-shadow: 2px 0 #007777;
      clip-path: inset(50% 0 50% 0);
      transform: translateX(-2px);
    }
    
    &::after {
      content: "TECH SKILLS DATABASE";
      position: absolute;
      left: 0;
      top: 0;
      color: rgba(0, 180, 180, 0.5);
      width: 100%;
      height: 100%;
      overflow: hidden;
      animation: ${glitchAnim} 3.5s infinite reverse;
      z-index: 1;
      text-shadow: -2px 0 #770077;
      clip-path: inset(30% 0 60% 0);
      transform: translateX(2px);
    }
  }
  
  .header-meta {
    font-family: 'VT323', 'Courier New', monospace;
    font-size: 16px;
    color: rgba(0, 180, 180, 0.7);
    display: flex;
    align-items: center;
    text-shadow: 0 0 5px rgba(0, 180, 180, 0.3);
    animation: ${blink} 2s infinite;
    
    .user-icon {
      width: 28px;
      height: 28px;
      border-radius: 4px;
      background: rgba(0, 150, 150, 0.15);
      border: 1px solid rgba(0, 150, 150, 0.4);
      margin-right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: rgba(0, 180, 180, 0.8);
      text-shadow: 0 0 5px rgba(0, 180, 180, 0.4);
      animation: ${pixelShake} 2s infinite;
    }
    
    .time-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(0, 180, 180, 0.6);
      margin: 0 10px;
      box-shadow: 0 0 5px rgba(0, 180, 180, 0.4);
      animation: ${blink} 1s infinite;
    }
  }
`;

// Retro Filter Section - DARKER
const RetroFilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
  padding: 15px;
  background: rgba(0, 15, 30, 0.5);
  border: 1px solid rgba(0, 150, 150, 0.2);
  border-radius: 4px;
  position: relative;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.6);
  
  /* Terminal header */
  &::before {
    content: " FILTER SELECTION ";
    position: absolute;
    top: -10px;
    left: 15px;
    background: rgba(5, 10, 20, 0.9);
    padding: 0 10px;
    font-family: 'VT323', 'Courier New', monospace;
    font-size: 14px;
    color: rgba(0, 180, 180, 0.8);
    text-shadow: 0 0 5px rgba(0, 180, 180, 0.3);
  }
`;

// Retro Filter Button - DARKER
const RetroFilterButton = styled.button`
  background: ${props => props.active 
    ? 'rgba(0, 150, 150, 0.15)' 
    : 'rgba(0, 25, 40, 0.5)'};
  border: 1px solid ${props => props.active 
    ? 'rgba(0, 180, 180, 0.6)' 
    : 'rgba(0, 150, 150, 0.2)'};
  color: ${props => props.active 
    ? 'rgba(0, 180, 180, 0.9)' 
    : 'rgba(0, 150, 150, 0.6)'};
  padding: 8px 16px;
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: ${props => props.active 
    ? '0 0 10px rgba(0, 150, 150, 0.2)' 
    : 'none'};
  text-shadow: ${props => props.active 
    ? '0 0 5px rgba(0, 150, 150, 0.5)' 
    : 'none'};
  
  &:hover {
    background: rgba(0, 150, 150, 0.12);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 150, 150, 0.2);
  }
  
  /* Retro button style */
  &::after {
    content: ${props => props.active ? '"[ACTIVE]"' : '""'};
    margin-left: 6px;
    font-size: 12px;
    color: ${props => props.active ? 'rgba(180, 180, 50, 0.8)' : 'transparent'};
    animation: ${blink} 1s infinite;
  }
`;

// Retro Skills Grid
const RetroSkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 10px;
  position: relative;
  
  /* Terminal-like corner decorations */
  &::before, &::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border: 1px solid rgba(0, 150, 150, 0.3);
    z-index: 5;
  }
  
  &::before {
    top: -5px;
    left: -5px;
    border-right: none;
    border-bottom: none;
  }
  
  &::after {
    top: -5px;
    right: -5px;
    border-left: none;
    border-bottom: none;
  }
`;

// Retro Skill Card - DARKER
const RetroSkillCard = styled.div`
  background: rgba(0, 10, 20, 0.7);
  border: 1px solid rgba(0, 150, 150, 0.3);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  animation: ${retroFadeIn} 0.8s ease-out forwards;
  animation-delay: ${props => props.index * 0.1}s;
  opacity: 0;
  
  /* Scanline effect */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.1) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    opacity: 0.3;
    z-index: 1;
  }
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    border-color: rgba(0, 180, 180, 0.6);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 150, 150, 0.3), inset 0 0 15px rgba(0, 0, 0, 0.5);
    
    .skill-logo {
      filter: drop-shadow(0 0 5px rgba(0, 150, 150, 0.5));
      animation: ${pixelShake} 2s infinite;
    }
    
    .skill-name {
      color: rgba(0, 180, 180, 0.8);
      text-shadow: 0 0 5px rgba(0, 180, 180, 0.5);
    }
    
    .skill-level {
      color: rgba(180, 180, 50, 0.8);
    }
    
    .skill-progress {
      box-shadow: 0 0 10px rgba(0, 150, 150, 0.3);
    }
  }
  
  .skill-logo {
    position: relative;
    z-index: 2;
    width: 50px;
    height: 50px;
    margin-bottom: 15px;
    filter: drop-shadow(0 0 3px rgba(0, 150, 150, 0.2));
    transition: all 0.3s ease;
    opacity: 0.9;
  }
  
  .skill-name {
    position: relative;
    z-index: 2;
    font-family: 'VT323', 'Courier New', monospace;
    color: rgba(0, 180, 180, 0.7);
    font-size: 18px;
    margin-bottom: 8px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 0 0 3px rgba(0, 180, 180, 0.2);
  }
  
  .skill-level {
    position: relative;
    z-index: 2;
    font-family: 'VT323', 'Courier New', monospace;
    color: rgba(180, 180, 50, 0.7);
    font-size: 16px;
    margin-bottom: 15px;
    text-shadow: 0 0 3px rgba(180, 180, 50, 0.2);
  }
  
  .skill-bar {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 8px;
    background: rgba(0, 25, 40, 0.5);
    overflow: hidden;
    border: 1px solid rgba(0, 150, 150, 0.2);
  }
  
  .skill-progress {
    height: 100%;
    background: linear-gradient(to right, 
      rgba(0, 130, 150, 0.6), 
      rgba(0, 180, 180, 0.7)
    );
    width: ${props => props.level}%;
    position: relative;
    
    /* Pixelated edge */
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 2px;
      height: 100%;
      background: rgba(200, 200, 200, 0.8);
      animation: ${blink} 1s infinite;
    }
  }
  
  .skill-category {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(0, 15, 30, 0.7);
    border: 1px solid rgba(0, 150, 150, 0.2);
    padding: 2px 8px;
    font-size: 12px;
    color: rgba(0, 150, 150, 0.6);
    font-family: 'VT323', 'Courier New', monospace;
    text-transform: uppercase;
    z-index: 2;
  }
`;

// Retro Status Bar - DARKER
const RetroStatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: rgba(0, 15, 30, 0.6);
  border: 1px solid rgba(0, 150, 150, 0.2);
  margin-top: 25px;
  position: relative;
  
  .status-text {
    font-family: 'VT323', 'Courier New', monospace;
    color: rgba(0, 180, 180, 0.7);
    font-size: 16px;
    text-shadow: 0 0 3px rgba(0, 180, 180, 0.3);
    
    /* Blinking cursor */
    &::after {
      content: "_";
      margin-left: 2px;
      animation: ${blink} 1s step-end infinite;
    }
  }
  
  .status-count {
    font-family: 'VT323', 'Courier New', monospace;
    color: rgba(180, 180, 50, 0.8);
    font-size: 16px;
    background: rgba(0, 25, 40, 0.5);
    padding: 3px 10px;
    border: 1px solid rgba(0, 150, 150, 0.3);
    text-shadow: 0 0 3px rgba(180, 180, 50, 0.3);
    animation: ${blink} 2s infinite;
  }
`;

// Main TechStack component
const TechStack = () => {
  // Current date/time and username as specified
  const currentDateTime = "2025-07-07 15:25:40";
  const username = "itsanubhav009";
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  
  // Main skills data
  const techSkills = [
    {
      name: 'JavaScript',
      level: 90,
      description: 'Expert in modern JavaScript (ES6+), frameworks and libraries.',
      category: 'Frontend',
      logo: 'JavaScript'
    },
    {
      name: 'React',
      level: 88,
      description: 'Proficient in React, Redux, hooks, and React ecosystem.',
      category: 'Frontend',
      logo: 'React'
    },
    {
      name: 'HTML/CSS',
      level: 85,
      description: 'Advanced HTML5, CSS3, responsive design and animations.',
      category: 'Frontend',
      logo: 'HTML'
    },
    {
      name: 'Node.js',
      level: 82,
      description: 'Strong backend development with Node.js and Express.',
      category: 'Backend',
      logo: 'Node'
    },
    {
      name: 'MongoDB',
      level: 77,
      description: 'Database design, queries, and integration with Node.js.',
      category: 'Database',
      logo: 'MongoDB'
    },
    {
      name: 'TypeScript',
      level: 80,
      description: 'Type-safe JavaScript with interfaces and advanced types.',
      category: 'Frontend',
      logo: 'TypeScript'
    },
    {
      name: 'GraphQL',
      level: 75,
      description: 'Building efficient APIs with precise data fetching.',
      category: 'Backend',
      logo: 'GraphQL'
    },
    {
      name: 'Docker',
      level: 72,
      description: 'Containerization and deployment automation.',
      category: 'DevOps',
      logo: 'Docker'
    },
    {
      name: 'AWS',
      level: 68,
      description: 'Cloud infrastructure and serverless architecture.',
      category: 'DevOps',
      logo: 'AWS'
    },
    {
      name: 'UI/UX Design',
      level: 78,
      description: 'Creating intuitive and engaging user interfaces.',
      category: 'Design',
      logo: 'Figma'
    },
    {
      name: 'Redux',
      level: 85,
      description: 'State management for React applications.',
      category: 'Frontend',
      logo: 'Redux'
    },
    {
      name: 'Next.js',
      level: 76,
      description: 'Server-side rendering and static site generation.',
      category: 'Frontend',
      logo: 'Next'
    },
    {
      name: 'Git',
      level: 88,
      description: 'Version control and collaboration workflows.',
      category: 'DevOps',
      logo: 'Git'
    },
    {
      name: 'Sass/SCSS',
      level: 82,
      description: 'Advanced CSS preprocessing for complex styling.',
      category: 'Frontend',
      logo: 'Sass'
    },
    {
      name: 'Express',
      level: 80,
      description: 'RESTful API development with Node.js.',
      category: 'Backend',
      logo: 'Express'
    },
    {
      name: 'Jest',
      level: 75,
      description: 'JavaScript testing for React applications.',
      category: 'Testing',
      logo: 'Jest'
    },
    {
      name: 'React Native',
      level: 65,
      description: 'Cross-platform mobile app development.',
      category: 'Mobile',
      logo: 'React'
    },
    {
      name: 'PostgreSQL',
      level: 74,
      description: 'Relational database design and management.',
      category: 'Database',
      logo: 'PostgreSQL'
    }
  ];

  // Get unique categories for filter buttons
  const getUniqueCategories = useCallback(() => {
    const categories = techSkills.map(skill => skill.category);
    return ['all', ...new Set(categories)];
  }, [techSkills]);

  // Handle filter button clicks
  const handleFilterClick = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  // Get filtered skills
  const getFilteredSkills = useCallback(() => {
    if (activeFilter === 'all') return techSkills;
    return techSkills.filter(skill => skill.category.toLowerCase() === activeFilter.toLowerCase());
  }, [activeFilter, techSkills]);

  // Get logo for a skill
  const getSkillLogo = useCallback((logoKey) => {
    return techLogos[logoKey] || techLogos.Default;
  }, []);

  // Get user initials
  const getUserInitials = useCallback((username) => {
    return username.substring(0, 2).toUpperCase();
  }, []);

  return (
    <CRTContainer>
      <StarField />
      <RetroNebula />
      
      <ContentContainer>
        <RetroTerminal>
          <RetroHeader>
            <div className="header-title-container">
              <div className="header-title">TECH SKILLS DATABASE</div>
            </div>
            <div className="header-meta">
              <div className="user-icon">{getUserInitials(username)}</div>
              {username}
              <span className="time-dot"></span>
              {currentDateTime}
            </div>
          </RetroHeader>
          
          <RetroFilterSection>
            {getUniqueCategories().map((category, index) => (
              <RetroFilterButton
                key={index}
                active={activeFilter === category}
                onClick={() => handleFilterClick(category)}
              >
                {category === 'all' ? 'ALL' : category}
              </RetroFilterButton>
            ))}
          </RetroFilterSection>
          
          <RetroSkillsGrid>
            {getFilteredSkills().map((skill, index) => (
              <RetroSkillCard 
                key={index} 
                index={index} 
                level={skill.level}
              >
                <div className="skill-category">{skill.category}</div>
                <img 
                  className="skill-logo" 
                  src={getSkillLogo(skill.logo)} 
                  alt={skill.name}
                />
                <div className="skill-name">{skill.name}</div>
                <div className="skill-level">LEVEL: {skill.level}%</div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </RetroSkillCard>
            ))}
          </RetroSkillsGrid>
          
          <RetroStatusBar>
            <div className="status-text">
              SCAN COMPLETE: {getFilteredSkills().length} {activeFilter !== 'all' ? activeFilter.toUpperCase() : 'TOTAL'} SKILLS
            </div>
            <div className="status-count">
              {getFilteredSkills().length}/{techSkills.length}
            </div>
          </RetroStatusBar>
        </RetroTerminal>
      </ContentContainer>
    </CRTContainer>
  );
};

export default memo(TechStack);