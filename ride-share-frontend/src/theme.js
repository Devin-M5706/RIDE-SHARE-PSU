import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
      light: '#2C2C2C',
      dark: '#000000',
      contrastText: '#FFDAB9',
    },
    secondary: {
      main: '#FFDAB9',
      light: '#FFE5B4',
      dark: '#FFB6A1',
      contrastText: '#000000',
    },
    background: {
      default: '#FFDAB9',
      paper: '#FFE5B4',
    },
    text: {
      primary: '#000000',
      secondary: '#2C2C2C',
    },
  },
  typography: {
    fontFamily: '"Arial Black", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 900,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 900,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 900,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontWeight: 900,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    button: {
      fontWeight: 700,
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: 'none',
          fontWeight: 700,
          padding: '10px 24px',
        },
        contained: {
          backgroundColor: '#000000',
          color: '#FFDAB9',
          '&:hover': {
            backgroundColor: '#2C2C2C',
          },
        },
        outlined: {
          borderColor: '#000000',
          color: '#000000',
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFE5B4',
          borderRadius: 16,
          border: '2px solid #000000',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFDAB9',
          borderBottom: '2px solid #000000',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFDAB9',
          borderRight: '2px solid #000000',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
  },
});

export default theme; 