import React, { useState } from 'react';
import styled from 'styled-components';

// Simple icons
const IconGitHub = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const IconExternal = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const IconFolder = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="25" height="25">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
);

// Styled components
const Card = styled.div`
  position: relative;
  height: 380px;
  background-color: rgba(17, 34, 64, 0.5);
  border-radius: 4px;
  border: 2px solid ${props => props.expanded ? '#64ffda' : 'rgba(100, 255, 218, 0.3)'};
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
  cursor: pointer;
  overflow: hidden;
  
  &:hover {
    border-color: #64ffda;
    transform: translateY(-5px);
    box-shadow: 0 20px 30px -15px rgba(2, 12, 27, 0.7), 
                0 0 15px rgba(100, 255, 218, 0.3);
  }
`;

const CardImage = styled.div`
  height: 160px;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .category {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(10, 25, 47, 0.8);
    color: #64ffda;
    font-family: monospace;
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 3px;
    border: 1px solid #64ffda;
    z-index: 2;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(10, 25, 47, 0.1), rgba(10, 25, 47, 0.8));
    z-index: 1;
  }
  
  ${Card}:hover & img {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 20px;
  position: relative;
  height: calc(100% - 160px);
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  
  .folder {
    color: #64ffda;
  }
  
  .links {
    display: flex;
    gap: 10px;
    
    a {
      color: #a8b2d1;
      transition: color 0.2s ease;
      
      &:hover {
        color: #64ffda;
      }
    }
  }
`;

const ProjectTitle = styled.h3`
  margin: 0 0 10px;
  color: #e6f1ff;
  font-size: 20px;
  font-family: monospace;
  
  &::before {
    content: '> ';
    color: #64ffda;
  }
  
  ${Card}:hover & {
    color: #64ffda;
  }
`;

const Description = styled.div`
  color: #a8b2d1;
  font-size: 14px;
  line-height: 1.5;
  overflow: hidden;
  
  p {
    margin: 0;
  }
`;

const ExpandedDetails = styled.div`
  height: ${props => props.expanded ? 'auto' : '0'};
  opacity: ${props => props.expanded ? '1' : '0'};
  transition: all 0.3s ease;
  overflow: hidden;
  margin-top: ${props => props.expanded ? '15px' : '0'};
  padding-top: ${props => props.expanded ? '15px' : '0'};
  border-top: ${props => props.expanded ? '1px dashed rgba(100, 255, 218, 0.3)' : 'none'};
`;

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 15px 0 0;
  list-style: none;
  
  li {
    font-family: monospace;
    font-size: 12px;
    color: #a8b2d1;
    background-color: rgba(100, 255, 218, 0.07);
    border: 1px solid rgba(100, 255, 218, 0.2);
    padding: 3px 7px;
    border-radius: 3px;
  }
`;

const CardFooter = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  font-family: monospace;
  font-size: 12px;
  color: #8892b0;
`;

const Features = styled.div`
  h4 {
    color: #64ffda;
    font-size: 14px;
    margin: 0 0 10px;
    font-family: monospace;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    
    li {
      position: relative;
      padding-left: 15px;
      margin-bottom: 5px;
      color: #a8b2d1;
      font-size: 13px;
      
      &::before {
        content: '▹';
        position: absolute;
        left: 0;
        color: #64ffda;
      }
    }
  }
`;

const StatusInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(10, 25, 47, 0.8);
  padding: 5px 10px;
  font-family: monospace;
  font-size: 10px;
  color: #8892b0;
  border-top: 1px solid rgba(100, 255, 218, 0.2);
  display: flex;
  justify-content: space-between;
  opacity: ${props => props.expanded ? '1' : '0'};
  transform: translateY(${props => props.expanded ? '0' : '100%'});
  transition: all 0.3s ease;
`;

// Main component
const HoverExpandCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Limit features to display
  const displayFeatures = project.keyFeatures ? 
    project.keyFeatures.slice(0, 2) : [];
  
  return (
    <Card 
      expanded={expanded} 
      onMouseEnter={() => setExpanded(true)} 
      onMouseLeave={() => setExpanded(false)}
    >
      <CardImage>
        <img src={project.imageUrl} alt={project.title} />
        <div className="category">{project.category}</div>
      </CardImage>
      
      <CardContent>
        <CardHeader>
          <div className="folder">
            <IconFolder />
          </div>
          
          <div className="links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                <IconGitHub />
              </a>
            )}
            {project.external && (
              <a href={project.external} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                <IconExternal />
              </a>
            )}
          </div>
        </CardHeader>
        
        <ProjectTitle>{project.title}</ProjectTitle>
        
        <Description>
          <p>{expanded ? project.description : project.shortDescription}</p>
        </Description>
        
        <ExpandedDetails expanded={expanded}>
          {displayFeatures.length > 0 && (
            <Features>
              <h4>Key Features:</h4>
              <ul>
                {displayFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </Features>
          )}
        </ExpandedDetails>
        
        <TechList>
          {project.tech.slice(0, 4).map((tech, i) => (
            <li key={i}>{tech}</li>
          ))}
          {project.tech.length > 4 && <li>+{project.tech.length - 4}</li>}
        </TechList>
        
        <CardFooter>
          <div>{project.date}</div>
        </CardFooter>
      </CardContent>
      
      <StatusInfo expanded={expanded}>
        <div>itsanubhav009</div>
        <div>2025-07-11 10:13:43</div>
      </StatusInfo>
    </Card>
  );
};

export default HoverExpandCard;