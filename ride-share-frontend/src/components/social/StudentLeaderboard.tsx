import {
    DirectionsCar,
    Eco,
    EmojiEvents,
    LocalOffer,
    Star
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface Student {
  id: string;
  name: string;
  major: string;
  points: number;
  level: string;
  avatar: string;
  achievements: string[];
  ridesCompleted: number;
  ecoPoints: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  icon: React.ReactNode;
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    major: 'Computer Science',
    points: 850,
    level: 'Gold Rider',
    avatar: '/avatars/student1.jpg',
    achievements: ['Early Bird', 'Eco Champion', '5-Star Rider'],
    ridesCompleted: 25,
    ecoPoints: 120,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    major: 'Business',
    points: 720,
    level: 'Silver Rider',
    avatar: '/avatars/student2.jpg',
    achievements: ['Punctual Pro', 'Social Butterfly'],
    ridesCompleted: 18,
    ecoPoints: 90,
  },
  // Add more mock students as needed
];

const rewards: Reward[] = [
  {
    id: '1',
    title: 'Free Ride',
    description: 'Get one free ride up to $15',
    pointsCost: 500,
    icon: <DirectionsCar />,
  },
  {
    id: '2',
    title: 'Campus Cafe Discount',
    description: '20% off at participating campus cafes',
    pointsCost: 300,
    icon: <LocalOffer />,
  },
  {
    id: '3',
    title: 'Priority Matching',
    description: 'Get priority in ride matching for 1 week',
    pointsCost: 400,
    icon: <Star />,
  },
];

const StudentLeaderboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);
  const currentUser = mockStudents[0]; // Mock current user

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getProgressToNextLevel = (points: number) => {
    const nextLevelThreshold = 1000;
    return (points / nextLevelThreshold) * 100;
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* User Profile Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar
              src={currentUser.avatar}
              sx={{ width: 80, height: 80 }}
            />
            <Box flex={1}>
              <Typography variant="h6">{currentUser.name}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {currentUser.major} • {currentUser.level}
              </Typography>
              <Stack direction="row" spacing={1} mb={2}>
                {currentUser.achievements.map((achievement) => (
                  <Chip
                    key={achievement}
                    label={achievement}
                    size="small"
                    icon={<Star fontSize="small" />}
                    sx={{ bgcolor: (theme) => `${theme.palette.primary.main}15` }}
                  />
                ))}
              </Stack>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Progress to Next Level
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={getProgressToNextLevel(currentUser.points)}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                  {currentUser.points} points
                </Typography>
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab icon={<EmojiEvents />} label="Leaderboard" />
          <Tab icon={<LocalOffer />} label="Rewards" />
          <Tab icon={<Eco />} label="Eco Impact" />
        </Tabs>
      </Box>

      {/* Leaderboard Tab */}
      {tabValue === 0 && (
        <List>
          {mockStudents.map((student, index) => (
            <ListItem
              key={student.id}
              sx={{
                bgcolor: 'background.paper',
                mb: 1,
                borderRadius: 1,
              }}
            >
              <ListItemAvatar>
                <Avatar src={student.avatar}>{index + 1}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={student.name}
                secondary={`${student.points} points • ${student.ridesCompleted} rides`}
              />
              <ListItemSecondaryAction>
                <Chip
                  label={student.level}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      {/* Rewards Tab */}
      {tabValue === 1 && (
        <Stack spacing={2}>
          {rewards.map((reward) => (
            <Card key={reward.id}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {reward.icon}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="h6">{reward.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {reward.description}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    disabled={currentUser.points < reward.pointsCost}
                    onClick={() => setRewardDialogOpen(true)}
                  >
                    {reward.pointsCost} points
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {/* Eco Impact Tab */}
      {tabValue === 2 && (
        <Box>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Eco Impact
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    CO₂ Emissions Saved
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {currentUser.ecoPoints} kg
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Equivalent to
                  </Typography>
                  <Typography variant="body1">
                    {Math.round(currentUser.ecoPoints / 10)} trees planted
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Reward Redemption Dialog */}
      <Dialog open={rewardDialogOpen} onClose={() => setRewardDialogOpen(false)}>
        <DialogTitle>Redeem Reward</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to redeem this reward? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRewardDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => setRewardDialogOpen(false)}
          >
            Confirm Redemption
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentLeaderboard; 