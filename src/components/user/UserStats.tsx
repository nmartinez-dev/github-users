import { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { GitHubUser } from '../../types';

interface UserStatsProps {
  user: GitHubUser;
}

export const UserStats: FC<UserStatsProps> = ({ user }) => {
  const { theme } = useTheme();

  return (
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
  );
};

const styles = StyleSheet.create({
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
});
