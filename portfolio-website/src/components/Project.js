import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { useScrollReveal, variants } from '../utils/scrollReveal';

// Direct icon imports instead of using the Icon component
import {
  IconExternal,
  IconFolder,
  IconGitHub,
} from './Icons/icons';

// Animation keyframes
const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
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

const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 10px rgba(100, 255, 218, 0.5); }
  50% { text-shadow: 0 0 20px rgba(100, 255, 218, 0.8); }
`;

const loadingBar = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const tvTurnOn = keyframes`
  0% { transform: scale(0); opacity: 0; filter: brightness(3); }
  50% { transform: scale(1.05); opacity: 0.8; filter: brightness(2.5); }
  75% { transform: scale(0.95); opacity: 1; filter: brightness(0.8); }
  90% { transform: scale(1.02); opacity: 1; filter: brightness(1.2); }
  100% { transform: scale(1); opacity: 1; filter: brightness(1); }
`;

// Styled Components
const StyledProjectsSection = styled.section`
  max-width: 1000px;
  position: relative;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(10, 25, 47, 0) 0%,
      rgba(10, 25, 47, 0.5) 100%
    );
    pointer-events: none;
    z-index: -1;
  }
`;

const StyledProjectsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  
  h2 {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 40px;
    width: 100%;
    font-size: clamp(26px, 5vw, 32px);
    white-space: nowrap;
    
    &::after {
      content: '';
      display: block;
      position: relative;
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background-color: ${props => props.theme.colors.lightestNavy};
      
      @media (max-width: 768px) {
        width: 100%;
      }
    }
  }
`;

const StyledFilterControls = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 30px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      rgba(100, 255, 218, 0),
      rgba(100, 255, 218, 0.5),
      rgba(100, 255, 218, 0)
    );
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      rgba(100, 255, 218, 0),
      rgba(100, 255, 218, 0.5),
      rgba(100, 255, 218, 0)
    );
  }
`;

const StyledFilterButton = styled.button`
  background: ${props => props.active ? 'rgba(100, 255, 218, 0.1)' : 'transparent'};
  color: ${props => props.active ? props.theme.colors.teal : props.theme.colors.slate};
  border: 1px solid ${props => props.active ? props.theme.colors.teal : 'transparent'};
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 13px;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  ${props => props.active && css`
    animation: ${glow} 2s infinite;
    box-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
  `}
  
  &:hover {
    background-color: rgba(100, 255, 218, 0.1);
    color: ${props => props.theme.colors.teal};
    transform: translateY(-2px);
  }
  
  &::before {
    content: '[ ';
    opacity: ${props => props.active ? 1 : 0};
    transition: opacity 0.25s;
  }
  
  &::after {
    content: ' ]';
    opacity: ${props => props.active ? 1 : 0};
    transition: opacity 0.25s;
  }
  
  &:hover::before,
  &:hover::after {
    opacity: 1;
  }
`;

const StyledProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  position: relative;
  margin-top: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StyledProjectCard = styled.div`
  position: relative;
  height: 400px;
  background-color: ${props => props.theme.colors.lightNavy};
  border-radius: 4px;
  transition: all 0.3s;
  overflow: hidden;
  animation: ${tvTurnOn} 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  animation-delay: ${props => props.index * 0.2}s;
  opacity: 0;
  
  /* Retro CRT screen styling */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      transparent 0px,
      rgba(0, 0, 0, 0.1) 1px,
      transparent 2px
    );
    pointer-events: none;
    z-index: 10;
    opacity: 0.3;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: rgba(100, 255, 218, 0.5);
    box-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
    animation: ${scanline} 6s linear infinite;
    pointer-events: none;
    z-index: 11;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
    
    .project-image {
      filter: grayscale(0) brightness(1.1);
    }
    
    .project-title {
      color: ${props => props.theme.colors.teal};
      animation: ${glow} 1.5s infinite;
    }
    
    .project-description {
      opacity: 0.9;
    }
  }
`;

const StyledProjectInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  height: 100%;
  padding: 2rem 1.75rem;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.lightNavy};
`;

