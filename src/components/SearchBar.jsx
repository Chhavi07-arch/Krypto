// src/components/SearchBar.jsx
import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.length < 3) {
      setError('Search term must be at least 3 characters');
      return;
    }
    setError('');
    onSearch(search);
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }} className="flex flex-col md:flex-row gap-2">
      <TextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search coins (e.g., Bitcoin)"
        variant="outlined"
        sx={{ width: { xs: '100%', md: '400px' }, bgcolor: '#fff' }}
        className="rounded"
      />
      {error && <Typography color="error" className="text-sm">{error}</Typography>}
      <Button
        type="submit"
        variant="contained"
        sx={{ bgcolor: '#1976d2', px: 4 }}
        className="hover:bg-blue-700"
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;