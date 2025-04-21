// src/components/Navbar.jsx
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" className="bg-gray-800">
      <Toolbar>
        <Link to="/" className="text-gold-500 no-underline">
          <Typography variant="h6" className="font-extrabold text-gold-500">
            Krypto
          </Typography>
        </Link>
        <Box className="flex-grow"></Box>
        <Box>
          {['Rates', 'News', 'Learn', 'Favorites'].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className="text-white font-bold mx-4 hover:text-gold-500">
              {item}
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;