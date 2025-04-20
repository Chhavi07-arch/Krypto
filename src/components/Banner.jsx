// src/components/Banner.jsx
import { Box, Typography, Container } from '@mui/material';
import CoinCard from './CoinCard';

const Banner = ({ coins }) => {
  return (
    <Box sx={{ bgcolor: '#14161a', py: 8, minHeight: '400px' }} className="relative">
      <Container>
        <Typography
          variant="h2"
          sx={{
            color: '#ffd700',
            mb: 6,
            textAlign: 'center',
            fontWeight: 'bold',
            zIndex: 10,
            position: 'relative',
          }}
        >
          Crypto Hunter
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
            position: 'relative',
            zIndex: 5,
          }}
        >
          {coins.slice(0, 3).map(coin => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;