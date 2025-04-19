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
    useTheme
} from '@mui/material';
import React from 'react';
import FriendRideMatching from './FriendRideMatching';
import RideshareIcebreakers from './RideshareIcebreakers';
import StudentLeaderboard from './StudentLeaderboard';

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
      id={`social-tabpanel-${index}`}
      aria-labelledby={`social-tab-${index}`}
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

const SocialHub: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Social Hub
      </Typography>

      <Paper 
        sx={{ 
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: theme.shadows[2],
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            sx={{
              bgcolor: 'background.paper',
              '& .MuiTab-root': {
                py: 2,
              },
            }}
          >
            <Tab 
              icon={<Groups />} 
              label="Friend Matching" 
              sx={{ textTransform: 'none' }}
            />
            <Tab 
              icon={<EmojiEvents />} 
              label="Leaderboard & Rewards" 
              sx={{ textTransform: 'none' }}
            />
            <Tab 
              icon={<Chat />} 
              label="Icebreakers" 
              sx={{ textTransform: 'none' }}
            />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <FriendRideMatching />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StudentLeaderboard />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RideshareIcebreakers />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default SocialHub; 