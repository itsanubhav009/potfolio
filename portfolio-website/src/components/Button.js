import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const StyledButton = styled(motion.a)`
  ${({ theme }) => theme.mixins.button};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  position: relative;
  z-index: 1;
`;

const ButtonHighlight = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.transTeal};
  border-radius: ${({ theme }) => theme.borderRadius};
  z-index: -1;
`;

const Button = ({ children, href, onClick, ...props }) => {
  return (
    <StyledButtonWrapper>
      <StyledButton
        href={href}
        onClick={onClick}
        whileHover={{ 
          y: -5,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          y: 0,
          transition: { duration: 0.1 }
        }}
        {...props}
      >
        {children}
      </StyledButton>
      <ButtonHighlight 
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ 
          scale: 1.05, 
          opacity: 0.3,
          transition: { duration: 0.3 }
        }}
      />
    </StyledButtonWrapper>
  );
};

export default Button;