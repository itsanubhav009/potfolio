import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.navy};
  z-index: 99;
`;

const StyledLogo = styled.div`
  width: max-content;
  max-width: 100px;
  transition: ${({ theme }) => theme.transition};
  opacity: ${props => (props.isMounted ? 1 : 0)};

  svg {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
    fill: none;
    user-select: none;
    color: ${({ theme }) => theme.colors.green};
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => finishLoading(), 2000);
    return () => clearTimeout(timeout);
  }, [finishLoading]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { 
      opacity: 0,
      transition: {
        duration: 0.5,
        when: 'afterChildren',
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { 
        duration: 0.4, 
        ease: [0.645, 0.045, 0.355, 1] 
      }
    }
  };

  return (
    <StyledLoader>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <StyledLogo isMounted={isMounted}>
          <motion.svg
            id="logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            variants={logoVariants}
          >
            <title>Logo</title>
            <g>
              <g id="A" transform="translate(36.000000, 32.000000)">
                <path
                  fill="currentColor"
                  d="M14,28 L8,28 L0,0 L6,0 L10.5,18 L11.5,18 L16,0 L22,0 L14,28 Z"
                />
              </g>
              <path
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M 50, 5
                  L 11, 27
                  L 11, 72
                  L 50, 95
                  L 89, 73
                  L 89, 28 z"
              />
            </g>
          </motion.svg>
        </StyledLogo>
      </motion.div>
    </StyledLoader>
  );
};

export default Loader;
