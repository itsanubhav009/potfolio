import React, { useState, useCallback, memo, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { FaGithub, FaExternalLinkAlt, FaRocket, FaInfoCircle, FaTerminal } from "react-icons/fa";

// --- Single Minimal Animation ---
const retroFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

// --- Main Container ---
const RetroCosmicContainer = styled.section`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  min-height: 100vh;
  z-index: 5;
`;

// --- Ultra-Optimized Starfield ---
const LightweightStars = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -100;
  background-color: transparent;
  background-image: 
    /* Optimized starfield using minimal dots */
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
    
    /* A few medium stars */
    radial-gradient(1.5px 1.5px at 22% 35%, white 1px, transparent 0),
    radial-gradient(1.5px 1.5px at 45% 65%, white 1px, transparent 0),
    radial-gradient(1.5px 1.5px at 68% 22%, white 1px, transparent 0),
    radial-gradient(1.5px 1.5px at 78% 58%, white 1px, transparent 0),
    
    /* Just two bright stars */
    radial-gradient(2px 2px at 35% 75%, white 1px, transparent 0),
    radial-gradient(2px 2px at 65% 42%, white 1px, transparent 0);
  
  background-size: 200% 200%;
  pointer-events: none;
  opacity: 0.8;
`;

// --- Header Components ---
const SectionHeader = styled.div`
  margin-bottom: 60px;
  text-align: center;
  position: relative;
  z-index: 10;
`;

const RetroTitle = styled.h2`
  font-family: 'VT323', 'Courier New', monospace;
  color: #00ffff;
  font-size: clamp(28px, 5vw, 36px);
  margin-bottom: 10px;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  letter-spacing: 2px;
  
  &::before {
    content: '> ';
    opacity: 0.8;
  }
`;

const RetroSubtitle = styled.p`
  font-family: 'VT323', 'Courier New', monospace;
  color: #a8b2d1;
  font-size: 18px;
  margin: 0 auto 20px;
  max-width: 600px;
`;

const RetroTerminal = styled.div`
  font-family: 'VT323', 'Courier New', monospace;
  color: #00ffff;
  background: rgba(0, 10, 20, 0.7);
  border: 2px solid rgba(0, 255, 255, 0.3);
  border-radius: 4px;
  padding: 15px;
  margin: 0 auto;
  max-width: 600px;
  position: relative;
  
  .prompt {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  
  .cursor {
    display: inline-block;
    width: 8px;
    height: 15px;
    background: #00ffff;
    margin-left: 5px;
    animation: ${blink} 1s step-end infinite;
    vertical-align: middle;
  }
`;

// --- Projects Grid ---
const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  position: relative;
  z-index: 10;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// --- Retro Project Card ---
const RetroProjectCard = styled.div`
  position: relative;
  background: rgba(5, 10, 20, 0.8);
  border: 2px solid rgba(0, 255, 255, 0.3);
  border-radius: 4px;
  min-height: 400px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  
  /* Simple scale only */
  transform: ${props => props.isHovered ? 'scale(1.03)' : 'scale(1)'};
  transition: transform 0.3s ease-out, border-color 0.3s ease, box-shadow 0.3s ease;
  
  /* Very minimal shadow */
  box-shadow: ${props => props.isHovered 
    ? '0 0 15px rgba(0, 255, 255, 0.3)' 
    : '0 0 10px rgba(0, 0, 0, 0.3)'};
  
  z-index: ${props => props.isHovered ? 20 : 10};
  
  /* Efficient animation - GPU accelerated */
  animation: ${retroFloat} ${props => props.floatDuration || '8s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  &:hover {
    border-color: rgba(0, 255, 255, 0.7);
  }
`;

// Image container
const RetroProjectImage = styled.div`
  position: relative;
  border-radius: 2px 2px 0 0;
  overflow: hidden;
  height: 180px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
    transform: ${props => props.isHovered ? 'scale(1.05)' : 'scale(1)'};
  }
  
  /* Simple overlay */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 10, 20, 0.3) 0%,
      rgba(0, 20, 40, 0.5) 100%
    );
    pointer-events: none;
  }
`;

// Retro image placeholder
const RetroImagePlaceholder = styled.div`
  position: relative;
  height: 180px;
  background: linear-gradient(135deg, rgba(0, 10, 25, 0.8) 0%, rgba(0, 20, 40, 0.8) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    font-size: 60px;
    color: rgba(0, 255, 255, 0.3);
  }
