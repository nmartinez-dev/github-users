import { FC } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { LoadingView } from '../components/LoadingView';
import { ErrorView } from '../components/ErrorView';
import { UserDetailHeader } from '../components/UserDetailHeader';
import { UserProfile } from '../components/UserProfile';
import { UserStats } from '../components/UserStats';
import { UserDetails } from '../components/UserDetails';
import { useUserDetailLogic } from '../hooks/useUserDetailLogic';

export const UserDetailScreen: FC = () => {
  const { theme } = useTheme();

  const {
    user,
    isLoading,
    error,
    refetch,
    isFavorite,
    handleBackPress,
    handleFavoritePress,
  } = useUserDetailLogic();

  const renderUserInfo = () => {
    if (!user) return null;

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <UserProfile
          user={user}
          isFavorite={isFavorite}
          onFavoritePress={handleFavoritePress}
        />
        <UserStats user={user} />
        <UserDetails user={user} />
      </ScrollView>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView message="Cargando detalles del usuario..." />;
    }

    if (error) {
      return (
        <ErrorView
          message={error.message}
          onRetry={refetch}
        />
      );
    }

    return renderUserInfo();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={theme.type === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={theme.colors.background}
      />
      <UserDetailHeader onBackPress={handleBackPress} />
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
