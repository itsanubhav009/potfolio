import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const btnGlow = keyframes`
  0% {
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.teal}, 
                0 0 10px ${({ theme }) => theme.colors.teal},
                0 0 15px ${({ theme }) => theme.colors.teal};
  }
  50% {
    box-shadow: 0 0 10px ${({ theme }) => theme.colors.teal}, 
                0 0 20px ${({ theme }) => theme.colors.teal},
                0 0 30px ${({ theme }) => theme.colors.teal};
  }
  100% {
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.teal}, 
                0 0 10px ${({ theme }) => theme.colors.teal},
                0 0 15px ${({ theme }) => theme.colors.teal};
  }
`;

const CRT_STYLES = css`
  position: relative;
  &::before {
    content: "";
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
    z-index: 1;
    opacity: 0.15;
    pointer-events: none;
  }
`;

const PIXEL_STYLES = css`
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 3px 3px;
`;

const StyledButton = styled(motion.a)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.size === 'small' ? '10px 16px' : '16px 32px'};
  color: ${props => props.theme.colors[props.color] || props.theme.colors.teal};
  background-color: ${props => 
    props.filled 
      ? props.theme.colors[props.color] || props.theme.colors.teal
      : 'transparent'
  };
  border: ${props => 
    props.variant === 'pixel'
      ? 'none'
      : `2px solid ${props.theme.colors[props.color] || props.theme.colors.teal}`
  };
  border-radius: ${props => 
    props.variant === 'pixel'
      ? '0'
      : props.theme.borderRadius
  };
  font-family: ${props => 
    props.variant === 'pixel'
      ? props.theme.fonts.retro
      : props.theme.fonts.mono
  };
  font-size: ${props => 
    props.size === 'small' 
      ? props.theme.fontSizes.xs 
      : props.variant === 'pixel'
        ? props.theme.fontSizes.sm
        : props.theme.fontSizes.md
  };
  font-weight: ${props => props.variant === 'pixel' ? 400 : 500};
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  letter-spacing: ${props => props.variant === 'pixel' ? '1px' : 'normal'};
  
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  
  ${props => props.variant === 'crt' && CRT_STYLES}
  ${props => props.variant === 'pixel' && PIXEL_STYLES}
  
  ${props => props.glow && css`
    &:hover {
      animation: ${btnGlow} 1.5s infinite;
    }
  `}
  
  ${props => props.variant === 'pixel' && css`
    color: ${props.filled ? props.theme.colors.navy : props.theme.colors[props.color] || props.theme.colors.teal};
    position: relative;
    box-shadow: 
      ${props.filled ? props.theme.colors[props.color] || props.theme.colors.teal : 'transparent'} 4px 4px 0px,
      inset 0px 0px 1px 1px rgba(255, 255, 255, 0.2);
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${props.theme.colors[props.color] || props.theme.colors.teal};
      opacity: ${props.filled ? 1 : 0.1};
      z-index: -1;
    }
    
    &:hover {
      transform: translate(-2px, -2px);
      box-shadow: ${props.theme.colors[props.color] || props.theme.colors.teal} 6px 6px 0px;
    }
    
    &:active {
      transform: translate(2px, 2px);
      box-shadow: ${props.theme.colors[props.color] || props.theme.colors.teal} 0px 0px 0px;
    }
  `}
  
  ${props => props.variant === 'neon' && css`
    background: transparent;
    color: ${props.theme.colors[props.color] || props.theme.colors.teal};
    border: 2px solid ${props.theme.colors[props.color] || props.theme.colors.teal};
    box-shadow: 0 0 5px ${props.theme.colors[props.color] || props.theme.colors.teal}, 
                inset 0 0 5px ${props.theme.colors[props.color] || props.theme.colors.teal};
    text-shadow: 0 0 5px ${props.theme.colors[props.color] || props.theme.colors.teal};
    
    &:hover {
      box-shadow: 0 0 10px ${props.theme.colors[props.color] || props.theme.colors.teal}, 
                  inset 0 0 10px ${props.theme.colors[props.color] || props.theme.colors.teal};
      text-shadow: 0 0 10px ${props.theme.colors[props.color] || props.theme.colors.teal};
    }
  `}
  
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
    transition: 0.5s;
    z-index: 1;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  .content {
    position: relative;
    z-index: 2;
  }
`;

const RetroButton = ({
  children,
  href,
  onClick,
  color = 'teal',
  size = 'medium',
  filled = false,
  variant = 'default', // default, pixel, neon, crt
  glow = false,
  ...props
}) => {
  return (
    <StyledButton
      as={href ? 'a' : 'button'}
      href={href}
      onClick={onClick}
      color={color}
      size={size}
      filled={filled}
      variant={variant}
      glow={glow}
      whileHover={{
        y: variant === 'pixel' ? 0 : -5,
        scale: variant === 'pixel' ? 1 : 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      {...props}
    >
      <span className="content">{children}</span>
    </StyledButton>
  );
};

export default RetroButton;
