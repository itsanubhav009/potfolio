import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal, variants } from '../utils/scrollReveal';

// Optimized icons for better performance
const IconGitHub = () => (
  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const IconExternal = () => (
  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const IconFolder = () => (
  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
);

// Animations
const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 5px rgba(100, 255, 218, 0.5); }
  50% { text-shadow: 0 0 10px rgba(100, 255, 218, 0.8); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(100, 255, 218, 0.3); }
  50% { box-shadow: 0 0 15px rgba(100, 255, 218, 0.5); }
`;

// Styled components
const StyledProjectsSection = styled.section`
  max-width: 1000px;
  position: relative;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at top, rgba(10, 25, 47, 0.1) 0%, rgba(10, 25, 47, 0) 60%);
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
    
    &::before {
      content: '> ';
      color: ${props => props.theme.colors.teal};
      margin-right: 10px;
      animation: ${blink} 1s step-end infinite;
    }
    
    &::after {
      content: '';
      display: block;
      position: relative;
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background: linear-gradient(
        to right,
        ${props => props.theme.colors.teal},
        ${props => props.theme.colors.lightestNavy}
      );
      
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
  gap: 10px;
  margin-bottom: 30px;
  position: relative;
  padding: 15px 0;
  
  &::before, &::after {
    content: '';
    position: absolute;
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
  
  &::before { top: 0; }
  &::after { bottom: 0; }
`;

const StyledFilterButton = styled.button`
  background: ${props => props.active ? 'rgba(100, 255, 218, 0.1)' : 'transparent'};
  color: ${props => props.active ? props.theme.colors.teal : props.theme.colors.slate};
  border: 1px solid ${props => props.active ? props.theme.colors.teal : 'transparent'};
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 13px;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  ${props => props.active && css`
    box-shadow: 0 0 8px rgba(100, 255, 218, 0.3);
  `}
  
  &:hover {
    background-color: rgba(100, 255, 218, 0.1);
    color: ${props => props.theme.colors.teal};
    transform: translateY(-2px);
  }
  
  &::before {
    content: '[ ';
    opacity: ${props => props.active ? 1 : 0};
    transition: opacity 0.2s ease;
  }
  
  &::after {
    content: ' ]';
    opacity: ${props => props.active ? 1 : 0};
    transition: opacity 0.2s ease;
  }
  
  &:hover::before,
  &:hover::after {
    opacity: 1;
  }
`;

const StyledProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  position: relative;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StyledProjectCard = styled(motion.div)`
  position: relative;
  height: 380px;
  background-color: ${props => props.theme.colors.lightNavy};
  border-radius: 4px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.5);
  animation: ${pulse} 4s infinite;
  animation-delay: ${props => props.index * 0.2}s;
  
  /* Scanline effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: rgba(100, 255, 218, 0.3);
    box-shadow: 0 0 5px rgba(100, 255, 218, 0.3);
    animation: ${scanline} 8s linear infinite;
    pointer-events: none;
    z-index: 11;
  }
  
  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 10px 30px -10px rgba(100, 255, 218, 0.3);
    
    .project-title {
      color: ${props => props.theme.colors.teal};
    }
    
    .project-links a {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StyledProjectInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem;
  position: relative;
  
  /* Subtle retro CRT lines */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 2px,
      rgba(10, 25, 47, 0.05) 2px,
      rgba(10, 25, 47, 0.05) 4px
    );
    opacity: 0.15;
    pointer-events: none;
    z-index: 0;
  }
`;

const StyledProjectHeader = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  margin-bottom: auto;
  
  .project-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
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
    color: ${props => props.theme.colors.lightSlate};
    gap: 10px;
    
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 7px;
      opacity: 0.7;
      transform: translateY(5px);
      transition: all 0.2s ease;
      
      svg {
        width: 20px;
        height: 20px;
      }
      
      &:hover {
        color: ${props => props.theme.colors.teal};
        transform: translateY(-2px);
        opacity: 1;
      }
    }
  }
  
  .project-title {
    margin: 0 0 10px;
    font-size: 22px;
    color: ${props => props.theme.colors.lightestSlate};
    font-family: ${props => props.theme.fonts.mono};
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.25s;
    
    &::before {
      content: '> ';
      color: ${props => props.theme.colors.teal};
      font-family: ${props => props.theme.fonts.mono};
    }
  }
  
  .project-date {
    color: ${props => props.theme.colors.slate};
    font-family: ${props => props.theme.fonts.mono};
    font-size: 14px;
    margin-bottom: 15px;
  }
  
  .project-description {
    color: ${props => props.theme.colors.slate};
    font-size: 15px;
    line-height: 1.5;
    
    ul {
      padding-left: 15px;
      margin: 10px 0 0;
      
      li {
        position: relative;
        padding-left: 15px;
        margin-bottom: 5px;
        
        &::before {
          content: '▹';
          position: absolute;
          left: 0;
          color: ${props => props.theme.colors.teal};
        }
      }
    }
  }
`;

const StyledTechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 15px 0 0;
  position: relative;
  z-index: 1;
  
  span {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 12px;
    color: ${props => props.theme.colors.lightSlate};
    padding: 3px 7px;
    border-radius: 3px;
    background-color: rgba(100, 255, 218, 0.1);
    transition: all 0.2s ease;
    
    &:hover {
      background-color: rgba(100, 255, 218, 0.2);
      color: ${props => props.theme.colors.teal};
      transform: translateY(-2px);
    }
  }
`;

const StyledProjectsStatus = styled.div`
  padding: 10px 15px;
  margin-top: 30px;
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

