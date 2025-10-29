import { Typography, Box, Button } from '@mui/material';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';

const CoinCard = ({ coin }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const navigate = useNavigate();
  const isFavorite = favorites.some(fav => fav.id === coin.id);

  const handleAddFavorite = (e) => {
    e.stopPropagation();
    addFavorite(coin);
  };

  const handleRemoveFavorite = (e) => {
    e.stopPropagation();
    removeFavorite(coin.id);
  };

  return (
    <Box
      onClick={() => navigate(`/chart/${coin.id}`)}
      className="bg-gray-800 p-4 rounded-lg text-white w-48 hover:shadow-xl hover:shadow-blue-500/50 transition-shadow cursor-pointer"
      style={{ position: 'relative' }}
    >
      <Box className="flex justify-center mb-2">
        <img src={coin.image} alt={coin.name} className="w-20 h-20" />
      </Box>
      <Typography variant="h6" className="text-center mb-2">
        {coin.name} ({coin.symbol.toUpperCase()})
      </Typography>
      <Typography className="text-center">Price: ${coin.current_price.toLocaleString()}</Typography>
      <Typography className="text-center" style={{ color: coin.price_change_percentage_24h >= 0 ? '#00cc00' : '#ff0000' }}>
        24h: {coin.price_change_percentage_24h.toFixed(2)}%
      </Typography>
      {isFavorite ? (
        <Button
          variant="contained"
          style={{ width: '100%', marginTop: '8px', backgroundColor: '#ff0000', color: '#ffffff' }}
          onClick={handleRemoveFavorite}
        >
          Remove 
        </Button>
      ) : (
        <Button
          variant="contained"
          style={{ width: '100%', marginTop: '8px', backgroundColor: '#0000ff', color: '#ffffff' }}
          onClick={handleAddFavorite}
        >
          Add Favorite
        </Button>
      )}
    </Box>
  );
};

export default CoinCard;

