import {
    AccessTime,
    DirectionsCar,
    LocationOn,
    Message,
    Search,
    Star,
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface RidePost {
    id: string;
    driver: {
        name: string;
        rating: number;
        avatar: string;
    };
    pickupLocation: string;
    dropoffLocation: string;
    departureTime: Date;
    availableSeats: number;
    pricePerSeat: number;
    description: string;
    pickupLat: number;
    pickupLng: number;
    dropoffLat: number;
    dropoffLng: number;
}

const RideList: React.FC = () => {
    const [rides, setRides] = useState<RidePost[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchRides = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8000/api/rides/', {
                    headers: {
                        'Authorization': `Bearer ${await currentUser?.getIdToken()}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch rides');
                }
                const data = await response.json();
                setRides(data.map((ride: any) => ({
                    ...ride,
                    departureTime: new Date(ride.departure_time),
                })));
            } catch (err) {
                setError('Failed to load rides. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) {
            fetchRides();
        }
    }, [currentUser]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleMessageDriver = (rideId: string) => {
        // TODO: Implement messaging functionality
        console.log('Message driver for ride:', rideId);
    };

    const handleBookRide = async (rideId: string) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/api/rides/${rideId}/book/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${await currentUser?.getIdToken()}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to book ride');
            }
            // Refresh rides list
            const updatedRides = rides.map(ride => 
                ride.id === rideId 
                    ? { ...ride, availableSeats: ride.availableSeats - 1 }
                    : ride
            );
            setRides(updatedRides);
        } catch (err) {
            setError('Failed to book ride. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const filteredRides = rides.filter(ride => 
        ride.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.dropoffLocation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by location or destination..."
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {filteredRides.map((ride) => (
                        <Grid item xs={12} md={6} key={ride.id}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Avatar src={ride.driver.avatar} sx={{ mr: 2 }}>
                                            {ride.driver.name.charAt(0)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6">{ride.driver.name}</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Star sx={{ color: 'gold', mr: 0.5 }} />
                                                <Typography variant="body2">{ride.driver.rating}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box sx={{ mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <LocationOn color="primary" sx={{ mr: 1 }} />
                                            <Typography>From: {ride.pickupLocation}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <LocationOn color="secondary" sx={{ mr: 1 }} />
                                            <Typography>To: {ride.dropoffLocation}</Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <AccessTime sx={{ mr: 1 }} />
                                        <Typography>
                                            {format(ride.departureTime, 'MMM d, yyyy h:mm a')}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <DirectionsCar sx={{ mr: 1 }} />
                                        <Typography>{ride.availableSeats} seats available</Typography>
                                        <Chip
                                            label={`$${ride.pricePerSeat}/seat`}
                                            color="primary"
                                            sx={{ ml: 'auto' }}
                                        />
                                    </Box>

                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {ride.description}
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleMessageDriver(ride.id)}
                                        >
                                            <Message />
                                        </IconButton>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleBookRide(ride.id)}
                                            disabled={ride.availableSeats === 0}
                                        >
                                            {ride.availableSeats === 0 ? 'No Seats Available' : 'Book Ride'}
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default RideList; 