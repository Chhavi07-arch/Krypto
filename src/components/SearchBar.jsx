import { TextField, Button, Box } from '@mui/material'; 
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <Box className="mb-6 flex"> 
      <TextField
        variant="outlined"
        placeholder="Search coins (e.g., Bitcoin)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow bg-white text-black"
        InputProps={{ className: 'text-black' }}
      />
      <Button variant="contained" className="ml-2 bg-blue-600" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;


