import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useScrollReveal, variants } from '../utils/scrollReveal';

const StyledExperienceSection = styled.section`
  max-width: 900px;
`;

const StyledTabsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    margin-left: -50px;
    padding-left: 50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    margin-left: -25px;
    padding-left: 25px;
  }
`;

const StyledTabButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${({ theme }) => theme.tabHeight};
  padding: 0 20px 2px;
  border-left: 2px solid ${({ theme, isActive }) => 
    isActive ? theme.colors.green : theme.colors.lightestNavy};
  background-color: transparent;
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.green : theme.colors.slate};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: left;
  white-space: nowrap;
  transition: ${({ theme }) => theme.transition};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.lightNavy};
    color: ${({ theme }) => theme.colors.green};
  }

  @media (max-width: 768px) {
    border-left: 0;
    border-bottom: 2px solid ${({ theme, isActive }) => 
      isActive ? theme.colors.green : theme.colors.lightestNavy};
    padding: 0 15px 2px;
  }
`;

const StyledHighlight = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: ${({ theme }) => theme.tabHeight};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.green};
  transform: translateY(
    calc(${({ activeTabId }) => activeTabId} * ${({ theme }) => theme.tabHeight})
  );
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  @media (max-width: 768px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: ${({ theme }) => theme.tabWidth};
    height: 2px;
    margin-left: 15px;
    transform: translateX(
      calc(${({ activeTabId }) => activeTabId} * ${({ theme }) => theme.tabWidth})
    );
  }
`;

const StyledTabPanel = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 10px 5px;

  ul {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      font-size: ${({ theme }) => theme.fontSizes.md};

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: ${({ theme }) => theme.colors.green};
      }
    }
  }

  h3 {
    margin-bottom: 5px;
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-weight: 500;

    .company {
      color: ${({ theme }) => theme.colors.green};
    }
  }

  .range {
    margin-bottom: 30px;
    color: ${({ theme }) => theme.colors.lightSlate};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

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

const Experience = () => {
  const [activeTabId, setActiveTabId] = useState(0);
  const { ref, controls } = useScrollReveal();

  return (
    <StyledExperienceSection id="experience">
      <motion.h2 
        className="section-heading"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        Where I've Worked
      </motion.h2>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        <StyledTabsContainer>
          <StyledTabList role="tablist">
            {jobs.map((job, i) => (
              <StyledTabButton
                key={i}
                isActive={activeTabId === i}
                onClick={() => setActiveTabId(i)}
                id={`tab-${i}`}
                role="tab"
                aria-selected={activeTabId === i}
                aria-controls={`panel-${i}`}
              >
                <span>{job.company}</span>
              </StyledTabButton>
            ))}
            <StyledHighlight activeTabId={activeTabId} />
          </StyledTabList>

          <StyledTabPanel
            id={`panel-${activeTabId}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTabId}`}
          >
            <motion.div
              key={activeTabId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3>
                <span>{jobs[activeTabId].title}</span>
                <span className="company">
                  &nbsp;@&nbsp;
                  <a 
                    href={jobs[activeTabId].url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {jobs[activeTabId].company}
                  </a>
                </span>
              </h3>

              <p className="range">{jobs[activeTabId].range}</p>

              <ul>
                {jobs[activeTabId].duties.map((duty, i) => (
                  <li key={i}>{duty}</li>
                ))}
              </ul>
            </motion.div>
          </StyledTabPanel>
        </StyledTabsContainer>
      </motion.div>
    </StyledExperienceSection>
  );
};

export default Experience;
