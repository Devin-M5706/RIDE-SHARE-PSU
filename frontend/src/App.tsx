import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Components
import Layout from './components/Layout';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import MessageCenter from './components/messages/MessageCenter';
import ReviewForm from './components/reviews/ReviewForm';
import RideList from './components/rides/RideList';
import RidePostForm from './components/rides/RidePostForm';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1E88E5', // Penn State Blue
      light: '#6AB7FF',
      dark: '#005CB2',
    },
    secondary: {
      main: '#FFFFFF', // White
    },
    background: {
      default: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  // TODO: Implement authentication state management
  const isAuthenticated = false;

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route
                path="/login"
                element={
                  !isAuthenticated ? (
                    <LoginForm />
                  ) : (
                    <Navigate to="/rides" replace />
                  )
                }
              />
              <Route
                path="/signup"
                element={
                  !isAuthenticated ? (
                    <SignupForm />
                  ) : (
                    <Navigate to="/rides" replace />
                  )
                }
              />

              {/* Protected routes */}
              <Route
                path="/rides"
                element={
                  isAuthenticated ? (
                    <RideList />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/rides/new"
                element={
                  isAuthenticated ? (
                    <RidePostForm />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/messages"
                element={
                  isAuthenticated ? (
                    <MessageCenter />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/review/:rideId"
                element={
                  isAuthenticated ? (
                    <ReviewForm
                      userId="mock-user-id"
                      userName="John Doe"
                      rideId="mock-ride-id"
                      isDriver={false}
                      onSubmit={(review) => console.log('Review submitted:', review)}
                    />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              {/* Default route */}
              <Route
                path="/"
                element={
                  <Navigate to={isAuthenticated ? "/rides" : "/login"} replace />
                }
              />
            </Routes>
          </Layout>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App; 