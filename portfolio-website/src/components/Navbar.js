import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

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
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  padding: 0px 50px;
  transition: ${props => props.theme.transition};
  transform: translateY(${props => (props.scrollDirection === 'down' ? '-100%' : '0px')});
  
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
  font-family: ${props => props.theme.fonts.mono};
  counter-reset: item 0;
  z-index: 12;
`;

const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    width: 42px;
    height: 42px;
    display: block;
    color: ${props => props.theme.colors.green};
    
    svg {
      fill: none;
      transition: ${props => props.theme.transition};
      user-select: none;
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLink = styled(motion.a)`
  padding: 10px;
  margin: 0 5px;
  text-decoration: none;
  color: ${props => props.theme.colors.lightestSlate};
  font-size: ${props => props.theme.fontSizes.sm};

  &:hover {
    color: ${props => props.theme.colors.green};
  }

  &:before {
    counter-increment: item 1;
    content: '0' counter(item) '.';
    margin-right: 5px;
    color: ${props => props.theme.colors.green};
    font-size: ${props => props.theme.fontSizes.xs};
    text-align: right;
  }
`;

const StyledResumeButton = styled(motion.a)`
  ${({ theme }) => theme.mixins.button};
  margin-left: 15px;
  font-size: ${props => props.theme.fontSizes.sm};
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
    color: inherit;
    text-transform: none;
    cursor: pointer;
    transition-timing-function: linear;
    transition-duration: 0.15s;
    transition-property: opacity, filter;
  }
`;

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
    background-color: ${props => props.theme.colors.lightNavy};
    box-shadow: -10px 0px 30px -15px ${props => props.theme.colors.shadowNavy};
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
    color: ${props => props.theme.colors.lightestSlate};
    font-family: ${props => props.theme.fonts.mono};
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
      font-size: clamp(${props => props.theme.fontSizes.sm}, 4vw, ${props => props.theme.fontSizes.lg});

      &:before {
        content: '0' counter(item) '.';
        display: block;
        margin-bottom: 5px;
        color: ${props => props.theme.colors.green};
        font-size: ${props => props.theme.fontSizes.sm};
      }
    }

    a {
      width: 100%;
      padding: 3px 20px 20px;
    }
  }

  .resume-link {
    ${({ theme }) => theme.mixins.button};
    padding: 18px 50px;
    margin: 10% auto 0;
    width: max-content;
  }
`;

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
  }, [controls]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle('blur');
  };

  return (
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
                  <path
                    d="M45.691 36.373l-8.336 23.01h-4.38L24.242 36.373h4.764l6.047 18.17h.307l6.047-18.17h4.284z"
                    fill="currentColor"
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
            href="/resume.pdf"
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
          initial={{ x: '100%' }}
          animate={{ x: menuOpen ? 0 : '100%' }}
          transition={{ duration: 0.3, ease: [0.645, 0.045, 0.355, 1] }}
        >
          <nav>
            <ul>
              {navLinks.map(({ name, url }, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: menuOpen ? 0.1 * i : 0 }}
                >
                  <a href={url} onClick={() => setMenuOpen(false)}>
                    {name}
                  </a>
                </motion.li>
              ))}
            </ul>
            
            <a
              className="resume-link"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Resume
            </a>
          </nav>
        </StyledSidebar>
      </StyledNav>
    </StyledHeader>
  );
};

export default Navbar;
