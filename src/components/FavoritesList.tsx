import { FC } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { UserCard } from './UserCard';
import { GitHubUser } from '../types';

interface FavoritesListProps {
  users: GitHubUser[];
  onUserPress: (user: GitHubUser) => void;
  ListHeaderComponent: React.ComponentType<any>;
}

export const FavoritesList: FC<FavoritesListProps> = ({
  users,
  onUserPress,
  ListHeaderComponent,
}) => {
  const renderUser = ({ item }: { item: GitHubUser }) => (
    <UserCard
      user={item}
      onPress={() => onUserPress(item)}
    />
  );

  return (
    <FlatList
      data={users}
      renderItem={renderUser}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
  },
});