const StyledProjectHeader = styled.div`
  width: 100%;
  
  .project-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px;
  }
  
  .folder {
    color: ${props => props.theme.colors.teal};
    svg {
      width: 40px;
      height: 40px;
    }
  }
  
  .project-links {
    display: flex;
    align-items: center;
    margin-right: -10px;
    color: ${props => props.theme.colors.lightSlate};
    
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 7px;
      
      svg {
        width: 22px;
        height: 22px;
      }
      
      &:hover {
        color: ${props => props.theme.colors.teal};
      }
    }
  }
  
  .project-title {
    margin: 0 0 10px;
    font-size: clamp(24px, 5vw, 28px);
    color: ${props => props.theme.colors.lightestSlate};
    font-family: ${props => props.theme.fonts.mono};
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.25s;
    position: relative;
    
    &::before {
      content: '> ';
      color: ${props => props.theme.colors.teal};
      font-family: ${props => props.theme.fonts.mono};
      animation: ${blink} 1s infinite;
    }
  }
  
  .project-description {
    color: ${props => props.theme.colors.slate};
    font-size: 15px;
    opacity: 0.8;
    transition: opacity 0.3s;
    font-family: ${props => props.theme.fonts.mono};
    line-height: 1.5;
  }
`;

const StyledTechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0;
  margin: 20px 0 0;
  list-style: none;
  
  li {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 12px;
    color: ${props => props.theme.colors.teal};
    padding: 3px 7px;
    border-radius: 3px;
    background-color: rgba(100, 255, 218, 0.1);
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
    
    &:hover {
      background-color: rgba(100, 255, 218, 0.2);
      transform: translateY(-2px);
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
        rgba(100, 255, 218, 0.2),
        transparent
      );
      transition: left 0.5s;
    }
    
    &:hover::before {
      left: 100%;
    }
  }
`;

const StyledProjectImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.navy};
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  filter: grayscale(100%) brightness(0.6);
  transition: all 0.3s;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(10, 25, 47, 0.7),
      rgba(10, 25, 47, 0.9)
    );
  }
`;

const StyledProjectContent = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledFeaturedProject = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 10px;
  align-items: center;
  position: relative;
  margin-bottom: 100px;
  
  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;
      
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
      }
      
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    
    .project-tech-list {
      justify-content: flex-end;
      
      @media (max-width: 768px) {
        justify-content: flex-start;
      }
    }
    
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;
      
      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    
    .project-image {
      grid-column: 1 / 8;
      
      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }
  
  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;
    
    @media (max-width: 768px) {
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }
    
    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }
  
  .project-overline {
    margin: 10px 0;
    color: ${props => props.theme.colors.teal};
    font-family: ${props => props.theme.fonts.mono};
    font-size: 13px;
    font-weight: 400;
  }
  
  .project-title {
    color: ${props => props.theme.colors.lightestSlate};
    font-size: clamp(24px, 5vw, 28px);
    
    @media (max-width: 768px) {
      color: ${props => props.theme.colors.white};
    }
  }
  
  .project-description {
    position: relative;
    padding: 20px;
    border-radius: 4px;
    background-color: ${props => props.theme.colors.lightNavy};
    color: ${props => props.theme.colors.lightSlate};
    font-size: 15px;
    
    &:hover {
      background-color: rgba(100, 255, 218, 0.1);
    }
    
    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;
      
      &:hover {
        background-color: transparent;
        box-shadow: none;
      }
    }
  }
  
  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;
    
    li {
      margin: 0 20px 5px 0;
      color: ${props => props.theme.colors.lightSlate};
      font-family: ${props => props.theme.fonts.mono};
      font-size: 13px;
      white-space: nowrap;
    }
    
    @media (max-width: 768px) {
      margin: 10px 0;
      
      li {
        margin: 0 10px 5px 0;
        color: ${props => props.theme.colors.lightestSlate};
      }
    }
  }
  
  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: ${props => props.theme.colors.lightestSlate};
    
    a {
      padding: 10px;
      
      svg {
        width: 20px;
        height: 20px;
      }
      
      &:hover {
        color: ${props => props.theme.colors.teal};
      }
    }
  }
  
  .project-image {
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;
    
    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.25;
    }
    
    a {
      width: 100%;
      height: 100%;
      background-color: ${props => props.theme.colors.teal};
      border-radius: 4px;
      vertical-align: middle;
      transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
      
      &:hover,
      &:focus {
        background: transparent;
        outline: 0;
        
        &::before,
        .img {
          background: transparent;
          filter: none;
        }
      }
      
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
        background-color: ${props => props.theme.colors.navy};
        mix-blend-mode: screen;
      }
    }
    
    .img {
      position: relative;
      border-radius: 4px;
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);
      
      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(50%);
      }
    }
  }
`;

const StyledCRTOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%, 
    rgba(0, 0, 0, 0.25) 50%
  );
  background-size: 100% 4px;
  z-index: 999;
  pointer-events: none;
  opacity: 0.1;
`;

