import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Rates from './pages/Rates';
import News from './pages/News';
import Learn from './pages/Learn';
import Chart from './pages/Chart';
import Favorites from './pages/Favorites';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Navbar />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rates" element={<Rates />} />
            <Route path="/news" element={<News />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/chart/:coinId" element={<Chart />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;