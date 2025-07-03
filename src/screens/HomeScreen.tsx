import { useState, useMemo, FC } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUsers, useSearchUsers } from '../hooks/useGitHubUsers';
import { UserCard } from '../components/UserCard';
import { SearchBar } from '../components/SearchBar';
import { LoadingView } from '../components/LoadingView';
import { ErrorView } from '../components/ErrorView';
import { EmptyView } from '../components/EmptyView';
import { GitHubUser } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeToggle } from '../components/ThemeToggle';

type RootStackParamList = {
  Home: undefined;
  UserDetail: { username: string };
};

type NavigationProp = {
  navigate: (screen: keyof RootStackParamList, params?: any) => void;
};

export const HomeScreen: FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const [searchQuery, setSearchQuery] = useState('');

  const usersQuery = useUsers();

  const searchQueryResult = useSearchUsers(searchQuery);

  const { data: users, isLoading, error, refetch } = useMemo(() => {
    if (searchQuery.length > 0) {
      return searchQueryResult;
    }

    return usersQuery;
  }, [searchQuery, usersQuery, searchQueryResult]);

  const handleUserPress = (user: GitHubUser) =>
    navigation.navigate('UserDetail', { username: user.login });

  const handleSearch = (query: string) =>
    setSearchQuery(query);

  const renderUser = ({ item }: { item: GitHubUser }) => (
    <UserCard
      user={item}
      onPress={() => handleUserPress(item)}
    />
  );

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView message="Cargando usuarios..." />;
    }

    if (error) {
      return (
        <ErrorView
          message={error.message}
          onRetry={refetch}
        />
      );
    }

    if (!users || users.length === 0) {
      const message = searchQuery.length > 0
        ? `No se encontraron usuarios para "${searchQuery}"`
        : 'No hay usuarios disponibles';
      return <EmptyView message={message} />;
    }

    return (
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={theme.type === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={theme.colors.background}
      />
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerCenter}>
            <SearchBar onSearch={handleSearch} />
          </View>
          <View style={styles.headerRight}>
            <ThemeToggle />
          </View>
        </View>
      </View>
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
  header: {
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerCenter: {
    flex: 1,
  },
  headerRight: {
    width: 40,
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  listContainer: {
    paddingVertical: 8,
  },
});
