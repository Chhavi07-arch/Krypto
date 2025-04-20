// src/pages/Learn.jsx
import { useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { useFavorites } from '../context/FavoritesContext';
import CoinCard from '../components/CoinCard';

const Learn = () => {
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const { favorites } = useFavorites();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.length < 5) {
      setError('Feedback must be at least 5 characters');
      return;
    }
    setError('');
    alert('Feedback submitted!');
    setFeedback('');
  };

  const videos = [
    { title: 'Crypto for Beginners', url: 'https://www.youtube.com/watch?v=SkRwB6Wha28' },
    { title: 'How to Invest in Crypto', url: 'https://www.youtube.com/watch?v=2x3Qfr7V6PA' },
  ];

  return (
    <Box className="bg-gray-900 min-h-screen text-white">
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom className="text-blue-400">
          Learn About Crypto
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {videos.map((video, index) => (
            <Box
              key={index}
              sx={{ bgcolor: '#1a1c22', p: 3, borderRadius: 2, width: { xs: '100%', md: '30%' } }}
              className="shadow-lg"
            >
              <Typography variant="h6" className="text-blue-400">{video.title}</Typography>
              <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Watch Now
              </a>
            </Box>
          ))}
        </Box>
        <Typography variant="h5" className="text-blue-400 mb-2">
          Your Favorite Coins
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {favorites.length ? favorites.map(coin => (
            <CoinCard key={coin.id} coin={coin} />
          )) : (
            <Typography>No favorites yet. Add some from the Rates page!</Typography>
          )}
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Typography variant="h5" className="text-blue-400 mb-2">
            Share Your Feedback
          </Typography>
          <TextField
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts"
            variant="outlined"
            multiline
            rows={4}
            sx={{ width: { xs: '100%', md: '500px' }, bgcolor: '#fff', mb: 2 }}
            className="rounded"
          />
          {error && <Typography color="error" className="text-sm">{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: '#1976d2', px: 4 }}
            className="hover:bg-blue-700"
          >
            Submit
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Learn;