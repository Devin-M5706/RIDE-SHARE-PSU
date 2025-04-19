import {
    AccountCircle,
    DirectionsCar,
    Groups,
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
} from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
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
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <DirectionsCar /> Drivu
          </Typography>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleNavigate('/dashboard')}>Dashboard</MenuItem>
            <MenuItem onClick={() => handleNavigate('/request-ride')}>Request Ride</MenuItem>
            <MenuItem onClick={() => handleNavigate('/ride-history')}>Ride History</MenuItem>
            <MenuItem onClick={() => handleNavigate('/social')}>
              <Groups sx={{ mr: 1 }} /> Social Hub
            </MenuItem>
            <MenuItem onClick={() => handleNavigate('/features')}>
              <Language sx={{ mr: 1 }} /> International Features
            </MenuItem>
            <MenuItem onClick={() => handleNavigate('/features#campus')}>
              <NightsStay sx={{ mr: 1 }} /> Campus Features
            </MenuItem>
          </Menu>

          <Button 
            color="inherit" 
            startIcon={<AccountCircle />}
            onClick={() => handleNavigate('/login')}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>

      <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Drivu - Penn State's Premium Ride-Sharing Service
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 