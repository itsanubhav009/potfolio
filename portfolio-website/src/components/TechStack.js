import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../App';
import styled, { keyframes, css } from 'styled-components';
import './TechStack.css';

// Tech Logos (Base64 or import paths)
const techLogos = {
  JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  HTML: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  CSS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  Node: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  MongoDB: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  GraphQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  Docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  AWS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
  Redux: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  Next: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  Git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  Sass: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
  Express: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  Jest: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
  Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  PostgreSQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  Firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  Figma: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  Default: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg'
};

// Animation keyframes
const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(100, 255, 218, 0.5); }
  50% { box-shadow: 0 0 20px rgba(100, 255, 218, 0.8); }
`;

const rotateIn = keyframes`
  from { transform: rotateY(90deg); opacity: 0; }
  to { transform: rotateY(0); opacity: 1; }
`;

const scanLine = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const flicker = keyframes`
  0%, 100% { opacity: 1; }
  10% { opacity: 0.9; }
  15% { opacity: 0.7; }
  20% { opacity: 0.8; }
  25% { opacity: 0.9; }
  30% { opacity: 1; }
`;

// Styled components
const FilterPanel = styled.div`
  background: rgba(10, 25, 47, 0.7);
  border: 2px solid #64ffda;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  position: relative;
  box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      to right,
      rgba(100, 255, 218, 0),
      rgba(100, 255, 218, 0.8),
      rgba(100, 255, 218, 0)
    );
    animation: ${css`${scanLine} 4s linear infinite`};
  }
  
  .filter-title {
    font-family: 'VT323', 'Courier New', monospace;
    color: #64ffda;
    font-size: 18px;
    margin-bottom: 10px;
    text-align: center;
    text-transform: uppercase;
    text-shadow: 0 0 5px rgba(100, 255, 218, 0.5);
    letter-spacing: 2px;
  }
  
  .filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