// Memoized Project Card for better performance
const ProjectCard = React.memo(({ project, index }) => {
  return (
    <StyledProjectCard 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, delay: index * 0.1 } }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.02 }}
      index={index}
    >
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
          <div className="project-date">{project.date}</div>
          
          <div className="project-description">
            <ul>
              {project.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </StyledProjectHeader>
        
        <StyledTechList>
          {project.tech.map((tech, i) => (
            <span key={i}>{tech}</span>
          ))}
        </StyledTechList>
      </StyledProjectInner>
    </StyledProjectCard>
  );
});

ProjectCard.displayName = 'ProjectCard';

// Project data based on exact user info
const projectsData = [
  {
    id: 1,
    title: "SEO Analyzer",
    date: "May 2024 – June 2024",
    points: [
      "Engineered an SEO tool for real-time feedback on 6 key on-page metrics.",
      "Deployed with a dynamic preview."
    ],
    tech: ["React", "Node.js", "Express.js", "TextRazor API"],
    github: "https://github.com/itsanubhav009/seo-analyzer",
    external: "https://seo-analyzer-2b8f.vercel.app",
    category: "web"
  },
  {
    id: 2,
    title: "AI Agent Chatbot",
    date: "Jan 2024 – March 2024",
    points: [
      "Built a context-aware AI chatbot using 2 open-source models, improving query response time.",
      "Integrated a vector database for efficient semantic search over 1,200+ custom documents."
    ],
    tech: ["Python", "LangChain", "Hugging Face"],
    github: "https://github.com/itsanubhav009/ai-agent-chatbot",
    external: "",
    category: "ai"
  },
  {
    id: 3,
    title: "DomainVault",
    date: "July 2023 – Oct 2023",
    points: [
      "Developed a mail server with custom domain control and integrated spam reporting.",
      "Used multi-threading to manage secure attachments and 25+ simultaneous client sessions."
    ],
    tech: ["C++", "SMTP", "POP3", "SQLite", "Multi-threading"],
    github: "https://github.com/itsanubhav009/domainvault",
    external: "",
    category: "backend"
  },
  {
    id: 4,
    title: "IntelliRoute",
    date: "Feb 2024 – April 2024",
    points: [
      "Created a route-matching platform to handle complex concurrent spatial queries.",
      "Enabled user discovery and private chat via an interactive map interface."
    ],
    tech: ["React.js", "Node.js", "PostGIS", "Supabase"],
    github: "https://github.com/itsanubhav009/intelliroute",
    external: "",
    category: "web"
  },
  {
    id: 5,
    title: "MCP Server",
    date: "May 2023 – June 2023",
    points: [
      "Built a resilient TCP chat server to support over 50 concurrent clients.",
      "Used pthreads and user authentication to maintain sub-100ms latency."
    ],
    tech: ["C++", "Socket Programming", "Threads"],
    github: "https://github.com/itsanubhav009/mcp-server",
    external: "",
    category: "networking"
  },
  {
    id: 6,
    title: "Data Visualization Dashboard",
    date: "July 2023 – Aug 2023",
    points: [
      "Designed a responsive dashboard to visualize real-time metrics from 3 REST APIs.",
      "Enhanced data comprehension with 5 interactive charts and a modern UI."
    ],
    tech: ["Next.js", "Chart.js", "Tailwind CSS"],
    github: "https://github.com/itsanubhav009/data-viz-dashboard",
    external: "",
    category: "web"
  },
  {
    id: 7,
    title: "E-Vidhi: Legal Connect Platform",
    date: "Nov 2023 – Dec 2023",
    points: [
      "Built a secure lawyer-client platform with real-time chat and JWT authentication.",
      "Engineered a scalable backend with MongoDB to efficiently manage user sessions."
    ],
    tech: ["MERN Stack", "Socket.io", "JWT"],
    github: "https://github.com/itsanubhav009/e-vidhi",
    external: "",
    category: "web"
  }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState([]);
  const { ref, controls } = useScrollReveal();
  
  // Current date/time and username exactly as provided
  const currentDateTime = "2025-07-08 08:28:31";
  const username = "itsanubhav009";
  
  // Filter projects by category
  const handleFilterClick = useCallback((category) => {
    setActiveCategory(category);
  }, []);
  
  // Filter projects when category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setVisibleProjects(projectsData);
    } else {
      setVisibleProjects(projectsData.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);
  
  // Load projects with animation
  useEffect(() => {
    setVisibleProjects(projectsData);
  }, []);
  
  // Get unique categories for filter buttons
  const categories = useMemo(() => {
    const categorySet = new Set(['all']);
    projectsData.forEach(project => categorySet.add(project.category));
    return Array.from(categorySet);
  }, []);
  
  return (
    <StyledProjectsSection id="projects">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        <StyledProjectsHeader>
          <h2 className="section-heading">Projects</h2>
        </StyledProjectsHeader>
        
        <StyledFilterControls>
          {categories.map((category, index) => (
            <StyledFilterButton 
              key={index}
              active={activeCategory === category}
              onClick={() => handleFilterClick(category)}
              aria-label={`Filter by ${category}`}
            >
              {category === 'all' ? 'ALL' : category.toUpperCase()}
            </StyledFilterButton>
          ))}
        </StyledFilterControls>
        
        <AnimatePresence>
          <StyledProjectsGrid>
            {visibleProjects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </StyledProjectsGrid>
        </AnimatePresence>
        
        <StyledProjectsStatus>
          <div className="status-text">PROJECTS LOADED: {visibleProjects.length}</div>
          <div className="status-info">
            <span className="username">{username}</span>
            <span className="timestamp">{currentDateTime}</span>
          </div>
        </StyledProjectsStatus>
      </motion.div>
    </StyledProjectsSection>
  );
};

export default Projects;