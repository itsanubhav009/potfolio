import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { useScrollReveal, variants } from '../utils/scrollReveal';
import { RetroTerminal } from './RetroUI';
import GlitchImage from './GlitchImage';

// Animation keyframes
const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(100, 255, 218, 0.5); }
  50% { box-shadow: 0 0 20px rgba(100, 255, 218, 0.8); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(1deg); }
  50% { transform: translateY(0) rotate(0deg); }
  75% { transform: translateY(10px) rotate(-1deg); }
`;

const holographicShine = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const cursor = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: ${props => props.theme.colors.teal}; }
`;

const rotation = keyframes`
  from { transform: rotateY(0deg); }
  to { transform: rotateY(360deg); }
`;

const glowPulse = keyframes`
  0%, 100% { text-shadow: 0 0 5px rgba(100, 255, 218, 0.5); }
  50% { text-shadow: 0 0 20px rgba(100, 255, 218, 0.8), 0 0 30px rgba(100, 255, 218, 0.6); }
`;

const StyledAboutSection = styled.section`
  max-width: 1000px;
  position: relative;
  overflow: hidden;
  perspective: 1000px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(10, 25, 47, 0) 0%,
      rgba(10, 25, 47, 0.05) 100%
    );
    pointer-events: none;
    z-index: -1;
  }
  
  .section-heading {
    color: ${props => props.theme.colors.lightestSlate};
    font-size: 32px;
    margin-bottom: 40px;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, rgba(100, 255, 218, 0) 0%, rgba(100, 255, 218, 1) 50%, rgba(100, 255, 218, 0) 100%);
      animation: ${holographicShine} 2s linear infinite;
    }
  }
`;

const StyledText = styled.div`
  position: relative;
  background: rgba(10, 25, 47, 0.6);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.7);
  backdrop-filter: blur(5px);
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateX(2deg);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: perspective(1000px) rotateX(0deg);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.theme.colors.teal};
    opacity: 0.4;
    animation: ${css`${scanline} 8s linear infinite`};
  }

  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, minmax(140px, 200px));
    }

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: ${props => props.theme.fonts.mono};
      font-size: ${props => props.theme.fontSizes.sm};

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: ${props => props.theme.colors.teal};
        font-size: ${props => props.theme.fontSizes.sm};
        line-height: 12px;
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;
  filter: drop-shadow(0 0 10px rgba(100, 255, 218, 0.3));
  transition: all 0.3s ease;
  margin-top: 30px;
  animation: ${float} 6s ease-in-out infinite;
  transform-style: preserve-3d;
  perspective: 1000px;
  
  &:hover {
    filter: drop-shadow(0 0 20px rgba(100, 255, 218, 0.5));
    transform: scale(1.05) rotateY(10deg);
  }

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid ${props => props.theme.colors.teal};
    border-radius: 4px;
    top: 20px;
    left: 20px;
    z-index: -1;
    animation: ${css`${pulseGlow} 4s infinite`};
    transform: translateZ(-10px);
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background: linear-gradient(45deg, rgba(100, 255, 218, 0.1), transparent);
    top: 0;
    left: 0;
    z-index: 2;
    opacity: 0.5;
    transform: translateZ(5px);
  }
`;

const StyledFlexContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 50px;
  transform-style: preserve-3d;
  perspective: 1000px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const TerminalOutput = styled.div`
  .command {
    color: ${props => props.theme.colors.teal};
    margin-bottom: 5px;
    position: relative;
    font-family: ${props => props.theme.fonts.mono};
    
    &::before {
      content: "$ ";
      color: ${props => props.theme.colors.purple};
    }
  }
  
  .response {
    color: ${props => props.theme.colors.lightSlate};
    margin-bottom: 15px;
    line-height: 1.6;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    opacity: 0;
    width: 0;
    border-right: 2px solid transparent;
    font-family: ${props => props.theme.fonts.mono};
    
    strong {
      color: ${props => props.theme.colors.lightestSlate};
      font-weight: 600;
    }
    
    &.typed {
      opacity: 1;
      white-space: normal;
      width: 100%;
    }
    
    &.typing {
      animation: 
        ${css`${typing} 3s steps(50, end) forwards`},
        ${css`${cursor} 0.75s step-end infinite`};
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
`;

