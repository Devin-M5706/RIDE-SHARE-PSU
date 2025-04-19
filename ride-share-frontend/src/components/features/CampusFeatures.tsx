import {
    CheckCircle as CheckIcon,
    LocationOn as LocationIcon,
    Nightlight as NightIcon,
    Schedule as ScheduleIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    FormControlLabel,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Switch,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Hotspot {
  id: string;
  name: string;
  description: string;
  building: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const hotspots: Hotspot[] = [
  {
    id: 'pattee',
    name: 'Pattee Library',
    description: 'Main entrance, near Starbucks',
    building: 'Pattee Library',
    coordinates: { lat: 40.7934, lng: -77.8600 },
  },
  {
    id: 'hub',
    name: 'HUB-Robeson Center',
    description: 'Front entrance, near the fountain',
    building: 'HUB',
    coordinates: { lat: 40.7984, lng: -77.8599 },
  },
  {
    id: 'east',
    name: 'East Halls',
    description: 'Main entrance, near Findlay Commons',
    building: 'East Halls',
    coordinates: { lat: 40.8084, lng: -77.8560 },
  },
];

interface Class {
  id: string;
  name: string;
  time: string;
  building: string;
  days: string[];
}

const CampusFeatures: React.FC = () => {
  const [isLateNightMode, setIsLateNightMode] = useState(false);
  const [classes, setClasses] = useState<Class[]>([]);
  const [isScheduleSynced, setIsScheduleSynced] = useState(false);

  useEffect(() => {
    // Check if it's after 9 PM
    const hour = new Date().getHours();
    if (hour >= 21 || hour < 6) {
      setIsLateNightMode(true);
    }
  }, []);

  const handleLateNightModeToggle = () => {
    setIsLateNightMode(!isLateNightMode);
  };

  const handleScheduleSync = async () => {
    try {
      // Here you would typically integrate with the university's schedule system
      // For now, we'll simulate syncing some classes
      setClasses([
        {
          id: '1',
          name: 'Computer Science 101',
          time: '9:00 AM - 10:15 AM',
          building: 'Westgate Building',
          days: ['Mon', 'Wed'],
        },
        {
          id: '2',
          name: 'Mathematics 220',
          time: '11:15 AM - 12:05 PM',
          building: 'Thomas Building',
          days: ['Tue', 'Thu'],
        },
      ]);
      setIsScheduleSynced(true);
    } catch (error) {
      console.error('Failed to sync schedule:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Campus Features
      </Typography>

      {/* Hotspot Pickup Zones */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Hotspot Pickup Zones
      </Typography>
      <Grid container spacing={3}>
        {hotspots.map((hotspot) => (
          <Grid item xs={12} sm={6} md={4} key={hotspot.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {hotspot.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {hotspot.description}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Building: {hotspot.building}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<LocationIcon />}>
                  Set as Pickup
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Class Schedule Sync */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Class Schedule Sync
        </Typography>
        <Button
          variant="contained"
          startIcon={<ScheduleIcon />}
          onClick={handleScheduleSync}
          disabled={isScheduleSynced}
        >
          {isScheduleSynced ? 'Schedule Synced' : 'Sync My Schedule'}
        </Button>

        {classes.length > 0 && (
          <List sx={{ mt: 2 }}>
            {classes.map((classItem) => (
              <ListItem key={classItem.id}>
                <ListItemIcon>
                  <CheckIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={classItem.name}
                  secondary={`${classItem.time} | ${classItem.building} | ${classItem.days.join(', ')}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Late Night SafeRide Mode */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Late Night SafeRide Mode
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={isLateNightMode}
              onChange={handleLateNightModeToggle}
              color="primary"
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <NightIcon />
              <Typography>Enable Late Night Safety Features</Typography>
            </Box>
          }
        />
        {isLateNightMode && (
          <Box sx={{ mt: 2 }}>
            <Chip
              icon={<CheckIcon />}
              label="Live Tracking Enabled"
              color="primary"
              sx={{ mr: 1 }}
            />
            <Chip
              icon={<CheckIcon />}
              label="Driver ID Verification"
              color="primary"
              sx={{ mr: 1 }}
            />
            <Chip
              icon={<CheckIcon />}
              label="Check-in Messages"
              color="primary"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CampusFeatures; 