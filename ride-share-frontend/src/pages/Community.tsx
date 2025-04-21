import {
    Chat,
    EmojiEvents,
    Groups,
} from '@mui/icons-material';
import {
    Box,
    Container,
    Paper,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import FriendRideMatching from '../components/social/FriendRideMatching';
import RideshareIcebreakers from '../components/social/RideshareIcebreakers';
import StudentLeaderboard from '../components/social/StudentLeaderboard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`community-tabpanel-${index}`}
      aria-labelledby={`community-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Community: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Groups fontSize="large" /> PSU Rideshare Community
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Connect with fellow students, earn rewards, and make your rides more enjoyable!
        </Typography>
      </Box>

      <Paper sx={{ bgcolor: 'background.paper' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              py: 2,
            },
          }}
        >
          <Tab 
            icon={<EmojiEvents />} 
            label="Leaderboard & Rewards" 
            sx={{ textTransform: 'none' }}
          />
          <Tab 
            icon={<Groups />} 
            label="Friend Matching" 
            sx={{ textTransform: 'none' }}
          />
          <Tab 
            icon={<Chat />} 
            label="Icebreakers" 
            sx={{ textTransform: 'none' }}
          />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <StudentLeaderboard />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <FriendRideMatching />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <RideshareIcebreakers />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Community; 