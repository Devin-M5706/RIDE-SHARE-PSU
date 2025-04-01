import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Paper,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const features = [
    {
      icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />,
      title: 'Easy Ride Booking',
      description: 'Book your ride in just a few clicks with our user-friendly interface.',
    },
    {
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      title: 'Trusted Drivers',
      description: 'Our drivers are verified and rated by the community for your safety.',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Quick Pickup',
      description: 'Get picked up quickly by nearby available drivers.',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Safe Travel',
      description: 'Track your ride in real-time and share your location with friends.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Your Ride, Your Way
              </Typography>
              <Typography variant="h5" sx={{ mb: 4 }}>
                Book a ride with trusted drivers in your area. Safe, reliable, and convenient.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate(currentUser ? '/request-ride' : '/register')}
              >
                {currentUser ? 'Book a Ride' : 'Get Started'}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/hero-image.jpg"
                alt="Ride Share"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Why Choose Us
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: 'center',
              background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
              color: 'white',
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to Start Riding?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Join our community of riders and drivers today.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/register')}
            >
              Sign Up Now
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default Home; 