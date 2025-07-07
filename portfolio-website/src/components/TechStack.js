import React, { useEffect, useState, useCallback, memo } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Tech Logos (Base64 or import paths)
const techLogos = {
  JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  HTML: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  CSS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  Node: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  MongoDB: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  GraphQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  Docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  AWS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
  Redux: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  Next: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  Git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  Sass: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
  Express: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  Jest: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
  Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  PostgreSQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  Firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  Figma: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  Default: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg'
};

// Animation keyframes
const starTwinkle = keyframes`
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
`;

const spaceshipFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-20px) rotate(-3deg); }
`;

const glow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.7)); }
  50% { filter: drop-shadow(0 0 15px rgba(0, 255, 255, 1)); }
`;

const scanLine = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const rotateIn = keyframes`
  from { transform: rotateY(90deg); opacity: 0; }
  to { transform: rotateY(0); opacity: 1; }
`;

const engineGlow = keyframes`
  0%, 100% { opacity: 0.7; box-shadow: 0 0 15px 5px rgba(0, 255, 255, 0.7); }
  50% { opacity: 1; box-shadow: 0 0 25px 8px rgba(0, 255, 255, 1); }
`;

const radarScan = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Space background container
const SpaceContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: #000005;
  padding: 40px 20px;
`;

// Star field background
const StarField = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  
  /* Small Stars */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(1px 1px at 5% 10%, white 1px, transparent 0),
      radial-gradient(1px 1px at 10% 20%, white 1px, transparent 0),
      radial-gradient(1px 1px at 15% 30%, white 1px, transparent 0),
      radial-gradient(1px 1px at 20% 40%, white 1px, transparent 0),
      radial-gradient(1px 1px at 25% 50%, white 1px, transparent 0),
      radial-gradient(1px 1px at 30% 60%, white 1px, transparent 0),
      radial-gradient(1px 1px at 35% 70%, white 1px, transparent 0),
      radial-gradient(1px 1px at 40% 80%, white 1px, transparent 0),
      radial-gradient(1px 1px at 45% 90%, white 1px, transparent 0),
      radial-gradient(1px 1px at 50% 15%, white 1px, transparent 0),
      radial-gradient(1px 1px at 55% 25%, white 1px, transparent 0),
      radial-gradient(1px 1px at 60% 35%, white 1px, transparent 0),
      radial-gradient(1px 1px at 65% 45%, white 1px, transparent 0),
      radial-gradient(1px 1px at 70% 55%, white 1px, transparent 0),
      radial-gradient(1px 1px at 75% 65%, white 1px, transparent 0),
      radial-gradient(1px 1px at 80% 75%, white 1px, transparent 0),
      radial-gradient(1px 1px at 85% 85%, white 1px, transparent 0),
      radial-gradient(1px 1px at 90% 95%, white 1px, transparent 0),
      radial-gradient(1px 1px at 95% 5%, white 1px, transparent 0),
      radial-gradient(1px 1px at 7% 65%, white 1px, transparent 0),
      radial-gradient(1px 1px at 12% 28%, white 1px, transparent 0),
      radial-gradient(1px 1px at 18% 44%, white 1px, transparent 0),
      radial-gradient(1px 1px at 27% 78%, white 1px, transparent 0),
      radial-gradient(1px 1px at 33% 34%, white 1px, transparent 0),
      radial-gradient(1px 1px at 38% 52%, white 1px, transparent 0),
      radial-gradient(1px 1px at 43% 23%, white 1px, transparent 0),
      radial-gradient(1px 1px at 57% 88%, white 1px, transparent 0),
      radial-gradient(1px 1px at 62% 73%, white 1px, transparent 0),
      radial-gradient(1px 1px at 72% 48%, white 1px, transparent 0),
      radial-gradient(1px 1px at 88% 82%, white 1px, transparent 0),
      radial-gradient(1px 1px at 93% 16%, white 1px, transparent 0);
    background-size: 300% 300%;
    animation: ${starTwinkle} 3s ease-in-out infinite alternate;
  }
  
  /* Medium Stars */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(1.5px 1.5px at 22% 35%, white 1px, transparent 0),
      radial-gradient(1.5px 1.5px at 45% 65%, white 1px, transparent 0),
      radial-gradient(1.5px 1.5px at 68% 22%, white 1px, transparent 0),
      radial-gradient(1.5px 1.5px at 78% 58%, white 1px, transparent 0),
      radial-gradient(1.5px 1.5px at 15% 85%, white 1px, transparent 0),
      radial-gradient(1.5px 1.5px at 36% 48%, white 1px, transparent 0),
      radial-gradient(1.5px 1.5px at 52% 32%, white 1px, transparent 0),
      radial-gradient(1.5px 1.5px at 85% 75%, white 1px, transparent 0),
      
      /* Larger stars with glow */
      radial-gradient(2px 2px at 35% 75%, rgba(200, 255, 255, 1) 1px, transparent 0),
      radial-gradient(2px 2px at 65% 42%, rgba(200, 255, 255, 1) 1px, transparent 0),
      radial-gradient(2px 2px at 25% 25%, rgba(200, 255, 255, 1) 1px, transparent 0),
      radial-gradient(2px 2px at 75% 95%, rgba(200, 255, 255, 1) 1px, transparent 0);
    background-size: 300% 300%;
    filter: drop-shadow(0 0 2px rgba(100, 255, 255, 0.8));
    animation: ${starTwinkle} 5s ease-in-out infinite;
  }
`;

