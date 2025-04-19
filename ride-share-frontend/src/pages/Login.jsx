import { Box, Container, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FaceScanLogin from '../components/auth/FaceScanLogin';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleFaceScanSuccess = async (credential) => {
    try {
      // Here you would typically send the credential to your backend
      // for verification and user authentication
      console.log('Face scan successful:', credential);
      
      // For now, we'll just navigate to the dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFaceScanError = (err) => {
    setError(err.message);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Welcome to Drivu
        </Typography>
        
        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <FaceScanLogin 
          onSuccess={handleFaceScanSuccess}
          onError={handleFaceScanError}
        />

        <Divider sx={{ my: 3 }}>
          <Typography color="text.secondary">OR</Typography>
        </Divider>

        <LoginForm />
      </Box>
    </Container>
  );
};

export default Login; 