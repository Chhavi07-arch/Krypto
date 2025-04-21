// src/context/FavoritesContext.jsx
import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (coin) => {
    if (!favorites.some(fav => fav.id === coin.id)) {
      setFavorites([...favorites, coin]);
    }
  };

  const removeFavorite = (coinId) => {
    setFavorites(favorites.filter(fav => fav.id !== coinId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);