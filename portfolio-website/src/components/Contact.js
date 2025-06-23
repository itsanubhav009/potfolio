import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useScrollReveal, variants } from '../utils/scrollReveal';
import RetroButton from './RetroButton';
import RetroText from './RetroText';
import { neonText, retroGrid } from '../styles/effects/RetroEffects';

const StyledContactSection = styled.section`
  max-width: 800px;
  margin: ${({ theme }) => theme.spacing.xxl} auto;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.lightNavy}22;
  border-radius: ${({ theme }) => theme.borderRadius};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0.05;
    ${retroGrid}
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.colors.synthwaveGradient};
    z-index: 1;
  }
`;

const StyledContactHeading = styled.h2`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.teal};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(${({ theme }) => theme.fontSizes.sm}, 5vw, ${({ theme }) => theme.fontSizes.md});
  font-weight: 400;

  &:before {
    content: '';
    display: none;
  }

  &:after {
    display: none;
  }
`;

const StyledTitle = styled.h2`
  font-size: clamp(40px, 5vw, 60px);
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  position: relative;
  display: inline-block;
  ${neonText}
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 25%;
    width: 50%;
    height: 2px;
    background: ${({ theme }) => theme.colors.synthwaveGradient};
  }
`;

const StyledText = styled(motion.p)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: 480px) {
    flex-wrap: wrap;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const RetroGlow = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle at center,
    ${({ theme }) => theme.colors.teal}22,
    transparent 70%
  );
  z-index: -1;
  opacity: 0.6;
  filter: blur(40px);
`;

const Contact = () => {
  const { ref, controls } = useScrollReveal();

  return (
    <StyledContactSection id="contact" ref={ref}>
      <RetroGlow />
      
      <motion.div
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        <StyledContactHeading>
          <RetroText
            text="What's Next?"
            typingSpeed={50}
            startDelay={200}
            fontSize="clamp(14px, 5vw, 16px)"
            showCursor={false}
          />
        </StyledContactHeading>

        <StyledTitle>Get In Touch</StyledTitle>

        <StyledText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          I'm currently looking for new opportunities to collaborate on exciting projects.
          Whether you have a question, a project idea, or just want to say hello,
          I'll do my best to get back to you as soon as possible!
        </StyledText>

        <ButtonContainer>
          <RetroButton
            href="mailto:hello@example.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="neon"
            glow
          >
            Say Hello
          </RetroButton>
          
          <RetroButton
            href="/calendar"
            variant="pixel"
            color="purple"
          >
            Schedule a Call
          </RetroButton>
        </ButtonContainer>
        
        <SocialLinks>
          {[
            { name: 'Twitter', color: 'blue' },
            { name: 'LinkedIn', color: 'teal' },
            { name: 'GitHub', color: 'purple' },
            { name: 'Instagram', color: 'pink' }
          ].map((platform, i) => (
            <RetroButton
              key={platform.name}
              href={`https://${platform.name.toLowerCase()}.com/itsanubhav009`}
              target="_blank"
              rel="noopener noreferrer"
              variant="crt"
              size="small"
              color={platform.color}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + (i * 0.1) }}
            >
              {platform.name}
            </RetroButton>
          ))}
        </SocialLinks>
      </motion.div>
    </StyledContactSection>
  );
};

export default Contact;
