import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { UserCard } from '../UserCard';
import { GitHubUser } from '../../../types';

// Mock expo vector icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

// Mock ThemeContext
jest.mock('../../../contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        card: '#ffffff',
        text: '#000000',
        textSecondary: '#333333',
        textMuted: '#666666',
        border: '#e0e0e0',
        favorite: '#ffd700',
        favoriteInactive: '#cccccc',
      },
    },
  }),
}));

// Mock FavoritesContext
jest.mock('../../../contexts/FavoritesContext', () => ({
  useFavorites: () => ({
    isFavorite: jest.fn((username: string) => username === 'favoriteuser'),
    toggleFavorite: jest.fn(),
  }),
}));

describe('UserCard', () => {
  const mockUser: GitHubUser = {
    id: 1,
    login: 'testuser',
    avatar_url: 'https://example.com/avatar.jpg',
    type: 'User',
    name: 'Test User',
    bio: 'This is a test bio for the user',
    public_repos: 10,
    followers: 100,
    following: 50,
  };

  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render user information correctly', () => {
    const { getByText, getByTestId } = render(
      <UserCard user={mockUser} />
    );

    expect(getByText('testuser')).toBeTruthy();
    expect(getByText('Test User')).toBeTruthy();
    expect(getByText('This is a test bio for the user')).toBeTruthy();
    expect(getByTestId('user-avatar')).toBeTruthy();
  });

  it('should render user without optional fields', () => {
    const userWithoutOptional: GitHubUser = {
      id: 2,
      login: 'simpleuser',
      avatar_url: 'https://example.com/avatar2.jpg',
      type: 'User',
    };

    const { getByText, queryByText } = render(
      <UserCard user={userWithoutOptional} />
    );

    expect(getByText('simpleuser')).toBeTruthy();
    expect(queryByText('Test User')).toBeNull();
    expect(queryByText('This is a test bio for the user')).toBeNull();
  });

  it('should call onPress when card is pressed', () => {
    const { getByTestId } = render(
      <UserCard user={mockUser} onPress={mockOnPress} />
    );

    const card = getByTestId('user-card');
    fireEvent.press(card);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should not crash when onPress is not provided', () => {
    const { getByTestId } = render(
      <UserCard user={mockUser} />
    );

    const card = getByTestId('user-card');
    
    // Should not throw error
    expect(() => fireEvent.press(card)).not.toThrow();
  });

  it('should show favorite button by default', () => {
    const { getByTestId } = render(
      <UserCard user={mockUser} />
    );

    expect(getByTestId('favorite-button')).toBeTruthy();
  });

  it('should hide favorite button when showFavoriteButton is false', () => {
    const { queryByTestId } = render(
      <UserCard user={mockUser} showFavoriteButton={false} />
    );

    expect(queryByTestId('favorite-button')).toBeNull();
  });

  it('should render avatar with correct source', () => {
    const { getByTestId } = render(
      <UserCard user={mockUser} />
    );

    const avatar = getByTestId('user-avatar');
    expect(avatar.props.source.uri).toBe('https://example.com/avatar.jpg');
  });
}); 