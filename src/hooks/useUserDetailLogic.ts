import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useUserDetails } from './useGitHubUsers';
import { useFavorites } from '../contexts/FavoritesContext';

type RootStackParamList = {
  UserDetail: { username: string };
};

type UserDetailRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;
type NavigationProp = {
  goBack: () => void;
};

export const useUserDetailLogic = () => {
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<UserDetailRouteProp>();

  const { username } = route.params;

  const { data: user, isLoading, error, refetch } = useUserDetails(username);

  const { isFavorite, toggleFavorite } = useFavorites();

  const handleBackPress = () => navigation.goBack();

  const handleFavoritePress = () => toggleFavorite(username);

  return {
    user,
    isLoading,
    error,
    refetch,
    isFavorite: isFavorite(username),
    handleBackPress,
    handleFavoritePress,
  };
};
