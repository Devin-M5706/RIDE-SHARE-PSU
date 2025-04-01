import {
    Alert,
    Box,
    CircularProgress,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function RideHistory() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
      // Filter completed rides and sort by timestamp
      const completedRides = data
        .filter(ride => ride.status === 'completed')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setRides(completedRides);
    } catch (err) {
      setError('Failed to fetch ride history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Ride History
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : rides.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center">
            No completed rides yet
          </Typography>
        ) : (
          <List>
            {rides.map((ride, index) => (
              <Box key={ride.id}>
                <ListItem>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
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
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ListItemSecondaryAction>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                          <Typography variant="h6" color="primary">
                            {formatPrice(ride.actual_price)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(ride.timestamp)}
                          </Typography>
                        </Box>
                      </ListItemSecondaryAction>
                    </Grid>
                  </Grid>
                </ListItem>
                {index < rides.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
}

export default RideHistory; 