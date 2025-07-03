import { FC } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemeToggle } from '../common/ThemeToggle';

interface FavoritesHeaderProps {
  favoritesCount: number;
  sortOrder: 'asc' | 'desc';
  onToggleSort: () => void;
}

export const FavoritesHeader: FC<FavoritesHeaderProps> = ({
  favoritesCount,
  sortOrder,
  onToggleSort,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Favoritos ({favoritesCount})</Text>
        </View>
        <View style={styles.headerRight}>
          {favoritesCount > 1 && (
            <TouchableOpacity
              style={[styles.sortButton, { backgroundColor: theme.colors.primary }]}
              onPress={onToggleSort}
            >
              <Text style={styles.sortButtonText}>
                Ordenar {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.themeToggle}>
            <ThemeToggle />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  themeToggle: {
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  sortButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
