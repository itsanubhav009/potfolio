import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useScrollReveal, variants } from '../utils/scrollReveal';
import RetroButton from './RetroButton';
import RetroText from './RetroText';
import { neonText, retroGrid } from '../styles/effects/RetroEffects';

// Styled components
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
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.sm};
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

const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.navy}80;
  backdrop-filter: blur(5px);
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.slate};
  font-family: ${({ theme }) => theme.fonts.mono};
  
  svg {
    color: ${({ theme }) => theme.colors.teal};
  }
  
  a {
    color: ${({ theme }) => theme.colors.teal};
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.pink};
      text-decoration: underline;
    }
  }
`;

const StyledForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
`;

const FormGroup = styled.div`
  position: relative;
`;

const RetroInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.navy}80;
  border: 1px solid ${({ theme }) => theme.colors.teal}80;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.slate};
  font-family: ${({ theme }) => theme.fonts.mono};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.teal};
    box-shadow: 0 0 10px ${({ theme }) => theme.colors.teal}40;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.slate}80;
  }
`;

const RetroTextarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.navy}80;
  border: 1px solid ${({ theme }) => theme.colors.teal}80;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.slate};
  font-family: ${({ theme }) => theme.fonts.mono};
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.teal};
    box-shadow: 0 0 10px ${({ theme }) => theme.colors.teal}40;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.slate}80;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.teal};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const FormActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const FormStatus = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-family: ${({ theme }) => theme.fonts.mono};
  background: ${({ theme, success }) => 
    success ? `${theme.colors.teal}20` : `${theme.colors.pink}20`};
  color: ${({ theme, success }) => 
    success ? theme.colors.teal : theme.colors.pink};
`;

const Timestamp = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.slate}80;
`;

// Contact component
const Contact = () => {
  const { ref, controls } = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ message: '', success: false, visible: false });

  // Current date and username information
  const currentDateTime = "2025-07-11 14:51:24";
  const username = "itsanubhav009";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        message: 'Please fill out all required fields.',
        success: false,
        visible: true
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        message: 'Please enter a valid email address.',
        success: false,
        visible: true
      });
      return;
    }
    
    // Construct mailto link with form data
    const subject = encodeURIComponent(formData.subject || `Website Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    const mailtoLink = `mailto:anubhav22717@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message and reset form
    setFormStatus({
      message: 'Opening your email client. Thank you for your message!',
      success: true,
      visible: true
    });
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFormStatus({ ...formStatus, visible: false });
    }, 5000);
  };

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

        {/* Contact Information */}
        <ContactInfoContainer>
          <ContactInfo>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z"></path>
              <path d="M22 6l-10 7L2 6"></path>
            </svg>
            <a href="mailto:anubhav22717@gmail.com">anubhav22717@gmail.com</a>
          </ContactInfo>
          
          <ContactInfo>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>+91-7355122717</span>
          </ContactInfo>
        </ContactInfoContainer>

        {/* Contact Form */}
        <StyledForm
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onSubmit={handleSubmit}
        >
          <FormGroup>
            <FormLabel htmlFor="name">Name</FormLabel>
            <RetroInput
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <RetroInput
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="subject">Subject (Optional)</FormLabel>
            <RetroInput
              type="text"
              id="subject"
              name="subject"
              placeholder="What's this about?"
              value={formData.subject}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="message">Message</FormLabel>
            <RetroTextarea
              id="message"
              name="message"
              placeholder="Your message here..."
              value={formData.message}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormActions>
            <RetroButton
              type="submit"
              variant="neon"
              glow
              color="teal"
            >
              Send Message
            </RetroButton>
          </FormActions>
          
          {formStatus.visible && (
            <FormStatus
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              success={formStatus.success}
            >
              {formStatus.message}
            </FormStatus>
          )}
        </StyledForm>
        
        <SocialLinks>
          {[
            { name: 'GitHub', url: 'https://github.com/itsanubhav009', color: 'teal' },
            { name: 'LinkedIn', url: 'https://linkedin.com/in/anubhavgupta007', color: 'blue' },
            { name: 'LeetCode', url: 'https://leetcode.com/u/anubhav22717/', color: 'pink' },
            { name: 'CodeChef', url: 'https://www.codechef.com/users/anubhav_g1', color: 'purple' },
            { name: 'Codeforces', url: 'https://codeforces.com/profile/itsAnubhav007', color: 'green' }
          ].map((platform, i) => (
            <RetroButton
              key={platform.name}
              href={platform.url}
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
      
      <Timestamp>
        {username} @ {currentDateTime}
      </Timestamp>
    </StyledContactSection>
  );
};

export default Contact;