`;

// Card content
const RetroCardContent = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

// Project title
const RetroProjectTitle = styled.h3`
  color: ${props => props.isHovered ? '#00ffff' : '#e6f1ff'};
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 24px;
  margin: 0 0 15px;
  transition: color 0.3s ease, text-shadow 0.3s ease;
  letter-spacing: 1px;
  
  ${RetroProjectCard}:hover & {
    color: #00ffff;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.7);
  }
`;

// Project description
const RetroProjectDescription = styled.p`
  color: #a8b2d1;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
`;

// Extended description
const RetroExtendedDescription = styled.p`
  color: rgba(168, 178, 209, 0.8);
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 20px;
  max-height: ${props => props.isHovered ? '80px' : '0'};
  opacity: ${props => props.isHovered ? 1 : 0};
  transition: all 0.4s ease;
  overflow: hidden;
  
  ${RetroProjectCard}:hover & {
    opacity: 1;
    max-height: 80px;
  }
`;

// Tech list
const RetroTechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
`;

// Tech item
const RetroTechItem = styled.li`
  color: #a8b2d1;
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 14px;
  background: rgba(0, 10, 20, 0.8);
  padding: 4px 8px;
  border-radius: 2px;
  border: 1px solid rgba(0, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  ${RetroProjectCard}:hover & {
    transform: translateY(-3px);
    background: rgba(0, 20, 30, 0.9);
    border-color: rgba(0, 255, 255, 0.4);
    color: #ccd6f6;
  }
`;

// Links container
const RetroLinksContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: auto;
`;

// External link
const RetroExternalLink = styled.a`
  color: ${props => props.isHovered ? '#00ffff' : '#a8b2d1'};
  font-size: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #00ffff;
    transform: translateY(-3px);
  }
  
  ${RetroProjectCard}:hover & {
    color: #00ffff;
  }
`;

// Signature
const RetroSignature = styled.div`
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 12px;
  color: rgba(0, 255, 255, 0.7);
  margin-top: 15px;
  text-align: right;
`;

// Details button
const RetroDetailsButton = styled.button`
  margin-top: 15px;
  background: rgba(0, 255, 255, 0.1);
  color: #00ffff;
  border: 1px solid rgba(0, 255, 255, 0.4);
  border-radius: 2px;
  padding: 8px 15px;
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  transform: ${props => props.isHovered ? 'translateY(0)' : 'translateY(10px)'};
  opacity: ${props => props.isHovered ? 1 : 0};
  
  &:hover {
    background: rgba(0, 255, 255, 0.2);
    transform: translateY(-3px);
  }
  
  ${RetroProjectCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Project details modal
const RetroProjectDetails = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 5, 15, 0.9);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  
  .content {
    background: rgba(0, 10, 20, 0.95);
    border: 2px solid rgba(0, 255, 255, 0.3);
    border-radius: 4px;
    padding: 30px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(50px)'};
    transition: transform 0.3s ease;
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: #a8b2d1;
    font-size: 24px;
    cursor: pointer;
    
    &:hover {
      color: #00ffff;
    }
  }
  
  .modal-image {
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 25px;
    
    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
  
  .modal-title {
    color: #00ffff;
    font-family: 'VT323', monospace;
    font-size: 28px;
    margin-bottom: 25px;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
    letter-spacing: 1px;
  }
  
  .modal-description {
    color: #a8b2d1;
    font-size: 16px;
    line-height: 1.7;
    margin-bottom: 25px;
  }
  
  .modal-tech-title {
    color: #e6f1ff;
    font-family: 'VT323', monospace;
    font-size: 20px;
    margin-bottom: 15px;
  }
  
  .modal-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 25px;
  }
  
  .modal-tech-item {
    background: rgba(0, 10, 20, 0.8);
    color: #a8b2d1;
    padding: 5px 12px;
    border-radius: 2px;
    font-size: 14px;
    font-family: 'VT323', monospace;
    border: 1px solid rgba(0, 255, 255, 0.2);
  }
  
  .modal-links {
    display: flex;
    gap: 15px;
  }
  
  .modal-link {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(0, 255, 255, 0.1);
    color: #00ffff;
    padding: 10px 18px;
    border-radius: 2px;
    text-decoration: none;
    font-family: 'VT323', monospace;
    font-size: 16px;
    border: 1px solid rgba(0, 255, 255, 0.3);
    transition: all 0.3s;
    
    &:hover {
      background: rgba(0, 255, 255, 0.2);
      transform: translateY(-3px);
    }
  }
