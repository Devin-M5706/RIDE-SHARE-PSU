import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface RidePostData {
    pickupLocation: string;
    dropoffLocation: string;
    departureTime: Date | null;
    availableSeats: number;
    pricePerSeat: number;
    description: string;
    isDriver: boolean;
    pickupLat: number | null;
    pickupLng: number | null;
    dropoffLat: number | null;
    dropoffLng: number | null;
}

const containerStyle = {
    width: '100%',
    height: '400px',
};

const defaultCenter = {
    lat: 40.7934, // Penn State coordinates
    lng: -77.8600,
};

const RidePostForm: React.FC = () => {
    const [formData, setFormData] = useState<RidePostData>({
        pickupLocation: '',
        dropoffLocation: '',
        departureTime: null,
        availableSeats: 1,
        pricePerSeat: 0,
        description: '',
        isDriver: true,
        pickupLat: null,
        pickupLng: null,
        dropoffLat: null,
        dropoffLng: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [map, setMap] = useState<any>(null);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name as string]: value,
        }));
    };

    const handleDateChange = (newValue: Date | null) => {
        setFormData(prev => ({
            ...prev,
            departureTime: newValue,
        }));
    };

    const handleMapLoad = (map: any) => {
        setMap(map);
    };

    const handleLocationSearch = async (location: string, isPickup: boolean) => {
        try {
            setLoading(true);
            setError('');
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    location
                )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
            );
            const data = await response.json();
            
            if (data.results && data.results[0]) {
                const { location } = data.results[0].geometry;
                if (isPickup) {
                    setFormData(prev => ({
                        ...prev,
                        pickupLat: location.lat,
                        pickupLng: location.lng,
                    }));
                } else {
                    setFormData(prev => ({
                        ...prev,
                        dropoffLat: location.lat,
                        dropoffLng: location.lng,
                    }));
                }
                map.panTo(location);
            } else {
                setError(`${isPickup ? 'Pickup' : 'Dropoff'} location not found`);
            }
        } catch (err) {
            setError(`Error searching for ${isPickup ? 'pickup' : 'dropoff'} location`);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.departureTime) {
            setError('Please select a departure time');
            return;
        }

        if (!formData.pickupLat || !formData.pickupLng || !formData.dropoffLat || !formData.dropoffLng) {
            setError('Please select both pickup and dropoff locations on the map');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('http://localhost:8000/api/rides/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await currentUser?.getIdToken()}`,
                },
                body: JSON.stringify({
                    pickup_location: formData.pickupLocation,
                    dropoff_location: formData.dropoffLocation,
                    pickup_lat: formData.pickupLat,
                    pickup_lng: formData.pickupLng,
                    dropoff_lat: formData.dropoffLat,
                    dropoff_lng: formData.dropoffLng,
                    departure_time: formData.departureTime?.toISOString(),
                    available_seats: formData.availableSeats,
                    price_per_seat: formData.pricePerSeat,
                    description: formData.description,
                    is_driver: formData.isDriver,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create ride post');
            }

            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create ride post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    {formData.isDriver ? 'Offer a Ride' : 'Request a Ride'}
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>I want to...</InputLabel>
                        <Select
                            name="isDriver"
                            value={formData.isDriver}
                            onChange={handleChange}
                            label="I want to..."
                        >
                            <MenuItem value={true}>Offer a Ride (Driver)</MenuItem>
                            <MenuItem value={false}>Request a Ride (Passenger)</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Pickup Location"
                            value={formData.pickupLocation}
                            onChange={(e) => {
                                setFormData(prev => ({ ...prev, pickupLocation: e.target.value }));
                            }}
                            margin="normal"
                            required
                        />
                        <Button
                            variant="contained"
                            onClick={() => handleLocationSearch(formData.pickupLocation, true)}
                            disabled={loading}
                            sx={{ mt: 2 }}
                        >
                            Search
                        </Button>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Dropoff Location"
                            value={formData.dropoffLocation}
                            onChange={(e) => {
                                setFormData(prev => ({ ...prev, dropoffLocation: e.target.value }));
                            }}
                            margin="normal"
                            required
                        />
                        <Button
                            variant="contained"
                            onClick={() => handleLocationSearch(formData.dropoffLocation, false)}
                            disabled={loading}
                            sx={{ mt: 2 }}
                        >
                            Search
                        </Button>
                    </Box>

                    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={defaultCenter}
                            zoom={13}
                            onLoad={handleMapLoad}
                        >
                            {formData.pickupLat && formData.pickupLng && (
                                <Marker
                                    position={{ lat: formData.pickupLat, lng: formData.pickupLng }}
                                    title="Pickup Location"
                                    icon={{
                                        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                                    }}
                                />
                            )}
                            {formData.dropoffLat && formData.dropoffLng && (
                                <Marker
                                    position={{ lat: formData.dropoffLat, lng: formData.dropoffLng }}
                                    title="Dropoff Location"
                                    icon={{
                                        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                                    }}
                                />
                            )}
                        </GoogleMap>
                    </LoadScript>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Departure Time"
                            value={formData.departureTime}
                            onChange={handleDateChange}
                            sx={{ mt: 2, width: '100%' }}
                        />
                    </LocalizationProvider>

                    {formData.isDriver && (
                        <>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Available Seats"
                                name="availableSeats"
                                type="number"
                                value={formData.availableSeats}
                                onChange={handleChange}
                                inputProps={{ min: 1, max: 8 }}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Price per Seat"
                                name="pricePerSeat"
                                type="number"
                                value={formData.pricePerSeat}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                            />
                        </>
                    )}

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Additional Details"
                        name="description"
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        helperText="Add any additional information about the ride"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : (formData.isDriver ? 'Post Ride Offer' : 'Post Ride Request')}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default RidePostForm; 