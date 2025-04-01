import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import DriverDashboard from './pages/DriverDashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RideHistory from './pages/RideHistory';
import RideRequest from './pages/RideRequest';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/request-ride" element={<RideRequest />} />
            <Route path="/ride-history" element={<RideHistory />} />
            <Route path="/driver-dashboard" element={<DriverDashboard />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
