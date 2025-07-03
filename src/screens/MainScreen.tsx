import { useState, FC } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { HomeScreen } from './HomeScreen';
import { FavoritesScreen } from './FavoritesScreen';
import { TabNavigator } from '../components/TabNavigator';
import { useTheme } from '../contexts/ThemeContext';

type TabType = 'home' | 'favorites';

export const MainScreen: FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const handleTabPress = (tab: TabType) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar 
        barStyle={theme.type === 'light' ? 'dark-content' : 'light-content'} 
        backgroundColor={theme.colors.background} 
      />
      <View style={styles.content}>
        {renderContent()}
      </View>
      <TabNavigator
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
