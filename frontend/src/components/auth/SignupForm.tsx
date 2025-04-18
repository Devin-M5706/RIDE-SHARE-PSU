import {
    Alert,
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  psuId: string;
  userType: 'driver' | 'passenger';
  phoneNumber: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    psuId: '',
    userType: 'passenger',
    phoneNumber: '',
  });

  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const validatePsuEmail = (email: string) => {
    return email.endsWith('@psu.edu');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate PSU email
    if (!validatePsuEmail(formData.email)) {
      setError('Please use your Penn State email address (@psu.edu)');
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate PSU ID format (typically 9 digits)
    if (!/^\d{9}$/.test(formData.psuId)) {
      setError('Please enter a valid 9-digit PSU ID');
      return;
    }

    try {
      // TODO: Implement signup logic with Firebase
      console.log('Form submitted:', formData);
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sign Up for Penn State Ride-Share
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Penn State Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            helperText="Use your @psu.edu email address"
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Box>

          <TextField
            margin="normal"
            required
            fullWidth
            label="PSU ID"
            name="psuId"
            value={formData.psuId}
            onChange={handleChange}
            helperText="Enter your 9-digit PSU ID"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>I want to...</InputLabel>
            <Select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              label="I want to..."
            >
              <MenuItem value="passenger">Find Rides (Passenger)</MenuItem>
              <MenuItem value="driver">Offer Rides (Driver)</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupForm; 