import { FC } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { GitHubUser } from '../../types';
import { useFavorites } from '../../contexts/FavoritesContext';

interface UserCardProps {
  user: GitHubUser;
  onPress?: () => void;
  showFavoriteButton?: boolean;
}

export const UserCard: FC<UserCardProps> = ({
  user,
  onPress,
  showFavoriteButton = true,
}) => {
  const { theme } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoritePress = () =>
    toggleFavorite(user.login);

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Image
          source={{ uri: user.avatar_url }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View style={styles.userInfo}>
          <Text style={[styles.username, { color: theme.colors.text }]} numberOfLines={1}>
            {user.login}
          </Text>
          {user.name && (
            <Text style={[styles.name, { color: theme.colors.textSecondary }]} numberOfLines={1}>
              {user.name}
            </Text>
          )}
          {user.bio && (
            <Text style={[styles.bio, { color: theme.colors.textMuted }]} numberOfLines={2}>
              {user.bio}
            </Text>
          )}
        </View>

        {showFavoriteButton && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isFavorite(user.login) ? 'star' : 'star-outline'}
              size={24}
              color={isFavorite(user.login) ? theme.colors.favorite : theme.colors.favoriteInactive}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    marginBottom: 4,
  },
  bio: {
    fontSize: 12,
    lineHeight: 16,
  },
  favoriteButton: {
    padding: 8,
  },
});