// Nebula background
const SpaceNebula = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: 
    radial-gradient(
      ellipse at 30% 40%,
      rgba(90, 0, 120, 0.15) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse at 70% 60%,
      rgba(0, 50, 100, 0.1) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse at 50% 30%,
      rgba(0, 100, 150, 0.08) 0%,
      transparent 70%
    ),
    radial-gradient(
      ellipse at 80% 20%,
      rgba(120, 0, 50, 0.05) 0%,
      transparent 50%
    );
  pointer-events: none;
`;

// Content container 
const ContentContainer = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 20px;
`;

// Spaceship container
const SpaceshipContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${spaceshipFloat} 8s ease-in-out infinite;
`;

// Alien Spaceship
const Spaceship = styled.div`
  position: relative;
  width: 90%;
  max-width: 900px;
  min-height: 500px;
  margin: 40px auto;
  background: linear-gradient(135deg, rgba(20, 30, 50, 0.9), rgba(10, 15, 25, 0.95));
  border-radius: 30px 120px 30px 30px;
  border: 2px solid rgba(0, 255, 255, 0.7);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.5), inset 0 0 30px rgba(0, 255, 255, 0.2);
  padding: 30px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -15px;
    left: 15%;
    width: 70%;
    height: 30px;
    background: rgba(20, 30, 50, 0.9);
    border: 2px solid rgba(0, 255, 255, 0.7);
    border-bottom: none;
    border-radius: 15px 15px 0 0;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 10%;
    width: 80%;
    height: 10px;
    background: rgba(0, 255, 255, 0.8);
    border-radius: 0 0 10px 10px;
    filter: blur(5px);
    animation: ${glow} 2s ease-in-out infinite;
  }
`;

// Spaceship cockpit window
const SpaceshipWindow = styled.div`
  position: absolute;
  top: -50px;
  right: 100px;
  width: 100px;
  height: 100px;
  background: rgba(0, 255, 255, 0.2);
  border: 3px solid rgba(0, 255, 255, 0.7);
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.3);
  
  &::after {
    content: '';
    position: absolute;
    top: 15px;
    left: 15px;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }
`;

// Engine glow
const EngineGlow = styled.div`
  position: absolute;
  bottom: -15px;
  left: 10%;
  width: 40px;
  height: 20px;
  background: rgba(0, 255, 255, 0.8);
  border-radius: 50%;
  animation: ${engineGlow} 1.5s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    left: 60px;
    width: 30px;
    height: 15px;
    background: rgba(0, 255, 255, 0.8);
    border-radius: 50%;
    animation: ${engineGlow} 1.8s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 120px;
    width: 35px;
    height: 18px;
    background: rgba(0, 255, 255, 0.8);
    border-radius: 50%;
    animation: ${engineGlow} 1.2s ease-in-out infinite;
  }
