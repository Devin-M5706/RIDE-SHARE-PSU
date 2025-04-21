import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import DriverDashboard from './pages/DriverDashboard';
import Features from './pages/Features';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RideHistory from './pages/RideHistory';
import RideRequest from './pages/RideRequest';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFCDB2', // Peach color
      contrastText: '#000000',
    },
    secondary: {
      main: '#FFB4A2', // Lighter peach
      contrastText: '#000000',
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1E1E1E', // Slightly lighter dark
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      color: '#FFCDB2',
    },
    h2: {
      color: '#FFCDB2',
    },
    h3: {
      color: '#FFCDB2',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/request-ride" element={<RideRequest />} />
              <Route path="/ride-history" element={<RideHistory />} />
              <Route path="/driver-dashboard" element={<DriverDashboard />} />
              <Route path="/features" element={<Features />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
