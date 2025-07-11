import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styled, { keyframes, css, createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useScrollReveal, variants } from '../utils/scrollReveal';

// Global styles for CRT effects
const CRTEffects = createGlobalStyle`
  .low-performance-mode .crt-effect,
  .low-performance-mode .scanline,
  .low-performance-mode .flicker-animation,
  .low-performance-mode .glitch-effect {
    animation: none !important;
    background: none !important;
    text-shadow: none !important;
    box-shadow: none !important;
    transform: none !important;
  }
`;

// Optimized SVG components with added neon effect
const IconGitHub = ({ className }) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    style={{ filter: 'drop-shadow(0 0 2px currentColor)' }}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const IconExternal = ({ className }) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    style={{ filter: 'drop-shadow(0 0 2px currentColor)' }}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const IconFolder = ({ className }) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    style={{ filter: 'drop-shadow(0 0 5px currentColor)' }}
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
);

const IconClose = ({ className }) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    style={{ filter: 'drop-shadow(0 0 2px currentColor)' }}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Icon for performance mode toggle
const IconPerformance = ({ className }) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ filter: 'drop-shadow(0 0 2px currentColor)' }}
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
  </svg>
);

// Enhanced animation keyframes
const scanline = keyframes`
  0% { transform: translateY(-100%); opacity: 0.7; }
  100% { transform: translateY(100%); opacity: 0.7; }
`;

const flicker = keyframes`
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.8; }
  94% { opacity: 1; }
  96% { opacity: 0.9; }
  98% { opacity: 1; }
`;

const glitch = keyframes`
  0% {
    clip-path: inset(20% 0 32% 0);
    transform: translate(-2px, 2px);
  }
  20% {
    clip-path: inset(43% 0 22% 0);
    transform: translate(2px, -2px);
  }
  40% {
    clip-path: inset(76% 0 3% 0);
    transform: translate(1px, 1px);
  }
  60% {
    clip-path: inset(12% 0 66% 0);
    transform: translate(-1px, -1px);
  }
  80% {
    clip-path: inset(52% 0 33% 0);
    transform: translate(2px, 2px);
  }
  100% {
    clip-path: inset(20% 0 32% 0);
    transform: translate(-2px, 2px);
  }
`;

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 5px rgba(100, 255, 218, 0.5), 0 0 10px rgba(100, 255, 218, 0.3), 0 0 15px rgba(100, 255, 218, 0.2); }
  50% { text-shadow: 0 0 10px rgba(100, 255, 218, 0.8), 0 0 20px rgba(100, 255, 218, 0.5), 0 0 30px rgba(100, 255, 218, 0.3); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const rotate3d = keyframes`
  0% { transform: rotateX(0deg) rotateY(0deg); }
  50% { transform: rotateX(5deg) rotateY(5deg); }
  100% { transform: rotateX(0deg) rotateY(0deg); }
`;

// Define a styled component for the loading bar
const LoadingBar = styled.span`
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #64ffda, transparent);
  ${props => css`
    animation: ${gradientShift} 2s linear infinite;
  `}
`;

// Retro effects
const retroGrid = css`
  background-image: 
    linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: center center;
`;

const neonText = css`
  color: #fff;
  text-shadow: 
    0 0 5px rgba(100, 255, 218, 0.5),
    0 0 10px rgba(100, 255, 218, 0.3),
    0 0 15px rgba(100, 255, 218, 0.2);
`;

const neonBorder = css`
  border-color: ${props => props.theme.colors.teal};
  box-shadow: 
    0 0 5px rgba(100, 255, 218, 0.5),
    0 0 10px rgba(100, 255, 218, 0.3) inset;
`;

const synthwaveGradient = css`
  background: linear-gradient(
    90deg, 
    #ff00cc 0%, 
    #333399 40%, 
    #00ccff 80%, 
    #64ffda 100%
  );
  background-size: 300% 300%;
  ${props => css`
    animation: ${gradientShift} 10s ease infinite;
  `}
`;

const crtEffect = css`
  &::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
      to bottom,
      rgba(18, 16, 16, 0) 50%,
      rgba(0, 0, 0, 0.1) 50%
    );
    background-size: 100% 4px;
    z-index: 100;
    pointer-events: none;
    opacity: 0.15;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      transparent 60%,
      rgba(10, 25, 47, 0.4) 100%
    );
    pointer-events: none;
    z-index: 101;
    opacity: 0.3;
  }
`;

// 3D effect mixins
const card3dEffect = css`
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: transform 0.5s ease;
  
  .low-performance-mode & {
    transform: none !important;
    transition: none !important;
  }
  
  &:hover {
    transform: translateZ(10px) rotateX(2deg) rotateY(2deg);
  }
`;

// Main page container with CRT effects
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.navy};
  position: relative;
  
  /* CRT background effect */
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      repeating-linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.05),
        rgba(0, 0, 0, 0.05) 1px,
        transparent 1px,
        transparent 2px
      );
    z-index: 999;
    pointer-events: none;
    opacity: 0.3;
    ${props => css`
      animation: ${flicker} 15s infinite;
    `}
    
    .low-performance-mode & {
      display: none;
    }
  }
  
  /* CRT vignette */
  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      transparent 40%,
      rgba(0, 0, 0, 0.3) 100%
    );
    pointer-events: none;
    z-index: 998;
    
    .low-performance-mode & {
      display: none;
    }
  }
