// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Rates from './pages/Rates';
import News from './pages/News';
import Learn from './pages/Learn';

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/news" element={<News />} />
          <Route path="/learn" element={<Learn />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;