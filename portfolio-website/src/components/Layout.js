import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import Social from './Social';
import RetroSection from './RetroSection';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled(motion.main)`
  margin: 0 auto;
  width: 100%;
  max-width: 1600px;
  min-height: 100vh;
  padding: 200px 150px;
  
  @media (max-width: 1080px) {
    padding: 200px 100px;
  }
  @media (max-width: 768px) {
    padding: 150px 50px;
  }
  @media (max-width: 480px) {
    padding: 125px 25px;
  }
`;

const ScanLines = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 5px,
      rgba(0, 0, 0, 0.02) 5px,
      rgba(0, 0, 0, 0.02) 10px
    );
    pointer-events: none;
  }
`;

const Layout = () => {
  return (
    <StyledContent>
      <ScanLines />
      <Navbar />
      <Social />
      
      <MainContent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
      >
        <Hero />
        
        <RetroSection id="about" parallaxFactor={0.15}>
          <About />
        </RetroSection>
        
        <RetroSection id="experience" parallaxFactor={0.1} hasGlow={false}>
          <Experience />
        </RetroSection>
        
        <RetroSection id="projects-section" parallaxFactor={0.2}>
          <Projects />
        </RetroSection>
        
        <RetroSection id="contact-section" parallaxFactor={0.05} hasScanLines={false}>
          <Contact />
        </RetroSection>
      </MainContent>
      
      <Footer />
    </StyledContent>
  );
};

export default Layout;
