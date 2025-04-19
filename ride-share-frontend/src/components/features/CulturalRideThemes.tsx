import { Pause, PlayArrow } from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    IconButton,
    Typography
} from '@mui/material';
import React, { useState } from 'react';

interface Theme {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  musicGenre: string;
  color: string;
}

const themes: Theme[] = [
  {
    id: 'kpop',
    name: 'K-pop Vibes',
    description: 'Latest K-pop hits and vibrant visuals',
    imageUrl: '/assets/themes/kpop.jpg',
    musicGenre: 'K-pop',
    color: '#FF69B4',
  },
  {
    id: 'afrobeat',
    name: 'Afrobeat Groove',
    description: 'Energetic Afrobeat rhythms and African culture',
    imageUrl: '/assets/themes/afrobeat.jpg',
    musicGenre: 'Afrobeat',
    color: '#FFA500',
  },
  {
    id: 'bollywood',
    name: 'Bollywood Beats',
    description: 'Colorful Bollywood music and dance',
    imageUrl: '/assets/themes/bollywood.jpg',
    musicGenre: 'Bollywood',
    color: '#FF0000',
  },
  {
    id: 'lofi',
    name: 'Lo-fi Study',
    description: 'Chill beats to study/relax to',
    imageUrl: '/assets/themes/lofi.jpg',
    musicGenre: 'Lo-fi',
    color: '#4169E1',
  },
];

interface CulturalRideThemesProps {
  onThemeSelected: (theme: Theme) => void;
}

const CulturalRideThemes: React.FC<CulturalRideThemesProps> = ({ onThemeSelected }) => {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    onThemeSelected(theme);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Here you would typically control the music player
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Cultural Ride Themes
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Choose a theme to enhance your ride experience with curated music and visuals.
      </Typography>

      <Grid container spacing={3}>
        {themes.map((theme) => (
          <Grid item xs={12} sm={6} md={3} key={theme.id}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
                border: selectedTheme?.id === theme.id ? `2px solid ${theme.color}` : 'none',
              }}
              onClick={() => handleThemeSelect(theme)}
            >
              <CardMedia
                component="img"
                height="140"
                image={theme.imageUrl}
                alt={theme.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {theme.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {theme.description}
                </Typography>
                <Chip
                  label={theme.musicGenre}
                  size="small"
                  sx={{ mt: 1, bgcolor: theme.color, color: 'white' }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedTheme && (
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={togglePlay}
            sx={{
              bgcolor: selectedTheme.color,
              color: 'white',
              '&:hover': {
                bgcolor: selectedTheme.color,
                opacity: 0.9,
              },
            }}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
          <Typography variant="body1">
            Now playing: {selectedTheme.name} theme
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CulturalRideThemes; 