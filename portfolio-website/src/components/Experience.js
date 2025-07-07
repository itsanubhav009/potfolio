import React, { useEffect, useState } from 'react';
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
  
  /* Retro underline */
  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 2px;
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

const StyledTimelineNode = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin: 100px 0; /* Increased spacing between nodes */
  
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
    margin: 80px 0; /* Adjusted spacing for mobile */
    
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
  background: #64ffda;
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
    border: 2px solid #64ffda;
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

// Fixed position for date to prevent cut-off
const StyledTimelineDate = styled.div`
  position: absolute;
  top: 0;
  font-family: 'VT323', 'Courier New', monospace;
  color: #64ffda;
  font-size: 14px;
  white-space: nowrap;
  background: rgba(10, 25, 47, 0.7);
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid rgba(100, 255, 218, 0.3);
  z-index: 5; /* Ensure it's above other elements */
  
  /* Terminal cursor */
  &::after {
    content: '';
    display: inline-block;
    width: 8px;
    height: 15px;
    background: #64ffda;
    margin-left: 5px;
    animation: ${blink} 1s step-end infinite;
    vertical-align: middle;
  }
`;

const StyledTimelineContent = styled(motion.div)`
  width: calc(50% - 60px); /* Increased margin to accommodate dates */
  background: rgba(17, 34, 64, 0.7);
  backdrop-filter: blur(4px);
  border: 1px solid #64ffda;
  border-radius: 8px;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  margin-top: 20px; /* Added space at top for date */
  
  /* Terminal style */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  
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
  
  @media (max-width: 768px) {
    width: calc(100% - 80px); /* Increased width for better readability */
    margin-top: 40px; /* Additional space for date on mobile */
  }
`;

const StyledCompanyTitle = styled.h3`
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 22px;
  color: #e6f1ff;
  margin: 0 0 10px 0;
  z-index: 2;
  
  .title {
    color: #ccd6f6;
  }
  
  .company {
    color: #64ffda;
    
    a {
      color: inherit;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
  /* Terminal prefix */
  &::before {
    content: '> ';
    color: #64ffda;
    font-size: 18px;
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
      color: #64ffda;
    }
  }
`;

const UserSignature = styled.div`
  font-size: 12px;
  color: #64ffda;
  margin-top: 20px;
  font-family: 'VT323', monospace;
  opacity: 0.8;
`;

// ============== Component ==============
const Experience = () => {
  const { ref, controls } = useScrollReveal();
  const [stars, setStars] = useState([]);
  
  // Current date/time and username exactly as provided
  const currentDateTime = "2025-07-07 05:44:05";
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

  const jobs = [
    {
      company: 'Company One',
      title: 'Software Engineer',
      url: 'https://www.example.com',
      range: 'January 2022 - Present',
      duties: [
        'Developed and maintained code for in-house and client websites primarily using HTML, CSS, JavaScript, React, and Node.js',
        'Manually tested sites in various browsers and mobile devices to ensure cross-browser compatibility and responsiveness',
        'Clients included Fortune 500 companies, small startups, and non-profits',
        'Interfaced with clients on a weekly basis, providing technological expertise'
      ]
    },
    {
      company: 'Company Two',
      title: 'Frontend Developer',
      url: 'https://www.example.com',
      range: 'July 2020 - December 2021',
      duties: [
        'Developed and shipped highly interactive web applications for Apple Music using Ember.js',
        'Built and shipped the Apple Music Extension within Facebook Messenger leveraging third-party and internal APIs',
        "Architected and implemented the front-end of Apple Music's embeddable web player widget, which lets users log in and listen to full songs in the browser",
        'Contributed extensively to MusicKit.js, a JavaScript framework that allows developers to add an Apple Music player to their web apps'
      ]
    },
    {
      company: 'Company Three',
      title: 'Junior Developer',
      url: 'https://www.example.com',
      range: 'March 2019 - June 2020',
      duties: [
        'Worked with a team of three designers to build a marketing website and e-commerce platform for a retail client',
        'Helped solidify a brand direction for blistabloc that spans both packaging and web',
        'Interfaced with clients on a weekly basis, providing technological expertise'
      ]
    }
  ];

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
        Mission Log: Career Journey
      </StyledSectionTitle>

      <StyledTimelineContainer
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        <StyledTimeline>
          {jobs.map((job, i) => (
            <StyledTimelineNode key={i}>
              <StyledPlanetNode 
                index={i}
                aria-label={`${job.company} - ${job.title}`}
              />
              
              <StyledTimelineDate className="timeline-date">
                {job.range}
              </StyledTimelineDate>
              
              <StyledTimelineContent 
                className="timeline-content"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <StyledCompanyTitle>
                  <span className="title">{job.title}</span>
                  <span className="company">
                    &nbsp;@&nbsp;
                    <a 
                      href={job.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {job.company}
                    </a>
                  </span>
                </StyledCompanyTitle>
                
                <StyledDutyList>
                  {job.duties.map((duty, j) => (
                    <li key={j}>{duty}</li>
                  ))}
                </StyledDutyList>
                
                <UserSignature className="username-signature">
                  {username}@career-log ~ {currentDateTime}
                </UserSignature>
              </StyledTimelineContent>
            </StyledTimelineNode>
          ))}
        </StyledTimeline>
      </StyledTimelineContainer>
    </StyledExperienceSection>
  );
};

export default Experience;