const StyledVHSEffect = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    transparent,
    rgba(100, 255, 218, 0.03),
    transparent
  );
  z-index: 998;
  pointer-events: none;
  opacity: 0.3;
  animation: ${scanline} 10s linear infinite;
`;

const StyledProjectsStatus = styled.div`
  padding: 10px 15px;
  margin-top: 20px;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 14px;
  color: ${props => props.theme.colors.slate};
  border: 1px solid ${props => props.theme.colors.teal};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(10, 25, 47, 0.5);
  
  .status-text {
    display: flex;
    align-items: center;
    
    &::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      margin-right: 8px;
      background-color: ${props => props.theme.colors.teal};
      border-radius: 50%;
      animation: ${blink} 2s infinite;
    }
  }
  
  .status-info {
    display: flex;
    align-items: center;
    gap: 10px;
    
    .timestamp {
      font-size: 12px;
      color: ${props => props.theme.colors.lightSlate};
    }
    
    .username {
      color: ${props => props.theme.colors.teal};
    }
  }
`;

// Additional styled components for loading elements
const StyledLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  font-family: ${props => props.theme.fonts.mono};
  color: ${props => props.theme.colors.teal};
`;

const StyledLoadingText = styled.div`
  margin-bottom: 15px;
  letter-spacing: 2px;
  font-size: 18px;
  animation: ${blink} 1s infinite;
`;

const StyledLoadingBarContainer = styled.div`
  width: 300px;
  height: 10px;
  background-color: rgba(100, 255, 218, 0.1);
  border: 1px solid ${props => props.theme.colors.teal};
  border-radius: 5px;
  overflow: hidden;
`;

const StyledLoadingBar = styled.div`
  height: 100%;
  background-color: ${props => props.theme.colors.teal};
  width: 0;
  animation: ${loadingBar} 1.5s forwards;
`;

// Define project data
const featuredProjects = [
  {
    title: "VHS Tracker",
    description: "A comprehensive web application for tracking and organizing your VHS collection. Features include barcode scanning, cover art retrieval, and condition tracking.",
    tech: ["React", "Node.js", "Express", "MongoDB", "SCSS"],
    github: "https://github.com",
    external: "https://vhstracker.com",
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617",
    featured: true,
    category: "web"
  },
  {
    title: "Retrowave FM",
    description: "A streaming music platform focused exclusively on synthwave, vaporwave, and retro electronic music. Features a virtual cassette deck interface and night driving visualizer.",
    tech: ["React", "Web Audio API", "Firebase", "Redux", "Styled Components"],
    github: "https://github.com",
    external: "https://retrowave.fm",
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f",
    featured: true,
    category: "music"
  },
  {
    title: "Pixel Art Generator",
    description: "A tool for creating pixel art with various retro console color palettes. Export your creations as PNGs or animated GIFs.",
    tech: ["JavaScript", "Canvas API", "HTML5", "CSS3"],
    github: "https://github.com",
    external: "https://pixelartgen.com",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
    featured: true,
    category: "design"
  }
];

