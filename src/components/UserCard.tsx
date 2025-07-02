import { FC } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GitHubUser } from '../types';
import { useFavorites } from '../contexts/FavoritesContext';

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
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoritePress = () =>
    toggleFavorite(user.login);

  return (
    <TouchableOpacity
      style={styles.container}
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
          <Text style={styles.username} numberOfLines={1}>
            {user.login}
          </Text>
          {user.name && (
            <Text style={styles.name} numberOfLines={1}>
              {user.name}
            </Text>
          )}
          {user.bio && (
            <Text style={styles.bio} numberOfLines={2}>
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
              color={isFavorite(user.login) ? '#f6e05e' : '#d1d5da'}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
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
    color: '#24292e',
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    color: '#586069',
    marginBottom: 4,
  },
  bio: {
    fontSize: 12,
    color: '#6a737d',
    lineHeight: 16,
  },
  favoriteButton: {
    padding: 8,
  },
});
