import React, { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

// Retro animation keyframes
const glitch = keyframes`
  0% {
    transform: translate(0);
    text-shadow: -2px 0 #0ff, 2px 0 #f0f;
  }
  2% {
    transform: translate(-2px, 1px);
    text-shadow: 2px -1px #0ff, -2px 1px #f0f;
  }
  4% {
    transform: translate(-1px, -1px);
    text-shadow: 1px 1px #0ff, -1px -1px #f0f;
  }
  6% {
    transform: translate(1px, 1px);
    text-shadow: -1px -1px #0ff, 1px 1px #f0f;
  }
  8% {
    transform: translate(0);
    text-shadow: -2px 0 #0ff, 2px 0 #f0f;
  }
  100% {
    transform: translate(0);
    text-shadow: none;
  }
`;

const continuousGlitch = keyframes`
  0% {
    text-shadow: -2px 0 #0ff, 2px 0 #f0f;
  }
  25% {
    text-shadow: 2px -1px #0ff, -2px 1px #f0f;
  }
  50% {
    text-shadow: -1px -1px #0ff, 1px 1px #f0f;
  }
  75% {
    text-shadow: 1px 1px #0ff, -1px -1px #f0f;
  }
  100% {
    text-shadow: -2px 0 #0ff, 2px 0 #f0f;
  }
`;

const scanline = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
`;

const flicker = keyframes`
  0% {
    opacity: 0.97;
  }
  5% {
    opacity: 0.9;
  }
  10% {
    opacity: 0.97;
  }
  15% {
    opacity: 0.94;
  }
  20% {
    opacity: 0.98;
  }
  50% {
    opacity: 0.94;
  }
  80% {
    opacity: 0.98;
  }
  95% {
    opacity: 0.94;
  }
  100% {
    opacity: 0.96;
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(51, 255, 187, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(51, 255, 187, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(51, 255, 187, 0);
  }
`;

const glow = keyframes`
  0% {
    text-shadow: 0 0 5px rgba(51, 255, 187, 0.7), 0 0 10px rgba(51, 255, 187, 0.5);
  }
  50% {
    text-shadow: 0 0 15px rgba(51, 255, 187, 0.9), 0 0 20px rgba(51, 255, 187, 0.7);
  }
  100% {
    text-shadow: 0 0 5px rgba(51, 255, 187, 0.7), 0 0 10px rgba(51, 255, 187, 0.5);
  }
`;

const backgroundShine = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const blinkCursor = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const pixelate = keyframes`
  0% {
    -webkit-filter: none;
    filter: none;
  }
  20% {
    -webkit-filter: url(#pixelate-2);
    filter: url(#pixelate-2);
  }
  25% {
    -webkit-filter: none;
    filter: none;
  }
  90% {
    -webkit-filter: none;
    filter: none;
  }
  95% {
    -webkit-filter: url(#pixelate-5);
    filter: url(#pixelate-5);
  }
  100% {
    -webkit-filter: none;
    filter: none;
  }
`;

// Global styles for retro effects
const GlobalStyle = createGlobalStyle`
  body {
    position: relative;
    overflow-x: hidden;
    font-family: 'VT323', 'Courier New', monospace !important;
    
    /* CRT Screen effect */
    &:before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(18, 16, 16, 0) 50%,
        rgba(0, 0, 0, 0.25) 50%
      );
      background-size: 100% 4px;
      pointer-events: none;
      z-index: 1000;
      opacity: 0.15;
    }
    
    /* Screen flicker effect */
    &:after {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(18, 16, 16, 0.1);
      animation: ${flicker} 5s infinite;
      pointer-events: none;
      z-index: 1000;
    }

    /* Global text style */
    * {
      text-shadow: 0 0 5px rgba(51, 255, 187, 0.7);
    }

    /* Links with always-active retro style */
    a {
      position: relative;
      text-decoration: none;
      color: #64ffda;
      transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
      animation: ${glow} 2s infinite;
      
      &:hover {
        color: #9bfce7;
      }
    }
  }
  
  /* Scanline effect */
  .scanline {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    opacity: 0.3;
    z-index: 1001;
    animation: ${scanline} 6s linear infinite;
    pointer-events: none;
  }

  /* Multiple scanlines */
  .scanline-2 {
    position: fixed;
    top: 20%;
    left: 0;
    width: 100%;
    height: 5px;
    background: rgba(255, 255, 255, 0.07);
    opacity: 0.2;
    z-index: 1001;
    animation: ${scanline} 9s linear infinite;
    animation-delay: 2s;
    pointer-events: none;
  }

  .scanline-3 {
    position: fixed;
    top: 40%;
    left: 0;
    width: 100%;
    height: 3px;
    background: rgba(255, 255, 255, 0.05);
    opacity: 0.15;
    z-index: 1001;
    animation: ${scanline} 12s linear infinite;
    animation-delay: 4s;
    pointer-events: none;
  }

  .retro-cursor {
    position: fixed;
    width: 12px;
    height: 18px;
    background: rgba(51, 255, 187, 0.7);
    z-index: 1002;
    pointer-events: none;
    mix-blend-mode: difference;
    animation: ${blinkCursor} 0.8s infinite;
  }

  ::selection {
    background: rgba(51, 255, 187, 0.4);
    color: #e6f1ff;
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
  }
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 11;
  width: 100%;
  height: ${props => props.scrollDirection === 'none' ? props.theme.navHeight : props.theme.navScrollHeight};
  background-color: ${props => props.theme.colors.navy};
  backdrop-filter: blur(10px);
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  padding: 0px 50px;
  transition: ${props => props.theme.transition};
  transform: translateY(${props => (props.scrollDirection === 'down' ? '-100%' : '0px')});
  box-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.7), 0 0 10px rgba(51, 255, 187, 0.5);
  border-bottom: 1px solid rgba(51, 255, 187, 0.3);
  
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      to right,
      ${props => props.theme.colors.navy} 0%,
      #64ffda 50%,
      ${props => props.theme.colors.navy} 100%
    );
    opacity: 0.5;
  }
  
  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  color: ${props => props.theme.colors.lightestSlate};
  font-family: 'VT323', 'Courier New', monospace;
  counter-reset: item 0;
  z-index: 12;
`;

const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    position: relative;
    width: 42px;
    height: 42px;
    display: block;
    color: #64ffda;
    animation: ${pulse} 2s infinite, ${float} 3s ease-in-out infinite;
    
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-shadow: 0 0 15px rgba(51, 255, 187, 0.7);
    }
    
    svg {
      fill: none;
      transition: ${props => props.theme.transition};
      user-select: none;
      filter: drop-shadow(0 0 5px rgba(51, 255, 187, 0.7));
      animation: ${glitch} 2s linear infinite;
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;
  background: rgba(10, 25, 47, 0.7);
  padding: 5px 15px;
  border-radius: 8px;
  border: 1px solid rgba(51, 255, 187, 0.3);
  box-shadow: 0 0 10px rgba(51, 255, 187, 0.3);
  backdrop-filter: blur(5px);

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLink = styled(motion.a)`
  padding: 10px;
  margin: 0 5px;
  text-decoration: none;
  color: #e6f1ff;
  font-size: ${props => props.theme.fontSizes.md};
  position: relative;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-family: 'VT323', 'Courier New', monospace;
  animation: ${glow} 2s infinite;
  transform: translateY(-2px);
  text-shadow: 0 0 5px rgba(51, 255, 187, 0.7);

  &:before {
    counter-increment: item 1;
    content: '0' counter(item) '.';
    margin-right: 5px;
    color: #64ffda;
    font-size: ${props => props.theme.fontSizes.sm};
    text-align: right;
    animation: ${continuousGlitch} 2s infinite;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 5px;
    height: 2px;
    background-color: #64ffda;
    width: 100%;
    left: 0;
    opacity: 0.7;
    box-shadow: 0 0 10px rgba(51, 255, 187, 0.7);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const StyledResumeButton = styled(motion.a)`
  margin-left: 15px;
  font-size: ${props => props.theme.fontSizes.md};
  position: relative;
  overflow: hidden;
  background-color: rgba(51, 255, 187, 0.1);
  color: #64ffda;
  border: 1px solid #64ffda;
  border-radius: 4px;
  padding: 10px 20px;
  font-family: 'VT323', 'Courier New', monospace;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0 0 10px rgba(51, 255, 187, 0.5);
  text-shadow: 0 0 5px rgba(51, 255, 187, 0.7);
  animation: ${glow} 2s infinite, ${float} 3s ease-in-out infinite;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(51, 255, 187, 0.2),
      rgba(51, 255, 187, 0.4),
      rgba(51, 255, 187, 0.2),
      transparent
    );
    background-size: 200% 100%;
    animation: ${backgroundShine} 3s linear infinite;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const StyledHamburger = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 10;
    margin-right: -15px;
    padding: 15px;
    border: 0;
    background-color: transparent;
    color: #64ffda;
    text-transform: none;
    cursor: pointer;
    filter: drop-shadow(0 0 5px rgba(51, 255, 187, 0.7));
    animation: ${glow} 2s infinite;
    
    svg {
      transition: transform 0.3s ease;
      animation: ${glitch} 2s linear infinite;
    }
  }
`;

const sidebarItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    x: 50 
  },
  visible: i => ({ 
    opacity: 1, 
    y: 0, 
    x: 0,
    transition: { 
      delay: i * 0.1 + 0.1,
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0],
    }
  }),
  exit: i => ({
    opacity: 0,
    y: 10,
    x: 50,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0],
    }
  })
};