const TimelineSection = styled.div`
  margin-top: 80px;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
  
  .timeline-heading {
    color: ${props => props.theme.colors.lightestSlate};
    font-size: 24px;
    margin-bottom: 30px;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
    position: relative;
    display: inline-block;
    animation: ${glowPulse} 4s infinite;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, rgba(100, 255, 218, 0) 0%, rgba(100, 255, 218, 1) 50%, rgba(100, 255, 218, 0) 100%);
      animation: ${holographicShine} 2s linear infinite;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 3px;
    background: linear-gradient(to bottom, 
      rgba(100, 255, 218, 0), 
      rgba(100, 255, 218, 0.8), 
      rgba(100, 255, 218, 0));
    animation: ${pulseGlow} 4s infinite;
  }
`;

const TimelineItem = styled.div`
  display: flex;
  margin-bottom: 40px;
  position: relative;
  justify-content: ${props => props.position === 'left' ? 'flex-start' : 'flex-end'};
  padding-left: ${props => props.position === 'left' ? '0' : '50%'};
  padding-right: ${props => props.position === 'left' ? '50%' : '0'};
  transform-style: preserve-3d;
  
  @media (max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
    justify-content: center;
  }
  
  .timeline-content {
    width: 90%;
    padding: 20px;
    background: rgba(10, 25, 47, 0.7);
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.teal};
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
    position: relative;
    transform: perspective(1000px) rotateY(${props => props.position === 'left' ? '-5deg' : '5deg'});
    backdrop-filter: blur(5px);
    
    &:hover {
      transform: perspective(1000px) rotateY(0deg) translateZ(20px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.7), 0 0 15px rgba(100, 255, 218, 0.5);
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 20px;
      ${props => props.position === 'left' ? 'right: -10px;' : 'left: -10px;'}
      width: 20px;
      height: 20px;
      background: rgba(10, 25, 47, 0.9);
      border: 1px solid ${props => props.theme.colors.teal};
      transform: rotate(45deg);
    }
    
    .date {
      position: absolute;
      top: -25px;
      ${props => props.position === 'left' ? 'right: 20px;' : 'left: 20px;'}
      background: linear-gradient(
        90deg,
        rgba(100, 255, 218, 0.2) 0%,
        rgba(100, 255, 218, 0.8) 50%,
        rgba(100, 255, 218, 0.2) 100%
      );
      padding: 5px 15px;
      border-radius: 20px;
      font-family: ${props => props.theme.fonts.mono};
      font-size: 12px;
      color: ${props => props.theme.colors.navy};
      font-weight: bold;
      letter-spacing: 1px;
      box-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
    }
    
    .title {
      color: ${props => props.theme.colors.teal};
      font-size: 18px;
      margin-bottom: 10px;
      font-family: ${props => props.theme.fonts.mono};
    }
    
    .description {
      color: ${props => props.theme.colors.lightSlate};
      font-size: 14px;
      line-height: 1.6;
    }
    
    @media (max-width: 768px) {
      width: 100%;
      
      &::before {
        display: none;
      }
      
      .date {
        position: relative;
        top: -35px;
        left: 0;
        right: 0;
        display: inline-block;
      }
    }
  }
  
  .timeline-icon {
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background: ${props => props.theme.colors.navy};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid ${props => props.theme.colors.teal};
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.7);
    z-index: 2;
    animation: ${pulseGlow} 4s infinite;
    
    &::before {
      content: '';
      position: absolute;
      width: 70%;
      height: 70%;
      background: linear-gradient(135deg, ${props => props.theme.colors.teal}, transparent);
      border-radius: 50%;
      opacity: 0.7;
    }
    
    @media (max-width: 768px) {
      left: 0;
      top: 20px;
    }
  }
`;

