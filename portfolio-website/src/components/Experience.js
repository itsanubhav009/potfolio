import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useScrollReveal, variants } from '../utils/scrollReveal';

// ============== Animations ==============
const twinkle = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const orbit = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const scan = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(100, 255, 218, 0.3), 0 0 10px rgba(100, 255, 218, 0.2); }
  50% { box-shadow: 0 0 10px rgba(100, 255, 218, 0.5), 0 0 15px rgba(100, 255, 218, 0.3); }
`;

const hologramFlicker = keyframes`
  0%, 100% { opacity: 1; }
  5% { opacity: 0.8; }
  10% { opacity: 0.9; }
  15% { opacity: 0.7; }
  20% { opacity: 1; }
  50% { opacity: 0.9; }
  70% { opacity: 0.8; }
  72% { opacity: 1; }
`;

const rotate3D = keyframes`
  0% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg); }
  50% { transform: perspective(1000px) rotateX(2deg) rotateY(2deg); }
  100% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// ============== Styled Components ==============
const StyledExperienceSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 0;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
  /* Space background that merges with existing background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at top, rgba(16, 27, 75, 0.5) 0%, rgba(10, 25, 47, 0) 60%);
    z-index: -1;
  }
`;

const StyledSectionTitle = styled(motion.h2)`
  color: #e6f1ff;
  font-size: 32px;
  font-family: 'VT323', 'Courier New', monospace;
  margin-bottom: 60px;
  text-align: center;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 3px;
  
  /* Retro underline */
  &::after {
    content: '';
    display: block;
    width: 150px;
    height: 3px;
    background: #64ffda;
    margin: 10px auto 0;
    box-shadow: 0 0 8px #64ffda;
  }
  
  /* Retro terminal prefix */
  &::before {
    content: '> ';
    color: #64ffda;
  }
`;

const StarsBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
`;

const Star = styled.div`
  position: absolute;
  background-color: #fff;
  width: ${props => props.size || 2}px;
  height: ${props => props.size || 2}px;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  opacity: ${props => props.opacity || 0.5};
  border-radius: 50%;
  animation: ${twinkle} ${props => props.duration || 3}s ease-in-out infinite;
  animation-delay: ${props => props.delay || 0}s;
`;

const StyledTimelineContainer = styled(motion.div)`
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
  padding: 20px;
`;

const StyledTimeline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  /* Vertical line */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: linear-gradient(to bottom, 
      rgba(100, 255, 218, 0) 0%, 
      rgba(100, 255, 218, 0.5) 10%, 
      rgba(100, 255, 218, 0.5) 90%, 
      rgba(100, 255, 218, 0) 100%);
    transform: translateX(-50%);
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
    
    @media (max-width: 768px) {
      left: 30px;
    }
  }
  
  /* Scanline effect on timeline */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: calc(50% - 30px);
    width: 60px;
    height: 10px;
    background: linear-gradient(to bottom, 
      rgba(100, 255, 218, 0.1) 0%, 
      rgba(100, 255, 218, 0.3) 50%, 
      rgba(100, 255, 218, 0.1) 100%);
    animation: ${scan} 10s linear infinite;
    z-index: 1;
    
    @media (max-width: 768px) {
      left: 0;
      width: 60px;
    }
  }
`;

const SectionHeading = styled.h3`
  color: ${props => props.color || '#f7df1e'};
  font-size: 28px;
  font-family: 'VT323', 'Courier New', monospace;
  text-align: center;
  margin: 40px 0 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  display: inline-block;
  z-index: 3;
  text-shadow: 0 0 10px rgba(${props => 
    props.color === '#f7df1e' ? '247, 223, 30' : 
    props.color === '#9d00ff' ? '157, 0, 255' : 
    '100, 255, 218'}, 0.5);
  animation: ${pulse} 4s infinite ease-in-out;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${props => props.color || '#f7df1e'};
    box-shadow: 0 0 10px rgba(${props => 
      props.color === '#f7df1e' ? '247, 223, 30' : 
      props.color === '#9d00ff' ? '157, 0, 255' : 
      '100, 255, 218'}, 0.7);
  }