const StyledSidebar = styled(motion.aside)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 50px 10px;
    width: min(75vw, 400px);
    height: 100vh;
    outline: 0;
    background-color: rgba(17, 34, 64, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: -10px 0px 30px -15px rgba(2, 12, 27, 0.7), 0 0 15px rgba(51, 255, 187, 0.3);
    border-left: 1px solid rgba(51, 255, 187, 0.3);
    z-index: 9;
    transform: translateX(${props => (props.menuOpen ? 0 : 100)}vw);
    visibility: ${props => (props.menuOpen ? 'visible' : 'hidden')};
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex-direction: column;
    color: #e6f1ff;
    font-family: 'VT323', 'Courier New', monospace;
    text-align: center;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;

    li {
      position: relative;
      margin: 0 auto 20px;
      counter-increment: item 1;
      font-size: clamp(${props => props.theme.fontSizes.lg}, 4vw, ${props => props.theme.fontSizes.xl});
      animation: ${glow} 2s infinite;

      &:before {
        content: '0' counter(item) '.';
        display: block;
        margin-bottom: 5px;
        color: #64ffda;
        font-size: ${props => props.theme.fontSizes.md};
        animation: ${continuousGlitch} 2s infinite;
        text-shadow: 0 0 5px rgba(51, 255, 187, 0.7);
      }
      
      a {
        position: relative;
        display: inline-block;
        width: 100%;
        padding: 3px 20px 20px;
        transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
        color: #e6f1ff;
        text-shadow: 0 0 5px rgba(51, 255, 187, 0.7);
        transform: translateX(5px);
        
        &:hover {
          color: #64ffda;
        }
      }
      
      &:after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 20%;
        width: 60%;
        height: 1px;
        background: linear-gradient(
          to right,
          transparent,
          rgba(51, 255, 187, 0.5),
          transparent
        );
      }
    }
  }

  .resume-link {
    padding: 18px 50px;
    margin: 10% auto 0;
    width: max-content;
    position: relative;
    overflow: hidden;
    background-color: rgba(51, 255, 187, 0.1);
    color: #64ffda;
    border: 1px solid #64ffda;
    border-radius: 4px;
    font-family: 'VT323', 'Courier New', monospace;
    font-size: ${props => props.theme.fontSizes.lg};
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(51, 255, 187, 0.5);
    text-shadow: 0 0 5px rgba(51, 255, 187, 0.7);
    animation: ${glow} 2s infinite, ${float} 3s ease-in-out infinite;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(51, 255, 187, 0.2),
        rgba(51, 255, 187, 0.4),
        rgba(51, 255, 187, 0.2),
        transparent
      );
      background-size: 200% 100%;
      animation: ${backgroundShine} 3s linear infinite;
    }
  }
