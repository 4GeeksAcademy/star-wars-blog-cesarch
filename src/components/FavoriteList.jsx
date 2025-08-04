import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export const FavoriteList = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (item) => {
    if (!favorites.some((fav) => fav.uid === item.uid && fav.type === item.type)) {
      setFavorites((prev) => [...prev, item]);
    }
  };

  const removeFavorite = (uid, type) => {
    setFavorites((prev) => prev.filter((fav) => fav.uid !== uid || fav.type !== type));
  };

  const isFavorite = (uid, type) => {
    return favorites.some((fav) => fav.uid === uid && fav.type === type);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);