`;

// Radar antenna
const Antenna = styled.div`
  position: absolute;
  top: -35px;
  left: 20%;
  width: 4px;
  height: 40px;
  background: rgba(150, 150, 150, 0.8);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -8px;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0, 255, 255, 0.7);
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
    
    &::before {
      content: '';
      position: absolute;
      top: 5px;
      left: 5px;
      width: 10px;
      height: 10px;
      background: rgba(0, 255, 255, 0.6);
      border-radius: 50%;
    }
  }
`;

// Radar dish
const RadarDish = styled.div`
  position: absolute;
  top: -40px;
  left: 40%;
  width: 30px;
  height: 30px;
  background: rgba(50, 50, 70, 0.9);
  border: 2px solid rgba(100, 100, 120, 0.8);
  border-radius: 50%;
  
  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 20px;
    height: 20px;
    border-left: 2px solid rgba(0, 255, 255, 0.8);
    border-bottom: 2px solid rgba(0, 255, 255, 0.8);
    border-radius: 50%;
    animation: ${radarScan} 4s linear infinite;
  }
`;

// Main screen
const ScreenContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 400px;
  margin-top: 20px;
  background: rgba(0, 20, 40, 0.7);
  border: 2px solid rgba(0, 255, 255, 0.7);
  border-radius: 15px;
  padding: 20px;
  overflow: hidden;
  box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      to right,
      rgba(0, 255, 255, 0),
      rgba(0, 255, 255, 0.8),
      rgba(0, 255, 255, 0)
    );
    animation: ${scanLine} 6s linear infinite;
    z-index: 5;
  }
`;

// Screen content
const ScreenContent = styled.div`
  position: relative;
  z-index: 1;
`;

// Control panel
const ControlPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: rgba(10, 25, 47, 0.8);
  border: 2px solid rgba(0, 255, 255, 0.7);
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.2), inset 0 0 10px rgba(0, 255, 255, 0.1);
  
  .panel-title {
    font-family: 'VT323', 'Courier New', monospace;
    color: rgba(0, 255, 255, 1);
    font-size: 22px;
    letter-spacing: 2px;
    text-shadow: 0 0 5px rgba(0, 255, 255, 0.8);
  }
  
  .control-lights {
    display: flex;
    gap: 10px;
  }
  
  .control-light {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.5);
    
    &.green {
      background: rgba(0, 255, 0, 0.7);
      box-shadow: 0 0 5px rgba(0, 255, 0, 0.8);
    }
    
    &.yellow {
      background: rgba(255, 255, 0, 0.7);
      box-shadow: 0 0 5px rgba(255, 255, 0, 0.8);
    }
    
    &.red {
      background: rgba(255, 0, 0, 0.7);
      box-shadow: 0 0 5px rgba(255, 0, 0, 0.8);
    }
  }
`;

// Filter buttons panel
const FilterPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  padding: 15px;
  background: rgba(10, 25, 47, 0.7);
  border: 2px solid rgba(0, 255, 255, 0.7);
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: inset 0 0 15px rgba(0, 255, 255, 0.2);
`;

// Filter button
const FilterButton = styled.button`
  background: ${props => props.active ? 'rgba(0, 255, 255, 0.3)' : 'rgba(10, 25, 47, 0.7)'};
  border: 2px solid ${props => props.active ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.5)'};
  color: ${props => props.active ? '#ffffff' : 'rgba(0, 255, 255, 0.8)'};
  padding: 8px 15px;
  border-radius: 5px;
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  text-shadow: ${props => props.active ? '0 0 5px rgba(0, 255, 255, 0.8)' : 'none'};
  box-shadow: ${props => props.active ? '0 0 10px rgba(0, 255, 255, 0.5)' : 'none'};
  animation: ${props => props.active ? css`${pulse} 2s infinite` : 'none'};
  
  &:hover {
    background: rgba(0, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3);
  }
  
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
      rgba(0, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

// Skills grid
const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

// Skill card
const SkillCard = styled.div`
  background: rgba(10, 25, 47, 0.7);
  border: 2px solid rgba(0, 255, 255, 0.7);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  animation: ${css`${rotateIn} 0.5s ease-out forwards`};
  animation-delay: ${props => props.index * 0.1}s;
  opacity: 0;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 255, 255, 0.4);
    border-color: rgba(0, 255, 255, 1);
  }
  
  .skill-logo {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
    filter: drop-shadow(0 0 3px rgba(0, 255, 255, 0.5));
  }
  
  .skill-name {
    font-family: 'VT323', 'Courier New', monospace;
    color: white;
    font-size: 16px;
    margin-bottom: 5px;
    text-align: center;
  }
  
  .skill-level {
    font-family: 'VT323', 'Courier New', monospace;
    color: rgba(0, 255, 255, 1);
    font-size: 14px;
    margin-bottom: 10px;
  }
  
  .skill-bar {
    width: 100%;
    height: 8px;
    background: rgba(10, 25, 47, 0.5);
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }
  
  .skill-progress {
    height: 100%;
    background: linear-gradient(to right, rgba(0, 255, 255, 0.7), rgba(0, 150, 200, 0.9));
    width: ${props => props.level}%;
    box-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
  }
  
  .skill-category {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(10, 25, 47, 0.7);
    border: 1px solid rgba(0, 255, 255, 0.5);
    border-radius: 20px;
    padding: 2px 8px;
    font-size: 10px;
    color: rgba(0, 255, 255, 1);
    font-family: 'VT323', 'Courier New', monospace;
  }
