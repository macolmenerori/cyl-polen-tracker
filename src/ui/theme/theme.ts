import { PaletteMode } from '@mui/material';
import { createTheme, Theme } from '@mui/material/styles';

// Define the color palette for light mode
export const lightPalette = {
  primary: {
    main: '#4f46e5',
    light: '#818cf8',
    dark: '#3730a3',
    contrastText: '#ffffff'
  },
  secondary: {
    main: '#10b981',
    light: '#34d399',
    dark: '#047857',
    contrastText: '#ffffff'
  },
  background: {
    default: '#f8fafc',
    paper: '#ffffff'
  },
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    tertiary: '#94a3b8',
    disabled: '#cbd5e1'
  }
};

// Define the color palette for dark mode
export const darkPalette = {
  primary: {
    main: '#6366f1',
    light: '#8b5cf6',
    dark: '#4338ca',
    contrastText: '#ffffff'
  },
  secondary: {
    main: '#14b8a6',
    light: '#2dd4bf',
    dark: '#0f766e',
    contrastText: '#ffffff'
  },
  background: {
    default: '#0f172a',
    paper: '#1e293b'
  },
  text: {
    primary: '#f1f5f9',
    secondary: '#cbd5e1',
    tertiary: '#94a3b8',
    disabled: '#64748b'
  }
};

// Common theme settings regardless of light/dark mode
export const commonThemeSettings = {
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em'
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em'
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.3
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          borderRadius: 12,
          padding: '10px 20px',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }
        }
      }
    }
  }
};

// Function to create a theme based on mode (light/dark)
export const createAppTheme = (mode: PaletteMode): Theme => {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light' ? lightPalette : darkPalette)
    },
    ...commonThemeSettings
  });
};
