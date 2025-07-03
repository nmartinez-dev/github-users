import { FC } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { GitHubUser } from '../types';

interface UserDetailsProps {
  user: GitHubUser;
}

export const UserDetails: FC<UserDetailsProps> = ({ user }) => {
  const { theme } = useTheme();

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';

    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
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
          <Text
            style={[styles.detailValue, { color: theme.colors.text }]}
            onPress={() => user.blog && Linking.openURL(user.blog)}
          >
            {user.blog}
          </Text>
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
  );
};

const styles = StyleSheet.create({
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
