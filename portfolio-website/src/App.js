import React, { useState, useEffect, createContext } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import mixins from './styles/mixins';
import Layout from './components/Layout';
import RetroLoader from './components/RetroLoader';
import RetroCursor from './components/RetroCursor';

// Create context for theme toggle
export const ThemeContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // State for theme mode (future implementation)
  const [themeMode, setThemeMode] = useState('dark');
  
  // Extend theme with mixins
  const extendedTheme = { ...theme, mixins };
  
  // Function to toggle theme
  const toggleTheme = () => {
    setThemeMode(prevMode => prevMode === 'dark' ? 'light' : 'dark');
    // We're keeping just dark theme for now, but setting up for future light theme implementation
  };
  
  // Effect to handle system preference changes
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      setThemeMode(e.matches ? 'dark' : 'light');
    };
    
    prefersDarkMode.addEventListener('change', handleChange);
    
    return () => {
      prefersDarkMode.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={extendedTheme}>
        <GlobalStyle />
        {isLoading ? (
          <RetroLoader finishLoading={() => setIsLoading(false)} />
        ) : (
          <>
            <RetroCursor />
            <Layout />
          </>
        )}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
