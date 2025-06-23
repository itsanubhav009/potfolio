import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pixelBorder, retroGrid } from '../styles/effects/RetroEffects';

const StyledCardWrapper = styled(motion.div)`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  ${pixelBorder}
  z-index: 1;
`;

const StyledCardInner = styled(motion.div)`
  position: relative;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.lightNavy};
  border-radius: ${({ theme }) => theme.borderRadius};
  z-index: 2;
  
  ${retroGrid}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.colors.synthwaveGradient};
    z-index: 3;
  }
`;

const StyledCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StyledCardTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.teal};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const StyledCardContent = styled.div`
  color: ${({ theme }) => theme.colors.lightSlate};
  z-index: 3;
  position: relative;
`;

const RetroCard = ({ 
  title, 
  children, 
  className, 
  headerContent,
  ...props 
}) => {
  return (
    <StyledCardWrapper 
      className={className}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 } 
      }}
      {...props}
    >
      <StyledCardInner
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {(title || headerContent) && (
          <StyledCardHeader>
            {title && <StyledCardTitle>{title}</StyledCardTitle>}
            {headerContent}
          </StyledCardHeader>
        )}
        <StyledCardContent>
          {children}
        </StyledCardContent>
      </StyledCardInner>
    </StyledCardWrapper>
  );
};

export default RetroCard;
