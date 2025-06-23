import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useScrollReveal, variants } from '../utils/scrollReveal';
import { RetroTerminal, RetroBadge } from './RetroUI';
import GlitchImage from './GlitchImage';

const StyledAboutSection = styled.section`
  max-width: 900px;
`;

const StyledText = styled.div`
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
      font-family: ${({ theme }) => theme.fonts.mono};
      font-size: ${({ theme }) => theme.fontSizes.sm};

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: ${({ theme }) => theme.colors.teal};
        font-size: ${({ theme }) => theme.fontSizes.sm};
        line-height: 12px;
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
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
  
  .skills-title {
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.teal};
    margin-bottom: 10px;
  }
  
  .skills-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const TerminalOutput = styled.div`
  .command {
    color: ${({ theme }) => theme.colors.teal};
    margin-bottom: 5px;
    
    &::before {
      content: "$ ";
      color: ${({ theme }) => theme.colors.purple};
    }
  }
  
  .response {
    color: ${({ theme }) => theme.colors.lightSlate};
    margin-bottom: 15px;
    line-height: 1.4;
  }
`;

const skills = [
  { name: 'JavaScript (ES6+)', color: 'teal' },
  { name: 'TypeScript', color: 'teal' },
  { name: 'React', color: 'teal' },
  { name: 'Node.js', color: 'purple' },
  { name: 'Next.js', color: 'purple' },
  { name: 'Python', color: 'purple' },
  { name: 'Django', color: 'pink' },
  { name: 'GraphQL', color: 'pink' },
];

const About = () => {
  const { ref, controls } = useScrollReveal();

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
            <RetroTerminal title="about.txt">
              <TerminalOutput>
                <div className="command">cat about.txt</div>
                <div className="response">
                  Hello! My name is Anubhav and I enjoy creating things that live on the internet. 
                  My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!
                </div>
                
                <div className="command">cat experience.txt</div>
                <div className="response">
                  Fast-forward to today, and I've had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences for a variety of clients.
                </div>
                
                <div className="command">cat projects.txt</div>
                <div className="response">
                  I also recently launched a course that covers everything you need to build a web app with the Spotify API using Node & React.
                </div>
              </TerminalOutput>
            </RetroTerminal>

            <SkillsContainer>
              <div className="skills-title">TECH STACK //</div>
              <div className="skills-badges">
                {skills.map((skill, i) => (
                  <RetroBadge key={i} color={skill.color}>
                    {skill.name}
                  </RetroBadge>
                ))}
              </div>
            </SkillsContainer>
          </motion.div>
        </StyledText>

        <StyledPic>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
          >
            <GlitchImage
              src="https://via.placeholder.com/300"
              alt="Headshot"
              width="300px"
              height="300px"
            />
          </motion.div>
        </StyledPic>
      </StyledFlexContainer>
    </StyledAboutSection>
  );
};

export default About;