const ProjectsShowcase = styled.div`
  margin-top: 80px;
  transform-style: preserve-3d;
  perspective: 1000px;
  
  .projects-heading {
    color: ${props => props.theme.colors.lightestSlate};
    font-size: 24px;
    margin-bottom: 30px;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
    position: relative;
    display: inline-block;
    animation: ${glowPulse} 4s infinite;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, rgba(100, 255, 218, 0) 0%, rgba(100, 255, 218, 1) 50%, rgba(100, 255, 218, 0) 100%);
      animation: ${holographicShine} 2s linear infinite;
    }
  }
  
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    position: relative;
  }
`;

const Project3DCard = styled(motion.div)`
  position: relative;
  height: 250px;
  border-radius: 10px;
  overflow: hidden;
  transform-style: preserve-3d;
  transform: perspective(1000px);
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
  
  &:hover {
    transform: perspective(1000px) rotateY(10deg) rotateX(5deg) translateZ(20px);
    
    .project-content {
      transform: translateZ(40px);
    }
    
    .project-overlay {
      opacity: 0.9;
    }
  }
  
  .project-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    transform-style: preserve-3d;
    z-index: 1;
  }
  
  .project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(10, 25, 47, 0.8),
      rgba(10, 25, 47, 0.95)
    );
    z-index: 2;
    opacity: 0.8;
    transition: opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .project-content {
    position: relative;
    z-index: 3;
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transform-style: preserve-3d;
    transform: translateZ(20px);
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .project-header {
    margin-bottom: 10px;
    
    .project-folder {
      color: ${props => props.theme.colors.teal};
      font-size: 30px;
      margin-bottom: 5px;
    }
    
    .project-title {
      color: ${props => props.theme.colors.lightestSlate};
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 5px;
    }
    
    .project-tech {
      color: ${props => props.theme.colors.slate};
      font-size: 12px;
      font-family: ${props => props.theme.fonts.mono};
    }
  }
  
  .project-description {
    color: ${props => props.theme.colors.lightSlate};
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 15px;
  }
  
  .project-links {
    display: flex;
    align-items: center;
    
    a {
      color: ${props => props.theme.colors.lightSlate};
      margin-right: 15px;
      font-size: 20px;
      transition: color 0.3s ease;
      
      &:hover {
        color: ${props => props.theme.colors.teal};
      }
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: linear-gradient(45deg, 
      ${props => props.theme.colors.teal}, 
      ${props => props.theme.colors.navy}, 
      ${props => props.theme.colors.purple}, 
      ${props => props.theme.colors.teal});
    background-size: 400% 400%;
    animation: ${holographicShine} 15s linear infinite;
    border-radius: 15px;
    z-index: 0;
    opacity: 0.7;
    transform: translateZ(-10px);
  }
`;

const SkillsOrbit = styled.div`
  margin-top: 80px;
  height: 400px;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
  
  .skills-heading {
    color: ${props => props.theme.colors.lightestSlate};
    font-size: 24px;
    margin-bottom: 30px;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
    position: relative;
    display: inline-block;
    animation: ${glowPulse} 4s infinite;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, rgba(100, 255, 218, 0) 0%, rgba(100, 255, 218, 1) 50%, rgba(100, 255, 218, 0) 100%);
      animation: ${holographicShine} 2s linear infinite;
    }
  }
  
  .orbit-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
  }
  
  .center-sphere {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, ${props => props.theme.colors.navy}, ${props => props.theme.colors.darkNavy});
    box-shadow: 0 0 20px rgba(100, 255, 218, 0.5);
    position: absolute;
    transform-style: preserve-3d;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.teal};
    font-family: ${props => props.theme.fonts.mono};
    font-size: 12px;
    text-align: center;
    border: 1px solid ${props => props.theme.colors.teal};
    animation: ${pulseGlow} 4s infinite;
    
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid transparent;
      border-top-color: ${props => props.theme.colors.teal};
      border-bottom-color: ${props => props.theme.colors.teal};
      animation: ${rotation} 8s linear infinite;
    }
  }
  
  .orbit {
    position: absolute;
    width: var(--orbit-size);
    height: var(--orbit-size);
    border-radius: 50%;
    border: 1px solid rgba(100, 255, 218, 0.2);
    transform-style: preserve-3d;
    animation: ${rotation} var(--orbit-speed) linear infinite;
  }
  
  .skill-point {
    position: absolute;
    width: 40px;
    height: 40px;
    background: ${props => props.theme.colors.navy};
    border-radius: 50%;
    transform: translateZ(var(--z-offset)) translateX(calc(var(--orbit-size) / 2));
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${props => props.theme.fonts.mono};
    font-size: 12px;
    color: ${props => props.theme.colors.teal};
    box-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
    transform-style: preserve-3d;
    border: 1px solid ${props => props.theme.colors.teal};
    
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, transparent, rgba(100, 255, 218, 0.2));
      z-index: 1;
    }
  }
`;

