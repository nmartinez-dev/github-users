import { useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUsers } from './useGitHubUsers';
import { useFavorites } from '../contexts/FavoritesContext';
import { GitHubUser } from '../types';

type RootStackParamList = {
  Favorites: undefined;
  UserDetail: { username: string };
};

type NavigationProp = {
  navigate: (screen: keyof RootStackParamList, params?: any) => void;
};

export const useFavoritesLogic = () => {
  const navigation = useNavigation<NavigationProp>();

  const { favorites } = useFavorites();

  const { data: allUsers, isLoading, error } = useUsers();

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const favoriteUsers = useMemo(() => {
    if (!allUsers) return [];

    const filtered = allUsers.filter(user => favorites.includes(user.login));

    return filtered.sort((a, b) => {
      const comparison = a.login.localeCompare(b.login);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [allUsers, favorites, sortOrder]);

  const handleUserPress = (user: GitHubUser) =>
    navigation.navigate('UserDetail', { username: user.login });

  const toggleSortOrder = () =>
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');

  return {
    favoriteUsers,
    isLoading,
    error,
    sortOrder,
    handleUserPress,
    toggleSortOrder,
  };
};
