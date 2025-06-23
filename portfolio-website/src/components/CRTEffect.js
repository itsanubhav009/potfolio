import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const turnOn = keyframes`
  0% {
    transform: scale(1, 0.8) translate3d(0, 0, 0);
    filter: brightness(30);
    opacity: 1;
  }
  3.5% {
    transform: scale(1, 0.8) translate3d(0, 100%, 0);
  }
  3.6% {
    transform: scale(1, 0.8) translate3d(0, -100%, 0);
    opacity: 1;
  }
  9% {
    transform: scale(1.3, 0.6) translate3d(0, 100%, 0);
    filter: brightness(30);
    opacity: 0;
  }
  11% {
    transform: scale(1, 1) translate3d(0, 0, 0);
    filter: contrast(0) brightness(0);
    opacity: 0;
  }
  100% {
    transform: scale(1, 1) translate3d(0, 0, 0);
    filter: contrast(1) brightness(1.2) saturate(1.3);
    opacity: 1;
  }
`;

const flicker = keyframes`
  0% {
    opacity: 0.97;
  }
  5% {
    opacity: 0.4;
  }
  6% {
    opacity: 0.97;
  }
  11% {
    opacity: 0.4;
  }
  12% {
    opacity: 0.97;
  }
  70% {
    opacity: 0.97;
  }
  72% {
    opacity: 0.4;
  }
  77% {
    opacity: 0.97;
  }
  85% {
    opacity: 0.4;
  }
  86% {
    opacity: 0.97;
  }
  91% {
    opacity: 0.4;
  }
  92% {
    opacity: 0.97;
  }
  97% {
    opacity: 0.4;
  }
  98% {
    opacity: 0.97;
  }
`;

const rgbShift = keyframes`
  0%, 100% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.05em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  25% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75), 0.05em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  49% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.05em 0.025em 0 rgba(0, 255, 0, 0.75), -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  50% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  99% {
    text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
`;

const scanlines = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100%;
  }
`;

const staticNoise = keyframes`
  0% { 
    transform: translate(-10%, 10%);
  }
  10% { 
    transform: translate(-15%, -10%);
  }
  20% { 
    transform: translate(-5%, 15%);
  }
  30% { 
    transform: translate(-10%, 20%);
  }
  40% { 
    transform: translate(5%, 15%);
  }
  50% { 
    transform: translate(-15%, -5%);
  }
  60% { 
    transform: translate(15%, 0%);
  }
  70% { 
    transform: translate(0%, 10%);
  }
  80% { 
    transform: translate(-15%, 0%);
  }
  90% { 
    transform: translate(10%, 5%);
  }
  100% { 
    transform: translate(-10%, 10%);
  }
`;

const CRTContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;
`;

const CRTOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: ${css`${turnOn}`} 2s linear;
  animation-fill-mode: forwards;
  z-index: 10;
  
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(18, 16, 16, 0) 50%, 
      rgba(0, 0, 0, 0.25) 50%
    );
    background-size: 100% 4px;
    z-index: 2;
    opacity: 0.15;
    pointer-events: none;
    animation: ${css`${scanlines}`} 0.3s linear infinite;
  }
  
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(18, 16, 16, 0.1);
    opacity: 0;
    z-index: 2;
    pointer-events: none;
    animation: ${css`${flicker}`} 0.3s infinite;
  }
`;

const NoiseLayer = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E");
  background-size: 200px;
  opacity: 0.06;
  pointer-events: none;
  animation: ${css`${staticNoise}`} 5s steps(10) infinite;
  z-index: 3;
`;

const RGBSplitLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 4;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -5px;
    width: 100%;
    height: 100%;
    background: rgba(255, 0, 0, 0.2);
    mix-blend-mode: multiply;
  }
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 5px;
    width: 100%;
    height: 100%;
    background: rgba(0, 255, 255, 0.2);
    mix-blend-mode: multiply;
  }
`;

const VignetteLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.7);
  z-index: 5;
`;

const CRTEffect = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const elements = Array.from(document.querySelectorAll('h1, h2, h3'));

    const addCRTTextEffect = () => {
      elements.forEach(el => {
        el.classList.add('crt-text');
      });
    };

    // Add the CRT text effect after the page loads
    const timeout = setTimeout(addCRTTextEffect, 2500); // Wait for initial animation to complete

    // Add global CRT text style
    const style = document.createElement('style');
    style.id = 'crt-text-styles'; // Add ID for easier removal
    style.innerHTML = `
      .crt-text {
        text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.05em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
        animation: ${rgbShift.getName()} 3s infinite linear alternate;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function to run on unmount
    return () => {
      clearTimeout(timeout);
      const styleElement = document.getElementById('crt-text-styles');
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
      elements.forEach(el => {
        el.classList.remove('crt-text');
      });
    };
  }, []);

  if (!mounted) return null;

  return (
    <CRTContainer>
      <CRTOverlay>
        <NoiseLayer />
        <RGBSplitLayer />
        <VignetteLayer />
      </CRTOverlay>
    </CRTContainer>
  );
};

export default CRTEffect;
