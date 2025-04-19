import { Language as LanguageIcon } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'zh', name: 'Chinese' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ar', name: 'Arabic' },
  { code: 'ko', name: 'Korean' },
  { code: 'ja', name: 'Japanese' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
];

interface LanguageBuddyProps {
  onMatchFound: (driverId: string) => void;
}

const LanguageBuddy: React.FC<LanguageBuddyProps> = ({ onMatchFound }) => {
  const [primaryLanguage, setPrimaryLanguage] = useState<string>('');
  const [learningLanguages, setLearningLanguages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePrimaryLanguageChange = (event: any) => {
    setPrimaryLanguage(event.target.value);
  };

  const handleLearningLanguageChange = (event: any) => {
    setLearningLanguages(event.target.value);
  };

  const findLanguageMatch = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Here you would typically make an API call to find matching drivers
      // For now, we'll simulate a successful match
      setTimeout(() => {
        onMatchFound('driver123');
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to find a language match. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LanguageIcon /> Language Buddy
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Get matched with drivers who speak your language or are learning the same languages as you.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Primary Language</InputLabel>
        <Select
          value={primaryLanguage}
          label="Primary Language"
          onChange={handlePrimaryLanguageChange}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Languages I'm Learning</InputLabel>
        <Select
          multiple
          value={learningLanguages}
          label="Languages I'm Learning"
          onChange={handleLearningLanguageChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={languages.find((lang) => lang.code === value)?.name}
                />
              ))}
            </Box>
          )}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={findLanguageMatch}
        disabled={!primaryLanguage || isLoading}
        startIcon={isLoading ? <CircularProgress size={20} /> : null}
        fullWidth
      >
        {isLoading ? 'Finding Match...' : 'Find Language Buddy'}
      </Button>
    </Box>
  );
};

export default LanguageBuddy; 