const otherProjects = [
  {
    title: "Arcade Score Tracker",
    description: "Mobile app for tracking high scores across arcade games. Includes leaderboards and achievement badges.",
    tech: ["React Native", "Firebase", "Expo"],
    github: "https://github.com",
    external: "",
    category: "mobile"
  },
  {
    title: "Synthwave Portfolio",
    description: "A customizable portfolio template with a synthwave aesthetic, featuring neon colors and grid backgrounds.",
    tech: ["HTML", "CSS", "JavaScript", "Three.js"],
    github: "https://github.com",
    external: "https://synthfolio.dev",
    category: "web"
  },
  {
    title: "8-bit Weather App",
    description: "Weather forecasts displayed in retro 8-bit graphics. Changes appearance based on current conditions.",
    tech: ["React", "Weather API", "Canvas", "Pixel Art"],
    github: "https://github.com",
    external: "https://8bitweather.app",
    category: "web"
  },
  {
    title: "Retro Game Database",
    description: "Searchable database of retro video games with metadata, release dates, and screenshots.",
    tech: ["Vue.js", "Node.js", "PostgreSQL", "REST API"],
    github: "https://github.com",
    external: "",
    category: "web"
  },
  {
    title: "Cassette Label Maker",
    description: "Generate printable cassette J-cards and labels with custom artwork and track listings.",
    tech: ["React", "Canvas API", "PDF Generation"],
    github: "https://github.com",
    external: "https://cassettelabels.io",
    category: "design"
  },
  {
    title: "CRT Terminal Emulator",
    description: "A browser-based terminal emulator with authentic CRT effects and green phosphor display.",
    tech: ["JavaScript", "WebGL", "CSS Effects"],
    github: "https://github.com",
    external: "",
    category: "tools"
  }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showStatic, setShowStatic] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const { ref, controls, inView } = useScrollReveal();
  
  // Updated exact date/time and username
  const currentDate = "2025-06-23 16:51:26";
  const username = "itsanubhav009";

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setVisibleProjects(otherProjects);
    }, 1500);
    
    // Occasional static effect
    const staticInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setShowStatic(true);
        setTimeout(() => setShowStatic(false), 150);
      }
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(staticInterval);
    };
  }, []);

  // Filter projects when category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setVisibleProjects(otherProjects);
    } else {
      setVisibleProjects(otherProjects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);

  const handleFilterClick = (category) => {
    setShowStatic(true);
    
    setTimeout(() => {
      setActiveCategory(category);
      setShowStatic(false);
    }, 500);
  };

  const getCategories = () => {
    const categories = new Set(['all']);
    otherProjects.forEach(project => categories.add(project.category));
    return Array.from(categories);
  };

  return (
    <StyledProjectsSection id="projects">
      {/* CRT Overlay for retro effect */}
      <StyledCRTOverlay />
      <StyledVHSEffect />
      
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        <StyledProjectsHeader>
          <h2 className="section-heading">Projects</h2>
        </StyledProjectsHeader>
        
        {isLoading ? (
          <StyledLoadingContainer>
            <StyledLoadingText>LOADING PROJECTS...</StyledLoadingText>
            <StyledLoadingBarContainer>
              <StyledLoadingBar />
            </StyledLoadingBarContainer>
          </StyledLoadingContainer>
        ) : (
          <>
            {/* Featured Projects */}
            <div>
              {featuredProjects.map((project, index) => (
                <StyledFeaturedProject key={index}>
                  <div className="project-content">
                    <p className="project-overline">Featured Project</p>
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-description">
                      <p>{project.description}</p>
                    </div>
                    <ul className="project-tech-list">
                      {project.tech.map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))}
                    </ul>
                    <div className="project-links">
                      {project.github && (
                        <a href={project.github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                          <IconGitHub />
                        </a>
                      )}
                      {project.external && (
                        <a href={project.external} aria-label="External Link" target="_blank" rel="noreferrer">
                          <IconExternal />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="project-image">
                    <a href={project.external || project.github || '#'}>
                      <img src={project.image} alt={project.title} className="img" />
                    </a>
                  </div>
                </StyledFeaturedProject>
              ))}
            </div>
            
            {/* Other Projects */}
            <div>
              <h2 style={{ textAlign: 'center', marginTop: '80px', marginBottom: '40px' }}>
                Other Projects
              </h2>
              
              <StyledFilterControls>
                {getCategories().map((category, index) => (
                  <StyledFilterButton 
                    key={index}
                    active={activeCategory === category}
                    onClick={() => handleFilterClick(category)}
                  >
                    {category.toUpperCase()}
                  </StyledFilterButton>
                ))}
              </StyledFilterControls>
              
              <StyledProjectsGrid>
                {visibleProjects.map((project, index) => (
                  <StyledProjectCard key={index} index={index}>
                    <StyledProjectInner>
                      <StyledProjectHeader>
                        <div className="project-top">
                          <div className="folder">
                            <IconFolder />
                          </div>
                          <div className="project-links">
                            {project.github && (
                              <a href={project.github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                                <IconGitHub />
                              </a>
                            )}
                            {project.external && (
                              <a href={project.external} aria-label="External Link" target="_blank" rel="noreferrer">
                                <IconExternal />
                              </a>
                            )}
                          </div>
                        </div>
                        
                        <h3 className="project-title">{project.title}</h3>
                        <div className="project-description">
                          <p>{project.description}</p>
                        </div>
                      </StyledProjectHeader>
                      
                      <div>
                        <StyledTechList>
                          {project.tech.map((tech, i) => (
                            <li key={i}>{tech}</li>
                          ))}
                        </StyledTechList>
                      </div>
                    </StyledProjectInner>
                  </StyledProjectCard>
                ))}
              </StyledProjectsGrid>
              
              <StyledProjectsStatus>
                <div className="status-text">PROJECTS LOADED</div>
                <div className="status-info">
                  <span className="username">{username}</span>
                  <span className="timestamp">{currentDate}</span>
                </div>
              </StyledProjectsStatus>
            </div>
          </>
        )}
      </motion.div>
    </StyledProjectsSection>
  );
};

export default Projects;