`;

const FilterButton = styled.button`
  background: ${props => props.active ? 'rgba(100, 255, 218, 0.2)' : 'rgba(10, 25, 47, 0.5)'};
  border: 2px solid ${props => props.active ? '#64ffda' : 'rgba(100, 255, 218, 0.5)'};
  color: ${props => props.active ? '#ffffff' : '#64ffda'};
  padding: 8px 15px;
  border-radius: 4px;
  font-family: 'VT323', 'Courier New', monospace;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  text-shadow: ${props => props.active ? '0 0 5px rgba(100, 255, 218, 0.8)' : 'none'};
  box-shadow: ${props => props.active ? '0 0 10px rgba(100, 255, 218, 0.5)' : 'none'};
  animation: ${props => props.active ? css`${pulse} 2s infinite` : 'none'};
  
  &:hover {
    background: rgba(100, 255, 218, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(100, 255, 218, 0.2),
      transparent
    );
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const SkillCard = styled.div`
  background: rgba(10, 25, 47, 0.7);
  border: 2px solid #64ffda;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s;
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.2);
  position: relative;
  overflow: hidden;
  animation: ${css`${rotateIn} 0.5s ease-out forwards`};
  animation-delay: ${props => props.index * 0.1}s;
  opacity: 0;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.4);
  }
  
  .skill-logo {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
    animation: ${css`${float} 3s ease-in-out infinite`};
    filter: drop-shadow(0 0 3px rgba(100, 255, 218, 0.5));
  }
  
  .skill-name {
    font-family: 'VT323', 'Courier New', monospace;
    color: white;
    font-size: 16px;
    margin-bottom: 5px;
    text-align: center;
  }
  
  .skill-level {
    font-family: 'VT323', 'Courier New', monospace;
    color: #64ffda;
    font-size: 14px;
    margin-bottom: 10px;
  }
  
  .skill-bar {
    width: 100%;
    height: 8px;
    background: rgba(10, 25, 47, 0.5);
    border: 1px solid rgba(100, 255, 218, 0.3);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }
  
  .skill-progress {
    height: 100%;
    background: linear-gradient(to right, #64ffda, #00a3a3);
    width: ${props => props.level}%;
    animation: ${css`${glow} 2s infinite`};
    box-shadow: 0 0 5px rgba(100, 255, 218, 0.5);
  }
  
  .skill-category {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(10, 25, 47, 0.7);
    border: 1px solid rgba(100, 255, 218, 0.5);
    border-radius: 20px;
    padding: 2px 8px;
    font-size: 10px;
    color: #64ffda;
    font-family: 'VT323', 'Courier New', monospace;
  }
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: rgba(10, 25, 47, 0.7);
  border: 2px solid #64ffda;
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.2);
  animation: ${css`${flicker} 5s infinite`};
  
  .status-text {
    font-family: 'VT323', 'Courier New', monospace;
    color: #64ffda;
    font-size: 14px;
  }
  
  .status-count {
    font-family: 'VT323', 'Courier New', monospace;
    color: white;
    background: rgba(100, 255, 218, 0.2);
    padding: 3px 8px;
    border-radius: 4px;
    border: 1px solid #64ffda;
  }
`;

const TvStatic = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/png;base64,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');
  opacity: 0;
  z-index: 9999;
  pointer-events: none;
  transition: opacity 0.3s;
  mix-blend-mode: screen;
  
  &.active {
    opacity: 0.1;
    animation: static 0.2s steps(4) infinite;
  }
  
  @keyframes static {
    0% { background-position: 0 0; }
    25% { background-position: 100% 0; }
    50% { background-position: 100% 100%; }
    75% { background-position: 0 100%; }
  }
`;

const TechStack = () => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [flicker, setFlicker] = useState(false);
  const [showStaticEffect, setShowStaticEffect] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [tvChannelNum, setTvChannelNum] = useState(1);
  
  // Updated exact date/time and username
  const currentDate = "2025-06-23 16:12:19";
  const username = "itsanubhav009";
  
  // Use the theme context
  const { retroEffects } = useContext(ThemeContext);

  // Main skills data
  const techSkills = [
    {
      name: 'JavaScript',
      level: 90,
      description: 'Expert in modern JavaScript (ES6+), frameworks and libraries.',
      category: 'Frontend',
      logo: 'JavaScript'
    },
    {
      name: 'React',
      level: 88,
      description: 'Proficient in React, Redux, hooks, and React ecosystem.',
      category: 'Frontend',
      logo: 'React'
    },
    {
      name: 'HTML/CSS',
      level: 85,
      description: 'Advanced HTML5, CSS3, responsive design and animations.',
      category: 'Frontend',
      logo: 'HTML'
    },
    {
      name: 'Node.js',
      level: 82,
      description: 'Strong backend development with Node.js and Express.',
      category: 'Backend',
      logo: 'Node'
    },
    {
      name: 'MongoDB',
      level: 77,
      description: 'Database design, queries, and integration with Node.js.',
      category: 'Database',
      logo: 'MongoDB'
    },
    {
      name: 'TypeScript',
      level: 80,
      description: 'Type-safe JavaScript with interfaces and advanced types.',
      category: 'Frontend',
      logo: 'TypeScript'
    },
    {
      name: 'GraphQL',
      level: 75,
      description: 'Building efficient APIs with precise data fetching.',
      category: 'Backend',
      logo: 'GraphQL'
    },
    {
      name: 'Docker',
      level: 72,
      description: 'Containerization and deployment automation.',
      category: 'DevOps',
      logo: 'Docker'
    },
    {
      name: 'AWS',
      level: 68,
      description: 'Cloud infrastructure and serverless architecture.',
      category: 'DevOps',
      logo: 'AWS'
    },
    {
      name: 'UI/UX Design',
      level: 78,
      description: 'Creating intuitive and engaging user interfaces.',
      category: 'Design',
      logo: 'Figma'
    },
    {
      name: 'Redux',
      level: 85,
      description: 'State management for React applications.',
      category: 'Frontend',
      logo: 'Redux'
    },
    {
      name: 'Next.js',
      level: 76,
      description: 'Server-side rendering and static site generation.',
      category: 'Frontend',
      logo: 'Next'
    },
    {
      name: 'Git',
      level: 88,
      description: 'Version control and collaboration workflows.',
      category: 'DevOps',
      logo: 'Git'
    },
    {
      name: 'Sass/SCSS',
      level: 82,
      description: 'Advanced CSS preprocessing for complex styling.',
      category: 'Frontend',
      logo: 'Sass'
    },
    {
      name: 'Express',
      level: 80,
      description: 'RESTful API development with Node.js.',
      category: 'Backend',
      logo: 'Express'
    },
    {
      name: 'Jest',
      level: 75,
      description: 'JavaScript testing for React applications.',
      category: 'Testing',
      logo: 'Jest'
    },
    {
      name: 'React Native',
      level: 65,
      description: 'Cross-platform mobile app development.',
      category: 'Mobile',
      logo: 'React'
    },
    {
      name: 'PostgreSQL',
      level: 74,
      description: 'Relational database design and management.',
      category: 'Database',
      logo: 'PostgreSQL'
    }
  ];

  // Get unique categories for filter buttons
  const getUniqueCategories = () => {
    const categories = techSkills.map(skill => skill.category);
    return ['all', ...new Set(categories)];
  };

  // Handle filter button clicks
  const handleFilterClick = (filter) => {
    // TV channel changing effect
    setShowStaticEffect(true);
    setTvChannelNum(Math.floor(Math.random() * 99) + 1);
    
    setTimeout(() => {
      setActiveFilter(filter);
      setShowStaticEffect(false);
    }, 500);
  };

  // Get filtered skills
  const getFilteredSkills = () => {
    if (activeFilter === 'all') return techSkills;
    return techSkills.filter(skill => skill.category.toLowerCase() === activeFilter.toLowerCase());
  };

  // Get logo for a skill
  const getSkillLogo = (logoKey) => {
    return techLogos[logoKey] || techLogos.Default;
  };

  useEffect(() => {
    if (!retroEffects) return;
    
    // Random flicker effect
    const flickerInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setFlicker(true);
        setTimeout(() => setFlicker(false), 150);
      }
    }, 2000);
    
    return () => {
      clearInterval(flickerInterval);
    };
  }, [retroEffects]);

  return (
    <div className={`tech-stack-container ${retroEffects ? 'vhs-effect' : ''} ${flicker ? 'flicker' : ''}`}>
      <TvStatic className={showStaticEffect ? 'active' : ''} />
      
      <div className="tech-heading">
        <h2>TECH STACK</h2>
        <div className="tech-indicator">
          <div className={`rec-dot ${Math.random() > 0.5 ? 'blink' : ''}`}></div>
          <span>REC</span>
        </div>
      </div>
      
      <FilterPanel>
        <div className="filter-title">SELECT TECHNOLOGY CATEGORY</div>
        <div className="filter-buttons">
          {getUniqueCategories().map((category, index) => (
            <FilterButton
              key={index}
              active={activeFilter === category}
              onClick={() => handleFilterClick(category)}
            >
              {category === 'all' ? 'ALL SKILLS' : category.toUpperCase()}
            </FilterButton>
          ))}
        </div>
      </FilterPanel>
      
      <SkillGrid>
        {getFilteredSkills().map((skill, index) => (
          <SkillCard 
            key={index} 
            index={index} 
            level={skill.level}
          >
            <div className="skill-category">{skill.category}</div>
            <img 
              className="skill-logo" 
              src={getSkillLogo(skill.logo)} 
              alt={skill.name}
            />
            <div className="skill-name">{skill.name}</div>
            <div className="skill-level">Proficiency: {skill.level}%</div>
            <div className="skill-bar">
              <div 
                className="skill-progress"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </SkillCard>
        ))}
      </SkillGrid>
      
      <StatusBar>
        <div className="status-text">
          CHANNEL: CH-{tvChannelNum} | FILTER: {activeFilter.toUpperCase()}
        </div>
        <div className="status-count">
          SKILLS: {getFilteredSkills().length}/{techSkills.length}
        </div>
      </StatusBar>
    </div>
  );
};

export default TechStack;