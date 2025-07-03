import { FC } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useFavorites } from '../contexts/FavoritesContext';
import { EmptyView } from '../components/EmptyView';
import { useTheme } from '../contexts/ThemeContext';
import { FavoritesHeader } from '../components/FavoritesHeader';
import { FavoritesList } from '../components/FavoritesList';
import { useFavoritesLogic } from '../hooks/useFavoritesLogic';

export const FavoritesScreen: FC = () => {
  const { theme } = useTheme();

  const { favorites } = useFavorites();

  const {
    favoriteUsers,
    isLoading,
    error,
    sortOrder,
    handleUserPress,
    toggleSortOrder,
  } = useFavoritesLogic();

  const renderContent = () => {
    if (isLoading) {
      return null;
    }

    if (error) {
      return null;
    }

    if (favorites.length === 0) {
      return (
        <EmptyView
          message="No tienes usuarios favoritos"
        />
      );
    }

    if (favoriteUsers.length === 0) {
      return (
        <EmptyView
          message="No se pudieron cargar los usuarios favoritos"
        />
      );
    }

    return (
      <FavoritesList
        users={favoriteUsers}
        onUserPress={handleUserPress}
        ListHeaderComponent={() => (
          <FavoritesHeader
            favoritesCount={favoriteUsers.length}
            sortOrder={sortOrder}
            onToggleSort={toggleSortOrder}
          />
        )}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={theme.type === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={theme.colors.background}
      />
      <View style={styles.content}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
