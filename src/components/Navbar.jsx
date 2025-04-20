// src/components/Navbar.jsx
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#1a1c22' }}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, color: '#ffd700', textDecoration: 'none', fontWeight: 'bold' }}
          >
            Krypto
          </Typography>
          <Link to="/rates" className="text-white mx-4 hover:text-blue-400">Rates</Link>
          <Link to="/news" className="text-white mx-4 hover:text-blue-400">News</Link>
          <Link to="/learn" className="text-white mx-4 hover:text-blue-400">Learn</Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;