import { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

interface EmptyViewProps {
  message: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  showIcon?: boolean;
}

export const EmptyView: FC<EmptyViewProps> = ({
  message,
  icon = 'search',
  iconSize = 48,
  showIcon = true,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {showIcon && (
        <Ionicons
          name={icon}
          size={iconSize}
          color={theme.colors.icon}
        />
      )}
      <Text style={[styles.emptyMessage, { color: theme.colors.textSecondary }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  },
});