`;

const StyledTimelineNode = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin: 60px 0;
  
  &:first-child {
    margin-top: 40px;
  }
  
  &:last-child {
    margin-bottom: 40px;
  }
  
  &:nth-child(odd) {
    justify-content: flex-start;
    
    @media (min-width: 769px) {
      .timeline-content {
        margin-left: 60px;
        text-align: left;
        align-items: flex-start;
        transform-origin: left center;
      }
      
      .timeline-date {
        left: auto;
        right: calc(50% + 40px);
        text-align: right;
        transform: translateX(0);
      }
      
      .username-signature {
        align-self: flex-end;
      }
    }
  }
  
  &:nth-child(even) {
    justify-content: flex-end;
    
    @media (min-width: 769px) {
      .timeline-content {
        margin-right: 60px;
        text-align: right;
        align-items: flex-end;
        transform-origin: right center;
      }
      
      .timeline-date {
        right: auto;
        left: calc(50% + 40px);
        text-align: left;
        transform: translateX(0);
      }
      
      .username-signature {
        align-self: flex-start;
      }
    }
  }
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    margin: 60px 0;
    
    .timeline-content {
      margin-left: 60px;
      text-align: left;
      align-items: flex-start;
    }
    
    .timeline-date {
      top: -40px;
      left: 60px;
      text-align: left;
      width: auto;
      transform: translateX(0);
    }
    
    .username-signature {
      align-self: flex-end;
    }
  }
`;

const StyledPlanetNode = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  background: ${props => props.nodeColor || '#64ffda'};
  border-radius: 50%;
  z-index: 2;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${glow} 3s infinite;
  
  /* Planet ring */
  &::before {
    content: '';
    position: absolute;
    width: 44px;
    height: 44px;
    border: 2px solid ${props => props.nodeColor || '#64ffda'};
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  
  /* Orbiting moon */
  &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: #ccd6f6;
    border-radius: 50%;
    animation: ${orbit} ${props => 10 + props.index * 3}s linear infinite;
    transform-origin: 22px;
    opacity: 1;
    transition: all 0.3s ease;
  }
  
  &:hover {
    transform: translateX(-50%) scale(1.1);
  }
  
  @media (max-width: 768px) {
    left: 30px;
  }
`;

const StyledTimelineDate = styled.div`
  position: absolute;
  top: 0;
  font-family: 'VT323', 'Courier New', monospace;
  color: ${props => props.dateColor || '#64ffda'};
  font-size: 16px;
  white-space: nowrap;
  background: rgba(10, 25, 47, 0.8);
  padding: 5px 15px;
  border-radius: 4px;
  border: 1px solid ${props => props.dateColor || 'rgba(100, 255, 218, 0.3)'};
  z-index: 5;
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.2);
  
  /* Terminal cursor */
  &::after {
    content: '';
    display: inline-block;
    width: 8px;
    height: 15px;
    background: ${props => props.dateColor || '#64ffda'};
    margin-left: 5px;
    animation: ${blink} 1s step-end infinite;
    vertical-align: middle;
  }
`;

const StyledTimelineContent = styled(motion.div)`
  width: calc(50% - 60px);
  background: rgba(17, 34, 64, 0.85);
  backdrop-filter: blur(4px);
  border: 1px solid ${props => props.borderColor || '#64ffda'};
  border-radius: 8px;
  padding: 25px;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  margin-top: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3), 0 0 5px rgba(100, 255, 218, 0.2);
  animation: ${rotate3D} 10s infinite ease-in-out;
  
  /* Scanlines */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.03) 0px,
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px,
      transparent 4px
    );
    background-size: 100% 4px;
    pointer-events: none;
    opacity: 0.1;
    z-index: 1;
  }
  
  /* Terminal window header */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(to right, 
      ${props => props.borderColor || '#64ffda'}, 
      ${props => props.borderColorAlt || '#9d00ff'}
    );
    border-radius: 8px 8px 0 0;
  }
  
  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4), 0 0 10px rgba(100, 255, 218, 0.3);
    transform: perspective(1000px) rotateX(2deg) rotateY(2deg) scale(1.02);
  }
  
  @media (max-width: 768px) {
    width: calc(100% - 80px);
    margin-top: 40px;
  }
`;

const StyledTitle = styled.h3`
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 24px;
  color: ${props => props.color || '#e6f1ff'};
  margin: 0 0 10px 0;
  z-index: 2;
  letter-spacing: 1px;
  text-shadow: 0 0 5px rgba(100, 255, 218, 0.3);
  animation: ${hologramFlicker} 5s infinite;
  
  /* Terminal prefix */
  &::before {
    content: '> ';
    color: ${props => props.accentColor || '#64ffda'};
    font-size: 20px;
  }