`;

const StyledProjectsSection = styled.section`
  max-width: 1200px;
  position: relative;
  margin: 0 auto;
  padding: 40px 20px;
  height: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at top, rgba(10, 25, 47, 0.3) 0%, rgba(10, 25, 47, 0) 70%);
    pointer-events: none;
    z-index: -1;
  }
`;

const RetroGlow = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 600px;
  background: radial-gradient(
    ellipse at center,
    rgba(100, 255, 218, 0.15) 0%,
    rgba(100, 255, 218, 0.05) 40%,
    transparent 80%
  );
  z-index: -1;
  opacity: 0.7;
  filter: blur(80px);
  ${props => css`
    animation: ${float} 5s ease-in-out infinite;
  `}
  
  .low-performance-mode & {
    animation: none;
  }
`;

const GlitchContainer = styled(motion.div)`
  position: relative;
  overflow: visible;
  
  &.glitching::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    ${props => css`
      animation: ${glitch} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
    `}
    animation-delay: 0.1s;
    z-index: -1;
    
    .low-performance-mode & {
      display: none;
    }
  }
`;

const PerformanceModeToggle = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(10, 25, 47, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.theme.colors.teal};
  color: ${props => props.theme.colors.teal};
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.5);
  }
  
  &::after {
    content: '${props => props.isActive ? "High Performance Mode" : "Low Performance Mode"}';
    position: absolute;
    right: 50px;
    white-space: nowrap;
    background: rgba(10, 25, 47, 0.9);
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  &:hover::after {
    opacity: 1;
  }
  
  svg {
    width: 20px;
    height: 20px;
    color: ${props => props.isActive ? props.theme.colors.teal : props.theme.colors.lightSlate};
  }
`;

const StyledProjectsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  
  h2 {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 40px;
    width: 100%;
    font-size: clamp(26px, 5vw, 32px);
    white-space: nowrap;
    color: #fff;
    ${neonText}
    ${props => css`
      animation: ${glow} 4s ease-in-out infinite;
    `}
    
    .low-performance-mode & {
      animation: none;
    }
    
    &::before {
      content: '> ';
      color: ${props => props.theme.colors.teal};
      margin-right: 10px;
      ${props => css`
        animation: ${blink} 1s step-end infinite;
      `}
      
      .low-performance-mode & {
        animation: none;
      }
    }
    
    &::after {
      content: '';
      display: block;
      position: relative;
      width: 300px;
      height: 2px;
      margin-left: 20px;
      ${synthwaveGradient}
      box-shadow: 0 0 10px ${props => props.theme.colors.teal};
      
      .low-performance-mode & {
        animation: none;
        background: ${props => props.theme.colors.teal};
      }
      
      @media (max-width: 768px) {
        width: 100%;
      }
    }
  }
`;

const StyledFilterControls = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 40px;
  position: relative;
  padding: 20px 0;
  
  &::before, &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    ${synthwaveGradient}
    opacity: 0.7;
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.2);
    
    .low-performance-mode & {
      animation: none;
      background: ${props => props.theme.colors.teal};
    }
  }
  
  &::before { top: 0; }
  &::after { bottom: 0; }
`;

const StyledFilterButton = styled.button`
  background: ${props => props.active ? 'rgba(100, 255, 218, 0.1)' : 'transparent'};
  color: ${props => props.active ? props.theme.colors.teal : props.theme.colors.slate};
  border: 1px solid ${props => props.active ? props.theme.colors.teal : 'transparent'};
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 13px;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 1px;
  transform-style: preserve-3d;
  
  ${props => props.active && css`
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
    text-shadow: 0 0 5px rgba(100, 255, 218, 0.5);
  `}
  
  &:hover {
    background-color: rgba(100, 255, 218, 0.1);
    color: ${props => props.theme.colors.teal};
    transform: translateY(-2px) translateZ(5px);
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.2);
    
    .low-performance-mode & {
      transform: translateY(-2px);
    }
  }
  
  &::before {
    content: '[ ';
    opacity: ${props => props.active ? 1 : 0};
    transition: opacity 0.2s ease;
  }
  
  &::after {
    content: ' ]';
    opacity: ${props => props.active ? 1 : 0};
    transition: opacity 0.2s ease;
  }
  
  &:hover::before,
  &:hover::after {
    opacity: 1;
  }
