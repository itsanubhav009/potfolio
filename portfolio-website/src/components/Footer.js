import React from 'react';
import styled from 'styled-components';
import { retroGrid, neonText } from '../styles/effects/RetroEffects';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
  position: relative;
  
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
`;

const StyledCredit = styled.div`
  color: ${({ theme }) => theme.colors.lightSlate};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: 1.4;

  a {
    padding: 10px;
    ${neonText}
    
    &:hover {
      text-decoration: underline;
    }
  }

  .github-stats {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;

    & > span {
      display: inline-flex;
      align-items: center;
      background-color: ${({ theme }) => theme.colors.lightNavy};
      padding: 5px 10px;
      border-radius: 4px;
      transition: all 0.2s ease;
      
      &:hover {
        transform: translateY(-2px);
        background-color: ${({ theme }) => theme.colors.teal}22;
      }
    }
    
    svg {
      display: inline-block;
      margin-right: 5px;
      width: 14px;
      height: 14px;
    }
  }
  
  .timestamp {
    margin-top: 20px;
    font-family: ${({ theme }) => theme.fonts.retro};
    font-size: 10px;
    color: ${({ theme }) => theme.colors.slate};
    letter-spacing: 1px;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <StyledCredit tabIndex="-1">
        <a href="https://github.com/itsanubhav009" target="_blank" rel="noopener noreferrer">
          <div>Designed & Built by Anubhav</div>

          <div className="github-stats">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-star"
              >
                <title>Star</title>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>100</span>
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-git-branch"
              >
                <title>Fork</title>
                <line x1="6" y1="3" x2="6" y2="15" />
                <circle cx="18" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <path d="M18 9a9 9 0 0 1-9 9" />
              </svg>
              <span>25</span>
            </span>
          </div>
          
          <div className="timestamp">
            LOGIN: itsanubhav009 • 2025-06-23 05:32:21
          </div>
        </a>
      </StyledCredit>
    </StyledFooter>
  );
};

export default Footer;
