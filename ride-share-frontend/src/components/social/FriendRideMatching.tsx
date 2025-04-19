import {
    DirectionsCar,
    Notifications,
    PersonAdd,
    School
} from '@mui/icons-material';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Grid,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  major: string;
  year: string;
  rides: number;
}

const mockFriends: Friend[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: '/avatars/sarah.jpg',
    major: 'Computer Science',
    year: 'Junior',
    rides: 15,
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: '/avatars/mike.jpg',
    major: 'Engineering',
    year: 'Senior',
    rides: 23,
  },
  {
    id: '3',
    name: 'Emma Davis',
    avatar: '/avatars/emma.jpg',
    major: 'Business',
    year: 'Sophomore',
    rides: 8,
  },
];

const FriendRideMatching: React.FC = () => {
  const [friends] = useState<Friend[]>(mockFriends);
  const [activeRideRequests] = useState<Friend[]>([mockFriends[1]]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <DirectionsCar /> Friend Ride Matching
      </Typography>

      {/* Active Ride Requests */}
      {activeRideRequests.length > 0 && (
        <Alert 
          severity="info" 
          sx={{ 
            mb: 4,
            bgcolor: (theme) => `${theme.palette.primary.main}15`,
            border: (theme) => `1px solid ${theme.palette.primary.main}30`,
            '& .MuiAlert-icon': {
              color: 'primary.main',
            },
          }}
          action={
            <Button color="primary" size="small">
              View Details
            </Button>
          }
        >
          {activeRideRequests[0].name} is looking for a ride to campus!
        </Alert>
      )}

      {/* Friends List */}
      <Grid container spacing={3}>
        {friends.map((friend) => (
          <Grid item xs={12} sm={6} md={4} key={friend.id}>
            <Card 
              sx={{ 
                bgcolor: 'background.paper',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Avatar
                    src={friend.avatar}
                    sx={{ 
                      width: 56, 
                      height: 56,
                      border: (theme) => `2px solid ${theme.palette.primary.main}`,
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{friend.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {friend.major} • {friend.year}
                    </Typography>
                  </Box>
                  <IconButton color="primary">
                    <Notifications />
                  </IconButton>
                </Stack>

                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip 
                    icon={<School />} 
                    label={`${friend.rides} Rides`}
                    size="small"
                    sx={{ 
                      bgcolor: (theme) => `${theme.palette.primary.main}15`,
                      color: 'primary.main',
                    }}
                  />
                </Stack>

                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  startIcon={<DirectionsCar />}
                >
                  Plan Ride Together
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Add Friend Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card 
            sx={{ 
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: (theme) => `${theme.palette.primary.main}05`,
              border: (theme) => `2px dashed ${theme.palette.primary.main}30`,
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: (theme) => `${theme.palette.primary.main}10`,
              },
            }}
          >
            <CardContent>
              <Stack alignItems="center" spacing={2}>
                <IconButton 
                  color="primary"
                  sx={{ 
                    bgcolor: (theme) => `${theme.palette.primary.main}15`,
                    p: 2,
                  }}
                >
                  <PersonAdd fontSize="large" />
                </IconButton>
                <Typography color="primary" variant="h6">
                  Add Friends
                </Typography>
                <Typography color="text.secondary" variant="body2" align="center">
                  Connect with classmates to share rides
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FriendRideMatching; 