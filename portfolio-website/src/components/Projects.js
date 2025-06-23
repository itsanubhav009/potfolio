import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';
import { useScrollReveal, variants } from '../utils/scrollReveal';
import RetroCard from './RetroCard';
import RetroButton from './RetroButton';
import GlitchImage from './GlitchImage';
import RetroText from './RetroText';
import { vhsTrackingLines } from '../styles/effects/RetroEffects';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  margin: ${({ theme }) => theme.spacing.xxl} auto;
  position: relative;
  
  ${vhsTrackingLines}
`;

const StyledProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: ${({ theme }) => theme.spacing.lg};
  position: relative;
  margin-top: ${({ theme }) => theme.spacing.xl};
  width: 100%;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`;

const StyledProjectInner = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StyledFolder = styled.div`
  color: ${({ theme }) => theme.colors.teal};
  svg {
    width: 30px;
    height: 30px;
  }
`;

const StyledProjectLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  a {
    color: ${({ theme }) => theme.colors.lightSlate};
    transition: all 0.25s ease;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.teal};
      transform: translateY(-3px);
    }
  }
`;

const StyledProjectName = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.lightestSlate};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
`;

const StyledProjectDescription = styled.div`
  color: ${({ theme }) => theme.colors.lightSlate};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StyledTechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0;
  margin: ${({ theme }) => theme.spacing.md} 0 0 0;
  list-style: none;

  li {
    color: ${({ theme }) => theme.colors.slate};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    background: ${({ theme }) => theme.colors.lightNavy};
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s ease;
    
    &:hover {
      background: ${({ theme }) => theme.colors.teal}33;
      transform: translateY(-2px);
    }
  }
`;

// Project details modal
const StyledProjectModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  padding: ${({ theme }) => theme.spacing.lg};
  background: rgba(11, 11, 26, 0.9);
  backdrop-filter: blur(10px);
  ${vhsTrackingLines}
`;

const StyledModalContent = styled(motion.div)`
  position: relative;
  max-width: 800px;
  max-height: 85vh;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.lightNavy};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 20px 30px -15px rgba(0, 0, 0, 0.7);
  border: 1px solid ${({ theme }) => theme.colors.teal}44;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.navy}00 0%, ${theme.colors.navy}00 40%, ${theme.colors.teal}11 41%, ${theme.colors.teal}11 43%, ${theme.colors.navy}00 44%)`};
    pointer-events: none;
  }
  
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.teal};
    text-shadow: 0 0 10px ${({ theme }) => theme.colors.teal}88;
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: 1.6;
  }
  
  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.lightSlate};
    font-size: 24px;
    cursor: pointer;
    z-index: 10;
    
    &:hover {
      color: ${({ theme }) => theme.colors.teal};
    }
  }
  
  .project-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius};
  }
  
  .action-buttons {
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    margin-top: ${({ theme }) => theme.spacing.lg};
    
    @media (max-width: 480px) {
      flex-direction: column;
    }
  }
`;

