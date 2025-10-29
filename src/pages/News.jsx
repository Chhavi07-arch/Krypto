import { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Card, CardContent, Link, Chip } from '@mui/material';
import axios from 'axios';
import { CryptoPanic } from '../config/api';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribedEmails, setSubscribedEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchNews();
    const savedEmails = localStorage.getItem('subscribedEmails');
    if (savedEmails) {
      setSubscribedEmails(JSON.parse(savedEmails));
    }
  }, []);

  const fetchNews = async () => {
    try {
      setError('');
      const { data } = await axios.get(CryptoPanic.news());
      setNews(data.results || []);
      setLoading(false);
    } catch (err) {
      console.error('News API Error:', err.message);
      setError('Failed to load latest news. Please try again later.');
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Invalid email address');
      return;
    }
    setEmailError('');
    if (subscribedEmails.includes(email)) {
      setEmailError('Already subscribed with this email');
      return;
    }
    const updatedEmails = [...subscribedEmails, email];
    setSubscribedEmails(updatedEmails);
    localStorage.setItem('subscribedEmails', JSON.stringify(updatedEmails));
    alert('Subscribed to newsletter!');
    setEmail('');
  };

  const filteredNews = news.filter(article =>
    article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.source?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '#4caf50';
      case 'negative':
        return '#f44336';
      case 'neutral':
        return '#ff9800';
      default:
        return '#2196f3';
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <Box className="bg-gray-900 min-h-screen text-white">
        <Container sx={{ py: 6 }}>
          <Typography className="text-center mt-10">Loading latest crypto news...</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box className="bg-gray-900 min-h-screen text-white">
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom className="text-blue-400 mb-2">
          Latest Crypto News
        </Typography>
        <Typography variant="body2" className="text-gray-400 mb-4">
          Real-time cryptocurrency news powered by CryptoPanic
        </Typography>

        {error && (
          <Box sx={{ mb: 4, p: 2, bgcolor: '#d32f2f', borderRadius: 1 }}>
            <Typography className="text-white">{error}</Typography>
            <Button
              variant="contained"
              sx={{ mt: 2, bgcolor: '#fff', color: '#d32f2f' }}
              onClick={fetchNews}
            >
              Retry
            </Button>
          </Box>
        )}

        {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              bgcolor: '#fff',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                color: '#000',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ddd',
              },
            }}
          />
        </Box>

        {/* News Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 6 }}>
          {filteredNews.length > 0 ? (
            filteredNews.map((article, index) => (
              <Card
                key={index}
                sx={{
                  bgcolor: '#1a1c22',
                  color: 'white',
                  borderLeft: `4px solid ${getSentimentColor(article.sentiment)}`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Typography variant="h6" sx={{ flex: 1, pr: 1, fontSize: '1.1rem', fontWeight: 600 }}>
                      {article.title}
                    </Typography>
                    {article.sentiment && (
                      <Chip
                        label={article.sentiment.toUpperCase()}
                        sx={{
                          bgcolor: getSentimentColor(article.sentiment),
                          color: '#fff',
                          fontSize: '0.7rem',
                          fontWeight: 'bold',
                          minWidth: '80px',
                        }}
                      />
                    )}
                  </Box>

                  <Typography variant="caption" className="text-gray-400" sx={{ display: 'block', mb: 2 }}>
                    Source: {article.source?.title || 'Unknown'} • {formatDate(article.published_at)}
                  </Typography>

                  {article.domain && (
                    <Typography variant="body2" sx={{ mb: 2, color: '#90caf9' }}>
                      Domain: {article.domain}
                    </Typography>
                  )}

                  {/* Coins mentioned */}
                  {article.currencies && article.currencies.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" className="text-gray-400">Mentioned coins:</Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                        {article.currencies.slice(0, 3).map((coin, idx) => (
                          <Chip
                            key={idx}
                            label={coin.code}
                            size="small"
                            sx={{
                              bgcolor: '#2196f3',
                              color: '#fff',
                              fontSize: '0.8rem',
                            }}
                          />
                        ))}
                        {article.currencies.length > 3 && (
                          <Chip
                            label={`+${article.currencies.length - 3}`}
                            size="small"
                            sx={{
                              bgcolor: '#666',
                              color: '#fff',
                              fontSize: '0.8rem',
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  )}

                  <Link
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'inline-block',
                      mt: 2,
                      color: '#ffd700',
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Read Full Article →
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography className="text-center text-gray-400 col-span-2">
              No news articles found matching your search.
            </Typography>
          )}
        </Box>

        {/* Newsletter Subscription */}
        <Box sx={{ bgcolor: '#1a1c22', p: 4, borderRadius: 2, mb: 4 }}>
          <Typography variant="h5" className="text-blue-400 mb-4">
            Subscribe to Crypto News Newsletter
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Box className="flex flex-col md:flex-row gap-2 mb-3">
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                variant="outlined"
                sx={{ flex: 1, bgcolor: '#fff' }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: '#1976d2', px: 4 }}
                className="hover:bg-blue-700"
              >
                Subscribe
              </Button>
            </Box>
            {emailError && <Typography color="error" className="text-sm">{emailError}</Typography>}
          </Box>

          {subscribedEmails.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography className="text-white mb-2">
                Subscribed Emails ({subscribedEmails.length}):
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {subscribedEmails.map((email, index) => (
                  <Chip
                    key={index}
                    label={email}
                    sx={{
                      bgcolor: '#4caf50',
                      color: '#fff',
                      fontSize: '0.9rem',
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default News;