import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Chat,
  School,
  Work,
  EmojiPeople,
  Refresh,
  Star,
} from '@mui/icons-material';

interface IcebreakPrompt {
  id: string;
  category: string;
  question: string;
  icon: React.ReactNode;
}

const prompts: IcebreakPrompt[] = [
  {
    id: '1',
    category: 'Academic',
    question: 'What's your favorite class this semester?',
    icon: <School />,
  },
  {
    id: '2',
    category: 'Career',
    question: 'What internships or jobs are you interested in?',
    icon: <Work />,
  },
  {
    id: '3',
    category: 'Campus Life',
    question: 'What's your favorite spot on campus to study?',
    icon: <EmojiPeople />,
  },
];

const RideshareIcebreakers: React.FC = () => {
  const [currentPrompt, setCurrentPrompt] = useState<IcebreakPrompt>(prompts[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [successfulConnections, setSuccessfulConnections] = useState<string[]>([]);

  const handleNewPrompt = () => {
    const currentIndex = prompts.findIndex(p => p.id === currentPrompt.id);
    const nextIndex = (currentIndex + 1) % prompts.length;
    setCurrentPrompt(prompts[nextIndex]);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConnectionSuccess = () => {
    setSuccessfulConnections([...successfulConnections, currentPrompt.id]);
    handleCloseDialog();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Chat /> Rideshare Icebreakers
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        Break the ice and make connections during your ride!
      </Typography>

      <Card 
        sx={{ 
          bgcolor: 'background.paper',
          mb: 4,
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <CardContent>
          <Stack spacing={3} alignItems="center">
            <Box 
              sx={{ 
                width: 60,
                height: 60,
                borderRadius: '50%',
                bgcolor: (theme) => `${theme.palette.primary.main}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              {currentPrompt.icon}
            </Box>

            <Typography 
              variant="h6" 
              align="center"
              sx={{ 
                maxWidth: 500,
                mx: 'auto',
              }}
            >
              {currentPrompt.question}
            </Typography>

            <Chip 
              label={currentPrompt.category}
              color="primary"
              size="small"
              sx={{ 
                position: 'absolute',
                top: -12,
                right: 16,
              }}
            />

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Refresh />}
                onClick={handleNewPrompt}
              >
                New Question
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Chat />}
                onClick={handleOpenDialog}
              >
                Start Conversation
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Successful Connections */}
      {successfulConnections.length > 0 && (
        <Box>
          <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Star color="primary" /> Recent Connections
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {successfulConnections.map((id) => {
              const prompt = prompts.find(p => p.id === id);
              return (
                <Chip
                  key={id}
                  label={prompt?.category}
                  icon={<Star fontSize="small" />}
                  size="small"
                  sx={{ 
                    bgcolor: (theme) => `${theme.palette.primary.main}15`,
                    color: 'primary.main',
                    mb: 1,
                  }}
                />
              );
            })}
          </Stack>
        </Box>
      )}

      {/* Conversation Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Start a Conversation</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Try asking your ride buddy:
          </Typography>
          <Typography variant="h6" gutterBottom color="primary">
            "{currentPrompt.question}"
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Remember to be respectful and friendly. Great conversations can lead to lasting connections!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleConnectionSuccess} 
            variant="contained" 
            color="primary"
            startIcon={<Star />}
          >
            Great Conversation!
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RideshareIcebreakers; 