`;

const CRTEffect = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      ellipse at center,
      rgba(10, 25, 47, 0) 0%,
      rgba(10, 25, 47, 0.2) 90%,
      rgba(10, 25, 47, 0.4) 100%
    );
    pointer-events: none;
  }
`;

// Define the resume URL once, so it can be used in multiple places
const RESUME_URL = "https://drive.google.com/file/d/1G3i8AejuSTkrrU99bPbsx89fItmUdIdq/view?usp=sharing";

const navLinks = [
  { name: 'About', url: '#about' },
  { name: 'Experience', url: '#experience' },
  { name: 'Work', url: '#projects' },
  { name: 'Contact', url: '#contact' },
];

const Navbar = () => {
  const [scrollDirection, setScrollDirection] = useState('none');
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > prevScrollY ? 'down' : 'up';
      
      if (
        direction !== scrollDirection &&
        (currentScrollY - prevScrollY > 10 || currentScrollY - prevScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      
      setPrevScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDirection, prevScrollY]);

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: 0.1 * i },
    }));
    
    // Add retro mode class to body (always on)
    document.body.classList.add('retro-mode');
    
    // Track cursor position for retro cursor effect
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.body.classList.remove('retro-mode');
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [controls]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle('blur');
  };

  // Current date and time info
  const currentDateTime = "2025-07-11 15:08:28";
  const username = "itsanubhav009";

  return (
    <>
      <GlobalStyle />
      <div className="scanline" />
      <div className="scanline-2" />
      <div className="scanline-3" />
      <div 
        className="retro-cursor" 
        style={{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px` 
        }} 
      />
      
      <StyledHeader scrollDirection={scrollDirection}>
        <StyledNav>
          <StyledLogo>
            <a href="/" aria-label="home">
              <motion.svg
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                id="logo"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 0 84 96"
              >
                <title>Logo</title>
                <g transform="translate(-8.000000, -2.000000)">
                  <g transform="translate(11.000000, 5.000000)">
                    {/* Corrected path for "A" that points upward */}
                    <path
                      d="M38.5 36.373L25.5 59.27h4.764l8.236-16.17 8.236 16.17h4.764L38.5 36.373z"
                      fill="currentColor"
                    />
                    {/* Crossbar for the "A" */}
                    <path
                      d="M30.5 46.5h16"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <polygon
                      id="Shape"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="39 0 0 22 0 67 39 90 78 68 78 23"
                    />
                  </g>
                </g>
              </motion.svg>
            </a>
          </StyledLogo>

          <StyledLinks>
            <nav>
              {navLinks.map(({ name, url }, i) => (
                <StyledLink
                  key={i}
                  href={url}
                  custom={i}
                  initial={{ opacity: 0, y: -20 }}
                  animate={controls}
                >
                  {name}
                </StyledLink>
              ))}
            </nav>
            
            <StyledResumeButton
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              Resume
            </StyledResumeButton>
          </StyledLinks>

          <StyledHamburger onClick={toggleMenu}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </StyledHamburger>

          <StyledSidebar
            menuOpen={menuOpen}
            initial={false}
            animate={menuOpen ? "visible" : "hidden"}
            variants={{
              visible: {
                x: 0,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              },
              hidden: {
                x: "100%",
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  staggerChildren: 0.05,
                  staggerDirection: -1,
                  when: "afterChildren"
                }
              }
            }}
          >
            <nav>
              <ul>
                {navLinks.map(({ name, url }, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    variants={sidebarItemVariants}
                  >
                    <a href={url} onClick={() => setMenuOpen(false)}>
                      {name}
                    </a>
                  </motion.li>
                ))}
              </ul>
              
              <motion.a
                className="resume-link"
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                variants={sidebarItemVariants}
                custom={navLinks.length}
              >
                Resume
              </motion.a>
            </nav>
          </StyledSidebar>
        </StyledNav>
      </StyledHeader>
      <CRTEffect />
      
      {/* SVG Filters for retro effects */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="pixelate-2">
          <feFlood x="0" y="0" height="100%" width="100%" floodColor="#000" result="black" />
          <feFlood x="0" y="0" height="100%" width="100%" floodColor="#fff" result="flood" />
          <feComposite operator="in" in="flood" in2="SourceAlpha" result="mask" />
          <feComposite operator="in" in="SourceGraphic" in2="mask" result="maskedSource" />
          <feMorphology operator="dilate" radius="2" in="maskedSource" result="dilated" />
          <feComposite operator="in" in="dilated" in2="SourceAlpha" result="pixelated" />
          <feComposite operator="over" in="pixelated" in2="black" result="final" />
        </filter>
        <filter id="pixelate-5">
          <feFlood x="0" y="0" height="100%" width="100%" floodColor="#000" result="black" />
          <feFlood x="0" y="0" height="100%" width="100%" floodColor="#fff" result="flood" />
          <feComposite operator="in" in="flood" in2="SourceAlpha" result="mask" />
          <feComposite operator="in" in="SourceGraphic" in2="mask" result="maskedSource" />
          <feMorphology operator="dilate" radius="5" in="maskedSource" result="dilated" />
          <feComposite operator="in" in="dilated" in2="SourceAlpha" result="pixelated" />
          <feComposite operator="over" in="pixelated" in2="black" result="final" />
        </filter>
      </svg>
    </>
  );
};

export default Navbar;