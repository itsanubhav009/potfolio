import styled, { keyframes, css } from 'styled-components';

// Define all necessary animation keyframes
const glow = keyframes`
  0%, 100% { 
    text-shadow: 0 0 10px rgba(100, 255, 218, 0.5), 0 0 20px rgba(100, 255, 218, 0.3); 
  }
  50% { 
    text-shadow: 0 0 20px rgba(100, 255, 218, 0.8), 0 0 30px rgba(100, 255, 218, 0.5); 
  }
`;

const screenBend = keyframes`
  0%, 100% { 
    border-radius: 5px;
    transform: perspective(500px) rotateX(0deg); 
  }
  50% { 
    border-radius: 15px;
    transform: perspective(500px) rotateX(2deg); 
  }
`;

const flicker = keyframes`
  0%, 100% { opacity: 1; }
  5% { opacity: 0.7; }
  10% { opacity: 0.9; }
  15% { opacity: 0.8; }
  20% { opacity: 1; }
  50% { opacity: 0.9; }
  70% { opacity: 0.7; }
  72% { opacity: 1; }
  77% { opacity: 0.9; }
  80% { opacity: 1; }
`;

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const tvTurnOn = keyframes`
  0% { 
    transform: scale(0.8); 
    opacity: 0; 
    filter: brightness(3) blur(10px); 
  }
  30% { 
    transform: scale(1.05); 
    opacity: 0.8; 
    filter: brightness(2.5) blur(5px);
  }
  60% { 
    transform: scale(0.95); 
    opacity: 1; 
    filter: brightness(0.8) blur(0);
  }
  85% { 
    transform: scale(1.02); 
    opacity: 1; 
    filter: brightness(1.2) blur(0);
  }
  100% { 
    transform: scale(1); 
    opacity: 1; 
    filter: brightness(1) blur(0);
  }
`;

const neonFlicker = keyframes`
  0%, 100% { 
    text-shadow: 0 0 10px rgba(100, 255, 218, 0.8), 0 0 20px rgba(100, 255, 218, 0.5), 0 0 30px rgba(100, 255, 218, 0.3);
    color: rgba(100, 255, 218, 1);
  }
  10% {
    text-shadow: none; 
    color: rgba(100, 255, 218, 0.7);
  }
  20% { 
    text-shadow: 0 0 10px rgba(100, 255, 218, 0.8), 0 0 20px rgba(100, 255, 218, 0.5);
    color: rgba(100, 255, 218, 1);
  }
  30% {
    text-shadow: none;
    color: rgba(100, 255, 218, 0.9);
  }
  50% { 
    text-shadow: 0 0 10px rgba(100, 255, 218, 0.8), 0 0 20px rgba(100, 255, 218, 0.5), 0 0 30px rgba(100, 255, 218, 0.3);
    color: rgba(100, 255, 218, 1);
  }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const boxGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 10px rgba(100, 255, 218, 0.5), 0 0 20px rgba(100, 255, 218, 0.3), inset 0 0 10px rgba(100, 255, 218, 0.1); 
  }
  50% { 
    box-shadow: 0 0 20px rgba(100, 255, 218, 0.8), 0 0 30px rgba(100, 255, 218, 0.5), inset 0 0 15px rgba(100, 255, 218, 0.2); 
  }
`;

const trackingDistortion = keyframes`
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateY(-5px);
    opacity: 0.9;
  }
  20%, 40%, 60%, 80% {
    transform: translateY(5px);
    opacity: 0.8;
  }
`;

const matrixRain = keyframes`
  0% { 
    top: -50%;
    opacity: 1; 
  }
  100% { 
    top: 110%;
    opacity: 0.7; 
  }
`;

const oscillate = keyframes`
  0%, 100% { 
    height: 10px; 
  }
  25% { 
    height: 30px; 
  }
  50% { 
    height: 5px; 
  }
  75% { 
    height: 20px; 
  }
`;

// Styled components definitions
const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;
  max-width: 1200px;
  margin: 0 auto;
  
  h2 {
    font-size: clamp(26px, 5vw, 32px);
    margin-bottom: 40px;
    color: #ccd6f6;
    font-family: 'VT323', 'Courier New', monospace;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    text-align: center;
    
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      margin-top: 10px;
      background: linear-gradient(
        to right,
        rgba(100, 255, 218, 0),
        rgba(100, 255, 218, 1),
        rgba(100, 255, 218, 0)
      );
      animation: ${glow} 3s ease-in-out infinite;
    }
  }