`;

// Status bar
const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: rgba(10, 25, 47, 0.7);
  border: 2px solid rgba(0, 255, 255, 0.7);
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
  
  .status-text {
    font-family: 'VT323', 'Courier New', monospace;
    color: rgba(0, 255, 255, 1);
    font-size: 14px;
  }
  
  .status-count {
    font-family: 'VT323', 'Courier New', monospace;
    color: white;
    background: rgba(0, 255, 255, 0.2);
    padding: 3px 8px;
    border-radius: 4px;
    border: 1px solid rgba(0, 255, 255, 0.7);
  }
`;

// Control buttons
const ControlButtons = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  display: flex;
  gap: 10px;
  z-index: 10;
  
  .control-button {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid rgba(0, 255, 255, 0.7);
    background: rgba(10, 25, 47, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(0, 255, 255, 1);
    font-family: 'VT323', 'Courier New', monospace;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
    
    &:hover {
      background: rgba(0, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }
`;

// Main TechStack component
const TechStack = () => {
  // Current date/time and username exactly as specified
  const currentDateTime = "2025-07-07 11:55:11";
  const username = "itsanubhav009";
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  
  // Main skills data
  const techSkills = [
    {
      name: 'JavaScript',
      level: 90,
      description: 'Expert in modern JavaScript (ES6+), frameworks and libraries.',
      category: 'Frontend',
      logo: 'JavaScript'
    },
    {
      name: 'React',
      level: 88,
      description: 'Proficient in React, Redux, hooks, and React ecosystem.',
      category: 'Frontend',
      logo: 'React'
    },
    {
      name: 'HTML/CSS',
      level: 85,
      description: 'Advanced HTML5, CSS3, responsive design and animations.',
      category: 'Frontend',
      logo: 'HTML'
    },
    {
      name: 'Node.js',
      level: 82,
      description: 'Strong backend development with Node.js and Express.',
      category: 'Backend',
      logo: 'Node'
    },
    {
      name: 'MongoDB',
      level: 77,
      description: 'Database design, queries, and integration with Node.js.',
      category: 'Database',
      logo: 'MongoDB'
    },
    {
      name: 'TypeScript',
      level: 80,
      description: 'Type-safe JavaScript with interfaces and advanced types.',
      category: 'Frontend',
      logo: 'TypeScript'
    },
    {
      name: 'GraphQL',
      level: 75,
      description: 'Building efficient APIs with precise data fetching.',
      category: 'Backend',
      logo: 'GraphQL'
    },
    {
      name: 'Docker',
      level: 72,
      description: 'Containerization and deployment automation.',
      category: 'DevOps',
      logo: 'Docker'
    },
    {
      name: 'AWS',
      level: 68,
      description: 'Cloud infrastructure and serverless architecture.',
      category: 'DevOps',
      logo: 'AWS'
    },
    {
      name: 'UI/UX Design',
      level: 78,
      description: 'Creating intuitive and engaging user interfaces.',
      category: 'Design',
      logo: 'Figma'
    },
    {
      name: 'Redux',
      level: 85,
      description: 'State management for React applications.',
      category: 'Frontend',
      logo: 'Redux'
    },
    {
      name: 'Next.js',
      level: 76,
      description: 'Server-side rendering and static site generation.',
      category: 'Frontend',
      logo: 'Next'
    },
    {
      name: 'Git',
      level: 88,
      description: 'Version control and collaboration workflows.',
      category: 'DevOps',
      logo: 'Git'
    },
    {
      name: 'Sass/SCSS',
      level: 82,
      description: 'Advanced CSS preprocessing for complex styling.',
      category: 'Frontend',
      logo: 'Sass'
    },
    {
      name: 'Express',
      level: 80,
      description: 'RESTful API development with Node.js.',
      category: 'Backend',
      logo: 'Express'
    },
    {
      name: 'Jest',
      level: 75,
      description: 'JavaScript testing for React applications.',
      category: 'Testing',
      logo: 'Jest'
    },
    {
      name: 'React Native',
      level: 65,
      description: 'Cross-platform mobile app development.',
      category: 'Mobile',
      logo: 'React'
    },
    {
      name: 'PostgreSQL',
      level: 74,
      description: 'Relational database design and management.',
      category: 'Database',
      logo: 'PostgreSQL'
    }
  ];

  // Get unique categories for filter buttons
  const getUniqueCategories = useCallback(() => {
    const categories = techSkills.map(skill => skill.category);
    return ['all', ...new Set(categories)];
  }, [techSkills]);

  // Handle filter button clicks
  const handleFilterClick = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  // Get filtered skills
  const getFilteredSkills = useCallback(() => {
    if (activeFilter === 'all') return techSkills;
    return techSkills.filter(skill => skill.category.toLowerCase() === activeFilter.toLowerCase());
  }, [activeFilter, techSkills]);

  // Get logo for a skill
  const getSkillLogo = useCallback((logoKey) => {
    return techLogos[logoKey] || techLogos.Default;
  }, []);

  // Random ID for UI elements
  const [scanId] = useState(Math.floor(Math.random() * 9999) + 1000);

  return (
    <SpaceContainer>
      <StarField />
      <SpaceNebula />
      
      <ContentContainer>
        <SpaceshipContainer>
          <Spaceship>
            <SpaceshipWindow />
            <Antenna />
            <RadarDish />
            <EngineGlow />
            
            <ControlPanel>
              <div className="panel-title">TECHNOLOGY DATABASE</div>
              <div className="control-lights">
                <div className="control-light green"></div>
                <div className="control-light yellow"></div>
                <div className="control-light red"></div>
              </div>
            </ControlPanel>
            
            <ScreenContainer>
              <ScreenContent>
                <FilterPanel>
                  {getUniqueCategories().map((category, index) => (
                    <FilterButton
                      key={index}
                      active={activeFilter === category}
                      onClick={() => handleFilterClick(category)}
                    >
                      {category === 'all' ? 'ALL TECH' : category.toUpperCase()}
                    </FilterButton>
                  ))}
                </FilterPanel>
                
                <SkillGrid>
                  {getFilteredSkills().map((skill, index) => (
                    <SkillCard 
                      key={index} 
                      index={index} 
                      level={skill.level}
                      onClick={() => setSelectedSkill(skill)}
                    >
                      <div className="skill-category">{skill.category}</div>
                      <img 
                        className="skill-logo" 
                        src={getSkillLogo(skill.logo)} 
                        alt={skill.name}
                      />
                      <div className="skill-name">{skill.name}</div>
                      <div className="skill-level">Proficiency: {skill.level}%</div>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </SkillCard>
                  ))}
                </SkillGrid>
                
                <StatusBar>
                  <div className="status-text">
                    SCAN #{scanId} | CATEGORY: {activeFilter.toUpperCase()} | USER: {username}
                  </div>
                  <div className="status-count">
                    TECH: {getFilteredSkills().length}/{techSkills.length} | {currentDateTime}
                  </div>
                </StatusBar>
              </ScreenContent>
            </ScreenContainer>
            
            <ControlButtons>
              <div className="control-button">+</div>
              <div className="control-button">-</div>
              <div className="control-button">?</div>
            </ControlButtons>
          </Spaceship>
        </SpaceshipContainer>
      </ContentContainer>
    </SpaceContainer>
  );
};

export default memo(TechStack);