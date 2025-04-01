import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    Grid,
    Paper,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const [currentRide, setCurrentRide] = useState(null);
  const [recentRides, setRecentRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

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
      
      // Find current active ride
      const activeRide = data.find(ride => 
        ['requested', 'accepted', 'in_progress'].includes(ride.status)
      );
      setCurrentRide(activeRide);

      // Get recent completed rides
      const completedRides = data
        .filter(ride => ride.status === 'completed')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 3);
      setRecentRides(completedRides);
    } catch (err) {
      setError('Failed to fetch rides');
    } finally {
      setLoading(false);
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Current Ride Section */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4">Current Ride</Typography>
              {!currentRide && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/request-ride')}
                >
                  Request a Ride
                </Button>
              )}
            </Box>

            {currentRide ? (
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Ride #{currentRide.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        From: {currentRide.pickup_location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        To: {currentRide.dropoff_location}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Chip
                          label={currentRide.status}
                          color={getStatusColor(currentRide.status)}
                          sx={{ mb: 1 }}
                        />
                        {currentRide.driver && (
                          <Typography variant="body2" color="text.secondary">
                            Driver: {currentRide.driver_username}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ) : (
              <Typography variant="body1" color="text.secondary" align="center">
                No active rides
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Recent Rides Section */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Recent Rides
            </Typography>

            {recentRides.length === 0 ? (
              <Typography variant="body1" color="text.secondary" align="center">
                No recent rides
              </Typography>
            ) : (
              <Box>
                {recentRides.map((ride, index) => (
                  <Box key={ride.id}>
                    <Card>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>
                              Ride #{ride.id}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              From: {ride.pickup_location}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              To: {ride.dropoff_location}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                              <Typography variant="h6" color="primary">
                                {formatPrice(ride.actual_price)}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {formatDate(ride.timestamp)}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                    {index < recentRides.length - 1 && <Divider sx={{ my: 2 }} />}
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard; 