`;

// --- Main Component ---
const Projects = () => {
  // Current date/time and username exactly as specified
  const currentDateTime = "2025-07-07 11:49:35";
  const username = "itsanubhav009";
  
  // State for tracking hover - single value for better performance
  const [hoveredProject, setHoveredProject] = useState(null);
  
  // State for project details modal
  const [expandedProject, setExpandedProject] = useState(null);
  
  // Project data - memoized
  const projects = useMemo(() => [
    {
      id: 1,
      title: "Xenoscape Explorer",
      description: "Interactive 3D visualization of alien worlds with procedurally generated terrain and lifeforms.",
      extendedDescription: "Explore dynamically generated cosmic landscapes with realistic physics and interactive alien species.",
      longDescription: "An immersive platform that lets users explore procedurally generated alien planets with unique ecosystems and atmospheric conditions. Features realistic terrain generation, dynamic weather systems, and interactive alien lifeforms with their own behaviors.",
      tech: ["Three.js", "WebGL", "React", "Procedural Generation"],
      github: "https://github.com/example/xenoscape",
      external: "https://xenoscape.example.com",
      image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&q=80",
      delay: "0s",
      floatDuration: "8s"
    },
    {
      id: 2,
      title: "Nexus Terminal",
      description: "Advanced command-line interface with neural network assistance and 3D cosmic data visualization.",
      extendedDescription: "Quantum-inspired terminal with AI-assisted commands and holographic file system visualization.",
      longDescription: "A next-generation terminal environment that combines traditional command-line functionality with AI assistance and immersive space data visualization. Features include neural network command prediction, 3D file system visualization, and quantum-inspired encryption.",
      tech: ["Rust", "TensorFlow.js", "WebGL", "Node.js"],
      github: "https://github.com/example/nexus-terminal",
      external: "https://terminal.nexus.example.com",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
      delay: "0.5s",
      floatDuration: "9s"
    },
    {
      id: 3,
      title: "Stellar Insights",
      description: "Business intelligence platform with cosmic-themed visualizations and predictive AI analysis.",
      extendedDescription: "Transform complex data into intuitive cosmic visualizations with AI-powered forecasting.",
      longDescription: "Enterprise analytics platform with a cosmic design language and powerful data processing capabilities. Transforms complex datasets into intuitive visualizations inspired by astronomical phenomena with AI-powered forecasting.",
      tech: ["D3.js", "Python", "TensorFlow", "PostgreSQL"],
      github: "https://github.com/example/stellar-insights",
      external: "https://insights.stellar.example.com",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
      delay: "1s",
      floatDuration: "7.5s"
    },
    {
      id: 4,
      title: "Quantum Chat",
      description: "Secure messaging app with alien-inspired UI and advanced cryptography protocols.",
      extendedDescription: "End-to-end encrypted messaging with quantum-resistant algorithms and self-destructing messages.",
      longDescription: "End-to-end encrypted communication platform with a unique interface inspired by theoretical alien communication systems. Features quantum-resistant encryption, self-destructing messages, and adaptive communication channels.",
      tech: ["React Native", "Signal Protocol", "Rust", "Redux"],
      github: "https://github.com/example/quantum-chat",
      external: null,
      image: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=600&q=80",
      delay: "1.5s",
      floatDuration: "8.5s"
    },
    {
      id: 5,
      title: "Zero-G Code",
      description: "Code editor optimized for zero-gravity programming with cosmic themes and AI assistance.",
      extendedDescription: "Specialized IDE with gesture controls, cosmic color schemes, and space-optimized interfaces.",
      longDescription: "A development environment designed for optimal coding in space-like conditions with minimized eye strain and gesture controls. Features cosmic color schemes, AI code completion, and special UI layouts for space environments.",
      tech: ["Electron", "Monaco Editor", "TypeScript", "WASM"],
      github: "https://github.com/example/zero-g-code",
      external: "https://zerog.code.example.com",
      image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=600&q=80",
      delay: "2s",
      floatDuration: "9.5s"
    },
    {
      id: 6,
      title: "Exoplanet Atlas",
      description: "Comprehensive catalog of exoplanets with interactive 3D models and atmospheric data.",
      extendedDescription: "Scientific database of exoplanets with detailed atmospheric analysis and habitability scoring.",
      longDescription: "Scientific database application that catalogs known exoplanets with detailed information about their physical properties, atmospheric composition, and potential habitability. Features interactive 3D models and simulated surface views.",
      tech: ["Vue.js", "Three.js", "GraphQL", "MongoDB"],
      github: "https://github.com/example/exoplanet-atlas",
      external: "https://atlas.exoplanet.example.com",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80",
      delay: "2.5s",
      floatDuration: "7s"
    }
  ], []);

  // Optimized event handlers
  const openExpandedView = useCallback((e, project) => {
    e.stopPropagation();
    setExpandedProject(project);
    document.body.style.overflow = 'hidden';
  }, []);
  
  const closeExpandedView = useCallback(() => {
    setExpandedProject(null);
    document.body.style.overflow = '';
  }, []);
  
  const handleCardClick = useCallback((project) => {
    if (project.external) {
      window.open(project.external, '_blank', 'noopener,noreferrer');
    } else if (project.github) {
      window.open(project.github, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return (
    <RetroCosmicContainer id="projects">
      {/* Ultra-lightweight starfield */}
      <LightweightStars />
      
      {/* Section header */}
      <SectionHeader>
        <RetroTitle>Cosmic Portfolio</RetroTitle>
        <RetroSubtitle>Digital artifacts from the far reaches of space</RetroSubtitle>
        
        <RetroTerminal>
          <div className="prompt">
            <FaTerminal />
            <span>{`${username}@cosmic:~$ ls -la ./projects | sort -r`}</span>
          </div>
          <span className="cursor" />
        </RetroTerminal>
      </SectionHeader>
      
      {/* Projects grid */}
      <ProjectsGrid>
        {projects.map(project => (
          <RetroProjectCard 
            key={project.id}
            isHovered={hoveredProject === project.id}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => handleCardClick(project)}
            delay={project.delay}
            floatDuration={project.floatDuration}
          >
            {project.image ? (
              <RetroProjectImage isHovered={hoveredProject === project.id}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  loading="lazy"
                />
              </RetroProjectImage>
            ) : (
              <RetroImagePlaceholder isHovered={hoveredProject === project.id}>
                <FaRocket />
              </RetroImagePlaceholder>
            )}
            
            <RetroCardContent>
              <RetroProjectTitle isHovered={hoveredProject === project.id}>
                {project.title}
              </RetroProjectTitle>
              
              <RetroProjectDescription isHovered={hoveredProject === project.id}>
                {project.description}
              </RetroProjectDescription>
              
              <RetroExtendedDescription isHovered={hoveredProject === project.id}>
                {project.extendedDescription}
              </RetroExtendedDescription>
              
              <RetroTechList isHovered={hoveredProject === project.id}>
                {project.tech.map((tech, i) => (
                  <RetroTechItem key={i}>
                    {tech}
                  </RetroTechItem>
                ))}
              </RetroTechList>
              
              <RetroLinksContainer isHovered={hoveredProject === project.id}>
                {project.github && (
                  <RetroExternalLink 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    isHovered={hoveredProject === project.id}
                    aria-label="GitHub Repository"
                  >
                    <FaGithub />
                  </RetroExternalLink>
                )}
                
                {project.external && (
                  <RetroExternalLink 
                    href={project.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    isHovered={hoveredProject === project.id}
                    aria-label="Live Project"
                  >
                    <FaExternalLinkAlt />
                  </RetroExternalLink>
                )}
                
                <RetroSignature>
                  {username} ~ {currentDateTime}
                </RetroSignature>
              </RetroLinksContainer>
              
              <RetroDetailsButton 
                isHovered={hoveredProject === project.id}
                onClick={(e) => openExpandedView(e, project)}
              >
                <FaInfoCircle /> View Details
              </RetroDetailsButton>
            </RetroCardContent>
          </RetroProjectCard>
        ))}
      </ProjectsGrid>
      
      {/* Render modal only when needed */}
      {expandedProject && (
        <RetroProjectDetails isOpen={!!expandedProject}>
          <div className="content">
            <button className="close-button" onClick={closeExpandedView}>×</button>
            
            <h2 className="modal-title">{expandedProject.title}</h2>
            
            {expandedProject.image && (
              <div className="modal-image">
                <img 
                  src={expandedProject.image} 
                  alt={expandedProject.title}
                />
              </div>
            )}
            
            <p className="modal-description">{expandedProject.longDescription}</p>
            
            <h3 className="modal-tech-title">Technologies</h3>
            <div className="modal-tech-list">
              {expandedProject.tech.map((tech, i) => (
                <span key={i} className="modal-tech-item">{tech}</span>
              ))}
            </div>
            
            <div className="modal-links">
              {expandedProject.github && (
                <a 
                  href={expandedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-link"
                >
                  <FaGithub /> View Source
                </a>
              )}
              
              {expandedProject.external && (
                <a 
                  href={expandedProject.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-link"
                >
                  <FaExternalLinkAlt /> Visit Project
                </a>
              )}
            </div>
          </div>
        </RetroProjectDetails>
      )}
    </RetroCosmicContainer>
  );
};

export default memo(Projects);