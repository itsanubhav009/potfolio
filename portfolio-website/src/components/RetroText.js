import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { neonText, glitchEffect } from '../styles/effects/RetroEffects';

// Typing animation
const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const StyledRetroText = styled(motion.div)`
  display: inline-block;
  font-family: ${props => props.fontFamily || props.theme.fonts.mono};
  font-size: ${props => props.fontSize || props.theme.fontSizes.xl};
  
  ${props => props.neon && neonText}
  ${props => props.glitch && glitchEffect}
  
  .cursor {
    display: inline-block;
    width: ${props => props.cursorWidth || '3px'};
    height: ${props => props.cursorHeight || '1em'};
    background-color: ${props => props.cursorColor || props.theme.colors.teal};
    margin-left: 2px;
    animation: ${blink} 1s step-end infinite;
    vertical-align: text-bottom;
  }
`;

const RetroText = ({ 
  text, 
  typingSpeed = 50, 
  startDelay = 0,
  showCursor = true,
  cursorWidth,
  cursorHeight,
  cursorColor,
  fontFamily,
  fontSize,
  neon = false,
  glitch = false,
  onTypingComplete,
  ...props 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);
  const textRef = useRef(text);

  useEffect(() => {
    // Reset if text changes
    if (text !== textRef.current) {
      indexRef.current = 0;
      setDisplayedText('');
      textRef.current = text;
    }

    const startTyping = () => {
      setIsTyping(true);
      
      const typingInterval = setInterval(() => {
        if (indexRef.current < text.length) {
          setDisplayedText(prev => prev + text.charAt(indexRef.current));
          indexRef.current += 1;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          if (onTypingComplete) onTypingComplete();
        }
      }, typingSpeed);
      
      return () => clearInterval(typingInterval);
    };
    
    const timer = setTimeout(startTyping, startDelay);
    
    return () => clearTimeout(timer);
  }, [text, typingSpeed, startDelay, onTypingComplete]);

  return (
    <StyledRetroText
      fontFamily={fontFamily}
      fontSize={fontSize}
      neon={neon}
      glitch={glitch}
      cursorWidth={cursorWidth}
      cursorHeight={cursorHeight}
      cursorColor={cursorColor}
      {...props}
    >
      {displayedText}
      {showCursor && isTyping && <span className="cursor" />}
    </StyledRetroText>
  );
};

export default RetroText;
