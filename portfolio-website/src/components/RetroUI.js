import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';

// Animations
const flicker = keyframes`
  0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
    opacity: 0.99;
  }
  20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
    opacity: 0.4;
  }
`;

const scanline = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
  }
`;

const blink = keyframes`
  0%, 49% {
    opacity: 0;
  }
  50%, 100% {
    opacity: 1;
  }
`;

// Retro Divider Component
const DividerContainer = styled.div`
  width: 100%;
  margin: ${({ theme }) => theme.spacing.xl} 0;
  position: relative;
  text-align: center;
  overflow: hidden;
  
  &::before {
    content: "";
    display: block;
    height: 1px;
    width: 100%;
    background: linear-gradient(
      90deg, 
      transparent, 
      ${({ theme }) => theme.colors.teal}55, 
      ${({ theme }) => theme.colors.purple}55, 
      transparent
    );
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const DividerContent = styled.div`
  display: inline-block;
  position: relative;
  padding: 0 20px;
  background: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.teal};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  &::before, &::after {
    content: "//";
    color: ${({ theme }) => theme.colors.purple};
    margin: 0 10px;
  }
`;

export const RetroDivider = ({ text = "" }) => (
  <DividerContainer>
    <DividerContent>{text}</DividerContent>
  </DividerContainer>
);

// Retro Terminal Component
const TerminalContainer = styled.div`
  background: ${({ theme }) => theme.colors.lightNavy};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 15px;
  margin: ${({ theme }) => theme.spacing.md} 0;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  position: relative;
  overflow: hidden;
  
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

const TerminalHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightestNavy};
  padding-bottom: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TerminalTitle = styled.div`
  color: ${({ theme }) => theme.colors.teal};
  font-weight: bold;
`;

const TerminalControls = styled.div`
  display: flex;
  gap: 6px;
`;

const TerminalButton = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color, theme }) => color || theme.colors.red};
  opacity: 0.7;
`;

const TerminalContent = styled.div`
  color: ${({ theme }) => theme.colors.lightSlate};
  line-height: 1.5;
  position: relative;
  z-index: 2;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 15px;
  background: ${({ theme }) => theme.colors.teal};
  margin-left: 5px;
  animation: ${css`${blink}`} 1s step-end infinite;
  vertical-align: middle;
`;

const ScanLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background: rgba(255, 255, 255, 0.05);
  z-index: 1;
  animation: ${css`${scanline}`} 6s linear infinite;
  pointer-events: none;
  opacity: 0.5;
`;

export const RetroTerminal = ({ title = "Terminal", children }) => (
  <TerminalContainer>
    <TerminalHeader>
      <TerminalTitle>{title}</TerminalTitle>
      <TerminalControls>
        <TerminalButton color="#ff5f57" />
        <TerminalButton color="#ffbd2e" />
        <TerminalButton color="#28ca41" />
      </TerminalControls>
    </TerminalHeader>
    <TerminalContent>
      {children}
      <Cursor />
    </TerminalContent>
    <ScanLine />
  </TerminalContainer>
);

// Retro Badge Component
const BadgeContainer = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  background: ${({ color, theme }) => {
    if (color === 'teal') return theme.colors.teal + '22';
    if (color === 'purple') return theme.colors.purple + '22';
    if (color === 'pink') return theme.colors.pink + '22';
    return theme.colors.teal + '22';
  }};
  color: ${({ color, theme }) => {
    if (color === 'teal') return theme.colors.teal;
    if (color === 'purple') return theme.colors.purple;
    if (color === 'pink') return theme.colors.pink;
    return theme.colors.teal;
  }};
  border-radius: 4px;
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.mono};
  margin: 0 4px 4px 0;
  transition: all 0.2s ease;
  border: 1px solid ${({ color, theme }) => {
    if (color === 'teal') return theme.colors.teal + '44';
    if (color === 'purple') return theme.colors.purple + '44';
    if (color === 'pink') return theme.colors.pink + '44';
    return theme.colors.teal + '44';
  }};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px ${({ color, theme }) => {
      if (color === 'teal') return theme.colors.teal + '33';
      if (color === 'purple') return theme.colors.purple + '33';
      if (color === 'pink') return theme.colors.pink + '33';
      return theme.colors.teal + '33';
    }};
  }
`;

export const RetroBadge = ({ children, color = "teal" }) => (
  <BadgeContainer color={color}>
    {children}
  </BadgeContainer>
);

// Retro InfoBox Component
const InfoBoxContainer = styled.div`
  background: ${({ theme }) => theme.colors.lightNavy}55;
  border-left: 3px solid ${({ type, theme }) => {
    if (type === 'info') return theme.colors.teal;
    if (type === 'warning') return theme.colors.orange;
    if (type === 'error') return theme.colors.pink;
    return theme.colors.teal;
  }};
  padding: 15px;
  margin: ${({ theme }) => theme.spacing.md} 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, 
      ${({ type, theme }) => {
        if (type === 'info') return theme.colors.teal;
        if (type === 'warning') return theme.colors.orange;
        if (type === 'error') return theme.colors.pink;
        return theme.colors.teal;
      }}11 0%, 
      transparent 80%
    );
    z-index: 1;
  }
`;

const InfoBoxTitle = styled.div`
  color: ${({ type, theme }) => {
    if (type === 'info') return theme.colors.teal;
    if (type === 'warning') return theme.colors.orange;
    if (type === 'error') return theme.colors.pink;
    return theme.colors.teal;
  }};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
  }
`;

const InfoBoxContent = styled.div`
  color: ${({ theme }) => theme.colors.lightSlate};
  position: relative;
  z-index: 2;
`;

export const RetroInfoBox = ({ 
  title = "Information", 
  type = "info", 
  children,
  icon 
}) => (
  <InfoBoxContainer type={type}>
    <InfoBoxTitle type={type}>
      {icon && icon}
      {title}
    </InfoBoxTitle>
    <InfoBoxContent>
      {children}
    </InfoBoxContent>
  </InfoBoxContainer>
);

// Retro Progress Bar Component
const ProgressContainer = styled.div`
  width: 100%;
  height: 20px;
  background: ${({ theme }) => theme.colors.lightNavy};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  position: relative;
  margin: ${({ theme }) => theme.spacing.md} 0;
  
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
    z-index: 3;
    opacity: 0.15;
    pointer-events: none;
  }
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: ${({ color, theme }) => {
    if (color) return theme.colors[color];
    return theme.colors.teal;
  }};
  width: ${({ value }) => `${value}%`};
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    animation: ${css`${scanline}`} 2s linear infinite;
  }
`;

const ProgressLabel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.lightestSlate};
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.mono};
  z-index: 2;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
`;

export const RetroProgressBar = ({ 
  value = 0, 
  color = "teal",
  label = true 
}) => (
  <ProgressContainer>
    <ProgressBar 
      value={value} 
      color={color}
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
    {label && (
      <ProgressLabel>
        {value}%
      </ProgressLabel>
    )}
  </ProgressContainer>
);