`;

// Projects Grid with 3D perspective
const StyledProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  position: relative;
  perspective: 1000px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// Enhanced project card with 3D effects and CRT styling
const StyledProjectCard = styled(motion.div)`
  position: relative;
  height: ${props => props.isExpanded ? 'auto' : '420px'};
  background-color: rgba(17, 34, 64, 0.45);
  border-radius: 4px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  box-shadow: ${props => props.isExpanded 
    ? '0 20px 40px -15px rgba(2, 12, 27, 0.8), 0 0 25px rgba(100, 255, 218, 0.5)'
    : '0 10px 30px -15px rgba(2, 12, 27, 0.7)'};
  backdrop-filter: blur(10px);
  cursor: ${props => props.isExpanded ? 'default' : 'pointer'};
  grid-column: ${props => props.isExpanded ? '1 / -1' : 'auto'};
  z-index: ${props => props.isExpanded ? 5 : 1};
  max-width: ${props => props.isExpanded ? '100%' : 'none'};
  ${props => !props.isExpanded && card3dEffect}
  transform-origin: center center;
  
  /* CRT screen effect */
  ${crtEffect}
  
  /* Enhanced scanlines on hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.05),
      rgba(0, 0, 0, 0.05) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    z-index: 10;
    opacity: 0.3;
    
    .low-performance-mode & {
      display: none;
    }
  }
  
  /* Neon border effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid ${props => props.theme.colors.teal};
    border-radius: 4px;
    opacity: ${props => props.isExpanded ? 0.8 : 0.5};
    pointer-events: none;
    z-index: 11;
    box-shadow: ${props => props.isExpanded 
      ? '0 0 25px rgba(100, 255, 218, 0.5)' 
      : '0 0 15px rgba(100, 255, 218, 0.3)'};
    
    ${props => !props.isExpanded && css`
      animation: ${glow} 4s infinite;
    `}
    
    .low-performance-mode & {
      animation: none;
    }
  }
  
  /* Animated scanline */
  .scanline {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: rgba(100, 255, 218, 0.4);
    box-shadow: 0 0 8px rgba(100, 255, 218, 0.4);
    ${props => css`
      animation: ${scanline} 6s linear infinite;
    `}
    pointer-events: none;
    z-index: 12;
    
    .low-performance-mode & {
      display: none;
    }
  }
  
  /* Enhanced hover state */
  &:hover {
    transform: ${props => props.isExpanded 
      ? 'none' 
      : 'translateY(-7px) rotateX(3deg) rotateY(3deg) scale(1.02)'};
    box-shadow: ${props => props.isExpanded 
      ? '0 20px 40px -15px rgba(2, 12, 27, 0.8), 0 0 25px rgba(100, 255, 218, 0.5)'
      : '0 20px 30px -15px rgba(2, 12, 27, 0.7), 0 0 20px rgba(100, 255, 218, 0.4)'};
    
    .low-performance-mode & {
      transform: ${props => props.isExpanded ? 'none' : 'translateY(-7px)'};
    }
    
    .project-image {
      filter: grayscale(0%) brightness(1.1) contrast(1.2) saturate(1.2);
      transform: ${props => props.isExpanded ? 'none' : 'scale(1.05)'};
    }
    
    .project-title {
      color: ${props => props.theme.colors.teal};
      text-shadow: 0 0 8px rgba(100, 255, 218, 0.5);
    }
    
    .view-more {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Enhanced border glow on hover */
    &::after {
      opacity: 0.8;
      box-shadow: 0 0 20px rgba(100, 255, 218, 0.5);
    }
  }
  
  /* Flicker animation */
  ${props => !props.isExpanded && css`
    animation: ${flicker} 15s infinite;
  `}
  
  .low-performance-mode & {
    animation: none;
  }
`;

const StyledProjectInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  height: 100%;
  padding: 0;
  border-radius: 4px;
  transition: transform 0.3s ease;
  overflow-y: auto;
  background-color: transparent;
  
  /* Styling scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(10, 25, 47, 0.2);
    border-radius: 0 4px 4px 0;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.teal};
    border-radius: 10px;
    opacity: 0.7;
  }
  
  /* Firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: ${props => props.theme.colors.teal} rgba(10, 25, 47, 0.2);
  
  /* Enhanced CRT scan effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${retroGrid}
    opacity: 0.07;
    pointer-events: none;
    z-index: 0;
    
    .low-performance-mode & {
      display: none;
    }
  }
`;

const StyledProjectImage = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  transform-style: preserve-3d;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(30%) brightness(0.9) contrast(1.1) saturate(1.2);
    transition: all 0.4s ease;
  }
  
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(10, 25, 47, 0.1),
      rgba(10, 25, 47, 0.8)
    );
    z-index: 1;
  }
  
  /* Retro scanline effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      to bottom,
      rgba(100, 255, 218, 0.05),
      rgba(100, 255, 218, 0.05) 1px,
      transparent 1px,
      transparent 2px
    );
    z-index: 3;
    pointer-events: none;
    opacity: 0.7;
    
    .low-performance-mode & {
      display: none;
    }
  }
  
  /* Vignette effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      ellipse at center,
      transparent 0%,
      rgba(10, 25, 47, 0.4) 90%
    );
    opacity: 0.5;
    z-index: 2;
    pointer-events: none;
  }
  
  .category-tag {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(10, 25, 47, 0.6);
    color: ${props => props.theme.colors.teal};
    font-family: ${props => props.theme.fonts.mono};
    font-size: 11px;
    padding: 4px 8px;
    border-radius: 3px;
    z-index: 10;
    border: 1px solid ${props => props.theme.colors.teal};
    text-transform: uppercase;
    box-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
    transform: translateZ(5px);
    ${props => css`
      animation: ${glow} 4s infinite;
    `}
    
    .low-performance-mode & {
      animation: none;
      transform: none;
    }
  }
`;

const StyledProjectHeader = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  padding: 1.75rem 1.75rem 0;
  
  .project-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .folder {
    color: ${props => props.theme.colors.teal};
    svg {
      width: 35px;
      height: 35px;
      filter: drop-shadow(0 0 5px rgba(100, 255, 218, 0.5));
      ${props => css`
        animation: ${float} 3s ease-in-out infinite;
      `}
      
      .low-performance-mode & {
        animation: none;
      }
    }
  }
  
  .project-links {
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.lightSlate};
    gap: 10px;
    
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 7px;
      transition: all 0.2s ease;
      cursor: pointer;
      
      svg {
        width: 20px;
        height: 20px;
        transition: all 0.2s ease;
      }
      
      &:hover {
        color: ${props => props.theme.colors.teal};
        transform: translateY(-3px);
        
        svg {
          filter: drop-shadow(0 0 5px rgba(100, 255, 218, 0.5));
        }
      }
    }
  }
  
  .project-title {
    margin: 0 0 10px;
    font-size: clamp(18px, 5vw, 22px);
    color: ${props => props.theme.colors.lightestSlate};
    font-family: ${props => props.theme.fonts.mono};
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.25s;
    text-shadow: 0 0 5px rgba(100, 255, 218, 0.3);
    transform: translateZ(5px);
    
    .low-performance-mode & {
      transform: none;
    }
    
    &::before {
      content: '> ';
      color: ${props => props.theme.colors.teal};
      font-family: ${props => props.theme.fonts.mono};
      ${props => css`
        animation: ${blink} 1s step-end infinite;
      `}
      
      .low-performance-mode & {
        animation: none;
      }
    }
  }
  
  .project-description {
    color: ${props => props.theme.colors.slate};
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 15px;
    font-family: ${props => props.theme.fonts.mono};
    padding: 10px;
    border-left: 2px solid ${props => props.theme.colors.teal};
    background-color: rgba(10, 25, 47, 0.3);
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(100, 255, 218, 0.1) inset;
    transform: translateZ(3px);
    
    .low-performance-mode & {
      transform: none;
    }
  }
`;

const StyledTechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 15px 0 0;
  list-style: none;
  position: relative;
  z-index: 1;
  
  li {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 12px;
    color: ${props => props.theme.colors.lightSlate};
    padding: 3px 7px;
    border-radius: 3px;
    background-color: rgba(100, 255, 218, 0.07);
    transition: all 0.2s ease;
    border: 1px solid rgba(100, 255, 218, 0.2);
    transform: translateZ(5px);
    
    .low-performance-mode & {
      transform: none;
    }
    
    &:hover {
      background-color: rgba(100, 255, 218, 0.1);
      color: ${props => props.theme.colors.teal};
      transform: translateY(-2px) translateZ(10px);
      box-shadow: 0 0 8px rgba(100, 255, 218, 0.2);
      
      .low-performance-mode & {
        transform: translateY(-2px);
      }
    }
  }
`;

const StyledProjectFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  padding: 1rem 1.75rem 1.75rem;
  margin-top: auto;
  border-top: 1px dashed rgba(100, 255, 218, 0.2);
  
  .project-date {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 12px;
    color: ${props => props.theme.colors.slate};
    text-shadow: 0 0 3px rgba(100, 255, 218, 0.3);
  }
`;

const StyledViewMore = styled.button`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 13px;
  color: ${props => props.theme.colors.teal};
  background: rgba(10, 25, 47, 0.3);
  border: 1px solid ${props => props.theme.colors.teal};
  border-radius: 4px;
  padding: 7px 15px;
  cursor: pointer;
  transition: all 0.25s ease;
  opacity: 0;
  transform: translateY(10px);
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.2);
  position: relative;
  overflow: hidden;
  text-shadow: 0 0 5px rgba(100, 255, 218, 0.3);
  
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
      rgba(100, 255, 218, 0.2),
      transparent
    );
    transition: all 0.5s ease;
    
    .low-performance-mode & {
      display: none;
    }
  }
  
  &:hover {
    background-color: rgba(100, 255, 218, 0.15);
    transform: translateY(-2px) !important;
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
    
    &::before {
      left: 100%;
    }
  }
`;

const StyledProjectsStatus = styled.div`
  padding: 12px 20px;
  margin-top: 30px;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 14px;
  color: ${props => props.theme.colors.slate};
  border: 1px solid ${props => props.theme.colors.teal};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(10, 25, 47, 0.5);
  box-shadow: 0 0 15px rgba(100, 255, 218, 0.2);
  backdrop-filter: blur(5px);
  transform-style: preserve-3d;
  transform: translateZ(10px);
  
  .low-performance-mode & {
    transform: none;
  }
  
  .status-text {
    display: flex;
    align-items: center;
    
    &::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      margin-right: 8px;
      background-color: ${props => props.theme.colors.teal};
      border-radius: 50%;
      ${props => css`
        animation: ${blink} 2s infinite;
      `}
      box-shadow: 0 0 5px ${props => props.theme.colors.teal};
      
      .low-performance-mode & {
        animation: none;
      }
    }
  }
  
  .status-info {
    display: flex;
    align-items: center;
    gap: 15px;
    
    .timestamp {
      font-size: 12px;
      color: ${props => props.theme.colors.lightSlate};
    }
    
    .username {
      color: ${props => props.theme.colors.teal};
      position: relative;
      text-shadow: 0 0 5px rgba(100, 255, 218, 0.3);
      
      &::before {
        content: '@';
        opacity: 0.7;
      }
    }
  }
`;

// Close button for expanded card with enhanced styling
const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 25, 47, 0.5);
  border: 1px solid ${props => props.theme.colors.teal};
  border-radius: 50%;
  color: ${props => props.theme.colors.lightSlate};
  cursor: pointer;
  z-index: 20;
  transition: all 0.2s ease;
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.2);
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  &:hover {
    background-color: rgba(100, 255, 218, 0.1);
    color: ${props => props.theme.colors.teal};
    transform: rotate(90deg);
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
  }
`;

// Components for expanded project details
const ExpandedDetails = styled.div`
  padding: 0 1.75rem 1.75rem;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ExpandedContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 20px;
  border-top: 1px dashed rgba(100, 255, 218, 0.3);
  padding-top: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailSection = styled.div`
  h4 {
    color: ${props => props.theme.colors.teal};
    font-family: ${props => props.theme.fonts.mono};
    font-size: 18px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    text-shadow: 0 0 5px rgba(100, 255, 218, 0.3);
    transform: translateZ(5px);
    
    .low-performance-mode & {
      transform: none;
    }
    
    &::before {
      content: '> ';
      margin-right: 5px;
      ${props => css`
        animation: ${blink} 1s step-end infinite;
      `}
      
      .low-performance-mode & {
        animation: none;
      }
    }
    
    &::after {
      content: '';
      display: block;
      position: relative;
      width: 100%;
      height: 1px;
      margin-left: 15px;
      background: linear-gradient(to right, ${props => props.theme.colors.teal}, transparent);
      box-shadow: 0 0 10px rgba(100, 255, 218, 0.2);
    }
  }
`;

const FeaturesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 25px 0;
  
  li {
    position: relative;
    padding-left: 20px;
    margin-bottom: 10px;
    color: ${props => props.theme.colors.slate};
    font-family: ${props => props.theme.fonts.mono};
    transition: all 0.2s ease;
    transform: translateZ(3px);
    
    .low-performance-mode & {
      transform: none;
    }
    
    &:hover {
      color: ${props => props.theme.colors.lightSlate};
      transform: translateX(5px) translateZ(5px);
      
      .low-performance-mode & {
        transform: translateX(5px);
      }
      
      &::before {
        color: ${props => props.theme.colors.teal};
        text-shadow: 0 0 5px rgba(100, 255, 218, 0.5);
      }
    }
    
    &::before {
      content: '▹';
      position: absolute;
      left: 0;
      color: ${props => props.theme.colors.teal};
      transition: all 0.2s ease;
    }
  }
`;

const DetailActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 15px;
  margin-top: 20px;
`;

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background-color: rgba(10, 25, 47, 0.3);
  color: ${props => props.theme.colors.teal};
  border: 1px solid ${props => props.theme.colors.teal};
  border-radius: 4px;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.1);
  cursor: pointer;
  transform-style: preserve-3d;
  transform: translateZ(5px);
  
  .low-performance-mode & {
    transform: none;
  }
  
  svg {
    width: 16px;
    height: 16px;
    transition: all 0.2s ease;
  }
  
  &:hover {
    background-color: rgba(100, 255, 218, 0.1);
    transform: translateY(-2px) translateZ(10px);
    box-shadow: 0 5px 10px rgba(2, 12, 27, 0.2), 0 0 15px rgba(100, 255, 218, 0.2);
    
    .low-performance-mode & {
      transform: translateY(-2px);
    }
    
    svg {
      transform: scale(1.1);
      filter: drop-shadow(0 0 3px rgba(100, 255, 218, 0.5));
    }
  }
`;

// Boot sequence text animation component
const BootSequenceText = styled.div`
  font-family: ${props => props.theme.fonts.mono};
  color: ${props => props.theme.colors.teal};
  font-size: 14px;
  line-height: 1.5;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: rgba(10, 25, 47, 0.9);
  padding: 30px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.teal};
  width: 80%;
  max-width: 600px;
  text-align: left;
  white-space: pre-wrap;
  box-shadow: 0 0 30px rgba(100, 255, 218, 0.2);
  ${props => css`
    animation: ${flicker} 15s infinite;
  `}
  ${crtEffect}
  
  .low-performance-mode & {
    animation: none;
  }
  
  /* Terminal header */
  &::before {
    content: 'SYSTEM BOOT SEQUENCE';
    position: absolute;
    top: -30px;
    left: 0;
    width: 100%;
    padding: 5px 10px;
    background-color: ${props => props.theme.colors.teal};
    color: ${props => props.theme.colors.navy};
    font-weight: bold;
    text-align: center;
    border-radius: 4px 4px 0 0;
  }
  
  .boot-line {
    opacity: 0;

    &.visible {
      opacity: 1;
    }
  }

  /* Cursor blink effect */
  .cursor {
    display: inline-block;
    width: 10px;
    height: 16px;
    background-color: ${props => props.theme.colors.teal};
    margin-left: 4px;
    ${props => css`
      animation: ${blink} 1s step-end infinite;
    `}
    box-shadow: 0 0 5px rgba(100, 255, 218, 0.5);
    
    .low-performance-mode & {
      animation: none;
      box-shadow: none;
    }
  }
