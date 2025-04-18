import { Star } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    Rating,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface ReviewFormProps {
  userId: string;
  userName: string;
  rideId: string;
  isDriver: boolean;
  onSubmit: (review: ReviewData) => void;
}

interface ReviewData {
  rating: number;
  comment: string;
  userId: string;
  rideId: string;
  timestamp: Date;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  userId,
  userName,
  rideId,
  isDriver,
  onSubmit,
}) => {
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!rating) {
      setError('Please provide a rating');
      return;
    }

    if (!comment.trim()) {
      setError('Please provide a review comment');
      return;
    }

    try {
      const reviewData: ReviewData = {
        rating: rating,
        comment: comment.trim(),
        userId,
        rideId,
        timestamp: new Date(),
      };

      // TODO: Implement review submission logic
      onSubmit(reviewData);
      setSuccess(true);
      setRating(0);
      setComment('');
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {isDriver ? 'Rate Your Passenger' : 'Rate Your Driver'}
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          {`Rate your experience with ${userName}`}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Review submitted successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <Typography component="legend" sx={{ mr: 2 }}>
              Rating:
            </Typography>
            <Rating
              name="rating"
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              precision={0.5}
              icon={<Star fontSize="inherit" />}
              size="large"
            />
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={`Share your experience with ${userName}...`}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
          >
            Submit Review
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ReviewForm; 