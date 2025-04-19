import {
    Add,
    DirectionsCar,
    ExitToApp,
    Menu as MenuIcon,
    Message,
    Person,
} from '@mui/icons-material';
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import drivuLogo from '../assets/drivu-logo.svg';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
    children: React.ReactNode;
}

const drawerWidth = 240;

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, logout } = useAuth();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    const navigationItems = [
        { text: 'Home', icon: <DirectionsCar />, path: '/' },
        { text: 'Request Ride', icon: <Add />, path: '/request-ride' },
        { text: 'Ride History', icon: <Message />, path: '/ride-history' },
        { text: 'Profile', icon: <Person />, path: '/profile' },
    ];

    const drawer = (
        <div>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                    component="img"
                    src={drivuLogo}
                    alt="Drivu"
                    sx={{ 
                        height: 48, 
                        width: 48,
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.1)',
                        }
                    }}
                />
                <Typography variant="h6" noWrap sx={{ color: theme.palette.primary.main }}>
                    Drivu
                </Typography>
            </Toolbar>
            <List>
                {navigationItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => handleNavigation(item.path)}
                        selected={location.pathname === item.path}
                    >
                        <ListItemIcon sx={{ color: theme.palette.primary.main }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
                    borderBottom: `1px solid ${theme.palette.primary.main}`,
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box
                        component="img"
                        src={drivuLogo}
                        alt="Drivu"
                        sx={{ 
                            height: 40, 
                            width: 40,
                            mr: 2,
                            display: { xs: 'none', sm: 'block' },
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            }
                        }}
                    />
                    <Typography 
                        variant="h6" 
                        noWrap 
                        component="div" 
                        sx={{ 
                            flexGrow: 1,
                            color: theme.palette.primary.main,
                            fontWeight: 600
                        }}
                    >
                        Drivu
                    </Typography>
                    {!currentUser ? (
                        <Box>
                            <Button
                                color="primary"
                                onClick={() => handleNavigation('/login')}
                                sx={{
                                    mr: 1,
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'transform 0.2s'
                                }}
                            >
                                Login
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => handleNavigation('/register')}
                                sx={{
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'transform 0.2s'
                                }}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    ) : (
                        <IconButton
                            color="primary"
                            onClick={handleLogout}
                            sx={{
                                '&:hover': {
                                    transform: 'rotate(180deg)',
                                },
                                transition: 'transform 0.3s'
                            }}
                        >
                            <ExitToApp />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            borderRight: `1px solid ${theme.palette.primary.main}`,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            borderRight: `1px solid ${theme.palette.primary.main}`,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: '64px',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Layout; 