`;

const StyledSubtitle = styled.div`
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 18px;
  color: ${props => props.color || '#ccd6f6'};
  margin: 5px 0 15px;
  z-index: 2;
  display: flex;
  align-items: center;
  
  a {
    color: ${props => props.linkColor || '#64ffda'};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  /* Institution/company icon */
  &::before {
    content: '${props => props.icon || '🏢'}';
    margin-right: 10px;
  }
`;

const StyledDutyList = styled.ul`
  padding: 0;
  margin: 15px 0 0;
  list-style: none;
  z-index: 2;

  li {
    position: relative;
    padding-left: 25px;
    margin-bottom: 10px;
    font-family: 'VT323', 'Courier New', monospace;
    font-size: 16px;
    color: #a8b2d1;
    line-height: 1.5;

    &:before {
      content: '▹';
      position: absolute;
      left: 0;
      color: ${props => props.bulletColor || '#64ffda'};
    }
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
  z-index: 2;
`;

const Tag = styled.span`
  background: rgba(100, 255, 218, 0.1);
  color: ${props => props.color || '#64ffda'};
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-family: 'VT323', 'Courier New', monospace;
  border: 1px solid ${props => props.borderColor || 'rgba(100, 255, 218, 0.3)'};
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(100, 255, 218, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

const UserSignature = styled.div`
  font-size: 12px;
  color: #64ffda;
  margin-top: 20px;
  font-family: 'VT323', monospace;
  opacity: 0.8;
  border-top: 1px dashed rgba(100, 255, 218, 0.3);
  padding-top: 10px;
`;

const SectionIndicator = styled.div`
  position: absolute;
  left: 50%;
  top: ${props => props.top || '0px'};
  transform: translateX(-50%);
  background: #0a192f;
  border: 1px solid ${props => props.color || '#64ffda'};
  color: ${props => props.color || '#64ffda'};
  padding: 5px 15px;
  border-radius: 20px;
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 14px;
  z-index: 10;
  box-shadow: 0 0 10px rgba(${props => 
    props.color === '#f7df1e' ? '247, 223, 30' : 
    props.color === '#9d00ff' ? '157, 0, 255' : 
    '100, 255, 218'}, 0.3);
  
  @media (max-width: 768px) {
    left: 30px;
    transform: translateX(-50%);
  }
`;

// ============== Component ==============
const Experience = () => {
  const { ref, controls } = useScrollReveal();
  const [stars, setStars] = useState([]);
  const containerRef = useRef(null);
  
  // Current date/time and username - exact values provided
  const currentDateTime = "2025-07-08 08:08:36";
  const username = "itsanubhav009";
  
  // Generate random stars for the background
  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 100; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 5 + 2,
        delay: Math.random() * 5
      });
    }
    setStars(newStars);
  }, []);

  // Internship experience data
  const internships = [
    {
      title: "Web Developer Intern",
      company: "Apex Planet",
      range: "May 2025 - June 2025",
      points: [
        "Developed and maintained responsive web applications using modern frontend frameworks.",
        "Collaborated with UI/UX designers to implement pixel-perfect interfaces and interactive elements.",
        "Optimized application performance through code refactoring and best practices implementation."
      ],
      icon: "🌐",
      color: "#9d00ff",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"]
    },
    {
      title: "Tech Intern",
      company: "Zenqor (Stealth)",
      range: "Feb 2025 - May 2025",
      points: [
        "Refactored 10+ API endpoints and optimized queries, improving response times under load.",
        "Authored technical documentation for 5 core product features to enhance team onboarding."
      ],
      icon: "💻",
      color: "#64ffda",
      technologies: ["Node.js", "Express", "MongoDB", "Docker"]
    },
    {
      title: "Cybersecurity Intern",
      company: "CDAC",
      range: "July 2024 - Aug 2024",
      points: [
        "Developed 7 Python scripts to automate security audits, saving 5+ hours of manual work weekly.",
        "Implemented 15+ data validation rules to harden defenses against common vulnerabilities."
      ],
      icon: "🔒",
      color: "#f76dc4",
      technologies: ["Python", "Linux", "Network Security", "Penetration Testing"]
    }
  ];

  // Freelance project data
  const freelanceProject = {
    title: "Modern Business Website",
    client: "Barter anD More",
    range: "Feb 2025 - April 2025",
    points: [
      "Designed and developed a responsive corporate website with interactive features and custom animations.",
      "Implemented a content management system allowing client to update site content without technical knowledge.",
      "Integrated analytics dashboard to track user engagement and conversion metrics.",
      "Optimized site performance achieving 98/100 PageSpeed score on mobile and desktop."
    ],
    icon: "🚀",
    color: "#f7df1e",
    technologies: ["React", "Next.js", "Framer Motion", "Sanity CMS", "Vercel", "Google Analytics"]
  };

  return (
    <StyledExperienceSection id="experience">
      <StarsBackground>
        {stars.map(star => (
          <Star 
            key={star.id}
            x={star.x}
            y={star.y}
            size={star.size}
            opacity={star.opacity}
            duration={star.duration}
            delay={star.delay}
          />
        ))}
      </StarsBackground>
      
      <StyledSectionTitle
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        Professional Experience
      </StyledSectionTitle>

      <StyledTimelineContainer
        ref={containerRef}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        <StyledTimeline>
          {/* Internships Section */}
          <SectionHeading color="#9d00ff">Internships</SectionHeading>
          
          {internships.map((item, i) => (
            <StyledTimelineNode key={`intern-${i}`}>
              <StyledPlanetNode 
                index={i}
                nodeColor={item.color}
                aria-label={`${item.title} at ${item.company}`}
              />
              
              <StyledTimelineDate 
                className="timeline-date"
                dateColor={item.color}
              >
                {item.range}
              </StyledTimelineDate>
              
              <StyledTimelineContent 
                className="timeline-content"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                borderColor={item.color}
                borderColorAlt={i % 2 === 0 ? "#64ffda" : "#f76dc4"}
              >
                <StyledTitle 
                  color="#e6f1ff"
                  accentColor={item.color}
                >
                  {item.title}
                </StyledTitle>
                
                <StyledSubtitle 
                  color="#ccd6f6"
                  linkColor={item.color}
                  icon={item.icon}
                >
                  {item.company}
                </StyledSubtitle>
                
                <StyledDutyList bulletColor={item.color}>
                  {item.points.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </StyledDutyList>
                
                <TagContainer>
                  {item.technologies.map((tech, k) => (
                    <Tag 
                      key={k} 
                      color={item.color}
                      borderColor={`rgba(${
                        item.color === "#64ffda" ? "100, 255, 218" : 
                        item.color === "#9d00ff" ? "157, 0, 255" : 
                        "247, 109, 196"
                      }, 0.3)`}
                    >
                      {tech}
                    </Tag>
                  ))}
                </TagContainer>
                
                <UserSignature className="username-signature">
                  {username}@career-log ~ {currentDateTime}
                </UserSignature>
              </StyledTimelineContent>
            </StyledTimelineNode>
          ))}
          
          {/* Freelance Project Section with Dedicated Heading */}
          <SectionHeading color="#f7df1e">Freelance Project</SectionHeading>
          
          <StyledTimelineNode key="freelance-project">
            <StyledPlanetNode 
              index={internships.length}
              nodeColor={freelanceProject.color}
              aria-label={`${freelanceProject.title} for ${freelanceProject.client}`}
            />
            
            <StyledTimelineDate 
              className="timeline-date"
              dateColor={freelanceProject.color}
            >
              {freelanceProject.range}
            </StyledTimelineDate>
            
            <StyledTimelineContent 
              className="timeline-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: internships.length * 0.2 }}
              borderColor={freelanceProject.color}
              borderColorAlt="#9d00ff"
              style={{ width: "calc(70% - 60px)" }}
            >
              <StyledTitle 
                color="#e6f1ff"
                accentColor={freelanceProject.color}
              >
                {freelanceProject.title}
              </StyledTitle>
              
              <StyledSubtitle 
                color="#ccd6f6"
                linkColor={freelanceProject.color}
                icon={freelanceProject.icon}
              >
                {freelanceProject.client}
              </StyledSubtitle>
              
              <StyledDutyList bulletColor={freelanceProject.color}>
                {freelanceProject.points.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </StyledDutyList>
              
              <TagContainer>
                {freelanceProject.technologies.map((tech, k) => (
                  <Tag 
                    key={k} 
                    color={freelanceProject.color}
                    borderColor="rgba(247, 223, 30, 0.3)"
                  >
                    {tech}
                  </Tag>
                ))}
              </TagContainer>
              
              <UserSignature className="username-signature">
                {username}@career-log ~ {currentDateTime}
              </UserSignature>
            </StyledTimelineContent>
          </StyledTimelineNode>
        </StyledTimeline>
      </StyledTimelineContainer>
    </StyledExperienceSection>
  );
};

export default Experience;