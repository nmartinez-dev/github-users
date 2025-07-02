import { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoritesContextType } from '../types';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = '@github_users_favorites';

export const FavoritesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (newFavorites: string[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const addFavorite = (username: string) => {
    const newFavorites = [...favorites, username];
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const removeFavorite = (username: string) => {
    const newFavorites = favorites.filter(fav => fav !== username);
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const isFavorite = (username: string): boolean => {
    return favorites.includes(username);
  };

  const toggleFavorite = (username: string) => {
    if (isFavorite(username)) {
      removeFavorite(username);
    } else {
      addFavorite(username);
    }
  };

  const value: FavoritesContextType = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
