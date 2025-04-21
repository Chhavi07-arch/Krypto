// src/components/CoinCard.jsx
import { Typography, Box, Button } from '@mui/material';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';

const CoinCard = ({ coin }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const navigate = useNavigate();
  const isFavorite = favorites.some(fav => fav.id === coin.id);

  return (
    <Box
      className="bg-gray-800 p-4 rounded-lg text-white w-48 hover:shadow-xl hover:shadow-blue-500/50 transition-shadow"
      sx={{ cursor: 'pointer' }}
    >
      <Box className="flex justify-center mb-2">
        <img src={coin.image} alt={coin.name} className="w-20 h-20" />
      </Box>
      <Typography variant="h6" className="text-center mb-2" onClick={() => navigate(`/chart/${coin.id}`)}>
        {coin.name} ({coin.symbol.toUpperCase()})
      </Typography>
      <Typography className="text-center">Price: ${coin.current_price.toLocaleString()}</Typography>
      <Typography className={`text-center ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        24h: {coin.price_change_percentage_24h.toFixed(2)}%
      </Typography>
      {isFavorite ? (
        <Button
          variant="contained"
          className="w-full mt-2 bg-red-600"
          onClick={() => removeFavorite(coin.id)}
        >
          Remove Favorite
        </Button>
      ) : (
        <Button
          variant="contained"
          className="w-full mt-2 bg-blue-600"
          onClick={() => addFavorite(coin)}
        >
          Add Favorite
        </Button>
      )}
    </Box>
  );
};

export default CoinCard;