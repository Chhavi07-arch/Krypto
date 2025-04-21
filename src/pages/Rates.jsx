import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const coinId = searchParams.get('coin');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(CoinList('usd'), {
          headers: { 'x-cg-demo-api-key': 'CG-7nVcnFKTaKahCh2VvxTGZY7L' },
        });
        setCoins(data);
        setFilteredCoins(data);
        setLoading(false);
        if (coinId && data.find(c => c.id === coinId)) {
          setSelectedCoin(data.find(c => c.id === coinId));
          fetchChartData(coinId, 7);
        }
      } catch (error) {
        console.error('API Error:', error.message);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [coinId]);

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
    if (selectedCoin) fetchChartData(selectedCoin.id, days);
  };

  if (loading) return <Typography className="text-white text-center mt-10">Loading...</Typography>;

  return (
    <Box className="bg-gray-900 min-h-screen text-white">
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" className="text-blue-400 mb-4">Cryptocurrency Rates</Typography>
        <SearchBar onSearch={handleSearch} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {filteredCoins.map(coin => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </Box>
        {selectedCoin && chartData.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" className="text-blue-400 mb-2">{selectedCoin.name} Price History</Typography>
            <PriceChart data={chartData} onTimeFrameChange={handleTimeFrameChange} />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Rates;