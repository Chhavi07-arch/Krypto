// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material'; // Add Button here
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import CoinCard from '../components/CoinCard';
import Banner from '../components/Banner';
import { CoinList } from '../config/api';

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 6;

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
        <Typography variant="h4" className="text-blue-400 mb-4">Top Cryptocurrencies</Typography>
        <SearchBar onSearch={handleSearch} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {currentCoins.map(coin => <CoinCard key={coin.id} coin={coin} />)}
        </Box>
        <Box className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <Button
              key={number}
              variant="contained"
              className="bg-blue-600"
              onClick={() => paginate(number)}
              disabled={currentPage === number}
            >
              {number}
            </Button>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;











// import { useState, useEffect } from 'react';
// import { Container, Typography, Box } from '@mui/material';
// import axios from 'axios';
// import SearchBar from '../components/SearchBar';
// import CoinCard from '../components/CoinCard';
// import Banner from '../components/Banner';
// import { CoinList } from '../config/api';

// const Home = () => {
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCoins = async () => {
//       try {
//         const { data } = await axios.get(CoinList('usd'), {
//           headers: { 'x-cg-demo-api-key': 'CG-7nVcnFKTaKahCh2VvxTGZY7L' },
//         });
//         console.log('API Response:', data); // Log response
//         setCoins(data);
//         setFilteredCoins(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('API Error:', error.message);
//         setLoading(false);
//       }
//     };
//     fetchCoins();
//   }, []);

//   return (
//     <Box className="bg-gray-900 min-h-screen text-white">
//       <Banner />
//       <Container sx={{ py: 6 }}>
//         <Typography variant="h4" className="text-blue-400 mb-4">Top Cryptocurrencies</Typography>
//         <SearchBar onSearch={(term) => {
//           const results = coins.filter(coin =>
//             coin.name.toLowerCase().includes(term.toLowerCase()) ||
//             coin.symbol.toLowerCase().includes(term.toLowerCase())
//           );
//           setFilteredCoins(results);
//         }} />
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
//           {loading ? (
//             <Typography className="text-white">Loading...</Typography>
//           ) : (
//             filteredCoins.map(coin => <CoinCard key={coin.id} coin={coin} />)
//           )}
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Home;