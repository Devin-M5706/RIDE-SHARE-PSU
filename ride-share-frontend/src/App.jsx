import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import DriverDashboard from './pages/DriverDashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RideHistory from './pages/RideHistory';
import RideRequest from './pages/RideRequest';
import theme from './theme';

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
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