// Custom hook for typing animation
const useTypingAnimation = (responseRefs, isInView) => {
  useEffect(() => {
    if (isInView && responseRefs.current.length > 0) {
      responseRefs.current.forEach((element, index) => {
        if (element) {
          setTimeout(() => {
            element.classList.add('typing');
            setTimeout(() => {
              element.classList.remove('typing');
              element.classList.add('typed');
            }, 3000);
          }, index * 3500); // Stagger typing animations
        }
      });
    }
  }, [isInView, responseRefs]);
};

// Enhanced GlitchingPhoto component that alternates between images
const GlitchingPhoto = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop"
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Randomly decide if we should glitch
      if (Math.random() > 0.7) {
        // Switch to random alternative image
        const randomAlt = Math.floor(Math.random() * (images.length - 1)) + 1;
        setCurrentImage(randomAlt);
        
        // Set timeout to return to main image
        setTimeout(() => {
          setCurrentImage(0);
        }, 200 + Math.random() * 300);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <GlitchImage
      src={images[currentImage]}
      alt="Anubhav's Photo"
      width="300px"
      height="300px"
    />
  );
};

// Projects data
const projectsData = [
  {
    title: "SEO Analyzer",
    description: "SEO tool for real-time feedback on 6 key on-page metrics with dynamic preview",
    tech: "React, Node.js, Express.js, TextRazor API",
    bgImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop",
    githubUrl: "#",
    liveUrl: "https://seo-analyzer-2b8f.vercel.app"
  },
  {
    title: "AI Agent Chatbot",
    description: "Context-aware AI chatbot using 2 open-source models with efficient query response",
    tech: "Python, LangChain, Hugging Face",
    bgImage: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop",
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "DomainVault",
    description: "Mail server with custom domain control and integrated spam reporting",
    tech: "C++, SMTP, POP3, SQLite, Multi-threading",
    bgImage: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?q=80&w=2070&auto=format&fit=crop",
    githubUrl: "#",
    liveUrl: "#"
  }
];

// Timeline data
const timelineData = [
  {
    date: "Feb 2025 - May 2025",
    title: "Tech Intern at Zenqor (Stealth)",
    description: "Refactored 10+ API endpoints and optimized queries, improving response times under load. Authored technical documentation for 5 core product features.",
    position: "right",
    icon: "💻"
  },
  {
    date: "July 2024 - Aug 2024",
    title: "Cybersecurity Intern at CDAC",
    description: "Developed 7 Python scripts to automate security audits, saving 5+ hours of manual work weekly. Implemented 15+ data validation rules.",
    position: "left",
    icon: "🔒"
  },
  {
    date: "June 2023 - Present",
    title: "B.Tech in Computer Science - IIIT Senapati",
    description: "Pursuing Computer Science with a focus on Operating Systems, DBMS, Networks, Software Engineering, Web Development, and AI. CPI: 8.39/10.0",
    position: "right",
    icon: "🎓"
  }
];

