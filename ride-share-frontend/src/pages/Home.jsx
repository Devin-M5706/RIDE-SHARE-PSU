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
    Fade,
    Grid,
    Paper,
    Slide,
    Typography,
    Zoom
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import drivuLogo from '../assets/drivu-logo.svg';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

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
      <Fade in={showContent} timeout={1000}>
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            py: 8,
            mb: 6,
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          }}
        >
          <Container maxWidth="md">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Slide direction="right" in={showContent} timeout={1000}>
                  <Box>
                    <Typography variant="h2" component="h1" gutterBottom>
                      Welcome to Drivu
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4 }}>
                      Your premium ride-sharing experience at Penn State. Safe, reliable, and convenient.
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={() => navigate(currentUser ? '/request-ride' : '/register')}
                      sx={{
                        background: 'linear-gradient(45deg, #FF6B6B 30%, #FFE66D 90%)',
                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        }
                      }}
                    >
                      {currentUser ? 'Book a Ride' : 'Get Started'}
                    </Button>
                  </Box>
                </Slide>
              </Grid>
              <Grid item xs={12} md={6}>
                <Zoom in={showContent} timeout={1000}>
                  <Box
                    component="img"
                    src={drivuLogo}
                    alt="Drivu"
                    sx={{
                      width: '100%',
                      maxWidth: 500,
                      borderRadius: 2,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      }
                    }}
                  />
                </Zoom>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Fade>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Fade in={showContent} timeout={1500}>
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Why Choose Drivu
          </Typography>
        </Fade>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Zoom in={showContent} timeout={1000 + index * 200}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
                    }
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
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="md">
          <Slide direction="up" in={showContent} timeout={1500}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                color: 'white',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                }
              }}
            >
              <Typography variant="h4" component="h2" gutterBottom>
                Ready to Experience Drivu?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4 }}>
                Join our exclusive community of Penn State riders and drivers today.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  background: 'linear-gradient(45deg, #FF6B6B 30%, #FFE66D 90%)',
                  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  }
                }}
              >
                Sign Up Now
              </Button>
            </Paper>
          </Slide>
        </Container>
      </Box>
    </Box>
  );
}

export default Home; 