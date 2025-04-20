// src/components/Navbar.jsx

// src/components/Navbar.jsx
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" className="bg-gray-800">
      <Toolbar>
        <Link to="/" className="text-gold-500 no-underline">
          <Typography variant="h6" className="font-bold text-gold-500">
            Krypto
          </Typography>
        </Link>
        <Box className="flex-grow"></Box>
        <Box>
          {['Rates', 'News', 'Learn'].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className="text-blue-400 mx-4 hover:text-gold-500">
              {item}
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;













// import { AppBar, Toolbar, Typography, Container } from '@mui/material';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <AppBar position="static" sx={{ bgcolor: '#1a1c22' }}>
//       <Container>
//         <Toolbar disableGutters>
//           <Typography
//             variant="h6"
//             component={Link}
//             to="/"
//             sx={{ flexGrow: 1, color: '#ffd700', textDecoration: 'none', fontWeight: 'bold' }}
//           >
//             Krypto
//           </Typography>
//           <Link to="/rates" className="text-white mx-4 hover:text-blue-400">Rates</Link>
//           <Link to="/news" className="text-white mx-4 hover:text-blue-400">News</Link>
//           <Link to="/learn" className="text-white mx-4 hover:text-blue-400">Learn</Link>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// export default Navbar;