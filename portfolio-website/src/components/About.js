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
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-10px); }
  50% { transform: translateY(0); }
  75% { transform: translateY(10px); }
`;

const holographicShine = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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
  animation: ${float} 6s ease-in-out infinite;
  
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
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;
  filter: drop-shadow(0 0 10px rgba(100, 255, 218, 0.3));
  transition: all 0.3s ease;
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
    color: ${props => props.theme.colors.lightestSlate};
    margin-bottom: 15px;
    line-height: 1.6;
    position: relative;
    font-family: ${props => props.theme.fonts.mono};
    opacity: 1;
    white-space: normal;
    width: 100%;
    
    strong {
      color: ${props => props.theme.colors.teal};
      font-weight: 600;
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

const SkillsOrbit = styled.div`
  margin-top: 30px;
  height: 300px;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
  
  .skills-heading {
    color: ${props => props.theme.colors.lightestSlate};
    font-size: 24px;
    margin-bottom: 20px;
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
    width: 60px;
    height: 60px;
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
    font-size: 10px;
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
    width: 30px;
    height: 30px;
    background: ${props => props.theme.colors.navy};
    border-radius: 50%;
    transform: translateZ(var(--z-offset)) translateX(calc(var(--orbit-size) / 2));
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${props => props.theme.fonts.mono};
    font-size: 9px;
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

const RightColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

// Enhanced GlitchingPhoto component that alternates between images
const GlitchingPhoto = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "https://drive.google.com/file/d/1GrPnliwRhhgTb2sWnSEPZ1PDTsrdoITo/view?usp=sharing",
    "https://drive.google.com/file/d/1GrPnliwRhhgTb2sWnSEPZ1PDTsrdoITo/view?usp=sharing"
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

// Skills orbit data
const skillsOrbitData = [
  { name: "React", orbit: 120, speed: "15s", zOffset: 0 },
  { name: "Node.js", orbit: 120, speed: "15s", zOffset: 0, startAngle: 120 },
  { name: "Python", orbit: 120, speed: "15s", zOffset: 0, startAngle: 240 },
  { name: "TypeScript", orbit: 180, speed: "20s", zOffset: 20 },
  { name: "MongoDB", orbit: 180, speed: "20s", zOffset: 20, startAngle: 72 },
  { name: "Redux", orbit: 180, speed: "20s", zOffset: 20, startAngle: 144 },
  { name: "NextJS", orbit: 180, speed: "20s", zOffset: 20, startAngle: 216 },
  { name: "Git", orbit: 180, speed: "20s", zOffset: 20, startAngle: 288 },
  { name: "SQL", orbit: 220, speed: "25s", zOffset: -20 },
  { name: "Docker", orbit: 220, speed: "25s", zOffset: -20, startAngle: 60 },
  { name: "C++", orbit: 220, speed: "25s", zOffset: -20, startAngle: 120 },
  { name: "Django", orbit: 220, speed: "25s", zOffset: -20, startAngle: 180 }
];

const About = () => {
  const { ref, controls, inView } = useScrollReveal();
  
  // Set username and date from the context provided
  const [username] = useState("itsanubhav009");
  const [currentDate] = useState("2025-07-08 07:48:45");

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
                <div className="response">
                  <strong>Indian Institute of Information Technology Senapati, Manipur</strong>
                  <br />B.Tech in Computer Science — Graduating June 2026 | CPI: 8.39/10.0
                  <br />Relevant Coursework: Operating Systems, DBMS, Networks, Software Engineering, Web Development, AI
                </div>
                
                
                
                <div className="command">cat skills.txt</div>
                <div className="response">
                  <strong>Programming:</strong> Python, C++, SQL, MATLAB, JavaScript, HTML/CSS, Rust, Go, PHP, XML
                  <br /><strong>Database:</strong> MySQL, MongoDB, SQLite, PostgreSQL
                  <br /><strong>Frameworks:</strong> React, Node.js, Express.js, Next.js, Django, Flutter, NumPy, Pandas
                  <br /><strong>Tools:</strong> Git, Docker, Kubernetes, Jenkins, Apache, Chart.js, Android Studio
                  <br /><strong>Concepts:</strong> OOP, DSA, RESTful APIs, Agile, CI/CD, Microservices
                </div>
                
                
                
                <div className="command">whoami</div>
                <div className="response">
                  {username}@portfolio:~$ | {currentDate}
                </div>
              </TerminalOutput>
            </RetroTerminal>
          </motion.div>
        </StyledText>

        <RightColumnContent>
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

            {/* 3D Skills Orbit directly below profile picture */}
            <SkillsOrbit>
              <h3 className="skills-heading">Technical Universe</h3>
              
              <div className="orbit-container">
                <div className="center-sphere">Core<br/>Skills</div>
                
                {skillsOrbitData.map((skill, index) => {
                  const startAngle = skill.startAngle || 0;
                  
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
            </SkillsOrbit>
          </motion.div>
        </RightColumnContent>
      </StyledFlexContainer>
    </StyledAboutSection>
  );
};

export default About;