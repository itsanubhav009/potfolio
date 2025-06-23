import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import RetroText from './RetroText';
import RetroButton from './RetroButton';
import { neonText, retroGrid } from '../styles/effects/RetroEffects';

const StyledHeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-height: 100vh;
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
    opacity: 0.05;
    ${retroGrid}
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(to top, ${({ theme }) => theme.colors.navy}, transparent);
    z-index: -1;
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
  background: linear-gradient(to right, rgba(94, 234, 212, 0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(94, 234, 212, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: -1;
  pointer-events: none;
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
      ${({ theme }) => theme.colors.teal}11 0%,
      transparent 70%
    );
    z-index: -1;
  }
`;

const StyledOverline = styled(motion.div)`
  margin: 0 0 ${({ theme }) => theme.spacing.md} 3px;
  color: ${({ theme }) => theme.colors.teal};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(${({ theme }) => theme.fontSizes.sm}, 5vw, ${({ theme }) => theme.fontSizes.md});
  font-weight: 400;

  @media (max-width: 480px) {
    margin: 0 0 ${({ theme }) => theme.spacing.md} 2px;
  }
`;

const StyledTitle = styled(motion.h2)`
  margin: 0;
  font-size: clamp(40px, 8vw, 80px);
  font-weight: 600;
  ${neonText}
  letter-spacing: 1px;
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.teal};
`;

const StyledSubtitle = styled(motion.h3)`
  margin-top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.slate};
  line-height: 0.9;
  font-size: clamp(40px, 8vw, 80px);
  font-weight: 600;
  
  &:hover {
    ${({ theme }) => theme.mixins.gradientText};
  }
`;

const StyledDescription = styled(motion.div)`
  margin-top: ${({ theme }) => theme.spacing.xl};
  max-width: 540px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.slate};

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Hero = () => {
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
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  return (
    <StyledHeroSection id="hero">
      <GridLines />
      <SunburstBackground />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <StyledOverline variants={childVariants}>
          <RetroText
            text="Hi, my name is"
            typingSpeed={70}
            startDelay={500}
            fontSize="clamp(14px, 5vw, 16px)"
          />
        </StyledOverline>
        
        <StyledTitle variants={childVariants}>
          Anubhav.
        </StyledTitle>
        
        <StyledSubtitle 
          variants={subtitleVariants}
          whileHover="hover"
        >
          I build things for the web.
        </StyledSubtitle>
        
        <StyledDescription variants={childVariants}>
          I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences. 
          Currently, I'm focused on building accessible, human-centered products that make a positive impact.
        </StyledDescription>
        
        <ButtonContainer variants={childVariants}>
          <RetroButton 
            href="#projects" 
            variant="neon" 
            glow={true}
          >
            Check out my work!
          </RetroButton>
          
          <RetroButton
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            variant="pixel"
            color="purple"
          >
            Resume
          </RetroButton>
        </ButtonContainer>
      </motion.div>
    </StyledHeroSection>
  );
};

export default Hero;
