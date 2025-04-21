import { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { useFavorites } from '../context/FavoritesContext';

const Learn = () => {
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState([]);
  const { favorites } = useFavorites();

  useEffect(() => {
    const savedFeedback = localStorage.getItem('feedback');
    if (savedFeedback) {
      setSubmittedFeedback(JSON.parse(savedFeedback));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.length < 5) {
      setError('Feedback must be at least 5 characters');
      return;
    }
    setError('');
    const newFeedback = { id: Date.now(), text: feedback, timestamp: new Date().toISOString() };
    const updatedFeedback = [...submittedFeedback, newFeedback];
    setSubmittedFeedback(updatedFeedback);
    localStorage.setItem('feedback', JSON.stringify(updatedFeedback));
    alert('Feedback submitted!');
    setFeedback('');
  };

  const videos = [
    { title: 'Crypto for Beginners', url: 'https://www.youtube.com/watch?v=SkRwB6Wha28' },
    { title: 'How to Invest in Crypto', url: 'https://www.youtube.com/watch?v=2x3Qfr7V6PA' },
    { title: 'Understanding Blockchain', url: 'https://www.youtube.com/watch?v=SSo_EIwHSd4' },
    { title: 'Crypto Trading Strategies', url: 'https://www.youtube.com/watch?v=8X8zVYk8Q-c' },
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <img
                  src="/youtube-logo.png" 
                  alt="YouTube"
                  style={{ width: '20px', height: '20px' }}
                  onError={(e) => { e.target.style.display = 'none'; }} 
                />
                <Typography variant="h6" className="text-blue-400">{video.title}</Typography>
              </Box>
              <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Watch Now
              </a>
            </Box>
          ))}
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
          {submittedFeedback.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography className="text-white">Submitted Feedback:</Typography>
              <ul>
                {submittedFeedback.map((item) => (
                  <li key={item.id} className="text-blue-400">{item.text} (Submitted: {new Date(item.timestamp).toLocaleString()})</li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Learn;

