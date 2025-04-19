import { Support as SupportIcon, Translate as TranslateIcon } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
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
];

const InternationalStudentSafety: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLanguageChange = (event: any) => {
    setSelectedLanguage(event.target.value);
  };

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };

  const handleEmergencySupport = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Here you would typically make an API call to connect with support
      // For now, we'll simulate the connection
      setTimeout(() => {
        setIsDialogOpen(true);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to connect to support. Please try again.');
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <SupportIcon /> International Student Safety
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Get immediate translation support or connect with someone who speaks your language in case of emergencies.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Your Language</InputLabel>
        <Select
          value={selectedLanguage}
          label="Select Your Language"
          onChange={handleLanguageChange}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Your Message"
        value={message}
        onChange={handleMessageChange}
        placeholder="Describe your situation or question..."
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleEmergencySupport}
        disabled={!selectedLanguage || !message || isLoading}
        startIcon={isLoading ? <CircularProgress size={20} /> : <TranslateIcon />}
        fullWidth
      >
        {isLoading ? 'Connecting...' : 'Get Emergency Support'}
      </Button>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Support Connected</DialogTitle>
        <DialogContent>
          <Typography>
            A support representative who speaks {languages.find(lang => lang.code === selectedLanguage)?.name} 
            will assist you shortly. Please stay on the line.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InternationalStudentSafety; 