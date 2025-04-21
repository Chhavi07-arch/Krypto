import { Typography, Box } from '@mui/material';

const Banner = () => {
  return (
    <Box
      className="bg-cover bg-center text-white text-center py-32 relative z-10"
      style={{ backgroundImage: "url('/3417764.jpg')", minHeight: '50vh' }}
    >
      <Typography variant="h1" className="font-extrabold text-gold-500 mb-4 text-6xl">KRYPTO</Typography>
      <Typography variant="h5" className="text-blue-300 mb-10 text-lg font-light">Your Crypto Companion</Typography>
    </Box>
  );
};

export default Banner;