`;

const CRTScreen = styled.div`
  position: relative;
  width: 100%;
  border-radius: 10px;
  background-color: #0a192f;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  animation: ${screenBend} 10s ease-in-out infinite;
  
  /* CRT flicker effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(18, 36, 70, 0.1);
    opacity: 0.2;
    animation: ${flicker} 5s infinite;
    pointer-events: none;
    z-index: 3;
  }
  
  /* Scan line effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(18, 36, 70, 0) 0%,
      rgba(100, 255, 218, 0.1) 50%,
      rgba(18, 36, 70, 0) 100%
    );
    animation: ${scanline} 8s linear infinite;
    pointer-events: none;
    z-index: 2;
  }
`;

const RetroHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: rgba(17, 34, 64, 0.8);
  border-bottom: 1px solid #64ffda;
  margin-bottom: 40px;
  animation: ${tvTurnOn} 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  animation-delay: 0.5s;
  opacity: 0;
  
  .header-date {
    font-family: 'VT323', 'Courier New', monospace;
    font-size: 14px;
    color: #8892b0;
  }
  
  .header-title {
    font-family: 'VT323', 'Courier New', monospace;
    font-size: 32px;
    color: #64ffda;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
    animation: ${neonFlicker} 3s infinite;
  }
  
  .header-subtitle {
    font-family: 'VT323', 'Courier New', monospace;
    font-size: 14px;
    color: #8892b0;
  }
`;

const RetroTextDisplay = styled.div`
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 18px;
  color: #64ffda;
  background-color: rgba(17, 34, 64, 0.5);
  padding: 15px;
  margin-bottom: 30px;
  border-left: 2px solid #64ffda;
  display: flex;
  align-items: center;
  
  .retro-prompt {
    display: inline-block;
    width: 10px;
    height: 18px;
    background-color: #64ffda;
    margin-right: 10px;
    animation: ${blink} 1s infinite;
  }
  
  .retro-text {
    animation: ${typing} 2s steps(40, end);
    white-space: nowrap;
    overflow: hidden;
  }
`;

const StyledProjectsHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  
  h2 {
    font-size: 28px;
    color: #ccd6f6;
    font-family: 'VT323', 'Courier New', monospace;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    display: inline-block;
    
    &::before, &::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 50px;
      height: 1px;
      background: linear-gradient(
        to right,
        rgba(100, 255, 218, 0),
        rgba(100, 255, 218, 1)
      );
    }
    
    &::before {
      left: -70px;
    }
    
    &::after {
      right: -70px;
      background: linear-gradient(
        to left,
        rgba(100, 255, 218, 0),
        rgba(100, 255, 218, 1)
      );
    }
  }
`;

const StyledFilterControls = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
`;

const StyledFilterButton = styled.button`
  background-color: ${props => props.active ? 'rgba(100, 255, 218, 0.2)' : 'rgba(17, 34, 64, 0.8)'};
  color: ${props => props.active ? '#64ffda' : '#8892b0'};
  border: 1px solid ${props => props.active ? '#64ffda' : 'rgba(136, 146, 176, 0.3)'};
  border-radius: 4px;
  padding: 8px 16px;
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: rgba(100, 255, 218, 0.1);
    color: #64ffda;
    border-color: #64ffda;
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  ${props => props.active && css`
    box-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
    animation: ${boxGlow} 3s infinite;
  `}
`;

const GridContainer = styled.div`
  width: 100%;
  transition: opacity 0.3s;
  
  &.static-effect {
    opacity: 0.5;
    animation: ${trackingDistortion} 0.3s;
  }
`;

const StyledProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const StyledProjectCard = styled.div`
  position: relative;
  background-color: #112240;
  border-radius: 4px;
  transition: all 0.25s;
  height: 100%;
  min-height: 320px;
  box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
  opacity: 0;
  transform: translateY(10px);
  animation: ${tvTurnOn} 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  animation-delay: ${props => 0.1 + props.index * 0.1}s;
  
  /* CRT border glow */
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 1px solid #64ffda;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 1;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 30px -15px rgba(2, 12, 27, 0.7);
    
    &::before {
      opacity: 1;
      animation: ${boxGlow} 3s infinite;
    }
    
    .project-title {
      color: #64ffda;
      animation: ${glow} 3s ease-in-out infinite;
    }
  }
`;

const MatrixBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
  opacity: 0.08;
  pointer-events: none;
`;

const MatrixColumn = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.left}%;
  width: 10px;
  color: #64ffda;
  font-family: 'Courier New', monospace;
  font-size: ${props => props.size || '12px'};
  line-height: 1.2;
  white-space: nowrap;
  transform-origin: center top;
  animation: ${matrixRain} ${props => 10 + Math.random() * 5}s linear infinite;
  animation-delay: ${props => -Math.random() * 5}s;
  text-shadow: 0 0 5px rgba(100, 255, 218, 0.5);
  
  div {
    transition: all 0.3s;
    opacity: 0.8;
  }
`;

const OscilloscopeDisplay = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  background-color: rgba(17, 34, 64, 0.5);
  border-radius: 4px;
  padding: 10px;
  
  .wave {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    
    .wave-segment {
      width: 3px;
      background-color: #64ffda;
      margin: 0 2px;
      border-radius: 2px;
      animation: ${oscillate} 1.5s ease-in-out infinite;
      box-shadow: 0 0 5px rgba(100, 255, 218, 0.5);
    }
  }
`;

export {
  StyledProjectsSection,
  CRTScreen,
  RetroHeader,
  RetroTextDisplay,
  StyledProjectsHeader,
  StyledFilterControls,
  StyledFilterButton,
  GridContainer,
  StyledProjectsGrid,
  StyledProjectCard,
  MatrixBackground,
  MatrixColumn,
  OscilloscopeDisplay
};