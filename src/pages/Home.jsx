import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import CoinCard from '../components/CoinCard';
import Banner from '../components/Banner';
import { CoinList, getHeaders } from '../config/api';

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const coinsPerPage = 10;

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setError('');
        const { data } = await axios.get(CoinList('usd'), {
          headers: getHeaders(),
        });
        setCoins(data);
        setFilteredCoins(data);
        setLoading(false);
      } catch (error) {
        console.error('API Error:', error.message);
        setError('Failed to load cryptocurrencies. Please try again later.');
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      const results = coins.filter(coin =>
        coin.name.toLowerCase().startsWith(term.toLowerCase()) ||
        coin.symbol.toLowerCase().startsWith(term.toLowerCase())
      );
      setFilteredCoins(results);
    } else {
      setFilteredCoins(coins);
    }
    setCurrentPage(1); // Reset to first page on search
  };

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);
  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Typography className="text-white text-center mt-10">Loading...</Typography>;

  return (
    <Box className="bg-gray-900 min-h-screen text-white">
      <Banner />
      <Container sx={{ py: 6 }}>
        {error && (
          <Box sx={{ mb: 4, p: 2, bgcolor: '#d32f2f', borderRadius: 1 }}>
            <Typography className="text-white">{error}</Typography>
          </Box>
        )}
        <Typography variant="h4" className="text-blue-400 mb-4">Top Cryptocurrencies</Typography>
        <SearchBar onSearch={handleSearch} value={searchTerm} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {currentCoins.map(coin => <CoinCard key={coin.id} coin={coin} />)}
        </Box>
        <Box className="mt-4 flex justify-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <span
              key={number}
              className={`px-2 py-1 text-sm text-gray-300 hover:text-white cursor-pointer ${currentPage === number ? 'bg-blue-600 text-white' : ''}`}
              onClick={() => paginate(number)}
            >
              {number}
            </span>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

