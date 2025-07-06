import React, { useState, useEffect } from 'react';
import './BootLoader.css';

const logoAsciiArt = `
 █████╗ ███╗   ██╗██╗   ██╗██████╗ ██╗  ██╗ █████╗ ██╗   ██╗
██╔══██╗████╗  ██║██║   ██║██╔══██╗██║  ██║██╔══██╗██║   ██║
███████║██╔██╗ ██║██║   ██║██████╔╝███████║███████║██║   ██║
██╔══██║██║╚██╗██║██║   ██║██╔══██╗██╔══██║██╔══██║╚██╗ ██╔╝
██║  ██║██║ ╚████║╚██████╔╝██████╔╝██║  ██║██║  ██║ ╚████╔╝ 
╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  
                     PORTFOLIO OS v2.5
`;

const BootLoader = ({ finishLoading }) => {
  const [bootText, setBootText] = useState('');
  const [showContinue, setShowContinue] = useState(false);
  const [scanlines, setScanlines] = useState(true);
  const [glitch, setGlitch] = useState(false);

  // Define the missing toggleScanlines function
  const toggleScanlines = () => {
    setScanlines(!scanlines);
  };

  useEffect(() => {
    const bootSequence = [
      "BIOS POST CHECK...",
      "CPU: Intel i9-13900K @ 5.8GHz - OK",
      "MEMORY: 64GB DDR5 @ 6000MHz - OK",
      "STORAGE: 2TB NVMe SSD - OK",
      "GPU: RTX 4090 24GB - OK",
      "INITIALIZING SYSTEM...",
      "BOOTING PORTFOLIO OS v2.5...",
      logoAsciiArt,
      "LOADING KERNEL...",
      "INITIALIZING PORTFOLIO COMPONENTS...",
      "STARTING UI SERVICES...",
      "APPLYING CRT EFFECTS...",
      "SYSTEM READY."
    ];

    let currentLine = 0;
    let currentChar = 0;
    
    const typeChar = () => {
      if (currentLine < bootSequence.length) {
        const line = bootSequence[currentLine];
        
        if (currentChar === 0 && line === logoAsciiArt) {
          // If we're at the ASCII art, add it all at once
          setBootText(prev => prev + '\n' + line + '\n');
          currentLine++;
          currentChar = 0;
          setTimeout(typeChar, 500);
        } else if (currentChar < line.length) {
          setBootText(prev => prev + line[currentChar]);
          currentChar++;
          
          // Random typing speed for more authentic feel
          const speed = Math.random() * 20 + 10;
          setTimeout(typeChar, speed);
        } else {
          setBootText(prev => prev + '\n');
          currentLine++;
          currentChar = 0;
          
          // Longer pause between lines
          setTimeout(typeChar, 300);
        }
      } else {
        // Boot sequence complete, show continue button
        setTimeout(() => {
          setShowContinue(true);
          // Start occasional glitching effect
          setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 150);
          }, 5000);
        }, 1000);
      }
    };

    // Start typing
    typeChar();
    
    // Cleanup on unmount
    return () => {
      // Clear any intervals or timeouts here if needed
    };
  }, []);

  return (
    <div className={`boot-loader ${scanlines ? 'scanlines' : ''} ${glitch ? 'glitch' : ''}`}>
      <div className="terminal">
        <pre>{bootText}</pre>
        {showContinue && (
          <div className="crt-controls">
            <button onClick={finishLoading} className="crt-button">
              <span className="crt-button-text">ENTER SYSTEM</span>
              <div className="crt-button-glow"></div>
            </button>
            <button onClick={toggleScanlines} className="crt-button toggle-scanlines">
              <span className="crt-button-text">{scanlines ? 'DISABLE CRT EFFECT' : 'ENABLE CRT EFFECT'}</span>
              <div className="crt-button-glow"></div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BootLoader;