const projects = [
  {
    title: "Spotify Profile Analyzer",
    description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track.",
    longDescription: "This project was built using the Spotify Web API and React. It allows users to explore their Spotify data in depth, visualizing trends in their listening habits. Users can see their top artists and tracks over different time periods, analyze audio features of their favorite songs, and even generate playlists based on their preferences. The app includes OAuth authentication and uses the Spotify API to fetch user data securely.",
    tech: ["React", "Styled Components", "Express", "Spotify API"],
    github: "https://github.com",
    external: "https://example.com",
    image: "https://via.placeholder.com/800x400/1c1c3c/00ffd0?text=Spotify+Profile",
  },
  {
    title: "Neon Syntax Theme",
    description: "A vibrant, retro-inspired theme for VS Code, Sublime Text, and other code editors. Features synthwave color palette with high contrast for readability.",
    longDescription: "A carefully crafted color theme designed to minimize eye strain during long coding sessions. This theme features optimized contrast ratios and a soothing color palette based on deep blues and subtle accent colors. The theme has been ported to multiple platforms including VS Code, Sublime Text, Atom, and various terminal emulators. It also includes specialized syntax highlighting for over 20 programming languages.",
    tech: ["VS Code", "Sublime Text", "Atom", "iTerm2", "Hyper"],
    github: "https://github.com",
    external: "https://example.com",
    image: "https://via.placeholder.com/800x400/1c1c3c/df42f9?text=Neon+Syntax",
  },
  {
    title: "GitHub Stats Visualizer",
    description: "Interactive visualization of GitHub profile stats with retro aesthetics. Displays repositories, languages, and contribution data in a synthwave-inspired dashboard.",
    longDescription: "This app provides an enhanced view of GitHub profiles by visualizing repository data in an intuitive interface. Users can analyze their most-used languages, see trends in their commit history, and identify their most popular repositories. The visualization is powered by Chart.js and pulls data directly from the GitHub API. The project was built with a focus on performance, using Next.js for server-side rendering and static generation where appropriate.",
    tech: ["Next.js", "Chart.js", "GitHub API", "Framer Motion"],
    github: "https://github.com",
    external: "https://example.com",
    image: "https://via.placeholder.com/800x400/1c1c3c/00ffd0?text=GitHub+Stats",
  },
  {
    title: "Retrowave Music Player",
    description: "A nostalgic music player with VHS aesthetics, tape animation, and visualizers. Plays synthwave and retrowave tracks with a fully customizable interface.",
    longDescription: "This application connects to the Spotify API to provide users with insights about their listening habits. It features interactive visualizations of audio features like danceability, energy, and acousticness across a user's library. The frontend is built with React and the data visualization is handled with D3.js. User authentication is managed through Spotify's OAuth flow, and the backend API is built with Express.",
    tech: ["React", "Web Audio API", "Canvas", "Styled Components"],
    github: "https://github.com",
    external: "https://example.com",
    image: "https://via.placeholder.com/800x400/1c1c3c/ff3e8a?text=Retrowave+Player",
  },
  {
    title: "Pixel Art Creator",
    description: "Browser-based pixel art creation tool with retro color palettes, animation support, and export options. Create 8-bit style sprites and animations.",
    longDescription: "A modern, high-contrast theme designed specifically for code editors and terminal applications. This theme features carefully selected colors that work well together and provide clear distinction between different syntax elements. Special attention was paid to accessibility, ensuring sufficient contrast for developers with visual impairments. The theme has been optimized for readability during long coding sessions.",
    tech: ["JavaScript", "Canvas API", "IndexedDB", "PWA"],
    github: "https://github.com",
    image: "https://via.placeholder.com/800x400/1c1c3c/00ffd0?text=Pixel+Art+Creator",
  },
  {
    title: "CRT Terminal Emulator",
    description: "A terminal emulator with authentic CRT monitor effects, scan lines, and phosphor glow. Customizable themes and animations for the nostalgic developer.",
    longDescription: "This tool enhances the GitHub profile viewing experience by providing interactive data visualizations that reveal insights about a user's coding habits and project popularity. It fetches data from the GitHub API and generates charts showing language usage, star counts, and fork statistics. Users can filter repositories by various criteria and compare metrics across different time periods.",
    tech: ["Electron", "React", "Node.js", "WebGL"],
    external: "https://example.com",
    image: "https://via.placeholder.com/800x400/1c1c3c/df42f9?text=CRT+Terminal",
  },
];

const Projects = () => {
  const { ref, controls } = useScrollReveal();
  const [selectedProject, setSelectedProject] = useState(null);
  // Get the theme object using the useTheme hook
  const theme = useTheme();

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <StyledProjectsSection id="projects">
      <motion.h2 
        className="section-heading"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        <RetroText
          text="Some Things I've Built"
          typingSpeed={50}
          startDelay={300}
          fontSize={theme.fontSizes.h3}
          showCursor={false}
        />
      </motion.h2>

      <StyledProjectsGrid>
        {projects.map((project, i) => {
          const { title, description, tech, github, external } = project;
          
          return (
            <RetroCard
              key={i}
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={{
                ...variants,
                visible: {
                  ...variants.visible,
                  transition: { delay: 0.1 * i, ...variants.visible.transition },
                },
              }}
              onClick={() => openModal(project)}
              title={title}
              headerContent={
                <StyledProjectLinks onClick={(e) => e.stopPropagation()}>
                  {github && (
                    <a href={github} aria-label="GitHub Link" target="_blank" rel="noopener noreferrer">
                      <FiGithub />
                    </a>
                  )}
                  {external && (
                    <a href={external} aria-label="External Link" target="_blank" rel="noopener noreferrer">
                      <FiExternalLink />
                    </a>
                  )}
                </StyledProjectLinks>
              }
            >
              <StyledProjectInner>
                <StyledProjectDescription>{description}</StyledProjectDescription>
                
                <StyledTechList>
                  {tech.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </StyledTechList>
              </StyledProjectInner>
            </RetroCard>
          );
        })}
      </StyledProjectsGrid>
      
      <AnimatePresence>
        {selectedProject && (
          <StyledProjectModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <StyledModalContent
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-button" onClick={closeModal}>×</button>
              
              <GlitchImage 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                height="200px"
                className="project-image"
              />
              
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.longDescription}</p>
              
              <div style={{ marginTop: '30px' }}>
                <h3>Technologies</h3>
                <StyledTechList>
                  {selectedProject.tech.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </StyledTechList>
              </div>
              
              <div className="action-buttons">
                {selectedProject.github && (
                  <RetroButton 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    variant="pixel"
                    size="small"
                  >
                    <FiGithub style={{ marginRight: '8px' }} /> View Code
                  </RetroButton>
                )}
                {selectedProject.external && (
                  <RetroButton 
                    href={selectedProject.external} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    variant="neon"
                    size="small"
                    color="purple"
                  >
                    <FiExternalLink style={{ marginRight: '8px' }} /> View Live
                  </RetroButton>
                )}
              </div>
            </StyledModalContent>
          </StyledProjectModal>
        )}
      </AnimatePresence>
    </StyledProjectsSection>
  );
};

export default Projects;
