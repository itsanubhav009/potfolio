import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css, createGlobalStyle } from "styled-components";
import { FaGithub, FaExternalLinkAlt, FaFolder, FaTerminal, FaVolumeUp, FaVolumeMute, FaChevronDown, FaChevronUp, FaCode, FaLink } from "react-icons/fa";

// --- Global Style for Retro Font ---
const RetroGlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&display=swap');
  
  * {
    box-sizing: border-box;
  }
  
  body {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }
`;

// --- Enhanced Keyframes for Effects ---
const crtFlicker = keyframes`
  0%,100% { opacity: 1; }
  10% { opacity: 0.87; }
  18% { opacity: 1; }
  22% { opacity: 0.96; }
  28% { opacity: 0.81; }
  32% { opacity: 1; }
  48% { opacity: 0.97; }
`;

const scanline = keyframes`
  0%{background-position:0 0;}
  100%{background-position:0 40px;}
`;

const borderNeon = keyframes`
  0%,100%{box-shadow: 0 0 9px #64ffda, 0 0 0 #ff4cf7;}
  35%{box-shadow: 0 0 32px #ff4cf7, 0 0 13px #c77dff;}
  70%{box-shadow: 0 0 18px #c77dff, 0 0 7px #64ffda;}
`;

const cardExpand = keyframes`
  0%{transform:scale(1); max-height: 250px;}
  100%{transform:scale(1.05); max-height: 1200px;}
`;

const cardContract = keyframes`
  0%{transform:scale(1.05); max-height: 1200px;}
  100%{transform:scale(1); max-height: 250px;}
`;

const gridBg = keyframes`
  0%{background-position:0 0;}
  100%{background-position:90px 90px;}
`;

const floating = keyframes`
  0%,100%{transform:translateY(0);}
  50%{transform:translateY(-5px);}
`;

const glowText = keyframes`
  0%,100%{text-shadow: 0 0 7px #64ffda, 0 0 2px #ff4cf7;}
  50%{text-shadow: 0 0 16px #c77dff, 0 0 7px #ff4cf7;}
`;

const chroma = keyframes`
  0%,100%{filter: none;}
  50%{filter: drop-shadow(2px 0 #ff4cf7) drop-shadow(-2px 0 #64ffda);}
`;

const rotateSlow = keyframes`
  0%{transform: rotate(0deg);}
  100%{transform: rotate(360deg);}
`;

const pulseScale = keyframes`
  0%,100%{transform: scale(1);}
  50%{transform: scale(1.1);}
`;

const staticNoise = keyframes`
  0%, 100% { background-position: 0% 0%; }
  10% { background-position: -5% -5%; }
  20% { background-position: -10% 5%; }
  30% { background-position: 5% -10%; }
  40% { background-position: -5% 15%; }
  50% { background-position: -10% 5%; }
  60% { background-position: 15% 0%; }
  70% { background-position: 0% 10%; }
  80% { background-position: -15% 0%; }
  90% { background-position: 10% 5%; }
`;

const glitch = keyframes`
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-3px, 3px); }
  40% { transform: translate(-3px, -3px); }
  60% { transform: translate(3px, 3px); }
  80% { transform: translate(3px, -3px); }
`;

const typewriter = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const cursorBlink = keyframes`
  0%, 100% { border-right-color: transparent; }
  50% { border-right-color: #64ffda; }
`;

const retroScan = keyframes`
  0% { box-shadow: 0 -100vh 0 100vh rgba(100, 255, 218, 0.08); }
  100% { box-shadow: 0 100vh 0 100vh rgba(100, 255, 218, 0.08); }
`;

const pixelate = keyframes`
  0%, 100% { filter: url(#noise-filter); }
  50% { filter: url(#noise-filter-intense); }
`;

const hueRotate = keyframes`
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`;

const dataStream = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 1000px; }
`;

const neonPulse = keyframes`
  0%, 100% { box-shadow: 0 0 5px #64ffda, 0 0 10px #64ffda, 0 0 15px #64ffda, 0 0 20px #64ffda; }
  50% { box-shadow: 0 0 10px #ff4cf7, 0 0 20px #ff4cf7, 0 0 30px #ff4cf7, 0 0 40px #ff4cf7; }
`;

const progressFill = keyframes`
  0% { width: 0; }
  100% { width: var(--percentage); }
`;

const matrixRain = keyframes`
  0% { top: -100%; }
  100% { top: 1000%; }
`;

// --- SVG Filters ---
const SvgFilters = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <filter id="noise-filter">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feBlend mode="screen" in="SourceGraphic" />
    </filter>
    <filter id="noise-filter-intense">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
      <feBlend mode="overlay" in="SourceGraphic" />
    </filter>
    <filter id="glitch-filter">
      <feTurbulence baseFrequency="0.05" numOctaves="2" result="turbulence" />
      <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="10" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <filter id="crt-filter">
      <feGaussianBlur stdDeviation="0.5" result="blur" />
      <feConvolveMatrix order="3" kernelMatrix="0 -1 0 -1 4 -1 0 -1 0" in="blur" result="sharpen" />
      <feComponentTransfer in="sharpen">
        <feFuncR type="linear" slope="1.2" intercept="-0.1" />
        <feFuncG type="linear" slope="1.2" intercept="-0.1" />
        <feFuncB type="linear" slope="1.2" intercept="-0.1" />
      </feComponentTransfer>
    </filter>
  </svg>
);

// --- Matrix Rain Background ---
const MatrixRain = () => {
  const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
  const matrixColumns = 80;
  const columnElements = [];

  for (let i = 0; i < matrixColumns; i++) {
    const chars = [];
    const colLength = Math.floor(Math.random() * 20) + 10;
    
    for (let j = 0; j < colLength; j++) {
      const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.5 + 0.3;
      
      chars.push(
        <span 
          key={j}
          style={{
            animationDelay: `${delay}s`,
            opacity: opacity,
            color: j === 0 ? '#64ffda' : '#40bf9f'
          }}
        >
          {char}
        </span>
      );
    }
    
    columnElements.push(
      <div 
        className="matrix-column" 
        key={i}
        style={{
          left: `${i * (100 / matrixColumns)}%`,
          animationDuration: `${Math.random() * 10 + 5}s`
        }}
      >
        {chars}
      </div>
    );
  }
  
  return <div className="matrix-rain">{columnElements}</div>;
};

// --- Enhanced Styled Components ---
const RetroSection = styled.section`
  min-height: 100vh;
  padding: 36px 0 36px 0;
  background: #151c31 radial-gradient(circle at 50% 0%, #31234f 0%, #0a192f 100%);
  overflow-x: hidden;
  position: relative;
  z-index: 1;
  
  &::before {
    content: "";
    pointer-events: none;
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      to bottom,rgba(255,255,255,0.045) 0,rgba(0,0,0,0.26) 2px,rgba(0,0,0,0) 4px
    );
    z-index: 2;
    animation: ${scanline} 2.1s linear infinite;
    mix-blend-mode: screen;
  }
  
  &::after {
    content: "";
    pointer-events: none;
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, #0a192f 0,transparent 30%,transparent 70%,#0a192f 100%);
    opacity: 0.5;
    z-index: 3;
  }
  
  .matrix-rain {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 0;
    opacity: 0.1;
  }
  
  .matrix-column {
    position: absolute;
    top: -100%;
    display: flex;
    flex-direction: column;
    font-family: 'VT323', monospace;
    font-size: 14px;
    line-height: 1;
    animation: ${matrixRain} linear infinite;
    
    span {
      animation: ${pulseScale} 1.5s alternate infinite;
      transform-origin: center;
    }
  }
`;

const StaticOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.08;
  animation: ${staticNoise} 0.5s steps(2) infinite;
  mix-blend-mode: overlay;
`;

const ScanLine = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(
    to bottom,
    rgba(100, 255, 218, 0) 0%,
    rgba(100, 255, 218, 0.3) 50%,
    rgba(100, 255, 218, 0) 100%
  );
  z-index: 8;
  pointer-events: none;
  animation: ${retroScan} 4s linear infinite;
`;

const MatrixBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: 
    repeating-linear-gradient(135deg, #00ffcc13 0 2px, transparent 2px 35px),
    repeating-linear-gradient(225deg, #c77dff22 0 2px, transparent 2px 35px),
    linear-gradient(90deg, #191e2e 0%, #0a192f 100%);
  background-size: 90px 90px, 140px 140px, 100% 100%;
  animation: ${gridBg} 14s linear infinite;
  opacity: .13;
  filter: blur(0.7px);
`;

const RetroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 5;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const GlitchTitle = styled.h2`
  font-family: 'Press Start 2P', 'VT323', monospace;
  color: #64ffda;
  font-size: 2.5rem;
  text-align: center;
  text-shadow: 0 0 12px #ff4cf7, 0 0 5px #64ffda;
  margin-bottom: 45px;
  letter-spacing: 2px;
  position: relative;
  z-index: 10;
  animation: ${glowText} 2.5s alternate infinite;
  
  &:hover {
    animation: ${glitch} 0.3s cubic-bezier(.25,.46,.45,.94) both infinite;
  }
  
  &::before {
    content: attr(data-text);
    position: absolute;
    top: -2px;
    left: 2px;
    width: 100%;
    color: #ff4cf7;
    filter: blur(1px);
    opacity: 0.8;
    z-index: -1;
    animation: ${glitch} 0.4s infinite reverse;
    display: none;
  }
  
  &:hover::before {
    display: block;
  }
  
  &::after {
    content: '';
    display: block;
    margin: 15px auto 0 auto;
    width: 120px;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(90deg, #c77dff, #64ffda 80%, #ff4cf7 100%);
    box-shadow: 0 0 15px #ff4cf7;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const CommandPrompt = styled.div`
  font-family: 'VT323', monospace;
  font-size: 1.3rem;
  color: #64ffda;
  display: block;
  text-align: center;
  margin-bottom: 35px;
  overflow: hidden;
  white-space: nowrap;
  
  .command {
    display: inline-block;
    overflow: hidden;
    animation: ${typewriter} 3.5s steps(40, end) 1 forwards;
    border-right: 4px solid transparent;
    animation-delay: 0.5s;
  }
  
  .blink {
    animation: ${cursorBlink} 1s step-end infinite;
  }
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  padding: 0 0 35px 0;
  z-index: 9;
  position: relative;
  max-width: 90%;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const FilterButton = styled.button`
  background: linear-gradient(90deg, #191e2e 60%, #203a43 100%);
  color: #c77dff;
  border: 2px solid #64ffda;
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 1.15rem;
  border-radius: 8px;
  padding: 8px 18px;
  cursor: pointer;
  letter-spacing: 1px;
  margin-bottom: 8px;
  transition: all 0.2s;
  text-shadow: 0 0 4px #64ffda, 0 0 2px #ff4cf7;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(100, 255, 218, 0.5),
      rgba(199, 125, 255, 0.5)
    );
    transition: top 0.3s ease;
    z-index: -1;
  }
  
  &:hover::before {
    top: 0;
  }
  
  ${props => props.active && css`
    background: linear-gradient(90deg, #c77dff 40%, #64ffda 100%);
    color: #0a192f;
    border-color: #ff4cf7;
    animation: ${pulseScale} 1.5s infinite;
    box-shadow: 0 0 25px rgba(100, 255, 218, 0.5);
    
    &::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(
        circle,
        rgba(255, 76, 247, 0.3) 0%,
        transparent 70%
      );
      animation: ${rotateSlow} 10s linear infinite;
    }
  `}
  
  &:hover {
    background: #64ffda33;
    color: #ff4cf7;
    border-color: #ff4cf7;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.3);
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 6px 12px;
  }
`;

const ProjectsGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 42px;
  z-index: 10;
  position: relative;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    gap: 35px;
    padding: 0 10px;
  }
`;

const ProjectCard = styled.div`
  background: linear-gradient(123deg, #191e2e 60%, #203a43 100%);
  border: 2.5px solid #64ffda80;
  border-radius: 11px;
  min-height: 185px;
  max-height: ${props => props.expanded ? '2000px' : '250px'};
  box-shadow: 0 0 10px #c77dff33, 0 2px 12px #0a192fcc;
  cursor: pointer;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  animation: ${props => props.expanded ? cardExpand : cardContract} 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #64ffda, #ff4cf7, #c77dff, #64ffda);
    background-size: 400% 400%;
    animation: ${hueRotate} 10s linear infinite;
    border-radius: 13px;
    z-index: -1;
    opacity: ${props => props.expanded ? '1' : '0'};
    transition: opacity 0.3s;
  }
  
  ${props => props.expanded && css`
    border-color: transparent;
    z-index: 20;
    box-shadow: 0 0 50px #c77dffaa, 0 0 30px #64ffda99, 0 8px 20px #0a192f;
  `}
`;

const CollapsedContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100%;
  overflow: hidden;
  opacity: ${props => props.expanded ? '0' : '1'};
  transition: opacity 0.3s;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: ${props => props.expanded ? 'none' : 'auto'};
`;

const CardImage = styled.div`
  flex: 0 0 150px;
  width: 150px;
  min-height: 100%;
  overflow: hidden;
  background: #0a192f;
  box-shadow: 0 0 20px #c77dff22;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      to bottom, rgba(255,255,255,0.03) 0, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0) 4px
    );
    z-index: 2;
    pointer-events: none;
    animation: ${scanline} 3s linear infinite;
  }

  .project-img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: filter 0.3s;
    filter: brightness(0.97) contrast(1.04) grayscale(0.15);
  }
  
  @media (max-width: 500px) {
    flex: 0 0 120px;
    width: 120px;
  }
`;

const CardContent = styled.div`
  flex: 1 1 0;
  padding: 14px 13px 10px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 2;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FolderIcon = styled.div`
  color: #c77dff;
  font-size: 1.1rem;
  filter: drop-shadow(0 0 4px #c77dff77);
  animation: ${floating} 1.7s cubic-bezier(.5,0,.5,1) infinite alternate;
`;

const CardLinks = styled.div`
  display: flex;
  gap: 12px;
  a {
    color: #ccd6f6;
    font-size: 1rem;
    transition: all 0.2s;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      inset: -5px;
      background: radial-gradient(circle, rgba(100, 255, 218, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.2s;
    }
    
    &:hover { 
      color: #ff4cf7; 
      transform: translateY(-3px) scale(1.2);
      
      &::before {
        opacity: 1;
      }
    }
  }
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  margin: 5px 0 2px 0;
  font-family: 'VT323', 'Courier New', monospace;
  color: #64ffda;
  letter-spacing: 1px;
  text-shadow: 0 0 5px #64ffda66, 0 0 2px #c77dff;
  animation: ${glowText} 2s alternate infinite;
`;

const CardDesc = styled.p`
  color: #8892b0;
  font-size: .92rem;
  line-height: 1.27;
  font-family: 'Courier New', monospace;
  min-height: 16px;
  margin-bottom: 5px;
`;

const CardTechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 0 0 0 0;
  padding: 0;
  margin-top: auto;
`;

const CardTech = styled.li`
  font-family: 'VT323', 'Courier New', monospace;
  font-size: .85rem;
  color: #ff4cf7;
  background: #2e255088;
  border: 1px solid #c77dff66;
  border-radius: 3px;
  padding: 2px 7px;
  margin-bottom: 3px;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }
  
  &:hover { 
    background: #ff4cf7cc; 
    color: #0a192f;
    transform: translateY(-2px) scale(1.05);
    
    &::before {
      left: 100%;
    }
  }
`;

// --- Expanded Card Components ---
const ExpandedContent = styled.div`
  display: ${props => props.expanded ? 'flex' : 'none'};
  flex-direction: column;
  padding: 25px;
  height: auto;
  position: relative;
  opacity: ${props => props.expanded ? '1' : '0'};
  transition: opacity 0.5s ease 0.3s;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const ExpandedHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 25px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const ExpandedTitleArea = styled.div`
  flex: 1;
`;

const ExpandedTitle = styled.h2`
  font-family: 'Press Start 2P', 'VT323', monospace;
  font-size: 2rem;
  color: #ff4cf7;
  margin: 0 0 15px 0;
  text-shadow: 0 0 13px #64ffda, 0 0 5px #c77dff77;
  animation: ${glowText} 1.3s alternate infinite;
  position: relative;
  
  &::before {
    content: ">";
    margin-right: 10px;
    color: #64ffda;
    animation: ${pulseScale} 1.2s infinite;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ExpandedImageArea = styled.div`
  flex: 0 0 350px;
  height: 200px;
  position: relative;
  border: 3px solid #64ffda;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(100, 255, 218, 0.4);
  animation: ${neonPulse} 2s infinite alternate;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(1.1) contrast(1.13) grayscale(0.06) drop-shadow(0 0 17px #c77dffcc);
    animation: ${chroma} 1.7s alternate infinite;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      to bottom, rgba(255,255,255,0.05) 0, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0) 4px
    );
    z-index: 2;
    pointer-events: none;
    animation: ${scanline} 3s linear infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      transparent 60%,
      rgba(100, 255, 218, 0.3) 100%
    );
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    flex: 0 0 auto;
    width: 100%;
  }
`;

const ExpandedDesc = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  color: #bfbfd7;
  line-height: 1.6;
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
  background: rgba(10, 25, 47, 0.5);
  position: relative;
  box-shadow: inset 0 0 10px rgba(100, 255, 218, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #64ffda33, #ff4cf733, #c77dff33, #64ffda33);
    background-size: 400% 400%;
    animation: ${hueRotate} 10s linear infinite;
    border-radius: 10px;
    z-index: -1;
  }
  
  p {
    position: relative;
    margin: 0;
  }
  
  p::before {
    content: "$ ";
    color: #64ffda;
    font-weight: bold;
  }
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 15px;
  }
`;

const TechSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-family: 'VT323', monospace;
  font-size: 1.4rem;
  color: #64ffda;
  margin: 0 0 20px 0;
  text-shadow: 0 0 8px rgba(100, 255, 218, 0.6);
  display: flex;
  align-items: center;
  gap: 10px;
  
  svg {
    animation: ${pulseScale} 1.5s infinite alternate;
  }
  
  &::after {
    content: '';
    display: block;
    flex: 1;
    height: 1px;
    margin-left: 15px;
    background: linear-gradient(90deg, #64ffda80, transparent);
  }
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TechItem = styled.div`
  background: #0a192f99;
  border: 1px solid #64ffda66;
  border-radius: 8px;
  padding: 15px;
  position: relative;
  
  .tech-name {
    font-family: 'VT323', monospace;
    font-size: 1.1rem;
    color: #ff4cf7;
    margin: 0 0 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    span.percentage {
      font-size: 0.85rem;
      color: #64ffda;
      background: #ff4cf733;
      padding: 2px 8px;
      border-radius: 4px;
    }
  }
  
  &:hover {
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
    transform: translateY(-3px);
    border-color: #ff4cf7;
  }
  
  transition: all 0.2s ease;
`;

const ProgressBar = styled.div`
  height: 8px;
  background: #1d2d4f;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background: linear-gradient(90deg, #64ffda, #ff4cf7);
    border-radius: 4px;
    width: ${props => props.percentage}%;
    animation: ${progressFill} 1s cubic-bezier(0.65, 0, 0.35, 1) forwards;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 5px,
        rgba(255, 255, 255, 0.1) 5px,
        rgba(255, 255, 255, 0.1) 10px
      );
    border-radius: 4px;
  }
`;

const LinksSection = styled.div`
  margin-top: 25px;
`;

const LinkButtons = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  
  a {
    display: flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(90deg, #0a192f 0%, #203a43 100%);
    color: #64ffda;
    font-family: 'VT323', monospace;
    font-size: 1.1rem;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 8px;
    border: 2px solid #ff4cf7;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(255, 76, 247, 0.3);
    
    svg {
      font-size: 1.2rem;
      animation: ${pulseScale} 1.5s infinite alternate;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: -100%;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(255, 76, 247, 0.8),
        rgba(100, 255, 218, 0.8)
      );
      transition: top 0.3s ease;
      z-index: 0;
    }
    
    span {
      position: relative;
      z-index: 1;
    }
    
    svg {
      position: relative;
      z-index: 1;
    }
    
    &:hover {
      color: #0a192f;
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(255, 76, 247, 0.5);
      
      &::before {
        top: 0;
      }
    }
  }
`;

const ExpandCollapseButton = styled.button`
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(10, 25, 47, 0.7);
  border: 2px solid #64ffda;
  color: #64ffda;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 30;
  transition: all 0.2s;
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
  
  &:hover {
    background: #64ffda33;
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.5);
  }
  
  svg {
    font-size: 1.2rem;
    animation: ${pulseScale} 1.5s infinite alternate;
  }
`;

const AudioToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: 2px solid #64ffda;
  color: #64ffda;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: all 0.2s;
  
  &:hover {
    background: #64ffda33;
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.5);
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

// ---- MOCK TECH USAGE PERCENTAGES, can be dynamic if you want
const techUsages = {
  "React": 80, "Node.js": 45, "MongoDB": 25, "SCSS": 55,
  "Web Audio API": 25, "Firebase": 40, "Redux": 35,
  "JavaScript": 60, "Canvas API": 35, "HTML5": 35, "CSS3": 32,
  "React Native": 60, "Expo": 40,
  "Three.js": 30, "Weather API": 38, "Pixel Art": 25
};

// ---- PROJECT DATA ----
const projects = [
  {
    title: "VHS Tracker",
    description: "Retro barcode VHS organizer.",
    longDescription:
      "A web app for VHS collectors with barcode scanning, cover art, and detailed tracking. Styled after 80s video shops with CRT effects and glitchy transitions.",
    tech: ["React", "Node.js", "MongoDB", "SCSS"],
    github: "https://github.com",
    external: "https://vhstracker.com",
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80",
    category: "web"
  },
  {
    title: "Retrowave FM",
    description: "Synthwave/vaporwave streaming.",
    longDescription:
      "Music platform for retro electronic genres. Make mixtapes, use cassette UIs, and watch neon 'night drive' visualizers synced to the beat.",
    tech: ["React", "Web Audio API", "Firebase", "Redux"],
    github: "https://github.com",
    external: "https://retrowave.fm",
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=800&q=80",
    category: "music"
  },
  {
    title: "Pixel Art Generator",
    description: "Retro palette pixel art tool.",
    longDescription:
      "A tool for pixel artists. Choose retro palettes, export sprites and tilesets, and enjoy a 90s paint-app UI.",
    tech: ["JavaScript", "Canvas API", "HTML5", "CSS3"],
    github: "https://github.com",
    external: "https://pixelartgen.com",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80",
    category: "design"
  },
  {
    title: "Arcade Score Tracker",
    description: "Mobile arcade score leaderboards.",
    longDescription:
      "Track your arcade high scores, unlock neon badges, and compete on leaderboards. UI inspired by pixel arcades.",
    tech: ["React Native", "Firebase", "Expo"],
    github: "https://github.com",
    external: "",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    category: "mobile"
  },
  {
    title: "Synthwave Portfolio",
    description: "Synthwave neon portfolio grid.",
    longDescription:
      "Showcase your work with animated grids, neon themes, and pixel fonts—totally synthwave/retrowave.",
    tech: ["HTML5", "CSS3", "JavaScript", "Three.js"],
    github: "https://github.com",
    external: "https://synthfolio.dev",
    image: "https://images.unsplash.com/photo-1569701813229-33284b643e3c?auto=format&fit=crop&w=800&q=80",
    category: "web"
  },
  {
    title: "8-bit Weather App",
    description: "NES-style animated pixel weather.",
    longDescription:
      "Weather reimagined as NES pixel art. Animated sprites and backgrounds react to the forecast.",
    tech: ["React", "Weather API", "Canvas API", "Pixel Art"],
    github: "https://github.com",
    external: "https://8bitweather.app",
    image: "https://images.unsplash.com/photo-1553901753-215db344677a?auto=format&fit=crop&w=800&q=80",
    category: "web"
  }
];

// ---- MAIN COMPONENT ----
const Projects = () => {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState('all');
  const [audioOn, setAudioOn] = useState(false);

  // Sound effect function (mockup - in a real app this would play actual sounds)
  const playSound = (type) => {
    if (!audioOn) return;
    console.log(`Playing ${type} sound`);
    // In a real implementation you would use the Web Audio API or HTML5 audio
  };

  const categories = [
    'all',
    ...Array.from(
      new Set(
        projects
          .map((p) => p.category)
          .filter(Boolean)
      )
    )
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  const handleFilterClick = (cat) => {
    playSound('click');
    setFilter(cat);
  };

  const toggleExpand = (idx) => {
    playSound('select');
    setActive(idx === active ? null : idx);
  };

  return (
    <RetroSection>
      <SvgFilters />
      <MatrixBg />
      <MatrixRain />
      <StaticOverlay />
      <ScanLine />
      
      <AudioToggle 
        onClick={() => setAudioOn(!audioOn)} 
        aria-label={audioOn ? "Mute sound effects" : "Enable sound effects"}
      >
        {audioOn ? <FaVolumeUp /> : <FaVolumeMute />}
      </AudioToggle>
      
      <RetroContainer>
        <GlitchTitle data-text="PROJECTS">PROJECTS</GlitchTitle>
        <CommandPrompt>
          <span className="command">$ explore --category="all" --sort="recent" <span className="blink">_</span></span>
        </CommandPrompt>
        
        <FilterBar>
          {categories.map((cat) => (
            <FilterButton
              key={cat}
              active={cat === filter}
              onClick={() => handleFilterClick(cat)}
            >
              {cat.toUpperCase()}
            </FilterButton>
          ))}
        </FilterBar>
        
        <ProjectsGrid>
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={idx}
              expanded={active === idx}
              onClick={() => toggleExpand(idx)}
              tabIndex={0}
              aria-expanded={active === idx}
              aria-label={`${project.title} - ${project.description}`}
            >
              {/* Collapsed View */}
              <CollapsedContent expanded={active === idx}>
                <CardImage>
                  <img className="project-img" src={project.image} alt={project.title+" screenshot"} loading="lazy" />
                </CardImage>
                <CardContent>
                  <CardHeader>
                    <FolderIcon><FaFolder /></FolderIcon>
                    <CardLinks>
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          aria-label="GitHub"
                          onClick={(e) => {
                            e.stopPropagation();
                            playSound('link');
                          }}
                        >
                          <FaGithub />
                        </a>
                      )}
                      {project.external && (
                        <a 
                          href={project.external} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          aria-label="External"
                          onClick={(e) => {
                            e.stopPropagation();
                            playSound('link');
                          }}
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </CardLinks>
                  </CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDesc>{project.description}</CardDesc>
                  <CardTechList>
                    {project.tech.map((tech, i) => (
                      <CardTech key={i}>{tech}</CardTech>
                    ))}
                  </CardTechList>
                </CardContent>
              </CollapsedContent>
              
              {/* Expanded View */}
              <ExpandedContent expanded={active === idx}>
                <ExpandedHeader>
                  <ExpandedTitleArea>
                    <ExpandedTitle>{project.title}</ExpandedTitle>
                  </ExpandedTitleArea>
                  <ExpandedImageArea>
                    <img src={project.image} alt={project.title+" screenshot"} />
                  </ExpandedImageArea>
                </ExpandedHeader>
                
                <ExpandedDesc>
                  <p>{project.longDescription}</p>
                </ExpandedDesc>
                
                <TechSection>
                  <SectionTitle>
                    <FaCode /> Tech Stack
                  </SectionTitle>
                  <TechGrid>
                    {project.tech.map((tech, i) => (
                      <TechItem key={i}>
                        <div className="tech-name">
                          {tech}
                          <span className="percentage">{techUsages[tech] || 25}%</span>
                        </div>
                        <ProgressBar percentage={techUsages[tech] || 25} />
                      </TechItem>
                    ))}
                  </TechGrid>
                </TechSection>
                
                <LinksSection>
                  <SectionTitle>
                    <FaLink /> Links
                  </SectionTitle>
                  <LinkButtons>
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSound('link');
                        }}
                      >
                        <FaGithub /> <span>View Source</span>
                      </a>
                    )}
                    {project.external && (
                      <a 
                        href={project.external} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSound('link');
                        }}
                      >
                        <FaExternalLinkAlt /> <span>Live Demo</span>
                      </a>
                    )}
                  </LinkButtons>
                </LinksSection>
                
                <ExpandCollapseButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(idx);
                  }}
                  aria-label="Collapse project details"
                >
                  <FaChevronUp />
                </ExpandCollapseButton>
              </ExpandedContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </RetroContainer>
    </RetroSection>
  );
};

export default Projects;