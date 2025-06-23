import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { retroGrid } from '../styles/effects/RetroEffects';

const StyledSection = styled(motion.section)`
  position: relative;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
  margin: ${({ theme }) => `${theme.spacing.xl} 0`};
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
`;

const ScanLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 1px,
    rgba(0, 0, 0, 0.03) 1px,
    rgba(0, 0, 0, 0.03) 2px
  );
  pointer-events: none;
  z-index: 2;
  opacity: 0.5;
`;

const RetroGlow = styled.div`
  position: absolute;
  width: 100%;
  height: 200px;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.teal}00,
    ${({ theme }) => theme.colors.teal}22,
    ${({ theme }) => theme.colors.purple}22,
    ${({ theme }) => theme.colors.purple}00
  );
  opacity: 0.3;
  border-radius: 50%;
  filter: blur(80px);
  z-index: -1;
`;

const ParallaxContent = styled(motion.div)`
  position: relative;
  z-index: 1;
  perspective: 1000px;
`;

const RetroSection = ({ 
  children, 
  id, 
  className, 
  parallaxFactor = 0.1,
  hasScanLines = true,
  hasGlow = true,
  ...props 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Create parallax effect with transformY
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  // Create custom glow positions for better effect
  const glowRefs = useRef([]);
  
  useEffect(() => {
    if (!hasGlow) return;
    
    // Position glows randomly
    glowRefs.current.forEach((glow) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      glow.style.left = `${x}%`;
      glow.style.top = `${y}%`;
    });
  }, [hasGlow]);
  
  return (
    <StyledSection
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {hasGlow && (
        <>
          <RetroGlow ref={el => glowRefs.current[0] = el} />
          <RetroGlow ref={el => glowRefs.current[1] = el} />
        </>
      )}
      
      <ParallaxContent style={{ y }}>
        {children}
      </ParallaxContent>
      
      {hasScanLines && <ScanLines />}
    </StyledSection>
  );
};

export default RetroSection;
