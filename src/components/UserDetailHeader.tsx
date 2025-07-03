import { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeToggle } from './ThemeToggle';

interface UserDetailHeaderProps {
  onBackPress: () => void;
}

export const UserDetailHeader: FC<UserDetailHeaderProps> = ({ onBackPress }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.headerContainer, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={[styles.backButtonText, { color: theme.colors.primary }]}>← Volver</Text>
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Detalles del Usuario</Text>
      <View style={styles.headerRight}>
        <ThemeToggle />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
