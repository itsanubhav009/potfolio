import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiCodepen } from 'react-icons/fi';

const StyledSocialList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.colors.lightSlate};
  }

  li {
    &:last-of-type {
      margin-bottom: 20px;
    }

    a {
      padding: 10px;
      color: ${({ theme }) => theme.colors.lightSlate};

      &:hover,
      &:focus {
        color: ${({ theme }) => theme.colors.green};
        transform: translateY(-3px);
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledSideElement = styled.div`
  width: 40px;
  position: fixed;
  bottom: 0;
  left: ${props => (props.orientation === 'left' ? '40px' : 'auto')};
  right: ${props => (props.orientation === 'right' ? '40px' : 'auto')};
  z-index: 10;
  color: ${({ theme }) => theme.colors.lightSlate};

  @media (max-width: 1080px) {
    left: ${props => (props.orientation === 'left' ? '20px' : 'auto')};
    right: ${props => (props.orientation === 'right' ? '20px' : 'auto')};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledEmailLink = styled.a`
  display: inline-block;
  margin: 20px auto;
  padding: 10px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1;
  letter-spacing: 0.1em;
  writing-mode: vertical-rl;
  color: ${({ theme }) => theme.colors.lightSlate};

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.green};
    transform: translateY(-3px);
  }
`;

const Social = () => {
  const socialMedia = [
    { name: 'GitHub', url: 'https://github.com/itsanubhav009', icon: <FiGithub /> },
    { name: 'Twitter', url: 'https://twitter.com', icon: <FiTwitter /> },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: <FiLinkedin /> },
    { name: 'Instagram', url: 'https://instagram.com', icon: <FiInstagram /> },
    { name: 'Codepen', url: 'https://codepen.io', icon: <FiCodepen /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <>
      <StyledSideElement orientation="left">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <StyledSocialList>
            {socialMedia.map(({ name, url, icon }, i) => (
              <motion.li key={i} variants={itemVariants}>
                <a href={url} aria-label={name} target="_blank" rel="noopener noreferrer">
                  {icon}
                </a>
              </motion.li>
            ))}
          </StyledSocialList>
        </motion.div>
      </StyledSideElement>

      <StyledSideElement orientation="right">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <StyledEmailLink
            href="mailto:hello@example.com"
            variants={itemVariants}
          >
            hello@example.com
          </StyledEmailLink>
        </motion.div>
      </StyledSideElement>
    </>
  );
};

export default Social;
