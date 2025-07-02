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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useUserDetails } from '../hooks/useGitHubUsers';
import { LoadingView, ErrorView } from '../components/LoadingAndError';
import { useFavorites } from '../contexts/FavoritesContext';

type RootStackParamList = {
  UserDetail: { username: string };
};

type UserDetailRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;
type NavigationProp = {
  goBack: () => void;
};

export const UserDetailScreen: FC = () => {
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
            <Text style={styles.username}>{user.login}</Text>
            {user.name && (
              <Text style={styles.name}>{user.name}</Text>
            )}
            {user.bio && (
              <Text style={styles.bio}>{user.bio}</Text>
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
              color={isFavorite(user.login) ? '#f6e05e' : '#d1d5da'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.public_repos || 0}</Text>
            <Text style={styles.statLabel}>Repositorios</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.followers || 0}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.following || 0}</Text>
            <Text style={styles.statLabel}>Siguiendo</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          {user.location && (
            <View style={styles.detailItem}>
              <View style={styles.detailHeader}>
                <Ionicons name="location" size={16} color="#586069" />
                <Text style={styles.detailLabel}>Ubicación</Text>
              </View>
              <Text style={styles.detailValue}>{user.location}</Text>
            </View>
          )}

          {user.company && (
            <View style={styles.detailItem}>
              <View style={styles.detailHeader}>
                <Ionicons name="business" size={16} color="#586069" />
                <Text style={styles.detailLabel}>Empresa</Text>
              </View>
              <Text style={styles.detailValue}>{user.company}</Text>
            </View>
          )}

          {user.blog && (
            <View style={styles.detailItem}>
              <View style={styles.detailHeader}>
                <Ionicons name="globe" size={16} color="#586069" />
                <Text style={styles.detailLabel}>Blog</Text>
              </View>
              <Text style={styles.detailValue}>{user.blog}</Text>
            </View>
          )}

          <View style={styles.detailItem}>
            <View style={styles.detailHeader}>
              <Ionicons name="calendar" size={16} color="#586069" />
              <Text style={styles.detailLabel}>Miembro desde</Text>
            </View>
            <Text style={styles.detailValue}>{formatDate(user.created_at)}</Text>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailHeader}>
              <Ionicons name="refresh" size={16} color="#586069" />
              <Text style={styles.detailLabel}>Última actualización</Text>
            </View>
            <Text style={styles.detailValue}>{formatDate(user.updated_at)}</Text>
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles del Usuario</Text>
        <View style={styles.headerSpacer} />
      </View>
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#0366d6',
    fontWeight: '600',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#24292e',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 60,
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
    color: '#24292e',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    color: '#586069',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: '#6a737d',
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
    borderTopColor: '#e1e4e8',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
    marginHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#24292e',
  },
  statLabel: {
    fontSize: 12,
    color: '#586069',
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
    color: '#586069',
    marginLeft: 8,
  },
  detailValue: {
    fontSize: 16,
    color: '#24292e',
    marginTop: 4,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
