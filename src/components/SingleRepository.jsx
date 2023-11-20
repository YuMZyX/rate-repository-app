import { useParams } from "react-router-native";
import { FlatList, StyleSheet, View } from 'react-native';
import RepositoryInfo from "./RepositoryInfo";
import ReviewItem from "./ReviewItem";
import useRepository from "../hooks/useRepository";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const id = useParams();

  const { repository, fetchMore, loading } = useRepository({
    repositoryId: id.repositoryId,
    first: 8
  })

  if (loading) { return null }

  const onEndReach = () => {
    fetchMore();
  };

  const reviewNodes = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} myReview={false} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
};

export default SingleRepository;