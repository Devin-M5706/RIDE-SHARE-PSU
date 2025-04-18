import {
    Alert,
    Box,
    Button,
    Container,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';

interface RidePostData {
  pickupLocation: string;
  dropoffLocation: string;
  departureTime: Date | null;
  availableSeats: number;
  pricePerSeat: number;
  description: string;
  isDriver: boolean;
}

const RidePostForm: React.FC = () => {
  const [formData, setFormData] = useState<RidePostData>({
    pickupLocation: '',
    dropoffLocation: '',
    departureTime: null,
    availableSeats: 1,
    pricePerSeat: 0,
    description: '',
    isDriver: true,
  });

  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleDateChange = (newValue: Date | null) => {
    setFormData(prev => ({
      ...prev,
      departureTime: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.departureTime) {
      setError('Please select a departure time');
      return;
    }

    try {
      // TODO: Implement ride post creation logic
      console.log('Ride post created:', formData);
    } catch (err) {
      setError('Failed to create ride post. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {formData.isDriver ? 'Offer a Ride' : 'Request a Ride'}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <FormControl fullWidth margin="normal">
            <InputLabel>I want to...</InputLabel>
            <Select
              name="isDriver"
              value={formData.isDriver}
              onChange={handleChange}
              label="I want to..."
            >
              <MenuItem value={true}>Offer a Ride (Driver)</MenuItem>
              <MenuItem value={false}>Request a Ride (Passenger)</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            label="Pickup Location"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            helperText="e.g., Penn State HUB, State College Airport"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Dropoff Location"
            name="dropoffLocation"
            value={formData.dropoffLocation}
            onChange={handleChange}
            helperText="e.g., Philadelphia Airport, NYC"
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Departure Time"
              value={formData.departureTime}
              onChange={handleDateChange}
              sx={{ mt: 2, width: '100%' }}
            />
          </LocalizationProvider>

          {formData.isDriver && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Available Seats"
                name="availableSeats"
                type="number"
                value={formData.availableSeats}
                onChange={handleChange}
                inputProps={{ min: 1, max: 8 }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Price per Seat"
                name="pricePerSeat"
                type="number"
                value={formData.pricePerSeat}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </>
          )}

          <TextField
            margin="normal"
            fullWidth
            label="Additional Details"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            helperText="Add any additional information about the ride"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {formData.isDriver ? 'Post Ride Offer' : 'Post Ride Request'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RidePostForm; 