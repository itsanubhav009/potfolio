const theme = {
  colors: {
    // Retro Synthwave color scheme
    navy: '#0b0b1a',          // Dark background (deeper blue)
    lightNavy: '#1c1c3c',     // Lighter background
    lightestNavy: '#2c2c4c',  // Hover states
    slate: '#a4a6ce',         // Body text (lavender tint)
    lightSlate: '#c2c4e0',    // Secondary text
    lightestSlate: '#e9e9ff', // Headings (light purple)
    white: '#ffffff',
    teal: '#00ffd0',          // Primary neon accent (brighter)
    purple: '#df42f9',        // Secondary neon accent (brighter)
    pink: '#ff3e8a',          // Extra retro accent
    orange: '#ff9d4d',        // Extra warm accent
    blue: '#1e97f7',          // Extra cool accent
    transTeal: 'rgba(0, 255, 208, 0.07)',
    transGreen: 'rgba(0, 255, 208, 0.07)', // Keep for compatibility
    transGradient: 'linear-gradient(120deg, rgba(0, 255, 208, 0.1), rgba(223, 66, 249, 0.1))',
    synthwaveGradient: 'linear-gradient(to right, #ff3e8a, #df42f9, #00ffd0)',
    shadowNavy: 'rgba(0, 0, 0, 0.7)',
    green: '#00ffd0', // Keep for backward compatibility
  },

  fonts: {
    main: 'Inter, sans-serif',
    mono: 'Fira Code, monospace',
    retro: '"Press Start 2P", cursive', // 8-bit style font
  },

  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '22px',
    h3: '32px',
    h2: '48px',
    h1: '80px',
  },

  // Increased spacing values
  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '20px',
    lg: '32px',
    xl: '48px',
    xxl: '80px',
  },

  easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',

  borderRadius: '8px', // Increased from 4px
  navHeight: '100px',
  navScrollHeight: '70px',
  margin: '20px',

  tabHeight: '42px',
  tabWidth: '120px',

  hamburgerWidth: '30px',

  navDelay: 1000,
  loaderDelay: 2000,
};

export default theme;