// Skills orbit data
const skillsOrbitData = [
  { name: "React", orbit: 150, speed: "15s", zOffset: 0 },
  { name: "Node.js", orbit: 150, speed: "15s", zOffset: 0, startAngle: 120 },
  { name: "Python", orbit: 150, speed: "15s", zOffset: 0, startAngle: 240 },
  { name: "TypeScript", orbit: 220, speed: "20s", zOffset: 30 },
  { name: "MongoDB", orbit: 220, speed: "20s", zOffset: 30, startAngle: 72 },
  { name: "Redux", orbit: 220, speed: "20s", zOffset: 30, startAngle: 144 },
  { name: "NextJS", orbit: 220, speed: "20s", zOffset: 30, startAngle: 216 },
  { name: "Git", orbit: 220, speed: "20s", zOffset: 30, startAngle: 288 },
  { name: "SQL", orbit: 290, speed: "25s", zOffset: -30 },
  { name: "Docker", orbit: 290, speed: "25s", zOffset: -30, startAngle: 60 },
  { name: "C++", orbit: 290, speed: "25s", zOffset: -30, startAngle: 120 },
  { name: "Django", orbit: 290, speed: "25s", zOffset: -30, startAngle: 180 },
  { name: "Go", orbit: 290, speed: "25s", zOffset: -30, startAngle: 240 },
  { name: "Rust", orbit: 290, speed: "25s", zOffset: -30, startAngle: 300 }
];

