import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const glitch = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
`;

const noise = keyframes`
  0%, 100% { opacity: 0; }
  5%, 95% { opacity: 0.2; }
  10%, 30%, 50%, 70%, 90% { opacity: 0.3; }
  20%, 40%, 60%, 80% { opacity: 0.1; }
`;

const rgbShift = keyframes`
  0%, 100% {
    text-shadow: -1px 0 rgba(255, 0, 0, 0.5), 1px 0 rgba(0, 255, 255, 0.5);
  }
  25% {
    text-shadow: 1px 0 rgba(255, 0, 0, 0.5), -1px 0 rgba(0, 255, 255, 0.5);
  }
  50% {
    text-shadow: -1px -1px rgba(255, 0, 0, 0.5), 1px 1px rgba(0, 255, 255, 0.5);
  }
  75% {
    text-shadow: 1px 1px rgba(255, 0, 0, 0.5), -1px -1px rgba(0, 255, 255, 0.5);
  }
`;

const StyledGlitchWrapper = styled(motion.div)`
  position: relative;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
  overflow: hidden;
  
  &:hover .glitch-img {
    animation: ${glitch} 0.2s cubic-bezier(.25, .46, .45, .94) both infinite;
  }
  
  &:hover .glitch-img::before {
    animation: ${noise} 0.2s infinite;
  }
  
  &:hover .glitch-img::after {
    animation: ${rgbShift} 0.2s infinite;
  }
`;

const StyledGlitchImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0;
    pointer-events: none;
    z-index: 2;
    mix-blend-mode: overlay;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    background-size: cover;
    background-position: center;
    opacity: 0.5;
    z-index: 0;
  }
`;

// Additional effects for more glitchy appearance
const StyledRGBSplit = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  opacity: 0;
  mix-blend-mode: screen;
  z-index: 1;
  
  &.red {
    opacity: 0.5;
    left: -5px;
    filter: url(#redFilter);
    display: ${({ active }) => active ? 'block' : 'none'};
  }
  
  &.blue {
    opacity: 0.5;
    left: 5px;
    filter: url(#blueFilter);
    display: ${({ active }) => active ? 'block' : 'none'};
  }
`;

const GlitchImage = ({ src, alt, width, height, onClick, ...props }) => {
  return (
    <>
      {/* SVG filters for RGB splitting */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="redFilter">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            />
          </filter>
          <filter id="blueFilter">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
      
      <StyledGlitchWrapper
        width={width}
        height={height}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        <StyledGlitchImage src={src} className="glitch-img" />
        <StyledRGBSplit src={src} className="red" active={true} />
        <StyledRGBSplit src={src} className="blue" active={true} />
        
        {alt && <span className="sr-only">{alt}</span>}
      </StyledGlitchWrapper>
    </>
  );
};

export default GlitchImage;
