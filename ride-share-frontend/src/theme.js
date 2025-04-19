import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFDAB9', // Peach
      light: '#FFE5B4',
      dark: '#FFB6A1',
      contrastText: '#000000',
    },
    secondary: {
      main: '#000000', // Black
      light: '#1a1a1a',
      dark: '#000000',
      contrastText: '#FFDAB9',
    },
    background: {
      default: '#000000',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#FFDAB9',
      secondary: '#FFE5B4',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      color: '#FFDAB9',
    },
    h2: {
      color: '#FFDAB9',
    },
    h3: {
      color: '#FFDAB9',
    },
    h4: {
      color: '#FFDAB9',
    },
    h5: {
      color: '#FFE5B4',
    },
    h6: {
      color: '#FFE5B4',
    },
    body1: {
      color: '#FFE5B4',
    },
    body2: {
      color: '#FFDAB9',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          background: 'linear-gradient(45deg, #FFDAB9 30%, #FFE5B4 90%)',
          color: '#000000',
          '&:hover': {
            background: 'linear-gradient(45deg, #FFE5B4 30%, #FFDAB9 90%)',
          },
        },
        outlined: {
          borderColor: '#FFDAB9',
          color: '#FFDAB9',
          '&:hover': {
            borderColor: '#FFE5B4',
            color: '#FFE5B4',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          borderRadius: 12,
          border: '1px solid #FFDAB9',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme; 