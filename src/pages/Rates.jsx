// src/pages/Rates.jsx
import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import PriceChart from '../components/PriceChart';
import CoinCard from '../components/CoinCard';
import { CoinList, HistoricalChart } from '../config/api';

const Rates = () => {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(CoinList('usd'), {
          headers: { 'x-cg-demo-api-key': 'CG-7nVcnFKTaKahCh2VvxTGZY7L' },
        });
        setCoins(data);
        setFilteredCoins(data);
        setLoading(false);
      } catch (error) {
        console.error('API Error:', error.message);
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  const handleSearch = (searchTerm) => {
    const results = coins.filter(coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCoins(results);
  };

  const fetchChartData = async (coinId, days) => {
    try {
      const { data } = await axios.get(HistoricalChart(coinId, days, 'usd'), {
        headers: { 'x-cg-demo-api-key': 'CG-7nVcnFKTaKahCh2VvxTGZY7L' },
      });
      setChartData(data.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        price,
      })));
    } catch (error) {
      console.error('Chart API Error:', error.message);
      setChartData([]);
    }
  };

  const handleTimeFrameChange = (days) => {
    if (selectedCoin) {
      fetchChartData(selectedCoin.id, days);
    }
  };

  if (loading) return <Typography className="text-white text-center mt-10">Loading...</Typography>;

  return (
    <Box className="bg-gray-900 min-h-screen text-white">
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom className="text-blue-400">
          Cryptocurrency Rates
        </Typography>
        <SearchBar onSearch={handleSearch} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {filteredCoins.map(coin => (
            <Box key={coin.id} onClick={() => { setSelectedCoin(coin); fetchChartData(coin.id, '7'); }}>
              <CoinCard coin={coin} />
            </Box>
          ))}
        </Box>
        {selectedCoin && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" className="text-blue-400 mb-2">
              {selectedCoin.name} Price History
            </Typography>
            <PriceChart data={chartData} onTimeFrameChange={handleTimeFrameChange} />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Rates;