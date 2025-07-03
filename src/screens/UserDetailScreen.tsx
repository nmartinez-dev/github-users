import { FC } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useUserDetails } from '../hooks/useGitHubUsers';
import { LoadingView, ErrorView } from '../components/LoadingAndError';
import { useFavorites } from '../contexts/FavoritesContext';
import { ThemeToggle } from '../components/ThemeToggle';

type RootStackParamList = {
  UserDetail: { username: string };
};

type UserDetailRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;
type NavigationProp = {
  goBack: () => void;
};

export const UserDetailScreen: FC = () => {
  const { theme } = useTheme();
  const route = useRoute<UserDetailRouteProp>();

  const navigation = useNavigation<NavigationProp>();

  const { username } = route.params;

  const { data: user, isLoading, error, refetch } = useUserDetails(username);

  const { isFavorite, toggleFavorite } = useFavorites();

  const handleBackPress = () =>
    navigation.goBack();

  const handleFavoritePress = () =>
    toggleFavorite(username);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';

    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderUserInfo = () => {
    if (!user) return null;

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={{ uri: user.avatar_url }}
            style={styles.avatar}
            resizeMode="cover"
          />
          <View style={styles.userInfo}>
            <Text style={[styles.username, { color: theme.colors.text }]}>{user.login}</Text>
            {user.name && (
              <Text style={[styles.name, { color: theme.colors.textSecondary }]}>{user.name}</Text>
            )}
            {user.bio && (
              <Text style={[styles.bio, { color: theme.colors.textMuted }]}>{user.bio}</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isFavorite(user.login) ? 'star' : 'star-outline'}
              size={32}
              color={isFavorite(user.login) ? theme.colors.favorite : theme.colors.favoriteInactive}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.colors.text }]}>{user.public_repos || 0}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Repositorios</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.colors.text }]}>{user.followers || 0}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Seguidores</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.colors.text }]}>{user.following || 0}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Siguiendo</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          {user.location && (
            <View style={styles.detailItem}>
              <View style={styles.detailHeader}>
                <Ionicons name="location" size={16} color={theme.colors.icon} />
                <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Ubicación</Text>
              </View>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>{user.location}</Text>
            </View>
          )}

          {user.company && (
            <View style={styles.detailItem}>
              <View style={styles.detailHeader}>
                <Ionicons name="business" size={16} color={theme.colors.icon} />
                <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Empresa</Text>
              </View>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>{user.company}</Text>
            </View>
          )}

          {user.blog && (
            <View style={styles.detailItem}>
              <View style={styles.detailHeader}>
                <Ionicons name="globe" size={16} color={theme.colors.icon} />
                <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Blog</Text>
              </View>
              <Text style={[styles.detailValue, { color: theme.colors.text }]} onPress={() => user.blog && Linking.openURL(user.blog)}>{user.blog}</Text>
            </View>
          )}

          <View style={styles.detailItem}>
            <View style={styles.detailHeader}>
              <Ionicons name="calendar" size={16} color={theme.colors.icon} />
              <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Miembro desde</Text>
            </View>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{formatDate(user.created_at)}</Text>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailHeader}>
              <Ionicons name="refresh" size={16} color={theme.colors.icon} />
              <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Última actualización</Text>
            </View>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{formatDate(user.updated_at)}</Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView message="Cargando detalles del usuario..." />;
    }

    if (error) {
      return (
        <ErrorView
          message={error.message}
          onRetry={refetch}
        />
      );
    }

    return renderUserInfo();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <StatusBar 
        barStyle={theme.type === 'light' ? 'dark-content' : 'light-content'} 
        backgroundColor={theme.colors.background} 
      />
      <View style={[styles.headerContainer, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.backButtonText, { color: theme.colors.primary }]}>← Volver</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Detalles del Usuario</Text>
        <View style={styles.headerRight}>
          <ThemeToggle />
        </View>
      </View>
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
    marginRight: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    lineHeight: 20,
  },
  favoriteButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  detailsContainer: {
    padding: 20,
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  detailValue: {
    fontSize: 16,
    marginTop: 4,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
