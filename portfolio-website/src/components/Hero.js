import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import RetroButton from './RetroButton';
import RetroText from './RetroText';
import { neonText, retroGrid } from '../styles/effects/RetroEffects';

// Retro animation keyframes
const glitch = keyframes`
  0% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  14% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  15% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  49% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  50% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                0.05em 0 0 rgba(0, 255, 0, 0.75),
                0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  99% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                0.05em 0 0 rgba(0, 255, 0, 0.75),
                0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  100% {
    text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
                -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
                -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
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

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const flicker = keyframes`
  0% {
    opacity: 1;
  }
  5% {
    opacity: 0.9;
  }
  10% {
    opacity: 1;
  }
  15% {
    opacity: 0.95;
  }
  20% {
    opacity: 1;
  }
  50% {
    opacity: 0.9;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0.95;
  }
`;

const gradientBg = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const shine = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const neonFlicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 
      0 0 4px #fff,
      0 0 11px #fff,
      0 0 19px #fff,
      0 0 40px #0fa,
      0 0 80px #0fa,
      0 0 90px #0fa,
      0 0 100px #0fa,
      0 0 150px #0fa;
  }
  20%, 24%, 55% {        
    text-shadow: none;
  }
`;

const glitchEffect = css`
  position: relative;
  z-index: 1;
  
  &:hover {
    animation: ${glitch} 0.5s infinite;
  }
`;

const StyledHeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0.02; /* Reduced opacity for more subtle grid */
    ${retroGrid}
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px; /* Reduced from 4px to be more subtle */
    background: ${({ theme }) => theme.colors.synthwaveGradient};
    opacity: 0.5; /* Added opacity to blend better with background */
    z-index: 1;
  }
  
  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }
`;

const GridLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(94, 234, 212, 0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(94, 234, 212, 0.02) 1px, transparent 1px); /* Reduced opacity from 0.03 to 0.02 */
  background-size: 40px 40px;
  z-index: -1;
  pointer-events: none;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at center,
      transparent 0%,
      rgba(10, 25, 47, 0.4) 100%
    );
    z-index: -1;
  }
`;

const SunburstBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background: radial-gradient(
    circle at center,
    transparent 0%,
    ${({ theme }) => theme.colors.navy} 70%
  );
  opacity: 0.7;
  z-index: -2;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70vw;
    height: 70vh;
    background: radial-gradient(
      circle at center,
      ${({ theme }) => theme.colors.teal}22 0%,
      transparent 70%
    );
    z-index: -1;
  }
`;

const RetroGlow = styled.div`
  position: absolute;
  top: 30%;
  left: 30%;
  transform: translateX(-50%);
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle at center,
    ${({ theme }) => theme.colors.teal}22,
    transparent 70%
  );
  z-index: -1;
  opacity: 0.6;
  filter: blur(40px);
`;

const StyledOverline = styled(motion.div)`
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  color: ${({ theme }) => theme.colors.teal};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(${({ theme }) => theme.fontSizes.sm}, 5vw, ${({ theme }) => theme.fontSizes.md});
  font-weight: 400;
  position: relative;
  text-shadow: 0 0 5px ${({ theme }) => theme.colors.teal}, 0 0 10px ${({ theme }) => theme.colors.teal};
  z-index: 1;
  width: 100%;
  display: block;
  text-align: left;
  white-space: nowrap;
  
  &:hover {
    text-shadow: 0 0 10px ${({ theme }) => theme.colors.teal}, 0 0 20px ${({ theme }) => theme.colors.teal};
  }

  @media (max-width: 480px) {
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
    font-size: ${({ theme }) => theme.fontSizes.sm}; /* Ensure font size is not too large on mobile */
  }
`;

const StyledTitle = styled(motion.h2)`
  margin: 0;
  font-size: clamp(40px, 8vw, 80px);
  font-weight: 600;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
  color: #fff;
  ${neonText}
  text-shadow: 
    0 0 7px #fff,
    0 0 10px #fff,
    0 0 21px #fff,
    0 0 42px #0fa,
    0 0 82px #0fa,
    0 0 92px #0fa,
    0 0 102px #0fa,
    0 0 151px #0fa;
  animation: ${neonFlicker} 3.5s infinite alternate;
  
  &:hover {
    animation: ${glitch} 0.3s infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 70%;
    height: 1px; /* Reduced from 2px to be more subtle */
    background: ${({ theme }) => theme.colors.synthwaveGradient};
    opacity: 0.5; /* Reduced opacity to blend better */
  }
