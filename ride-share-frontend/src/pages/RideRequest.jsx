import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 40.7934, // Penn State coordinates
  lng: -77.8600,
};

function RideRequest() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [map, setMap] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleMapLoad = (map) => {
    setMap(map);
  };

  const handlePickupSearch = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          pickupLocation
        )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      
      if (data.results && data.results[0]) {
        const location = data.results[0].geometry.location;
        setPickupCoords(location);
        map.panTo(location);
      } else {
        setError('Pickup location not found');
      }
    } catch (err) {
      setError('Error searching for pickup location');
    } finally {
      setLoading(false);
    }
  };

  const handleDropoffSearch = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          dropoffLocation
        )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      
      if (data.results && data.results[0]) {
        const location = data.results[0].geometry.location;
        setDropoffCoords(location);
        map.panTo(location);
      } else {
        setError('Dropoff location not found');
      }
    } catch (err) {
      setError('Error searching for dropoff location');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pickupCoords || !dropoffCoords) {
      setError('Please select both pickup and dropoff locations');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('http://localhost:8000/api/rides/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await currentUser.getIdToken()}`,
        },
        body: JSON.stringify({
          pickup_location: pickupLocation,
          dropoff_location: dropoffLocation,
          pickup_lat: pickupCoords.lat,
          pickup_lng: pickupCoords.lng,
          dropoff_lat: dropoffCoords.lat,
          dropoff_lng: dropoffCoords.lng,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create ride request');
      }

      const data = await response.json();
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create ride request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Request a Ride
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Pickup Location"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            margin="normal"
            required
          />
          <Button
            variant="contained"
            onClick={handlePickupSearch}
            disabled={loading}
            sx={{ mt: 1, mb: 2 }}
          >
            Search Pickup
          </Button>

          <TextField
            fullWidth
            label="Dropoff Location"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            margin="normal"
            required
          />
          <Button
            variant="contained"
            onClick={handleDropoffSearch}
            disabled={loading}
            sx={{ mt: 1, mb: 2 }}
          >
            Search Dropoff
          </Button>

          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={defaultCenter}
              zoom={13}
              onLoad={handleMapLoad}
            >
              {pickupCoords && (
                <Marker
                  position={pickupCoords}
                  title="Pickup Location"
                  icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                  }}
                />
              )}
              {dropoffCoords && (
                <Marker
                  position={dropoffCoords}
                  title="Dropoff Location"
                  icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Request Ride'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default RideRequest; 