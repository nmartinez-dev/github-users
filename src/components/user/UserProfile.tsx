import { FC } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { GitHubUser } from '../../types';

interface UserProfileProps {
  user: GitHubUser;
  isFavorite: boolean;
  onFavoritePress: () => void;
}

export const UserProfile: FC<UserProfileProps> = ({ user, isFavorite, onFavoritePress }) => {
  const { theme } = useTheme();

  return (
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
        onPress={onFavoritePress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons
          name={isFavorite ? 'star' : 'star-outline'}
          size={32}
          color={isFavorite ? theme.colors.favorite : theme.colors.favoriteInactive}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
