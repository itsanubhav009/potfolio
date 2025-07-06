import React, { useState, useEffect, createContext } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import mixins from './styles/mixins';
import Layout from './components/Layout';
import RetroLoader from './components/RetroLoader';
import RetroCursor from './components/RetroCursor';
// Comment out unused imports for now
// import BootLoader from './components/BootLoader';
// import TechStack from './components/TechStack';

// Create context for theme toggle
export const ThemeContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // State for theme mode and retro effects
  const [themeMode, setThemeMode] = useState('dark');
  const [retroEffects, setRetroEffects] = useState(true);
  
  // Extend theme with mixins
  const extendedTheme = { ...theme, mixins };
  
  // Function to toggle theme
  const toggleTheme = () => {
    setThemeMode(prevMode => prevMode === 'dark' ? 'light' : 'dark');
    // We're keeping just dark theme for now, but setting up for future light theme implementation
  };
  
  // Function to toggle retro effects
  const toggleRetroEffects = () => {
    setRetroEffects(prev => !prev);
    
    // Toggle body class for retro effects
    if (retroEffects) {
      document.body.classList.remove('retro-effects');
    } else {
      document.body.classList.add('retro-effects');
    }
  };
  
  // Effect to handle system preference changes
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      setThemeMode(e.matches ? 'dark' : 'light');
    };
    
    prefersDarkMode.addEventListener('change', handleChange);
    
    // Add retro effects class to body by default
    document.body.classList.add('retro-effects');
    
    // Add keyboard detection for accessibility
    const handleFirstTab = (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
        window.removeEventListener('keydown', handleFirstTab);
      }
    };
    
    window.addEventListener('keydown', handleFirstTab);
    
    return () => {
      prefersDarkMode.removeEventListener('change', handleChange);
      window.removeEventListener('keydown', handleFirstTab);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      themeMode, 
      toggleTheme, 
      retroEffects, 
      toggleRetroEffects 
    }}>
      <ThemeProvider theme={extendedTheme}>
        <GlobalStyle />
        {isLoading ? (
          <RetroLoader finishLoading={() => setIsLoading(false)} />
        ) : (
          <>
            <RetroCursor />
            <Layout />
            <button 
              className="retro-toggle" 
              onClick={toggleRetroEffects}
              aria-label={retroEffects ? "Disable Retro Effects" : "Enable Retro Effects"}
            >
              {retroEffects ? "CRT: ON" : "CRT: OFF"}
            </button>
          </>
        )}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;