import { useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUsers } from './useGitHubUsers';
import { useFavorites } from '../contexts/FavoritesContext';
import { GitHubUser } from '../types';
import { githubApi } from '../services/githubApi';
import { useQueries } from '@tanstack/react-query';

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

  const { data: allUsers, isLoading: isLoadingUsers, error: usersError } = useUsers();

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const favoriteQueries = useQueries({
    queries: favorites.map(username => ({
      queryKey: ['user', username],
      queryFn: () => githubApi.getUserDetails(username),
      staleTime: 10 * 60 * 1000,
      retry: 2,
    })),
  });

  const favoriteUsers = useMemo(() => {
    const usersFromQueries = favoriteQueries
      .map(query => query.data)
      .filter((user): user is GitHubUser => user !== undefined);

    const usersFromInitialList = allUsers?.filter(user => favorites.includes(user.login)) || [];

    const combinedUsers = [...usersFromQueries];

    usersFromInitialList.forEach(user => {
      if (!combinedUsers.some(u => u.login === user.login)) {
        combinedUsers.push(user);
      }
    });

    return combinedUsers.sort((a, b) => {
      const comparison = a.login.localeCompare(b.login);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [favoriteQueries, allUsers, favorites, sortOrder]);

  const isLoading = isLoadingUsers || favoriteQueries.some(query => query.isLoading);
  const error = usersError || favoriteQueries.find(query => query.error)?.error;

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
