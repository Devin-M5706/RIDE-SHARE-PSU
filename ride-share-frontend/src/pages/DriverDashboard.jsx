import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function DriverDashboard() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [priceDialogOpen, setPriceDialogOpen] = useState(false);
  const [price, setPrice] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('http://localhost:8000/api/rides/', {
        headers: {
          'Authorization': `Bearer ${await currentUser.getIdToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch rides');
      }

      const data = await response.json();
      setRides(data);
    } catch (err) {
      setError('Failed to fetch rides');
    } finally {
      setLoading(false);
    }
  };

  const handleAvailabilityChange = async (event) => {
    setIsAvailable(event.target.checked);
    try {
      const response = await fetch('http://localhost:8000/api/drivers/availability/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await currentUser.getIdToken()}`,
        },
        body: JSON.stringify({ is_available: event.target.checked }),
      });

      if (!response.ok) {
        throw new Error('Failed to update availability');
      }
    } catch (err) {
      setError('Failed to update availability');
    }
  };

  const handleAcceptRide = async (rideId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/rides/${rideId}/accept_ride/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await currentUser.getIdToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to accept ride');
      }

      fetchRides();
    } catch (err) {
      setError('Failed to accept ride');
    }
  };

  const handleStartRide = async (rideId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/rides/${rideId}/start_ride/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await currentUser.getIdToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to start ride');
      }

      fetchRides();
    } catch (err) {
      setError('Failed to start ride');
    }
  };

  const handleCompleteRide = async (rideId) => {
    setSelectedRide(rideId);
    setPriceDialogOpen(true);
  };

  const handlePriceSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/rides/${selectedRide}/complete_ride/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await currentUser.getIdToken()}`,
        },
        body: JSON.stringify({ actual_price: parseFloat(price) }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete ride');
      }

      setPriceDialogOpen(false);
      setPrice('');
      fetchRides();
    } catch (err) {
      setError('Failed to complete ride');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'requested':
        return 'warning';
      case 'accepted':
        return 'info';
      case 'in_progress':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Driver Dashboard</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={isAvailable}
                onChange={handleAvailabilityChange}
                color="primary"
              />
            }
            label="Available for Rides"
          />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {rides.map((ride) => (
              <ListItem key={ride.id} divider>
                <ListItemText
                  primary={`Ride #${ride.id}`}
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        From: {ride.pickup_location}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        To: {ride.dropoff_location}
                      </Typography>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Chip
                      label={ride.status}
                      color={getStatusColor(ride.status)}
                      sx={{ mr: 1 }}
                    />
                    {ride.status === 'requested' && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAcceptRide(ride.id)}
                      >
                        Accept
                      </Button>
                    )}
                    {ride.status === 'accepted' && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleStartRide(ride.id)}
                      >
                        Start Ride
                      </Button>
                    )}
                    {ride.status === 'in_progress' && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleCompleteRide(ride.id)}
                      >
                        Complete
                      </Button>
                    )}
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <Dialog open={priceDialogOpen} onClose={() => setPriceDialogOpen(false)}>
        <DialogTitle>Complete Ride</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Final Price"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPriceDialogOpen(false)}>Cancel</Button>
          <Button onClick={handlePriceSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default DriverDashboard; 