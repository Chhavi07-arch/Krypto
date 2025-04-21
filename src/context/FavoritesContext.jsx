// // src/context/FavoritesContext.jsx

// src/context/FavoritesContext.jsx
import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const addFavorite = (coin) => {
    if (!favorites.some(fav => fav.id === coin.id)) {
      const updatedFavorites = [...favorites, coin];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const removeFavorite = (coinId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== coinId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);














// import { createContext, useContext, useState } from 'react';

// const FavoritesContext = createContext();

// export function FavoritesProvider({ children }) {
//   const [favorites, setFavorites] = useState([]);

//   const addFavorite = (coin) => {
//     if (!favorites.some(fav => fav.id === coin.id)) {
//       setFavorites([...favorites, coin]);
//     }
//   };

//   const removeFavorite = (coinId) => {
//     setFavorites(favorites.filter(fav => fav.id !== coinId));
//   };

//   return (
//     <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
//       {children}
//     </FavoritesContext.Provider>
//   );
// }

// export const useFavorites = () => useContext(FavoritesContext);