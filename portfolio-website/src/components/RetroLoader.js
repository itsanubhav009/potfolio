import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { crtEffect } from '../styles/effects/RetroEffects';

const flicker = keyframes`
  0%, 100% { opacity: 1; }
  33% { opacity: 0.8; }
  66% { opacity: 0.9; }
`;

const tracking = keyframes`
  0% { transform: translateY(0); }
  20% { transform: translateY(2px); }
  40% { transform: translateY(-2px); }
  60% { transform: translateY(5px); }
  80% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const colorShift = keyframes`
  0% { filter: hue-rotate(0deg); }
  25% { filter: hue-rotate(1deg); }
  50% { filter: hue-rotate(0deg); }
  75% { filter: hue-rotate(-1deg); }
  100% { filter: hue-rotate(0deg); }
`;

const StyledLoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.navy};
  z-index: 9999;
  overflow: hidden;
  ${crtEffect}
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 2px,
      rgba(0, 0, 0, 0.05) 2px,
      rgba(0, 0, 0, 0.05) 4px
    );
    animation: ${tracking} 10s infinite, ${colorShift} 3s infinite;
    pointer-events: none;
    z-index: 0;
    opacity: 0.3;
  }
`;

const StyledVHSEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 255, 208, 0.1) 40%,
    rgba(223, 66, 249, 0.1) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  mix-blend-mode: overlay;
  pointer-events: none;
  animation: ${tracking} 8s infinite;
  z-index: 1;
`;

const StyledVHSBand = styled.div`
  position: absolute;
  width: 100%;
  height: 30px;
  background: rgba(255, 255, 255, 0.08);
  animation: ${tracking} 2s infinite linear;
  opacity: 0.3;
  z-index: 2;
`;

const StyledLoaderContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 3;
`;

const StyledLogo = styled(motion.div)`
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
  position: relative;
  
  svg {
    width: 100%;
    height: 100%;
    fill: none;
    filter: drop-shadow(0 0 10px ${({ theme }) => theme.colors.teal});
    animation: ${flicker} 2s infinite;
  }
`;

const StyledProgress = styled(motion.div)`
  width: 200px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-top: 20px;
  overflow: hidden;
`;

const StyledProgressBar = styled(motion.div)`
  height: 100%;
  background: ${({ theme }) => theme.colors.teal};
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.teal};
`;

const StyledText = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.teal};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-top: 20px;
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.teal};
  text-align: center;
  animation: ${flicker} 3s infinite alternate;
`;

const RetroLoader = ({ finishLoading }) => {
  const [progress, setProgress] = React.useState(0);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 2;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => finishLoading(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 50);
    
    return () => clearInterval(timer);
  }, [finishLoading]);

  const loadingTexts = [
    "LOADING",
    "TRACKING",
    "SCANNING",
    "BUFFERING",
    "CALIBRATING"
  ];
  
  const [loadingText, setLoadingText] = React.useState(loadingTexts[0]);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prevText => {
        const currentIndex = loadingTexts.indexOf(prevText);
        const nextIndex = (currentIndex + 1) % loadingTexts.length;
        return loadingTexts[nextIndex];
      });
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <StyledLoaderContainer>
      <StyledVHSEffect />
      <StyledVHSBand style={{ top: '20%' }} />
      <StyledVHSBand style={{ top: '60%' }} />
      
      <StyledLoaderContent
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <StyledLogo>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <title>Logo</title>
            <g>
              <g transform="translate(36.000000, 32.000000)">
                <path
                  fill="currentColor"
                  d="M14,28 L8,28 L0,0 L6,0 L10.5,18 L11.5,18 L16,0 L22,0 L14,28 Z"
                />
              </g>
              <path
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M 50, 5
                  L 11, 27
                  L 11, 72
                  L 50, 95
                  L 89, 73
                  L 89, 28 z"
              />
            </g>
          </svg>
        </StyledLogo>
        
        <StyledText>{loadingText}...</StyledText>
        
        <StyledProgress>
          <StyledProgressBar
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </StyledProgress>
        
        <StyledText>
          {progress}%
        </StyledText>
      </StyledLoaderContent>
    </StyledLoaderContainer>
  );
};

export default RetroLoader;
