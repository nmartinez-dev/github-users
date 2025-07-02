import { FC } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TabType = 'home' | 'favorites';

interface TabNavigatorProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

export const TabNavigator: FC<TabNavigatorProps> = ({
  activeTab,
  onTabPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'home' && styles.activeTab]}
        onPress={() => onTabPress('home')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="home"
          size={24}
          color={activeTab === 'home' ? '#0366d6' : '#586069'}
        />
        <Text style={[
          styles.tabText,
          activeTab === 'home' && styles.activeTabText
        ]}>
          Inicio
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'favorites' && styles.activeTab]}
        onPress={() => onTabPress('favorites')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="star"
          size={24}
          color={activeTab === 'favorites' ? '#0366d6' : '#586069'}
        />
        <Text style={[
          styles.tabText,
          activeTab === 'favorites' && styles.activeTabText
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
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e1e4e8',
    paddingBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#0366d6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#586069',
  },
  activeTabText: {
    color: '#0366d6',
  },
});
