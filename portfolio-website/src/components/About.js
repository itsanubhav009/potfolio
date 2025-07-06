import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { useScrollReveal, variants } from '../utils/scrollReveal';
import { RetroTerminal, RetroBadge } from './RetroUI';
import GlitchImage from './GlitchImage';

// Animation keyframes
const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
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

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(100, 255, 218, 0.5); }
  50% { box-shadow: 0 0 20px rgba(100, 255, 218, 0.8); }
`;

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const cursor = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: ${props => props.theme.colors.teal}; }
`;

const matrixRain = keyframes`
  0% { top: -50%; }
  100% { top: 110%; }
`;

const gaugeProgress = keyframes`
  from { width: 0%; }
  to { width: var(--progress); }
`;

const StyledAboutSection = styled.section`
  max-width: 1000px;
  position: relative;
  overflow: hidden;
  
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
`;

const StyledText = styled.div`
  position: relative;
  
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
  transition: filter 0.3s ease;
  
  &:hover {
    filter: drop-shadow(0 0 20px rgba(100, 255, 218, 0.5));
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
  }
`;

const StyledFlexContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 50px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const SkillsContainer = styled.div`
  margin-top: 30px;
  border-top: 1px dashed ${props => props.theme.colors.lightSlate};
  padding-top: 20px;
  
  .skills-title {
    font-family: ${props => props.theme.fonts.mono};
    color: ${props => props.theme.colors.teal};
    margin-bottom: 10px;
    display: inline-block;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: ${props => props.theme.colors.teal};
      animation: ${css`${pulseGlow} 2s infinite`};
    }
  }
  
  .skills-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 15px;
  }
`;

const TerminalOutput = styled.div`
  .command {
    color: ${props => props.theme.colors.teal};
    margin-bottom: 5px;
    position: relative;
    
    &::before {
      content: "$ ";
      color: ${props => props.theme.colors.purple};
    }
  }
  
  .response {
    color: ${props => props.theme.colors.lightSlate};
    margin-bottom: 15px;
    line-height: 1.4;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    opacity: 0;
    width: 0;
    border-right: 2px solid transparent;
    
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

const RetroDashboard = styled.div`
  border: 2px solid ${props => props.theme.colors.teal};
  border-radius: 5px;
  padding: 15px;
  background-color: rgba(10, 25, 47, 0.5);
  box-shadow: 0 0 15px rgba(100, 255, 218, 0.2);
  animation: ${css`${flicker} 5s infinite`};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      to right,
      rgba(100, 255, 218, 0),
      rgba(100, 255, 218, 0.8),
      rgba(100, 255, 218, 0)
    );
    animation: ${css`${scanline} 5s linear infinite`};
    z-index: 1;
  }
  
  .dashboard-title {
    text-align: center;
    font-family: ${props => props.theme.fonts.mono};
    color: ${props => props.theme.colors.teal};
    border-bottom: 1px solid ${props => props.theme.colors.lightSlate};
    padding-bottom: 8px;
    margin-bottom: 15px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
  }
  
  .matrix-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
    opacity: 0.07;
  }
  
  .matrix-column {
    position: absolute;
    width: 20px;
    font-family: ${props => props.theme.fonts.mono};
    font-size: 12px;
    color: ${props => props.theme.colors.teal};
    text-align: center;
    animation: ${css`${matrixRain} 20s linear infinite`};
  }