`;

const StyledSubtitle = styled(motion.h3)`
  margin-top: ${({ theme }) => theme.spacing.lg};
  line-height: 0.9;
  font-size: clamp(40px, 8vw, 80px);
  font-weight: 600;
  position: relative;
  z-index: 1;
  
  background: linear-gradient(to right, #fc466b, #3f5efb);
  background-size: 200% 200%;
  animation: ${gradientBg} 5s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);
  
  &:hover {
    filter: brightness(1.2);
    transform: translateY(-5px);
    transition: transform 0.3s ease;
  }
`;

const StyledDescription = styled(motion.div)`
  margin-top: ${({ theme }) => theme.spacing.xl};
  max-width: 540px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.slate};
  position: relative;
  padding: 10px;
  border-radius: 5px;
  z-index: 1;
  
  &:hover {
    background: rgba(94, 234, 212, 0.05);
    box-shadow: 0 0 15px rgba(94, 234, 212, 0.1);
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
    position: relative;
    transition: all 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.teal};
      text-shadow: 0 0 8px ${({ theme }) => theme.colors.teal};
    }
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: ${({ theme }) => theme.colors.teal};
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.4s ease;
    }
    
    &:hover:after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0%,
      rgba(255, 255, 255, 0.02) 0.5%, /* Reduced opacity from 0.03 to 0.02 */
      transparent 1%
    );
    animation: ${scanlines} 8s linear infinite;
    pointer-events: none;
    z-index: -1;
    opacity: 0.2; /* Reduced from 0.3 to blend better */
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  position: relative;
  z-index: 2;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Retro Cursor
const RetroCursor = styled.div`
  position: fixed;
  width: 10px;
  height: 16px;
  background-color: rgba(100, 255, 218, 0.7);
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  animation: ${blink} 1s infinite;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  padding: 0 25px; /* Reduced from 50px to ensure text doesn't get cut off at edges */
  margin: 0 auto;
  position: relative; /* Added to ensure positioning context for children */
`;

const MotionContentWrapper = motion(ContentWrapper);

const Hero = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  // Add random glitch effect occasionally
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 500);
    }, Math.random() * 10000 + 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  // Track cursor position
  useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateCursorPosition);
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1],
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1],
      },
    },
    hover: {
      y: -5,
      transition: { duration: 0.3 }
    }
  };
  
  // Resume URL
  const resumeUrl = "https://drive.google.com/file/d/1G3i8AejuSTkrrU99bPbsx89fItmUdIdq/view?usp=sharing";

  return (
    <StyledHeroSection id="hero">
      <GridLines />
      <SunburstBackground />
      <RetroGlow />
      
      <RetroCursor 
        style={{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px` 
        }} 
      />
      
      <MotionContentWrapper
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <StyledOverline variants={childVariants}>
          <RetroText
            text=" Hi, my name is "
            typingSpeed={70}
            startDelay={500}
            fontSize="clamp(14px, 5vw, 16px)"
            showCursor={false}
          />
        </StyledOverline>
        
        <StyledTitle 
          variants={childVariants}
          data-text="Anubhav."
          className={glitchActive ? 'glitch-active' : ''}
        >
          Anubhav.
        </StyledTitle>
        
        <StyledSubtitle 
          variants={subtitleVariants}
          whileHover="hover"
        >
          I build things for the web.
        </StyledSubtitle>
        
        <StyledDescription variants={childVariants}>
          I'm a software engineer specializing in building exceptional digital experiences. 
          Currently a B.Tech student at Indian Institute of Information Technology Senapati, Manipur
          with a CPI of 8.39/10.0, focusing on accessible, human-centered products.
        </StyledDescription>
        
        <ButtonContainer variants={childVariants}>
          <RetroButton 
            href="#projects" 
            variant="neon"
            glow
          >
            My Work
          </RetroButton>
          
          <RetroButton
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="pixel"
            color="purple"
          >
            Resume
          </RetroButton>
        </ButtonContainer>
      </MotionContentWrapper>
    </StyledHeroSection>
  );
};

export default Hero;