const About = () => {
  const { ref, controls, inView } = useScrollReveal();
  const responseRefs = useRef([]);
  
  // Set username and date from the context provided
  const [username] = useState("itsanubhav009");
  const [currentDate] = useState("2025-07-08 06:14:35");

  useTypingAnimation(responseRefs, inView);

  return (
    <StyledAboutSection id="about">
      <motion.h2 
        className="section-heading"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        About Me
      </motion.h2>

      <StyledFlexContainer>
        <StyledText>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
          >
            <RetroTerminal title="about.txt" blinkCursor={true}>
              <TerminalOutput>
                <div className="command">cat education.txt</div>
                <div 
                  className="response"
                  ref={el => (responseRefs.current[0] = el)}
                >
                  <strong>Indian Institute of Information Technology Senapati, Manipur</strong>
                  <br />B.Tech in Computer Science — Graduating June 2026 | CPI: 8.39/10.0
                  <br />Relevant Coursework: Operating Systems, DBMS, Networks, Software Engineering, Web Development, AI
                </div>
                
                <div className="command">cat experience.txt</div>
                <div 
                  className="response"
                  ref={el => (responseRefs.current[1] = el)}
                >
                  <strong>Tech Intern at Zenqor (Stealth)</strong> | Feb 2025 – May 2025
                  <br />• Refactored 10+ API endpoints and optimized queries, improving response times under load.
                  <br />• Authored technical documentation for 5 core product features to enhance team onboarding.
                  <br /><br />
                  <strong>Cybersecurity Intern at CDAC</strong> | July 2024 – Aug 2024
                  <br />• Developed 7 Python scripts to automate security audits, saving 5+ hours of manual work weekly.
                  <br />• Implemented 15+ data validation rules to harden defenses against common vulnerabilities.
                </div>
                
                <div className="command">cat skills.txt</div>
                <div 
                  className="response"
                  ref={el => (responseRefs.current[2] = el)}
                >
                  <strong>Programming:</strong> Python, C++, SQL, MATLAB, JavaScript, HTML/CSS, Rust, Go, PHP, XML
                  <br /><strong>Database:</strong> MySQL, MongoDB, SQLite, PostgreSQL
                  <br /><strong>Frameworks:</strong> React, Node.js, Express.js, Next.js, Django, Flutter, NumPy, Pandas
                  <br /><strong>Tools:</strong> Git, Docker, Kubernetes, Jenkins, Apache, Chart.js, Android Studio
                  <br /><strong>Concepts:</strong> OOP, DSA, RESTful APIs, Agile, CI/CD, Microservices
                </div>
                
                <div className="command">cat projects.txt</div>
                <div 
                  className="response"
                  ref={el => (responseRefs.current[3] = el)}
                >
                  <strong>SEO Analyzer</strong> | React, Node.js, Express.js, TextRazor API
                  <br />• Engineered an SEO tool for real-time feedback on 6 key on-page metrics.
                  <br />• Live: seo-analyzer-2b8f.vercel.app
                  <br /><br />
                  <strong>AI Agent Chatbot</strong> | Python, LangChain, Hugging Face
                  <br />• Built a context-aware AI chatbot using 2 open-source models, improving query response time.
                </div>
                
                <div className="command">whoami</div>
                <div 
                  className="response"
                  ref={el => (responseRefs.current[4] = el)}
                >
                  {username}@portfolio:~$ | {currentDate}
                </div>
              </TerminalOutput>
            </RetroTerminal>
          </motion.div>
        </StyledText>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <ImageContainer>
            <StyledPic>
              <GlitchingPhoto />
            </StyledPic>
          </ImageContainer>
        </motion.div>
      </StyledFlexContainer>

      {/* Professional Timeline Section */}
      <TimelineSection>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <h3 className="timeline-heading">Professional Journey</h3>
          
          {timelineData.map((item, index) => (
            <TimelineItem key={index} position={item.position}>
              <div className="timeline-icon">{item.icon}</div>
              <div className="timeline-content">
                <div className="date">{item.date}</div>
                <div className="title">{item.title}</div>
                <div className="description">{item.description}</div>
              </div>
            </TimelineItem>
          ))}
        </motion.div>
      </TimelineSection>

      {/* 3D Project Showcase */}
      <ProjectsShowcase>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <h3 className="projects-heading">Featured Projects</h3>
          
          <div className="projects-grid">
            {projectsData.map((project, index) => (
              <Project3DCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.2 * index,
                      duration: 0.5
                    }
                  }
                }}
                whileHover={{ 
                  z: 30,
                  transition: { duration: 0.3 }
                }}
              >
                <div 
                  className="project-bg" 
                  style={{ backgroundImage: `url(${project.bgImage})` }}
                ></div>
                <div className="project-overlay"></div>
                <div className="project-content">
                  <div className="project-header">
                    <div className="project-folder">📁</div>
                    <div className="project-title">{project.title}</div>
                    <div className="project-tech">{project.tech}</div>
                  </div>
                  <div className="project-description">
                    {project.description}
                  </div>
                  <div className="project-links">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <span>📂</span>
                    </a>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <span>🔗</span>
                    </a>
                  </div>
                </div>
              </Project3DCard>
            ))}
          </div>
        </motion.div>
      </ProjectsShowcase>

      {/* 3D Skills Orbit */}
      <SkillsOrbit>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <h3 className="skills-heading">Technical Universe</h3>
          
          <div className="orbit-container">
            <div className="center-sphere">Core<br/>Skills</div>
            
            {skillsOrbitData.map((skill, index) => {
              const startAngle = skill.startAngle || 0;
              const radians = (startAngle * Math.PI) / 180;
              const x = Math.cos(radians) * (skill.orbit / 2);
              const y = Math.sin(radians) * (skill.orbit / 2);
              const z = skill.zOffset;
              
              return (
                <React.Fragment key={index}>
                  <div 
                    className="orbit"
                    style={{ 
                      '--orbit-size': `${skill.orbit}px`,
                      '--orbit-speed': skill.speed,
                      transform: `rotateX(70deg) rotateZ(${startAngle}deg)`
                    }}
                  ></div>
                  <div 
                    className="skill-point"
                    style={{
                      '--orbit-size': `${skill.orbit}px`,
                      '--z-offset': `${skill.zOffset}px`,
                      transform: `rotateZ(${startAngle}deg) translateX(${skill.orbit / 2}px) rotateZ(-${startAngle}deg)`
                    }}
                  >
                    {skill.name}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </motion.div>
      </SkillsOrbit>
    </StyledAboutSection>
  );
};

export default About;