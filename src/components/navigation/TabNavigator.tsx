import { FC } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

type TabType = 'home' | 'favorites';

interface TabNavigatorProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

export const TabNavigator: FC<TabNavigatorProps> = ({
  activeTab,
  onTabPress,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border }]}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'home' && { borderTopColor: theme.colors.primary }]}
        onPress={() => onTabPress('home')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="home"
          size={24}
          color={activeTab === 'home' ? theme.colors.primary : theme.colors.icon}
        />
        <Text style={[
          styles.tabText,
          { color: theme.colors.textSecondary },
          activeTab === 'home' && { color: theme.colors.primary }
        ]}>
          Inicio
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tab, activeTab === 'favorites' && { borderTopColor: theme.colors.primary }]}
        onPress={() => onTabPress('favorites')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="star"
          size={24}
          color={activeTab === 'favorites' ? theme.colors.primary : theme.colors.icon}
        />
        <Text style={[
          styles.tabText,
          { color: theme.colors.textSecondary },
          activeTab === 'favorites' && { color: theme.colors.primary }
        ]}>
          Favoritos
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 2,
    borderTopColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
