import { useState, useMemo, FC } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUsers } from '../hooks/useGitHubUsers';
import { UserCard } from '../components/UserCard';
import { EmptyView } from '../components/LoadingAndError';
import { useFavorites } from '../contexts/FavoritesContext';
import { GitHubUser } from '../types';

type RootStackParamList = {
  Favorites: undefined;
  UserDetail: { username: string };
};

type NavigationProp = {
  navigate: (screen: keyof RootStackParamList, params?: any) => void;
};

export const FavoritesScreen: FC = () => {
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

  const renderUser = ({ item }: { item: GitHubUser }) => (
    <UserCard
      user={item}
      onPress={() => handleUserPress(item)}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Favoritos ({favoriteUsers.length})</Text>
      {favoriteUsers.length > 1 && (
        <TouchableOpacity
          style={styles.sortButton}
          onPress={toggleSortOrder}
        >
          <Text style={styles.sortButtonText}>
            Ordenar {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

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
      <FlatList
        data={favoriteUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f8fa" />
      <View style={styles.content}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#24292e',
  },
  sortButton: {
    backgroundColor: '#0366d6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  sortButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  listContainer: {
    paddingVertical: 8,
  },
});
