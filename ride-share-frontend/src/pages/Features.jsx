import { Box, Container, Divider, Typography } from '@mui/material';
import React from 'react';
import CampusFeatures from '../components/features/CampusFeatures';
import CulturalRideThemes from '../components/features/CulturalRideThemes';
import InternationalStudentSafety from '../components/features/InternationalStudentSafety';
import LanguageBuddy from '../components/features/LanguageBuddy';

const Features = () => {
  const handleLanguageMatch = (driverId) => {
    console.log('Matched with driver:', driverId);
    // Here you would typically navigate to the ride booking page
  };

  const handleThemeSelected = (theme) => {
    console.log('Selected theme:', theme);
    // Here you would typically start playing the selected theme's music
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Enhanced Features
        </Typography>
        
        <Typography variant="subtitle1" color="text.secondary" align="center" paragraph>
          Discover our unique features designed for international students and campus life
        </Typography>

        {/* International & Cultural Features */}
        <Box sx={{ my: 6 }}>
          <Typography variant="h5" gutterBottom>
            International & Cultural Features
          </Typography>
          
          <LanguageBuddy onMatchFound={handleLanguageMatch} />
          
          <Divider sx={{ my: 4 }} />
          
          <CulturalRideThemes onThemeSelected={handleThemeSelected} />
          
          <Divider sx={{ my: 4 }} />
          
          <InternationalStudentSafety />
        </Box>

        {/* Campus-Specific Features */}
        <Box sx={{ my: 6 }}>
          <Typography variant="h5" gutterBottom>
            Campus-Specific Features
          </Typography>
          
          <CampusFeatures />
        </Box>
      </Box>
    </Container>
  );
};

export default Features; 