`;

const StatusSection = styled.div`
  margin-bottom: 20px;
  
  .status-title {
    font-family: ${props => props.theme.fonts.mono};
    color: ${props => props.theme.colors.lightestSlate};
    margin-bottom: 10px;
    font-size: 14px;
    border-left: 3px solid ${props => props.theme.colors.teal};
    padding-left: 8px;
  }
  
  .status-content {
    padding: 0 5px;
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  
  .status-label {
    flex: 1;
    color: ${props => props.theme.colors.slate};
    font-family: ${props => props.theme.fonts.mono};
    font-size: 12px;
  }
  
  .status-value {
    color: ${props => props.theme.colors.teal};
    font-family: ${props => props.theme.fonts.mono};
    font-size: 12px;
    
    &.available {
      color: #50fa7b;
      animation: ${css`${blink} 2s infinite`};
    }
    
    &.busy {
      color: #ff5555;
    }
    
    &.away {
      color: #f1fa8c;
    }
  }
`;

const GaugeBar = styled.div`
  height: 10px;
  background-color: ${props => props.theme.colors.navy};
  border: 1px solid ${props => props.theme.colors.teal};
  border-radius: 5px;
  margin-bottom: 12px;
  overflow: hidden;
  position: relative;
  
  .gauge-progress {
    height: 100%;
    background: linear-gradient(
      to right,
      ${props => props.theme.colors.teal},
      #00fff2
    );
    width: 0;
    animation: ${css`${gaugeProgress} 2s ease-out forwards`};
    box-shadow: 0 0 5px rgba(100, 255, 218, 0.7);
  }
  
  .gauge-label {
    position: absolute;
    top: 0;
    right: 5px;
    font-size: 8px;
    color: ${props => props.theme.colors.navy};
    line-height: 10px;
    font-family: ${props => props.theme.fonts.mono};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 15px;
`;

const StatBox = styled.div`
  background-color: rgba(10, 25, 47, 0.5);
  border: 1px solid ${props => props.theme.colors.teal};
  border-radius: 4px;
  padding: 8px;
  text-align: center;
  
  .stat-value {
    font-family: ${props => props.theme.fonts.mono};
    color: ${props => props.theme.colors.teal};
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 2px;
  }
  
  .stat-label {
    font-family: ${props => props.theme.fonts.mono};
    color: ${props => props.theme.colors.slate};
    font-size: 10px;
    text-transform: uppercase;
  }
`;

const AvailabilityIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  
  .availability-ring {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid ${props => props.theme.colors.teal};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    position: relative;
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
    animation: ${css`${pulseGlow} 3s infinite`};
    
    &::before {
      content: '';
      position: absolute;
      width: 15px;
      height: 15px;
      background-color: #50fa7b;
      border-radius: 50%;
      animation: ${css`${blink} 2s infinite`};
    }
  }
  
  .availability-label {
    font-family: ${props => props.theme.fonts.mono};
    color: ${props => props.theme.colors.teal};
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .availability-sublabel {
    font-family: ${props => props.theme.fonts.mono};
    color: ${props => props.theme.colors.slate};
    font-size: 12px;
    margin-top: 5px;
  }
`;

const NextAvailabilityDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  background-color: rgba(10, 25, 47, 0.5);
  border: 1px solid ${props => props.theme.colors.teal};
  border-radius: 4px;
  padding: 8px 15px;
  
  .next-label {
    font-family: ${props => props.theme.fonts.mono};
    color: ${props => props.theme.colors.slate};
    font-size: 12px;
    margin-right: 8px;
  }
  
  .next-date {
    font-family: ${props => props.theme.fonts.mono};
    color: ${props => props.theme.colors.teal};
    font-size: 12px;
    font-weight: bold;
  }
`;

const MatrixBackground = ({ columns = 10 }) => {
  return (
    <div className="matrix-background">
      {[...Array(columns)].map((_, i) => (
        <div 
          key={i} 
          className="matrix-column" 
          style={{ 
            left: `${(i * 100) / columns}%`,
            animationDuration: `${15 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          {[...Array(20)].map((_, j) => (
            <div key={j}>
              {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const skills = [
  { name: 'JavaScript (ES6+)', color: 'teal' },
  { name: 'TypeScript', color: 'teal' },
  { name: 'React', color: 'teal' },
  { name: 'Node.js', color: 'purple' },
  { name: 'Next.js', color: 'purple' },
  { name: 'Python', color: 'purple' },
  { name: 'Django', color: 'pink' },
  { name: 'GraphQL', color: 'pink' },
  { name: 'Redux', color: 'teal' },
  { name: 'Git & CI/CD', color: 'purple' }
];

const gauges = [
  { label: 'Frontend', progress: 90 },
  { label: 'Backend', progress: 85 },
  { label: 'Design', progress: 75 },
  { label: 'DevOps', progress: 80 }
];

const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '50+', label: 'Projects' },
  { value: '99%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Dedication' }
];

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

const About = () => {
  const { ref, controls, inView } = useScrollReveal();
  const responseRefs = useRef([]);
  const matrixRef = useRef(null);
  
  // Updated exact date/time and username
  const [currentDate] = useState("2025-06-23 16:12:19");
  const [username] = useState("itsanubhav009");

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
                <div className="command">cat about.txt</div>
                <div 
                  className="response"
                  ref={el => (responseRefs.current[0] = el)}
                >
                  Hello! My name is Anubhav and I enjoy creating things that live on the internet. 
                  My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!
                </div>
                
                <div className="command">cat experience.txt</div>
                <div 
                  className="response"
                  ref={el => (responseRefs.current[1] = el)}
                >
                  Fast-forward to today, and I've had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences.
                </div>
                
                <div className="command">cat projects.txt</div>
                <div 
                  className="response"
                  ref={el => (responseRefs.current[2] = el)}
                >
                  I also recently launched a course that covers everything you need to build a web app with the Spotify API using Node & React.
                </div>
                
                <div className="command">cat contact.txt</div>
                <div 
                  className="response"
                  ref={el => (responseRefs.current[3] = el)}
                >
                  I'm always interested in new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </div>
              </TerminalOutput>
            </RetroTerminal>

            <SkillsContainer>
              <div className="skills-title">TECH STACK //</div>
              <div className="skills-badges">
                {skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: 0.1 * i,
                          duration: 0.5
                        }
                      }
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RetroBadge color={skill.color}>
                      {skill.name}
                    </RetroBadge>
                  </motion.div>
                ))}
              </div>
            </SkillsContainer>
          </motion.div>
        </StyledText>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <StyledPic>
            <GlitchImage
              src="https://via.placeholder.com/300"
              alt="Headshot"
              width="300px"
              height="300px"
            />
          </StyledPic>
          
          <RetroDashboard ref={matrixRef}>
            <MatrixBackground columns={8} />
            
            <div className="dashboard-title">SYSTEM STATUS</div>
            
            <StatusSection>
              <div className="status-title">PERFORMANCE METRICS</div>
              <div className="status-content">
                {gauges.map((gauge, i) => (
                  <GaugeBar key={i}>
                    <div 
                      className="gauge-progress" 
                      style={{ '--progress': `${gauge.progress}%` }}
                    ></div>
                    <div className="gauge-label">{gauge.progress}%</div>
                    <StatusIndicator>
                      <div className="status-label">{gauge.label}</div>
                      <div className="status-value">{gauge.progress}%</div>
                    </StatusIndicator>
                  </GaugeBar>
                ))}
              </div>
            </StatusSection>
            
            <StatusSection>
              <div className="status-title">DEVELOPER STATS</div>
              <StatsGrid>
                {stats.map((stat, i) => (
                  <StatBox key={i}>
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </StatBox>
                ))}
              </StatsGrid>
            </StatusSection>
            
            <StatusSection>
              <div className="status-title">SYSTEM INFO</div>
              <div className="status-content">
                <StatusIndicator>
                  <div className="status-label">SESSION</div>
                  <div className="status-value">{username}</div>
                </StatusIndicator>
                <StatusIndicator>
                  <div className="status-label">TIMESTAMP</div>
                  <div className="status-value">{currentDate}</div>
                </StatusIndicator>
                <StatusIndicator>
                  <div className="status-label">STATUS</div>
                  <div className="status-value available">ONLINE</div>
                </StatusIndicator>
                <StatusIndicator>
                  <div className="status-label">UPTIME</div>
                  <div className="status-value">973 DAYS</div>
                </StatusIndicator>
              </div>
            </StatusSection>
            
            <AvailabilityIndicator>
              <div className="availability-ring"></div>
              <div className="availability-label">AVAILABLE FOR HIRE</div>
              <div className="availability-sublabel">Response time: &lt;24 hours</div>
            </AvailabilityIndicator>
            
            <NextAvailabilityDisplay>
              <div className="next-label">NEXT OPENING:</div>
              <div className="next-date">JULY 2025</div>
            </NextAvailabilityDisplay>
          </RetroDashboard>
        </motion.div>
      </StyledFlexContainer>
    </StyledAboutSection>
  );
};

export default About;