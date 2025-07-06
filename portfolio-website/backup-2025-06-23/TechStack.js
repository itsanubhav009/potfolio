import React, { useEffect, useState } from 'react';
import './TechStack.css';

const logoAsciiArt = `
 █████╗ ███╗   ██╗██╗   ██╗██████╗ ██╗  ██╗ █████╗ ██╗   ██╗
██╔══██╗████╗  ██║██║   ██║██╔══██╗██║  ██║██╔══██╗██║   ██║
███████║██╔██╗ ██║██║   ██║██████╔╝███████║███████║██║   ██║
██╔══██║██║╚██╗██║██║   ██║██╔══██╗██╔══██║██╔══██║╚██╗ ██╔╝
██║  ██║██║ ╚████║╚██████╔╝██████╔╝██║  ██║██║  ██║ ╚████╔╝ 
╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  
                     PORTFOLIO OS v2.5
`;

const TechStack = () => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [showVHSLines, setShowVHSLines] = useState(true);
  const [flicker, setFlicker] = useState(false);

  const techSkills = [
    {
      name: 'JavaScript',
      level: 90,
      description: 'Expert in modern JavaScript (ES6+), frameworks and libraries.',
      ascii: `
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓   ░░░░░░░░░░░░░░░░░  JAVASCRIPT PROFICIENCY  ░░░░░░░░░░░░░░░░░   ▓
▓                                                                  ▓
▓   [██████████████████████████████████████] 90%                   ▓
▓                                                                  ▓
▓   ◆ ES6+ ◆ React ◆ Node.js ◆ Express ◆ TypeScript               ▓
▓                                                                  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
      `
    },
    {
      name: 'HTML/CSS',
      level: 85,
      description: 'Advanced HTML5, CSS3, responsive design and animations.',
      ascii: `
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓   ░░░░░░░░░░░░░░░░░   HTML/CSS PROFICIENCY  ░░░░░░░░░░░░░░░░░   ▓
▓                                                                  ▓
▓   [█████████████████████████████████████] 85%                    ▓
▓                                                                  ▓
▓   ◆ HTML5 ◆ CSS3 ◆ SASS/SCSS ◆ Responsive Design ◆ Animations   ▓
▓                                                                  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
      `
    },
    {
      name: 'React',
      level: 88,
      description: 'Proficient in React, Redux, hooks, and React ecosystem.',
      ascii: `
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓   ░░░░░░░░░░░░░░░░░    REACT PROFICIENCY    ░░░░░░░░░░░░░░░░░   ▓
▓                                                                  ▓
▓   [████████████████████████████████████] 88%                     ▓
▓                                                                  ▓
▓   ◆ React ◆ Redux ◆ Context API ◆ Hooks ◆ Next.js               ▓
▓                                                                  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
      `
    },
    {
      name: 'Node.js',
      level: 82,
      description: 'Strong backend development with Node.js and Express.',
      ascii: `
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓   ░░░░░░░░░░░░░░░░░   NODE.JS PROFICIENCY   ░░░░░░░░░░░░░░░░░   ▓
▓                                                                  ▓
▓   [██████████████████████████████████] 82%                       ▓
▓                                                                  ▓
▓   ◆ Node.js ◆ Express ◆ REST APIs ◆ MongoDB ◆ Socket.io         ▓
▓                                                                  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
      `
    },
    {
      name: 'UI/UX Design',
      level: 78,
      description: 'Creating intuitive and engaging user interfaces.',
      ascii: `
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓   ░░░░░░░░░░░░░░░░░   UI/UX PROFICIENCY    ░░░░░░░░░░░░░░░░░   ▓
▓                                                                  ▓
▓   [████████████████████████████████] 78%                         ▓
▓                                                                  ▓
▓   ◆ Figma ◆ Adobe XD ◆ User Research ◆ Prototyping ◆ Animation  ▓
▓                                                                  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
      `
    }
  ];

  useEffect(() => {
    // Cycle through skills automatically
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % techSkills.length);
    }, 5000);

    // Occasional VHS line glitch
    const glitchInterval = setInterval(() => {
      setFlicker(true);
      setTimeout(() => setFlicker(false), 150);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
    };
  }, [techSkills.length]);

  const toggleVHSLines = () => {
    setShowVHSLines(!showVHSLines);
  };

  return (
    <div className={`tech-stack-container ${showVHSLines ? 'vhs-effect' : ''} ${flicker ? 'flicker' : ''}`}>
      <div className="tech-heading">
        <h2>TECH STACK</h2>
        <button onClick={toggleVHSLines} className="retro-button toggle-vhs">
          {showVHSLines ? 'DISABLE VHS EFFECT' : 'ENABLE VHS EFFECT'}
        </button>
      </div>
      
      <div className="tech-terminal">
        <div className="terminal-header">
          <div className="terminal-title">SKILL ANALYZER v1.0</div>
          <div className="terminal-controls">
            <span className="control minimize"></span>
            <span className="control maximize"></span>
            <span className="control close"></span>
          </div>
        </div>
        
        <div className="terminal-content">
          <pre className="ascii-skill">{techSkills[currentSkill].ascii}</pre>
          
          <div className="skill-details">
            <div className="skill-name">{techSkills[currentSkill].name}</div>
            <div className="skill-description">{techSkills[currentSkill].description}</div>
          </div>
          
          <div className="skill-nav">
            {techSkills.map((skill, index) => (
              <button 
                key={index} 
                className={`skill-dot ${index === currentSkill ? 'active' : ''}`}
                onClick={() => setCurrentSkill(index)}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="tech-console">
        <div className="console-line">$ skill --list all</div>
        <div className="console-line">Loading skill database... DONE</div>
        <div className="console-line">Analyzing proficiency levels... DONE</div>
        <div className="console-line blink">$ _</div>
      </div>
    </div>
  );
};

export default TechStack;