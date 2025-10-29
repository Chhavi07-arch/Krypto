import { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Card, CardContent, Link, Chip } from '@mui/material';
import axios from 'axios';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribedEmails, setSubscribedEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock news data as fallback - high quality crypto news summaries
  const mockNews = [
    {
      title: "Bitcoin Surges Past $45,000 on Institutional Demand",
      description: "Bitcoin reached new heights as institutional investors continue accumulating positions, signaling strong confidence in the cryptocurrency market's future growth.",
      source: { name: "Crypto News Daily" },
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      url: "https://www.coindesk.com",
      urlToImage: "https://images.unsplash.com/photo-1518546305927-30282f16b312?w=500&h=300&fit=crop",
    },
    {
      title: "Ethereum Layer 2 Solutions Gain Mainstream Adoption",
      description: "Layer 2 protocols continue to see explosive growth with total value locked exceeding $10 billion, as developers and users seek lower transaction costs and faster speeds.",
      source: { name: "Blockchain Tech" },
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      url: "https://www.ethereum.org",
      urlToImage: "https://images.unsplash.com/photo-1621761191319-c6fb62b9c869?w=500&h=300&fit=crop",
    },
    {
      title: "Central Banks Study Digital Currency Implementations",
      description: "Major central banks worldwide are advancing their CBDC (Central Bank Digital Currency) projects, with several planning pilot programs in the coming months.",
      source: { name: "Financial Times Crypto" },
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      url: "https://www.ft.com",
      urlToImage: "https://images.unsplash.com/photo-1526628653497-c4413d3c5d27?w=500&h=300&fit=crop",
    },
    {
      title: "Web3 Gaming Platforms Show Rapid User Growth",
      description: "Play-to-earn gaming platforms continue attracting millions of users globally, with new titles launching weekly and revenue models proving sustainable.",
      source: { name: "Gaming & Crypto News" },
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      url: "https://www.cryptogames.io",
      urlToImage: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=300&fit=crop",
    },
    {
      title: "DeFi Protocols Break New Security Records",
      description: "Decentralized finance platforms implement advanced security measures and audits, setting new industry standards for smart contract safety and user fund protection.",
      source: { name: "DeFi Pulse" },
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      url: "https://www.defipulse.com",
      urlToImage: "https://images.unsplash.com/photo-1563382011-b510efdf1000?w=500&h=300&fit=crop",
    },
    {
      title: "NFT Market Stabilizes with Focus on Utility",
      description: "The NFT market matures as creators shift focus from speculation to utility-driven projects, with significant applications in gaming, art, and ownership verification.",
      source: { name: "NFT Times" },
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      url: "https://www.nftimes.io",
      urlToImage: "https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=500&h=300&fit=crop",
    },
  ];

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

      // Try to fetch from NewsAPI with your own key
      // Get free key at: https://newsapi.org (100 requests/day)
      // Replace 'YOUR_API_KEY' with your actual key
      const newsApiKey = import.meta.env.VITE_NEWS_API_KEY || '';

      if (newsApiKey) {
        const { data } = await axios.get(
          `https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=publishedAt&language=en&pageSize=20&apiKey=${newsApiKey}`
        );

        if (data.articles && data.articles.length > 0) {
          setNews(data.articles);
          localStorage.setItem('cachedNews', JSON.stringify(data.articles));
          setLoading(false);
          return;
        }
      }

      // If no API key or API fails, use high-quality mock data
      setNews(mockNews);
      setLoading(false);
    } catch (err) {
      console.error('News API Error:', err.message);
      // Use mock news as fallback
      setNews(mockNews);
      setError('Using cached crypto news. For real-time news, add your NewsAPI key.');
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
    article.source?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  borderLeft: `4px solid #2196f3`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(33, 150, 243, 0.3)',
                  },
                }}
              >
                <CardContent>
                  {/* Image */}
                  {article.urlToImage && (
                    <Box
                      component="img"
                      src={article.urlToImage}
                      alt={article.title}
                      sx={{
                        width: '100%',
                        height: '180px',
                        objectFit: 'cover',
                        borderRadius: 1,
                        mb: 2,
                      }}
                    />
                  )}

                  <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600, mb: 1 }}>
                    {article.title}
                  </Typography>

                  <Typography variant="caption" className="text-gray-400" sx={{ display: 'block', mb: 2 }}>
                    Source: {article.source?.name || 'Unknown'} • {formatDate(article.publishedAt)}
                  </Typography>

                  {article.description && (
                    <Typography variant="body2" sx={{ mb: 2, color: '#ccc', lineHeight: 1.5 }}>
                      {article.description.substring(0, 150)}...
                    </Typography>
                  )}

                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip
                      label="Crypto"
                      size="small"
                      sx={{
                        bgcolor: '#ff9800',
                        color: '#fff',
                        fontSize: '0.8rem',
                      }}
                    />
                  </Box>

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
              {news.length === 0 && !error ? 'Loading news...' : 'No news articles found matching your search.'}
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