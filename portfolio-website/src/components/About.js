import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useScrollReveal, variants } from '../utils/scrollReveal';

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
        color: ${({ theme }) => theme.colors.green};
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

  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => theme.colors.green};

    &:hover,
    &:focus {
      background: transparent;
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: ${({ theme }) => theme.borderRadius};
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: ${({ theme }) => theme.transition};
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: ${({ theme }) => theme.borderRadius};
      transition: ${({ theme }) => theme.transition};
    }

    &:before {
      top: 0;
      left: 0;
      background-color: ${({ theme }) => theme.colors.navy};
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid ${({ theme }) => theme.colors.green};
      top: 20px;
      left: 20px;
      z-index: -1;
    }
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

const skills = [
  'JavaScript (ES6+)',
  'TypeScript',
  'React',
  'Node.js',
  'Next.js',
  'Python',
  'Django',
  'GraphQL',
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
            <p>
              Hello! My name is Anubhav and I enjoy creating things that live on the internet. 
              My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!
            </p>

            <p>
              Fast-forward to today, and I've had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences for a variety of clients.
            </p>

            <p>
              I also recently launched a course that covers everything you need to build a web app with the Spotify API using Node & React.
            </p>

            <p>Here are a few technologies I've been working with recently:</p>
          </motion.div>

          <motion.ul 
            className="skills-list"
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {skills.map((skill, i) => (
              <motion.li 
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  },
                }}
              >
                {skill}
              </motion.li>
            ))}
          </motion.ul>
        </StyledText>

        <StyledPic>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className="wrapper"
          >
            {/* Replace with your image */}
            <img
              className="img"
              src="https://via.placeholder.com/300"
              alt="Headshot"
              width={300}
              height={300}
            />
          </motion.div>
        </StyledPic>
      </StyledFlexContainer>
    </StyledAboutSection>
  );
};

export default About;
