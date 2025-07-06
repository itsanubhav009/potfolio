import React, { useState, useEffect } from 'react';
import './RetroLoader.css';

const logoAsciiArt = `
 █████╗ ███╗   ██╗██╗   ██╗██████╗ ██╗  ██╗ █████╗ ██╗   ██╗
██╔══██╗████╗  ██║██║   ██║██╔══██╗██║  ██║██╔══██╗██║   ██║
███████║██╔██╗ ██║██║   ██║██████╔╝███████║███████║██║   ██║
██╔══██║██║╚██╗██║██║   ██║██╔══██╗██╔══██║██╔══██║╚██╗ ██╔╝
██║  ██║██║ ╚████║╚██████╔╝██████╔╝██║  ██║██║  ██║ ╚████╔╝ 
╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  
                     PORTFOLIO OS v2.5
`;

const RetroLoader = ({ finishLoading }) => {
  const [bootText, setBootText] = useState('');
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [interlace, setInterlace] = useState(false);
  const [rgbShift, setRgbShift] = useState(false);
  
  // Updated exact date/time and username
  const currentDate = "2025-06-23 15:15:00";
  const username = "itsanubhav009";

  useEffect(() => {
    const bootSequence = [
      `${currentDate} - BOOT SEQUENCE INITIATED`,
      `USER: ${username}`,
      "SYSTEM CHECK...",
      logoAsciiArt,
      "LOADING PORTFOLIO COMPONENTS...",
      "INITIALIZING UI...",
      "APPLYING RETRO EFFECTS...",
      "CALIBRATING CRT DISPLAY...",
      "LOADING SKILL DATABASE...",
      "SYSTEM READY."
    ];

    let currentLine = 0;
    let currentChar = 0;
    let totalChars = bootSequence.join('').length;
    let typedChars = 0;
    
    // Interlace effect (alternating scan lines)
    const interlaceInterval = setInterval(() => {
      setInterlace(prev => !prev);
    }, 200);
    
    // RGB shift effect (random color distortion)
    const rgbShiftInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setRgbShift(true);
        setTimeout(() => setRgbShift(false), 100);
      }
    }, 3000);
    
    const typeChar = () => {
      if (currentLine < bootSequence.length) {
        const line = bootSequence[currentLine];
        
        if (currentChar === 0 && line === logoAsciiArt) {
          // Add the ASCII art all at once
          setBootText(prev => prev + '\n' + line + '\n');
          typedChars += line.length;
          setProgress(Math.min(100, Math.floor((typedChars / totalChars) * 100)));
          currentLine++;
          currentChar = 0;
          setTimeout(typeChar, 300);
        } else if (currentChar < line.length) {
          setBootText(prev => prev + line[currentChar]);
          currentChar++;
          typedChars++;
          setProgress(Math.min(100, Math.floor((typedChars / totalChars) * 100)));
          
          // Faster typing - random speed between 5-15ms
          const speed = Math.random() * 10 + 5;
          setTimeout(typeChar, speed);
        } else {
          setBootText(prev => prev + '\n');
          currentLine++;
          currentChar = 0;
          setTimeout(typeChar, 150); // Shorter pause between lines
        }
      } else {
        // Boot sequence complete - auto-enter after a short delay
        setTimeout(() => {
          // Trigger one final glitch effect before finishing
          setGlitch(true);
          setTimeout(() => {
            finishLoading();
          }, 500);
        }, 800);
      }
    };

    // Occasional glitch effect during loading
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 150);
      }
    }, 2000);

    // Start typing
    typeChar();
    
    // Cleanup
    return () => {
      clearInterval(glitchInterval);
      clearInterval(interlaceInterval);
      clearInterval(rgbShiftInterval);
    };
  }, [finishLoading]);

  return (
    <div className={`retro-loader ${glitch ? 'glitch' : ''} ${interlace ? 'interlace' : ''} ${rgbShift ? 'rgb-shift' : ''}`}>
      <div className="tv-frame">
        <div className="tv-screen">
          <div className="terminal">
            <div className="terminal-header">
              <div>PORTFOLIO.SYS</div>
              <div>{currentDate}</div>
            </div>
            <pre className="terminal-content">{bootText}</pre>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              <div className="progress-text">{progress}% COMPLETE</div>
            </div>
          </div>
        </div>
        <div className="tv-controls">
          <div className="tv-knob"></div>
          <div className="tv-knob"></div>
          <div className="tv-switch"></div>
        </div>
      </div>
      <div className="crt-lines"></div>
      <div className="crt-flicker"></div>
      <div className="crt-vignette"></div>
    </div>
  );
};

export default RetroLoader;