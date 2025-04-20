// src/components/CoinCard.jsx
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useFavorites } from '../context/FavoritesContext';

const CoinCard = ({ coin }) => {
  const { addFavorite, removeFavorite, favorites } = useFavorites();
  const isFavorite = favorites.some(fav => fav.id === coin.id);

  return (
    <Card sx={{ width: 280, bgcolor: '#1a1c22', color: '#fff', borderRadius: 2 }} className="shadow-lg">
      <CardContent>
        <Typography variant="h6" className="flex items-center">
          <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
          {coin.name} ({coin.symbol.toUpperCase()})
        </Typography>
        <Typography>Price: ${coin.current_price.toLocaleString()}</Typography>
        <Typography
          sx={{ color: coin.price_change_percentage_24h >= 0 ? '#00ff00' : '#ff0000' }}
        >
          24h: {coin.price_change_percentage_24h.toFixed(2)}%
        </Typography>
        <Button
          variant="contained"
          onClick={() => (isFavorite ? removeFavorite(coin.id) : addFavorite(coin))}
          sx={{ mt: 2, bgcolor: isFavorite ? '#ff4444' : '#1976d2' }}
          className="w-full"
        >
          {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CoinCard;