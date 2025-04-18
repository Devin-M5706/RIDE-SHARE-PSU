import {
    AccessTime,
    DirectionsCar,
    LocationOn,
    Message,
    Search,
    Star,
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { format } from 'date-fns';
import React, { useState } from 'react';

interface RidePost {
  id: string;
  driver: {
    name: string;
    rating: number;
    avatar: string;
  };
  pickupLocation: string;
  dropoffLocation: string;
  departureTime: Date;
  availableSeats: number;
  pricePerSeat: number;
  description: string;
}

const mockRides: RidePost[] = [
  {
    id: '1',
    driver: {
      name: 'John Doe',
      rating: 4.5,
      avatar: '',
    },
    pickupLocation: 'Penn State HUB',
    dropoffLocation: 'Philadelphia Airport',
    departureTime: new Date('2024-02-20T10:00:00'),
    availableSeats: 3,
    pricePerSeat: 40,
    description: 'Regular trip to Philly. Comfortable SUV with space for luggage.',
  },
  // Add more mock rides here
];

const RideList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleMessageDriver = (rideId: string) => {
    // TODO: Implement messaging functionality
    console.log('Message driver for ride:', rideId);
  };

  const handleBookRide = (rideId: string) => {
    // TODO: Implement booking functionality
    console.log('Book ride:', rideId);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by location or destination..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {mockRides.map((ride) => (
          <Grid item xs={12} md={6} key={ride.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar src={ride.driver.avatar} sx={{ mr: 2 }}>
                    {ride.driver.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{ride.driver.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Star sx={{ color: 'gold', mr: 0.5 }} />
                      <Typography variant="body2">{ride.driver.rating}</Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn color="primary" sx={{ mr: 1 }} />
                    <Typography>From: {ride.pickupLocation}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn color="secondary" sx={{ mr: 1 }} />
                    <Typography>To: {ride.dropoffLocation}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccessTime sx={{ mr: 1 }} />
                  <Typography>
                    {format(ride.departureTime, 'MMM d, yyyy h:mm a')}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DirectionsCar sx={{ mr: 1 }} />
                  <Typography>{ride.availableSeats} seats available</Typography>
                  <Chip
                    label={`$${ride.pricePerSeat}/seat`}
                    color="primary"
                    sx={{ ml: 'auto' }}
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {ride.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleMessageDriver(ride.id)}
                  >
                    <Message />
                  </IconButton>
                  <Button
                    variant="contained"
                    onClick={() => handleBookRide(ride.id)}
                  >
                    Book Ride
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RideList; 