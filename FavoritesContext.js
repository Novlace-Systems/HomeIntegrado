import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoritedCommunities, setFavoritedCommunities] = useState(() => {
    const storedFavorites = localStorage.getItem('favoritedCommunities');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const toggleFavorite = (communityId, communityTitle, communityImage) => {
    let updatedFavorites;

    if (favoritedCommunities.some(c => c.id === communityId)) {
      updatedFavorites = favoritedCommunities.filter(c => c.id !== communityId);
    } else {
      const newFavorite = { id: communityId, name: communityTitle, imageSrc: communityImage };
      updatedFavorites = [...favoritedCommunities, newFavorite];
    }

    setFavoritedCommunities(updatedFavorites);
    localStorage.setItem('favoritedCommunities', JSON.stringify(updatedFavorites));
  };

  return (
    <FavoritesContext.Provider value={{ favoritedCommunities, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
