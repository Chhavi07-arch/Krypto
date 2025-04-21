// // src/components/CoinCard.jsx

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
      <Typography className={`text-center ${coin.price_change_percentage_24h >= 0 ? 'color: #00cc00' : 'color: #ff0000'}`}>
        24h: {coin.price_change_percentage_24h.toFixed(2)}%
      </Typography>
      {isFavorite ? (
        <Button
          variant="contained"
          style={{ width: '100%', marginTop: '8px', backgroundColor: '#ff0000', color: '#ffffff' }}
          onClick={(e) => { e.stopPropagation(); removeFavorite(coin.id); }}
        >
          Remove 
        </Button>
      ) : (
        <Button
          variant="contained"
          style={{ width: '100%', marginTop: '8px', backgroundColor: '#0000ff', color: '#ffffff' }}
          onClick={(e) => { e.stopPropagation(); addFavorite(coin); }}
        >
          Add Favorite
        </Button>
      )}
    </Box>
  );
};

export default CoinCard;

















// import { Typography, Box, Button } from '@mui/material';
// import { useFavorites } from '../context/FavoritesContext';
// import { useNavigate } from 'react-router-dom';

// const CoinCard = ({ coin }) => {
//   const { favorites, addFavorite, removeFavorite } = useFavorites();
//   const navigate = useNavigate();
//   const isFavorite = favorites.some(fav => fav.id === coin.id);

//   return (
//     <Box
//       onClick={() => navigate(`/chart/${coin.id}`)}
//       className="bg-gray-800 p-4 rounded-lg text-white w-48 hover:shadow-xl hover:shadow-blue-500/50 transition-shadow cursor-pointer"
//     >
//       <Box className="flex justify-center mb-2">
//         <img src={coin.image} alt={coin.name} className="w-20 h-20" />
//       </Box>
//       <Typography variant="h6" className="text-center mb-2">
//         {coin.name} ({coin.symbol.toUpperCase()})
//       </Typography>
//       <Typography className="text-center">Price: ${coin.current_price.toLocaleString()}</Typography>
//       <Typography className={`text-center ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//         24h: {coin.price_change_percentage_24h.toFixed(2)}%
//       </Typography>
//       {isFavorite ? (
//         <Button
//           variant="contained"
//           className="w-full mt-2 bg-red-600 hover:bg-red-700"
//           onClick={(e) => { e.stopPropagation(); removeFavorite(coin.id); }}
//         >
//           Remove 
//         </Button>
//       ) : (
//         <Button
//           variant="contained"
//           className="w-full mt-2 bg-blue-600 hover:bg-blue-700"
//           onClick={(e) => { e.stopPropagation(); addFavorite(coin); }}
//         >
//           Add Favorite
//         </Button>
//       )}
//     </Box>
//   );
// };

// export default CoinCard;