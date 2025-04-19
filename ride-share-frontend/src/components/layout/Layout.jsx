import {
    AccountCircle,
    DirectionsCar,
    Language,
    Menu as MenuIcon,
    NightsStay,
} from '@mui/icons-material';
import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useTheme,
} from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
      }}
    >
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'black',
          borderBottom: `1px solid ${theme.palette.primary.main}30`,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography 
            variant="h6" 
            component={Link} 
            to="/"
            sx={{ 
              flexGrow: 1,
              textDecoration: 'none',
              color: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontWeight: 'bold',
              letterSpacing: 1,
            }}
          >
            <DirectionsCar /> DRIVU
          </Typography>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                bgcolor: 'black',
                border: `1px solid ${theme.palette.primary.main}30`,
                '& .MuiMenuItem-root': {
                  color: theme.palette.text.primary,
                  '&:hover': {
                    bgcolor: `${theme.palette.primary.main}10`,
                  },
                },
              },
            }}
          >
            <MenuItem onClick={() => handleNavigate('/dashboard')}>Dashboard</MenuItem>
            <MenuItem onClick={() => handleNavigate('/request-ride')}>Request Ride</MenuItem>
            <MenuItem onClick={() => handleNavigate('/ride-history')}>Ride History</MenuItem>
            <MenuItem onClick={() => handleNavigate('/features')}>
              <Language sx={{ mr: 1 }} /> International Features
            </MenuItem>
            <MenuItem onClick={() => handleNavigate('/features#campus')}>
              <NightsStay sx={{ mr: 1 }} /> Campus Features
            </MenuItem>
          </Menu>

          <Button 
            color="primary"
            startIcon={<AccountCircle />}
            onClick={() => handleNavigate('/login')}
            sx={{
              '&:hover': {
                bgcolor: `${theme.palette.primary.main}20`,
              },
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Toolbar /> {/* This creates space below the fixed AppBar */}

      <Container 
        component="main" 
        sx={{ 
          flex: 1, 
          py: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Container>

      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          bgcolor: 'black',
          borderTop: `1px solid ${theme.palette.primary.main}30`,
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="body2" 
            color="primary" 
            align="center"
            sx={{ 
              opacity: 0.8,
              fontWeight: 500,
            }}
          >
            © {new Date().getFullYear()} DRIVU - Penn State's Premium Ride-Sharing Service
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 