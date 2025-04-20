// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import Banner from '../components/Banner';
import CoinCard from '../components/CoinCard';
import { CoinList } from '../config/api';

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(CoinList('usd'), {
          headers: { 'x-cg-demo-api-key': 'CG-7nVcnFKTaKahCh2VvxTGZY7L' },
        });
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error('API Error:', error.message);
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  if (loading) return <Typography className="text-white text-center mt-10">Loading...</Typography>;

  return (
    <Box className="bg-gray-900 min-h-screen text-white">
      <Banner coins={coins} />
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom className="text-blue-400">
          Top Cryptocurrencies
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {coins.slice(0, 6).map(coin => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;