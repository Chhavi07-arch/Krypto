// src/pages/News.jsx
import { useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import newsData from '../assets/news.json';

const News = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Invalid email address');
      return;
    }
    setError('');
    alert('Subscribed to newsletter!');
    setEmail('');
  };

  return (
    <Box className="bg-gray-900 min-h-screen text-white">
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom className="text-blue-400">
          Latest Crypto News
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {newsData.map((news, index) => (
            <Box
              key={index}
              sx={{ bgcolor: '#1a1c22', p: 3, borderRadius: 2, width: { xs: '100%', md: '30%' } }}
              className="shadow-lg"
            >
              <Typography variant="h6" className="text-blue-400">{news.title}</Typography>
              <Typography>{news.summary}</Typography>
            </Box>
          ))}
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Typography variant="h5" className="text-blue-400 mb-2">
            Subscribe to Newsletter
          </Typography>
          <Box className="flex flex-col md:flex-row gap-2">
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              variant="outlined"
              sx={{ width: { xs: '100%', md: '400px' }, bgcolor: '#fff' }}
              className="rounded"
            />
            {error && <Typography color="error" className="text-sm">{error}</Typography>}
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: '#1976d2', px: 4 }}
              className="hover:bg-blue-700"
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default News;