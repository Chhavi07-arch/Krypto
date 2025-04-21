// src/pages/Favorites.jsx
import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useFavorites } from '../context/FavoritesContext';
import CoinCard from '../components/CoinCard';

const Favorites = () => {
  const { favorites } = useFavorites();

  if (!favorites.length) return <Typography className="text-white text-center mt-10">No favorites added yet.</Typography>;

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" className="text-blue-400 mb-4">Favorites</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
        {favorites.map(coin => <CoinCard key={coin.id} coin={coin} />)}
      </Box>
    </Container>
  );
};

export default Favorites;