import React from 'react';
import { render, act, waitFor } from '@testing-library/react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoritesProvider, useFavorites } from '../FavoritesContext';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const TestComponent = () => {
  const { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite } = useFavorites();

  return (
    <View>
      <Text testID="favorites-count">{favorites.length}</Text>
      <Text testID="favorites-list">{favorites.join(',')}</Text>
      <TouchableOpacity testID="add-user1" onPress={() => addFavorite('user1')} />
      <TouchableOpacity testID="add-user2" onPress={() => addFavorite('user2')} />
      <TouchableOpacity testID="remove-user1" onPress={() => removeFavorite('user1')} />
      <TouchableOpacity testID="toggle-user1" onPress={() => toggleFavorite('user1')} />
      <Text testID="is-user1-favorite">{isFavorite('user1').toString()}</Text>
      <Text testID="is-user2-favorite">{isFavorite('user2').toString()}</Text>
    </View>
  );
};

describe('FavoritesContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.clear();
  });

  describe('FavoritesProvider', () => {
    it('should load favorites from AsyncStorage on mount', async () => {
      const mockFavorites = ['user1', 'user2', 'user3'];
      AsyncStorage.setItem('@github_users_favorites', JSON.stringify(mockFavorites));

      const { getByTestId } = render(
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      );

      await waitFor(() => {
        expect(getByTestId('favorites-count')).toHaveTextContent('3');
        expect(getByTestId('favorites-list')).toHaveTextContent('user1,user2,user3');
      });
    });

    it('should start with empty favorites when no stored data', async () => {
      const { getByTestId } = render(
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      );

      await waitFor(() => {
        expect(getByTestId('favorites-count')).toHaveTextContent('0');
        expect(getByTestId('favorites-list')).toHaveTextContent('');
      });
    });
  });

  describe('addFavorite', () => {
    it('should add a new favorite', async () => {
      const { getByTestId } = render(
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      );

      await act(async () => {
        getByTestId('add-user1').props.onPress();
      });

      await waitFor(() => {
        expect(getByTestId('favorites-count')).toHaveTextContent('1');
        expect(getByTestId('favorites-list')).toHaveTextContent('user1');
        expect(getByTestId('is-user1-favorite')).toHaveTextContent('true');
      });

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@github_users_favorites',
        JSON.stringify(['user1'])
      );
    });
  });

  describe('removeFavorite', () => {
    it('should remove an existing favorite', async () => {
      AsyncStorage.setItem('@github_users_favorites', JSON.stringify(['user1', 'user2']));

      const { getByTestId } = render(
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      );

      await waitFor(() => {
        expect(getByTestId('favorites-count')).toHaveTextContent('2');
      });

      await act(async () => {
        getByTestId('remove-user1').props.onPress();
      });

      await waitFor(() => {
        expect(getByTestId('favorites-count')).toHaveTextContent('1');
        expect(getByTestId('favorites-list')).toHaveTextContent('user2');
        expect(getByTestId('is-user1-favorite')).toHaveTextContent('false');
      });
    });
  });

  describe('isFavorite', () => {
    it('should return true for existing favorite', async () => {
      AsyncStorage.setItem('@github_users_favorites', JSON.stringify(['user1']));

      const { getByTestId } = render(
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      );

      await waitFor(() => {
        expect(getByTestId('is-user1-favorite')).toHaveTextContent('true');
      });
    });

    it('should return false for non-existing favorite', async () => {
      const { getByTestId } = render(
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      );

      await waitFor(() => {
        expect(getByTestId('is-user1-favorite')).toHaveTextContent('false');
      });
    });
  });

  describe('toggleFavorite', () => {
    it('should add favorite when not in list', async () => {
      const { getByTestId } = render(
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      );

      await act(async () => {
        getByTestId('toggle-user1').props.onPress();
      });

      await waitFor(() => {
        expect(getByTestId('favorites-count')).toHaveTextContent('1');
        expect(getByTestId('is-user1-favorite')).toHaveTextContent('true');
      });
    });
  });
});
