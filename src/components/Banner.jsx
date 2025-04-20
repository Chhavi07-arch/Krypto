// src/components/Banner.jsx
import { Typography, Box } from '@mui/material';

const Banner = () => {
  return (
    <Box
      className="bg-cover bg-center text-white text-center py-12 relative z-10"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611974789855-9c2e6cd77eea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')" }} // Crypto network background
    >
      <Typography variant="h2" className="font-bold text-gold-500 mb-2">Krypto</Typography>
      <Typography variant="h6" className="text-blue-300">Your Crypto Companion</Typography>
      {/* Floating Coins */}
      <Box className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-float absolute w-16 h-16 bg-orange-500 rounded-full opacity-50 top-10 left-10"></div>
        <div className="animate-float-slow absolute w-12 h-12 bg-purple-500 rounded-full opacity-50 top-20 right-20"></div>
        <div className="animate-float-fast absolute w-10 h-10 bg-teal-500 rounded-full opacity-50 bottom-10 left-20"></div>
      </Box>
    </Box>
  );
};

export default Banner;