`;

// Enhanced Project Card Component with 3D and retro effects
const ProjectCard = React.memo(({ project, index, expandedId, setExpandedId, isGlitching, id }) => {
  const isExpanded = expandedId === project.id;
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  // 3D tilt effect on mouse move (only if not expanded and not reduced motion)
  useEffect(() => {
    if (isExpanded || prefersReducedMotion || !cardRef.current) return;
    
    const card = cardRef.current;
    
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
    };
    
    // Only add listeners if we're not in low performance mode
    if (!document.body.classList.contains('low-performance-mode')) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isExpanded, prefersReducedMotion]);
  
  const handleCardClick = (e) => {
    // Make sure we're not clicking on a link or button inside the card
    if (!e.target.closest('a') && !e.target.closest('button')) {
      setExpandedId(isExpanded ? null : project.id);
    }
  };
  
  const handleCloseClick = (e) => {
    e.stopPropagation();
    setExpandedId(null);
  };

  return (
    <StyledProjectCard 
      layoutId={`project-${project.id}`}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        transition: { duration: 0.3, delay: index * 0.1 }
      }}
      exit={{ opacity: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 200, 
        damping: 20 
      }}
      onClick={handleCardClick}
      isExpanded={isExpanded}
      className={isGlitching ? 'glitching' : ''}
      id={id}
      ref={cardRef}
    >
      {/* Active scanline */}
      <div className="scanline"></div>
      
      {isExpanded && (
        <CloseButton onClick={handleCloseClick} aria-label="Close details">
          <IconClose />
        </CloseButton>
      )}
      
      <StyledProjectInner>
        <StyledProjectImage style={isExpanded ? { height: '220px' } : {}}>
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="project-image"
          />
          <div className="image-overlay"></div>
          <div className="category-tag">{project.category}</div>
        </StyledProjectImage>
        
        <StyledProjectHeader>
          <div className="project-top">
            <div className="folder">
              <IconFolder />
            </div>
            <div className="project-links">
              {project.github && (
                <a href={project.github} aria-label="GitHub Link" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                  <IconGitHub />
                </a>
              )}
              {project.external && (
                <a href={project.external} aria-label="External Link" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                  <IconExternal />
                </a>
              )}
            </div>
          </div>
          
          <h3 className="project-title">{project.title}</h3>
          <div className="project-description">
            <p>{isExpanded ? project.description : project.shortDescription}</p>
          </div>
        </StyledProjectHeader>
        
        {!isExpanded ? (
          <div style={{ marginTop: 'auto' }}>
            <StyledTechList>
              {project.tech.slice(0, 4).map((tech, i) => (
                <li key={i}>{tech}</li>
              ))}
              {project.tech.length > 4 && <li>+{project.tech.length - 4}</li>}
            </StyledTechList>
            
            <StyledProjectFooter>
              <div className="project-date">{project.date}</div>
              <StyledViewMore className="view-more">
                View Details
              </StyledViewMore>
            </StyledProjectFooter>
          </div>
        ) : (
          <ExpandedDetails>
            <ExpandedContent>
              <DetailSection>
                <h4>Technologies</h4>
                <StyledTechList style={{ marginBottom: '20px' }}>
                  {project.tech.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </StyledTechList>
                
                <DetailActions>
                  {project.github && (
                    <ActionButton 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <IconGitHub /> GitHub Repository
                    </ActionButton>
                  )}
                  
                  {project.external && (
                    <ActionButton 
                      href={project.external} 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <IconExternal /> Live Demo
                    </ActionButton>
                  )}
                </DetailActions>
              </DetailSection>
              
              <DetailSection>
                <h4>Key Features</h4>
                <FeaturesList>
                  {project.keyFeatures ? (
                    project.keyFeatures.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))
                  ) : (
                    <li>Feature information not available</li>
                  )}
                </FeaturesList>
              </DetailSection>
            </ExpandedContent>
          </ExpandedDetails>
        )}
      </StyledProjectInner>
    </StyledProjectCard>
  );
});

ProjectCard.displayName = 'ProjectCard';

// Boot sequence component
const BootSequence = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const bootLines = [
    'SYSTEM INITIALIZATION...',
    'LOADING CORE MODULES...',
    'INITIALIZING PROJECT DATABASE...',
    'SCANNING PROJECT ENTRIES...',
    'ESTABLISHING UI CONNECTIONS...',
    'VALIDATING PROJECT ASSETS...',
    'MOUNTING COMPONENT TREE...',
    'ESTABLISHING NETWORK PROTOCOLS...',
    'RENDERING INTERFACE...',
    'BOOT SEQUENCE COMPLETE.'
  ];

  useEffect(() => {
    if (visibleLines < bootLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 250);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, bootLines.length, onComplete]);

  return (
    <BootSequenceText>
      {bootLines.map((line, index) => (
        <div 
          key={index} 
          className={`boot-line ${index < visibleLines ? 'visible' : ''}`}
        >
          {index < visibleLines && `> ${line}`}
          {index === visibleLines - 1 && <span className="cursor"></span>}
        </div>
      ))}
    </BootSequenceText>
  );
};

// Enhanced project data with image URLs
const projectsData = [
  {
    id: 1,
    title: "SEO Analyzer",
    shortDescription: "Real-time SEO analysis tool with 6 key metrics.",
    description: "A comprehensive SEO tool that provides instant feedback on 6 key on-page metrics to help optimize content for search engines. The analyzer evaluates keyword usage, meta descriptions, heading structure, content quality, and more.",
    tech: ["React", "Node.js", "Express.js", "TextRazor API"],
    github: "https://github.com/itsanubhav009/seo-analyzer",
    external: "https://seo-analyzer-2b8f.vercel.app",
    date: "May 2024 - June 2024",
    category: "web",
    imageUrl: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    keyFeatures: [
      "Real-time analysis of SEO metrics with actionable feedback",
      "Dynamic preview functionality to see changes in real-time",
      "Integration with TextRazor API for advanced content analysis",
      "Responsive design for desktop and mobile use"
    ]
  },
  {
    id: 2,
    title: "AI Agent Chatbot",
    shortDescription: "Context-aware chatbot with semantic search capabilities.",
    description: "A sophisticated AI chatbot system that maintains context across conversations and leverages two open-source models to generate more accurate and relevant responses. The system integrates a vector database for efficient semantic search across a large document collection.",
    tech: ["Python", "LangChain", "Hugging Face", "Vector Database"],
    github: "https://github.com/itsanubhav009/ai-agent-chatbot",
    external: "",
    date: "Jan 2024 - March 2024",
    category: "ai",
    imageUrl: "https://images.unsplash.com/photo-1488229297570-58520851e868?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    keyFeatures: [
      "Context-aware conversation system that remembers previous interactions",
      "Dual model architecture for improved accuracy and response quality",
      "Vector database integration for semantic search across 1,200+ documents",
      "Optimized query processing for faster response times"
    ]
  },
  {
    id: 3,
    title: "DomainVault",
    shortDescription: "Mail server with custom domain control and spam protection.",
    description: "A comprehensive mail server solution with customizable domain settings and robust security features. The system handles multiple simultaneous connections efficiently through multi-threading and provides integrated spam reporting and filtering capabilities.",
        tech: ["C++", "SMTP", "POP3", "SQLite", "Multi-threading"],
    github: "https://github.com/itsanubhav009/domainvault",
    external: "",
    date: "July 2023 - Oct 2023",
    category: "backend",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    keyFeatures: [
      "Custom domain email management with administrative controls",
      "Secure attachment handling with encryption and virus scanning",
      "Multi-threaded architecture supporting 25+ simultaneous client sessions",
      "Integrated spam detection and reporting system"
    ]
  },
  {
    id: 4,
    title: "IntelliRoute",
    shortDescription: "Spatial route-matching platform with interactive maps.",
    description: "A route-matching platform that uses complex spatial queries to connect users traveling on similar routes. The application features an interactive map interface and enables user discovery and communication based on route proximity.",
    tech: ["React.js", "Node.js", "PostGIS", "Supabase"],
    github: "https://github.com/itsanubhav009/intelliroute",
    external: "",
    date: "Feb 2024 - April 2024",
    category: "web",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    keyFeatures: [
      "Advanced spatial querying for optimized route matching",
      "Real-time user discovery based on route proximity",
      "Interactive map interface with route visualization",
      "Integrated private messaging system for connected users"
    ]
  },
  {
    id: 5,
    title: "MCP Server",
    shortDescription: "High-performance TCP chat server with auth system.",
    description: "A resilient TCP chat server built to handle high traffic and maintain low latency even under load. The system uses multi-threading with pthreads for efficient resource utilization and includes a secure authentication system.",
    tech: ["C++", "Socket Programming", "Pthreads", "Authentication"],
    github: "https://github.com/itsanubhav009/mcp-server",
    external: "",
    date: "May 2023 - June 2023",
    category: "networking",
    imageUrl: "https://images.unsplash.com/photo-1551651653-c5dcb914d809?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    keyFeatures: [
      "High-performance architecture supporting 50+ concurrent clients",
      "Multi-threaded design using pthreads for optimized resource usage",
      "Secure authentication system with password encryption",
      "Optimized for sub-100ms latency even under high load"
    ]
  },
  {
    id: 6,
    title: "Data Visualization Dashboard",
    shortDescription: "Interactive dashboard with real-time metrics visualization.",
    description: "A responsive data visualization dashboard that integrates with multiple REST APIs to present complex data through intuitive, interactive charts. The dashboard helps users understand trends and patterns in real-time metrics.",
    tech: ["Next.js", "Chart.js", "Tailwind CSS", "REST APIs"],
    github: "https://github.com/itsanubhav009/data-viz-dashboard",
    external: "",
    date: "July 2023 - Aug 2023",
    category: "web",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    keyFeatures: [
      "Real-time data fetching from multiple REST API endpoints",
      "Five different interactive chart types for comprehensive data visualization",
      "Responsive design that adapts to different screen sizes",
      "Customizable dashboard layout with user preferences"
    ]
  },
  {
    id: 7,
    title: "E-Vidhi: Legal Connect",
    shortDescription: "Secure lawyer-client platform with real-time chat.",
    description: "A secure platform connecting lawyers and clients, featuring real-time communication, document sharing, and case management. The system uses JWT for authentication and MongoDB for efficient data management.",
    tech: ["MERN Stack", "Socket.io", "JWT", "MongoDB"],
    github: "https://github.com/itsanubhav009/e-vidhi",
    external: "",
    date: "Nov 2023 - Dec 2023",
    category: "web",
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    keyFeatures: [
      "Lawyer-client matching system with expertise filtering",
      "Real-time chat functionality using Socket.io",
      "Secure document sharing with access controls",
      "Case management and scheduling system"
    ]
  },
  {
    id: 8,
    title: "Portfolio Website",
    shortDescription: "Interactive personal portfolio with retro aesthetics.",
    description: "A personal portfolio website featuring interactive elements, animated transitions, and a unique retro-futuristic design. The site showcases projects, skills, and experience in an engaging way.",
    tech: ["React", "Styled Components", "Framer Motion", "Three.js"],
    github: "https://github.com/itsanubhav009/portfolio",
    external: "https://itsanubhav009.vercel.app",
    date: "April 2024 - May 2024",
    category: "web",
    imageUrl: "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    keyFeatures: [
      "Custom animations and transitions for engaging user experience",
      "Retro-futuristic design with CRT and terminal aesthetics",
      "Responsive layout that works across all devices",
      "Optimized performance for smooth interactions"
    ]
  }
];

// Main Projects component
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);
  const [lowPerformanceMode, setLowPerformanceMode] = useState(false);
  const { ref, controls } = useScrollReveal();
  
  // Current date and time and username (updated with provided values)
  const currentDateTime = "2025-07-11 14:47:49"; // Updated timestamp
  const username = "itsanubhav009";
  
  // Toggle performance mode
  const togglePerformanceMode = useCallback(() => {
    setLowPerformanceMode(prev => !prev);
    
    if (!lowPerformanceMode) {
      document.body.classList.add('low-performance-mode');
    } else {
      document.body.classList.remove('low-performance-mode');
    }
  }, [lowPerformanceMode]);
  
  // Filter projects by category
  const handleFilterClick = useCallback((category) => {
    setExpandedId(null); // Close any expanded project when changing category
    setActiveCategory(category);
  }, []);
  
  // Complete boot sequence
  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
    setIsGlitching(true);
    
    // After glitching, show the content
    setTimeout(() => {
      setIsGlitching(false);
      setIsLoaded(true);
      setVisibleProjects(projectsData);
    }, 1000);
  }, []);
  
  // Filter projects when category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setVisibleProjects(projectsData);
    } else {
      setVisibleProjects(projectsData.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);
  
  // Get unique categories for filter buttons
  const categories = useMemo(() => {
    const categorySet = new Set(['all']);
    projectsData.forEach(project => categorySet.add(project.category));
    return Array.from(categorySet);
  }, []);
  
  // Scroll to expanded card
  useEffect(() => {
    if (expandedId) {
      const element = document.getElementById(`project-${expandedId}`);
      if (element) {
        // Smooth scroll to the expanded element with some offset
        const yOffset = -80; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }
  }, [expandedId]);
  
  return (
    <PageContainer>
      <CRTEffects />
      <StyledProjectsSection id="projects" className={isBooting || isGlitching ? 'loading' : ''}>
        {isBooting && <BootSequence onComplete={handleBootComplete} />}
        
        <RetroGlow />
        
        <GlitchContainer
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className={isGlitching ? 'glitching' : ''}
          data-text="Projects"
        >
          <StyledProjectsHeader className={isGlitching ? 'glitching' : ''}>
            <h2 className="section-heading">Projects</h2>
          </StyledProjectsHeader>
          
          <StyledFilterControls>
            {categories.map((category, index) => (
              <StyledFilterButton 
                key={index}
                active={activeCategory === category}
                onClick={() => handleFilterClick(category)}
                aria-label={`Filter by ${category}`}
              >
                {category === 'all' ? 'ALL' : category.toUpperCase()}
              </StyledFilterButton>
            ))}
          </StyledFilterControls>
          
          <AnimatePresence mode="wait">
            {isLoaded ? (
              <StyledProjectsGrid layout>
                <AnimatePresence>
                  {visibleProjects.map((project, index) => (
                    <ProjectCard 
                      key={project.id}
                      project={project}
                      index={index}
                      expandedId={expandedId}
                      setExpandedId={setExpandedId}
                      isGlitching={isGlitching}
                      id={`project-${project.id}`}
                    />
                  ))}
                </AnimatePresence>
              </StyledProjectsGrid>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ 
                  textAlign: 'center', 
                  color: '#64ffda', 
                  fontFamily: 'monospace',
                  padding: '50px 0'
                }}
              >
                <div style={{ display: 'inline-block', position: 'relative' }}>
                  Loading projects...
                  <LoadingBar />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <StyledProjectsStatus>
            <div className="status-text">PROJECTS LOADED: {visibleProjects.length}</div>
            <div className="status-info">
              <span className="username">{username}</span>
              <span className="timestamp">{currentDateTime}</span>
            </div>
          </StyledProjectsStatus>
        </GlitchContainer>
      </StyledProjectsSection>
      
      {/* Performance mode toggle button */}
      <PerformanceModeToggle 
        onClick={togglePerformanceMode} 
        isActive={!lowPerformanceMode}
        aria-label={lowPerformanceMode ? "Enable high performance mode" : "Enable low performance mode"}
      >
        <IconPerformance />
      </PerformanceModeToggle>
    </PageContainer>
  );
};

export default Projects;